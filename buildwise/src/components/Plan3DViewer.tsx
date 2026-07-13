import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import type { Answers, ProjectPackage } from '../interview/engine'
import { buildModel, deviceEditOrigin, layoutLighting, layoutPower, patchDeviceEdit, patchFurnitureEdit, snapPlanOffset, viewerLayerPreset, type EditableLayer, type PlanEdits, type PlanModel, type SheetKind } from '../lib/drawing'
import { buildDetailedModel, createModelMaterials, framingMembers, layoutFurniture } from '../lib/modelKit'
import { cutawayGeometry, loadTechnicalAsset, plumbingBranchPoints, plumbingServiceSource, technicalAssetForDevice, viewerCameraSpan, type TechnicalAssetId } from '../lib/technicalAssets'

/**
 * 3D model of the generated project — the same PlanModel and device layouts
 * that draw the 2D sheets, extruded into an orbitable three.js scene: walls
 * with door gaps and glass, counters and fixtures, recessed lights, wiring
 * and plumbing runs, and a framing layer that fades the drywall away.
 */

type Layer = 'lights' | 'electrical' | 'plumbing' | 'framing'

const C = {
  bg: 0x08111d,
  floor: 0xaeb7b4,
  wall: 0xe3e8e9,
  edge: 0x45627e,
  counter: 0xd8dadd,
  fixture: 0x8493a0,
  glass: 0x3b82f6,
  wire: 0x3b82f6,
  water: 0x22d3ee,
  light: 0xf59e0b,
  stud: 0x8da0bf,
}
const WALL_H = 7.2

interface Built {
  scene: THREE.Scene
  groups: Record<Layer, THREE.Group>
  wallMats: THREE.MeshStandardMaterial[]
  pointLights: THREE.PointLight[]
  fixtureMats: THREE.MeshStandardMaterial[]
  systemMats: THREE.MeshStandardMaterial[]
  ambient: THREE.AmbientLight
  selectables: THREE.Object3D[]
  stopAsyncAssets: () => void
}

function wallBox(
  parent: THREE.Object3D,
  mat: THREE.Material,
  x1: number,
  z1: number,
  x2: number,
  z2: number,
  h: number,
  t: number,
  yBase = 0,
) {
  const len = Math.hypot(x2 - x1, z2 - z1)
  if (len < 0.05) return
  const geo = new THREE.BoxGeometry(len, h, t)
  const mesh = new THREE.Mesh(geo, mat)
  mesh.position.set((x1 + x2) / 2, yBase + h / 2, (z1 + z2) / 2)
  mesh.rotation.y = -Math.atan2(z2 - z1, x2 - x1)
  mesh.castShadow = true
  mesh.receiveShadow = true
  parent.add(mesh)
}

/** Wall run along one axis with optional gaps (doors) + headers above them. */
function wallWithGaps(
  parent: THREE.Object3D,
  mat: THREE.Material,
  x1: number,
  z1: number,
  x2: number,
  z2: number,
  t: number,
  gaps: { pos: number; width: number }[],
) {
  const len = Math.hypot(x2 - x1, z2 - z1)
  const ux = (x2 - x1) / len
  const uz = (z2 - z1) / len
  let cursor = 0
  const sorted = [...gaps].sort((a, b) => a.pos - b.pos)
  for (const g of sorted) {
    const start = Math.max(0, Math.min(g.pos, len))
    const end = Math.max(0, Math.min(g.pos + g.width, len))
    wallBox(parent, mat, x1 + ux * cursor, z1 + uz * cursor, x1 + ux * start, z1 + uz * start, WALL_H, t)
    // Header above the opening.
    wallBox(parent, mat, x1 + ux * start, z1 + uz * start, x1 + ux * end, z1 + uz * end, WALL_H - 6.8, t, 6.8)
    cursor = end
  }
  wallBox(parent, mat, x1 + ux * cursor, z1 + uz * cursor, x2, z2, WALL_H, t)
}

function buildScene(m: PlanModel, edits: PlanEdits | undefined, smart: boolean): Built {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(C.bg)
  scene.fog = new THREE.Fog(C.bg, 70, 160)

  const root = new THREE.Group()
  root.position.set(-m.wFt / 2, 0, -m.hFt / 2)
  scene.add(root)
  const cutaway = cutawayGeometry(m.wFt, m.hFt)

  const ambient = new THREE.AmbientLight(0xffffff, 1.2)
  const hemi = new THREE.HemisphereLight(0xd8ecff, 0x314254, 0.85)
  const key = new THREE.DirectionalLight(0xffffff, 1.45)
  key.position.set(30, 45, 25)
  key.castShadow = true
  key.shadow.mapSize.set(2048, 2048)
  key.shadow.camera.near = 1
  key.shadow.camera.far = 140
  scene.add(ambient, hemi, key)

  const wallMats: THREE.MeshStandardMaterial[] = []
  const wallMat = () => {
    const mat = new THREE.MeshStandardMaterial({ color: C.wall, roughness: 0.78, transparent: true, opacity: 0.9 })
    wallMats.push(mat)
    return mat
  }
  const fixtureMat = new THREE.MeshStandardMaterial({ color: C.fixture, roughness: 0.5 })
  const selectables: THREE.Object3D[] = []
  const systemMats: THREE.MeshStandardMaterial[] = []
  let acceptAsyncAssets = true
  const tag = (anchor: THREE.Object3D, hitTarget: THREE.Object3D, layer: EditableLayer, id: string, kind: string, baseX: number, baseY: number) => {
    anchor.userData = { editable: true, layer, id, kind, baseX, baseY }
    hitTarget.userData = { ...anchor.userData, dragTarget: anchor }
    selectables.push(hitTarget)
  }
  const tagFurniture = (anchor: THREE.Object3D, hitTarget: THREE.Object3D, id: string, kind: string, baseX: number, baseY: number, centerX: number, centerY: number) => {
    anchor.userData = { editable: true, layer: 'furniture', id, kind, baseX, baseY, centerX, centerY }
    hitTarget.userData = { ...anchor.userData, dragTarget: anchor }
    selectables.push(hitTarget)
  }
  const mountAsset = (
    anchor: THREE.Object3D,
    id: TechnicalAssetId,
    fallback: THREE.Object3D,
    scale: number,
    rotation: [number, number, number] = [0, 0, 0],
    offset: [number, number, number] = [0, 0, 0],
  ) => {
    loadTechnicalAsset(id).then((asset) => {
      if (!acceptAsyncAssets) return
      asset.scale.setScalar(scale)
      asset.rotation.set(...rotation)
      asset.position.set(...offset)
      asset.name = id
      anchor.add(asset)
      fallback.visible = false
    }).catch(() => {
      // The lightweight fallback remains usable if a model cannot be fetched.
    })
  }

  // Concrete site, exposed foundation/service level, floor + grid. The front
  // foundation is intentionally opened so the technical systems remain visible.
  const site = new THREE.Mesh(
    new THREE.BoxGeometry(m.wFt + 8, 0.45, m.hFt + 8),
    new THREE.MeshStandardMaterial({ color: 0x4d5a67, roughness: 0.96 }),
  )
  site.position.set(m.wFt / 2, -3.55, m.hFt / 2)
  site.receiveShadow = true
  root.add(site)
  const slab = new THREE.Mesh(
    new THREE.BoxGeometry(m.wFt + 1.2, 0.48, m.hFt + 1.2),
    new THREE.MeshStandardMaterial({ color: 0x9ba5ac, roughness: 0.94 }),
  )
  slab.position.set(m.wFt / 2, -3.15, m.hFt / 2)
  slab.receiveShadow = true
  root.add(slab)
  const foundationMat = new THREE.MeshStandardMaterial({ color: 0x77828c, roughness: 0.92 })
  wallBox(root, foundationMat, 0, m.hFt, m.wFt, m.hFt, 2.8, 0.55, -3)
  wallBox(root, foundationMat, 0, 0, 0, m.hFt, 2.8, 0.55, -3)
  wallBox(root, foundationMat, m.wFt, 0, m.wFt, m.hFt, 2.8, 0.55, -3)
  wallBox(root, foundationMat, 0, 0, m.wFt * 0.18, 0, 2.8, 0.55, -3)
  wallBox(root, foundationMat, m.wFt * 0.82, 0, m.wFt, 0, 2.8, 0.55, -3)

  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(m.wFt, 0.25, cutaway.floorDepth),
    new THREE.MeshStandardMaterial({ color: C.floor, roughness: 0.9 }),
  )
  floor.position.set(m.wFt / 2, -0.125, cutaway.floorDepth / 2)
  floor.receiveShadow = true
  root.add(floor)
  const grid = new THREE.GridHelper(Math.max(m.wFt, m.hFt) * 1.7, Math.round(Math.max(m.wFt, m.hFt) / 2), 0x24304a, 0x18233c)
  grid.position.set(m.wFt / 2, -3.31, m.hFt / 2)
  root.add(grid)

  // Exterior shell (front-door gap on its wall).
  const ext = wallMat()
  const fd = m.door
  const T = 0.4
  wallWithGaps(root, ext, 0, 0, m.wFt, 0, T, fd.wall === 'N' ? [{ pos: fd.pos, width: fd.width }] : [])
  wallBox(root, ext, 0, m.hFt, cutaway.openingStart, m.hFt, WALL_H, T)
  wallBox(root, ext, cutaway.openingEnd, m.hFt, m.wFt, m.hFt, WALL_H, T)
  wallWithGaps(root, ext, 0, 0, 0, m.hFt, T, fd.wall === 'W' ? [{ pos: fd.pos, width: fd.width }] : [])
  wallWithGaps(root, ext, m.wFt, 0, m.wFt, m.hFt, T, fd.wall === 'E' ? [{ pos: fd.pos, width: fd.width }] : [])

  // Interior rooms (whole-house mode): slightly inset walls with door gaps.
  const glassMat = new THREE.MeshStandardMaterial({
    color: C.glass,
    transparent: true,
    opacity: 0.3,
    emissive: C.glass,
    emissiveIntensity: 0.15,
  })
  for (const r of m.rooms ?? []) {
    if (r.type === 'hall') continue
    const mat = wallMat()
    const i = 0.06
    const x = r.x + i
    const y = r.y + i
    const w = r.w - i * 2
    const h = r.h - i * 2
    const gapsFor = (wall: string, len: number) =>
      r.door && r.door.wall === wall ? [{ pos: Math.min(r.door.pos, len - r.door.width), width: r.door.width }] : []
    wallWithGaps(root, mat, x, y, x + w, y, 0.22, gapsFor('N', w))
    wallWithGaps(root, mat, x, y + h, x + w, y + h, 0.22, gapsFor('S', w))
    wallWithGaps(root, mat, x, y, x, y + h, 0.22, gapsFor('W', h))
    wallWithGaps(root, mat, x + w, y, x + w, y + h, 0.22, gapsFor('E', h))
    if (r.window) {
      const wp1 = r.window.wall === 'N' || r.window.wall === 'S' ? { x: r.x + r.window.pos, z: r.window.wall === 'N' ? r.y : r.y + r.h } : { x: r.window.wall === 'W' ? r.x : r.x + r.w, z: r.y + r.window.pos }
      const horiz = r.window.wall === 'N' || r.window.wall === 'S'
      const glass = new THREE.Mesh(
        new THREE.BoxGeometry(horiz ? r.window.width : 0.55, 3.2, horiz ? 0.55 : r.window.width),
        glassMat,
      )
      glass.position.set(wp1.x + (horiz ? r.window.width / 2 : 0), 4.6, wp1.z + (horiz ? 0 : r.window.width / 2))
      root.add(glass)
    }
  }
  // Single-room window glass.
  if (!m.rooms) {
    const w = m.window
    const horiz = w.wall === 'N' || w.wall === 'S'
    const gx = horiz ? w.pos + w.width / 2 : w.wall === 'W' ? 0 : m.wFt
    const gz = horiz ? (w.wall === 'N' ? 0 : m.hFt) : w.pos + w.width / 2
    const glass = new THREE.Mesh(new THREE.BoxGeometry(horiz ? w.width : 0.6, 3.2, horiz ? 0.6 : w.width), glassMat)
    glass.position.set(gx, 4.6, gz)
    root.add(glass)
  }

  // Detailed local model kit. Every placement is derived from the same room
  // geometry used by the plan sheets, so furnishings stay inside the plan.
  const modelMaterials = createModelMaterials()
  const furniture = new THREE.Group()
  furniture.name = 'Detailed house models'
  const baseFurniture = layoutFurniture(m)
  for (const placement of layoutFurniture(m, edits)) {
    const anchor = new THREE.Group()
    const object = buildDetailedModel(placement.kind, modelMaterials, placement.width, placement.depth)
    anchor.position.set(placement.x + placement.width / 2, 0, placement.y + placement.depth / 2)
    anchor.rotation.y = placement.rotation ?? 0
    object.position.set(-placement.width / 2, 0, -placement.depth / 2)
    object.name = placement.kind
    object.traverse((part) => {
      const mesh = part as THREE.Mesh
      if (mesh.isMesh) { mesh.castShadow = true; mesh.receiveShadow = true }
    })
    const hitTarget = new THREE.Mesh(new THREE.BoxGeometry(placement.width, 2.5, placement.depth), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.02, depthWrite: false }))
    hitTarget.position.set(0, 1.25, 0)
    anchor.add(object, hitTarget)
    const base = baseFurniture.find((item) => item.id === placement.id) ?? placement
    tagFurniture(anchor, hitTarget, placement.id, placement.kind, base.x, base.y, placement.width / 2, placement.depth / 2)
    furniture.add(anchor)
  }
  root.add(furniture)

  // Mechanical equipment not represented by a room furnishing.
  for (const ap of m.appliances) {
    if (ap.label === 'WH') {
      const wh = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 4.6, 16), fixtureMat)
      wh.position.set(ap.x, 2.3, ap.y)
      root.add(wh)
    }
  }

  /* ---- LIGHTS layer ------------------------------------------------ */
  const lightDevs = layoutLighting(m, edits)
  const baseLights = layoutLighting(m)
  const grpLights = new THREE.Group()
  const fixtureMats: THREE.MeshStandardMaterial[] = []
  const pointLights: THREE.PointLight[] = []
  const cans = lightDevs.filter((d) => d.kind === 'can' || d.kind === 'pendant')
  cans.forEach((d, i) => {
    const emat = new THREE.MeshStandardMaterial({ color: 0xffe9c0, emissive: C.light, emissiveIntensity: 1.2 })
    fixtureMats.push(emat)
    const anchor = new THREE.Group()
    anchor.position.set(d.x, d.kind === 'pendant' ? WALL_H - 1.5 : WALL_H - 0.12, d.y)
    const fallback = new THREE.Mesh(
      d.kind === 'pendant' ? new THREE.SphereGeometry(0.3, 14, 12) : new THREE.CylinderGeometry(0.35, 0.35, 0.1, 14),
      emat,
    )
    anchor.add(fallback)
    const hitTarget = new THREE.Mesh(
      new THREE.SphereGeometry(d.kind === 'pendant' ? 0.75 : 0.6, 10, 8),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.025, depthWrite: false }),
    )
    anchor.add(hitTarget)
    const base = deviceEditOrigin(baseLights, d)
    tag(anchor, hitTarget, 'lighting', d.id, d.kind, base.x, base.y)
    mountAsset(
      anchor,
      technicalAssetForDevice('lighting', d.kind, smart),
      fallback,
      d.kind === 'pendant' ? 0.82 : 0.72,
      d.kind === 'pendant' ? [Math.PI, 0, 0] : [Math.PI, 0, 0],
    )
    grpLights.add(anchor)
    // Budget the real lights (forward renderer): at most 6 point lights.
    if (i % Math.ceil(cans.length / 6) === 0) {
      const pl = new THREE.PointLight(0xffd9a0, 14, 26, 1.8)
      pl.position.set(d.x, WALL_H - 1.6, d.y)
      pointLights.push(pl)
      grpLights.add(pl)
    }
  })
  lightDevs.filter((d) => d.kind === 'switch' || d.kind === 'uc').forEach((d) => {
    const anchor = new THREE.Group()
    anchor.position.set(d.x, d.kind === 'switch' ? 3.8 : 6.35, d.y)
    const marker = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 10), new THREE.MeshStandardMaterial({ color: C.light, emissive: C.light, emissiveIntensity: 0.8 }))
    anchor.add(marker)
    const hitTarget = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.5, 0.5), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.025, depthWrite: false }))
    anchor.add(hitTarget)
    const base = deviceEditOrigin(baseLights, d)
    tag(anchor, hitTarget, 'lighting', d.id, d.kind, base.x, base.y)
    mountAsset(anchor, technicalAssetForDevice('lighting', d.kind, smart), marker, d.kind === 'switch' ? 0.48 : 0.38, [0, 0, 0])
    grpLights.add(anchor)
  })
  root.add(grpLights)

  /* ---- ELECTRICAL layer -------------------------------------------- */
  const powerDevs = layoutPower(m, edits)
  const basePower = layoutPower(m)
  const grpElec = new THREE.Group()
  const outletMat = new THREE.MeshStandardMaterial({ color: C.wire, emissive: C.wire, emissiveIntensity: 0.5 })
  systemMats.push(outletMat)
  for (const d of powerDevs) {
    const anchor = new THREE.Group()
    anchor.position.set(d.x, 1.35, d.y)
    const o = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.42, 0.32), outletMat)
    anchor.add(o)
    const hitTarget = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.3, 0.7), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.025, depthWrite: false }))
    anchor.add(hitTarget)
    const base = deviceEditOrigin(basePower, d)
    tag(anchor, hitTarget, 'power', d.id, d.kind, base.x, base.y)
    mountAsset(anchor, technicalAssetForDevice('power', d.kind, smart), o, d.kind === 'dedicated' ? 0.58 : 0.5, [0, 0, 0])
    grpElec.add(anchor)
  }
  const tube = (pts: THREE.Vector3[], color: number, radius: number) => {
    if (pts.length < 2) return null
    const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal')
    const material = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.7, roughness: 0.45 })
    systemMats.push(material)
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, Math.max(24, pts.length * 10), radius, 7, false),
      material,
    )
  }
  for (const kind of ['gfci', 'recep'] as const) {
    const chain = powerDevs.filter((d) => d.kind === kind).map((d) => new THREE.Vector3(d.x, 1.5, d.y))
    const t = tube(chain, C.wire, 0.055)
    if (t) grpElec.add(t)
  }
  root.add(grpElec)

  /* ---- PLUMBING layer ---------------------------------------------- */
  const grpPlumb = new THREE.Group()
  if (m.hasPlumbing) {
    const service = plumbingServiceSource(m.appliances, m.wFt, m.hFt)
    const serviceY = -1.8
    const coldTrunk = tube(
      [new THREE.Vector3(0.8, serviceY, cutaway.serviceZ), new THREE.Vector3(m.wFt - 0.8, serviceY, cutaway.serviceZ)],
      C.wire,
      0.16,
    )
    const hotTrunk = tube(
      [new THREE.Vector3(1.15, serviceY + 0.55, cutaway.serviceZ + 0.38), new THREE.Vector3(m.wFt - 1.15, serviceY + 0.55, cutaway.serviceZ + 0.38)],
      C.water,
      0.13,
    )
    if (coldTrunk) grpPlumb.add(coldTrunk)
    if (hotTrunk) grpPlumb.add(hotTrunk)
    for (const ap of m.appliances) {
      if (!['SINK', 'LAV', 'TUB', 'SHWR', 'WC', 'DW'].includes(ap.label)) continue
      const t = tube(
        plumbingBranchPoints(ap, serviceY, cutaway.serviceZ).map((point) => new THREE.Vector3(point.x, point.y, point.z)),
        ap.label === 'WC' || ap.label === 'TUB' ? C.wire : C.water,
        ap.label === 'WC' ? 0.13 : 0.09,
      )
      if (t) grpPlumb.add(t)
    }
    const addServiceAsset = (id: TechnicalAssetId, x: number, y: number, z: number, scale: number, rot: [number, number, number] = [0, 0, 0]) => {
      const anchor = new THREE.Group()
      anchor.position.set(x, y, z)
      const fallback = new THREE.Mesh(new THREE.SphereGeometry(0.18), new THREE.MeshStandardMaterial({ color: C.water }))
      anchor.add(fallback)
      mountAsset(anchor, id, fallback, scale, rot)
      grpPlumb.add(anchor)
    }
    addServiceAsset('valve-shutoff', service.x, serviceY + 0.4, cutaway.serviceZ, 0.62)
    addServiceAsset('pipe-tee', m.wFt * 0.5, serviceY, cutaway.serviceZ, 0.7)
    addServiceAsset('pipe-elbow', m.wFt * 0.72, serviceY, cutaway.serviceZ, 0.7)
    addServiceAsset('floor-drain', m.wFt * 0.52, -2.85, m.hFt * 0.82, 0.8)
    const trapTarget = m.appliances.find((ap) => ['SINK', 'LAV'].includes(ap.label))
    if (trapTarget) addServiceAsset('pipe-ptrap', trapTarget.x, serviceY + 0.15, trapTarget.y, 0.65)
  }
  root.add(grpPlumb)

  /* ---- FRAMING layer ------------------------------------------------ */
  const grpStuds = new THREE.Group()
  const studMat = new THREE.MeshStandardMaterial({ color: 0xb9854f, roughness: 0.88 })
  const headerMat = new THREE.MeshStandardMaterial({ color: 0xd9a35f, roughness: 0.82 })
  for (const member of framingMembers(m)) {
    const vertical = member.kind === 'stud'
    const width = vertical ? member.width : member.width
    const height = member.height
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, member.depth), member.kind === 'header' ? headerMat : studMat)
    mesh.position.set(member.x, member.y, member.z)
    mesh.rotation.y = member.rotation
    mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.name = `${member.kind} ${member.scope}`
    grpStuds.add(mesh)
  }
  // Rough-in hardware that lives with the framing: a junction box behind
  // every device so the electrician sees box placement on the studs.
  const jboxMat = new THREE.MeshStandardMaterial({ color: 0x2f6fbe, roughness: 0.55, metalness: 0.25 })
  for (const dev of layoutPower(m, edits)) {
    const jb = new THREE.Mesh(new THREE.BoxGeometry(0.33, 0.42, 0.3), jboxMat)
    jb.position.set(dev.x, 1.35, dev.y)
    grpStuds.add(jb)
  }
  for (const dev of layoutLighting(m, edits).filter((d) => d.kind === 'switch')) {
    const jb = new THREE.Mesh(new THREE.BoxGeometry(0.33, 0.42, 0.3), jboxMat)
    jb.position.set(dev.x, 4, dev.y)
    grpStuds.add(jb)
  }
  grpStuds.visible = false
  root.add(grpStuds)

  return {
    scene,
    groups: { lights: grpLights, electrical: grpElec, plumbing: grpPlumb, framing: grpStuds },
    wallMats,
    pointLights,
    fixtureMats,
    systemMats,
    ambient,
    selectables,
    stopAsyncAssets: () => { acceptAsyncAssets = false },
  }
}

export default function Plan3DViewer({
  answers,
  pkg,
  edits,
  onChange,
  focusSheet,
  cutaway = 72,
  systemGlow = 65,
  layersOverride,
  className = '',
}: {
  answers: Answers
  pkg: ProjectPackage
  edits?: PlanEdits
  onChange?: (edits: PlanEdits) => void
  focusSheet?: SheetKind
  cutaway?: number
  systemGlow?: number
  /** External layer manager (the workspace's Layers panel) — merges on change. */
  layersOverride?: Partial<Record<Layer, boolean>>
  className?: string
}) {
  const mountRef = useRef<HTMLDivElement>(null)
  const builtRef = useRef<Built | null>(null)
  const model = useMemo(() => buildModel(answers, pkg), [answers, pkg])
  const [selected, setSelected] = useState<{ layer: EditableLayer | 'furniture'; id: string; kind: string } | null>(null)
  const [layers, setLayers] = useState<Record<Layer, boolean>>({
    lights: true,
    electrical: true,
    plumbing: false,
    framing: false,
  })

  useEffect(() => {
    if (focusSheet) setLayers(viewerLayerPreset(focusSheet))
  }, [focusSheet])

  useEffect(() => {
    if (layersOverride) setLayers((prev) => ({ ...prev, ...layersOverride }))
  }, [layersOverride])

  // Live values for the persistent pointer handlers (registered once).
  const editsRef = useRef(edits)
  editsRef.current = edits
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const smart = answers.smart === 'full' || answers.smart === 'basic'
  const [sceneVersion, setSceneVersion] = useState(0)

  // Scene graph: rebuilt when the plan changes. The renderer, camera and
  // controls in the effect below persist, so editing never resets the view.
  useEffect(() => {
    const prev = builtRef.current
    if (prev) {
      prev.stopAsyncAssets()
      prev.scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
        else mat?.dispose()
      })
    }
    builtRef.current = buildScene(model, edits, smart)
    setSceneVersion((v) => v + 1)
  }, [model, edits, smart])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const m = model

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mount.appendChild(renderer.domElement)

    const span = viewerCameraSpan(m.wFt, m.hFt)
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 400)
    camera.position.set(span * 0.72, span * 0.92, span * 0.98)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.target.set(0, -0.35, 0)
    controls.maxPolarAngle = Math.PI / 2.05
    controls.minDistance = span * 0.35
    controls.maxDistance = span * 2.2
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const hit = new THREE.Vector3()
    let drag: { object: THREE.Object3D; pointerId: number; dx: number; dy: number } | null = null
    const cast = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1)
      raycaster.setFromCamera(pointer, camera)
    }
    const onPointerDown = (event: PointerEvent) => {
      cast(event)
      const picked = raycaster.intersectObjects(builtRef.current?.selectables ?? [], false)[0]?.object
      if (!picked) return
      event.preventDefault()
      controls.enabled = false
      renderer.domElement.setPointerCapture(event.pointerId)
      const dragTarget = (picked.userData.dragTarget as THREE.Object3D | undefined) ?? picked
      drag = { object: dragTarget, pointerId: event.pointerId, dx: 0, dy: 0 }
      setSelected({ layer: picked.userData.layer, id: picked.userData.id, kind: picked.userData.kind })
    }
    const onPointerMove = (event: PointerEvent) => {
      if (!drag) return
      cast(event)
      if (!raycaster.ray.intersectPlane(plane, hit)) return
      const x = Math.max(0, Math.min(m.wFt, hit.x + m.wFt / 2))
      const y = Math.max(0, Math.min(m.hFt, hit.z + m.hFt / 2))
      drag.dx = snapPlanOffset(x - drag.object.userData.baseX)
      drag.dy = snapPlanOffset(y - drag.object.userData.baseY)
      drag.object.position.x = drag.object.userData.baseX + drag.dx + (drag.object.userData.centerX ?? 0)
      drag.object.position.z = drag.object.userData.baseY + drag.dy + (drag.object.userData.centerY ?? 0)
    }
    const onPointerUp = (event: PointerEvent) => {
      if (!drag || drag.pointerId !== event.pointerId) return
      // Deltas accumulate: the object's base position already includes prior
      // edits, so the stored offset is previous offset + this drag.
      const ud = drag.object.userData
      const prevEdits = editsRef.current ?? {}
      const prevDelta =
        ud.layer === 'furniture'
          ? prevEdits.furniture?.[ud.id]
          : prevEdits[ud.layer as 'power' | 'lighting']?.[ud.id]
      const dx = snapPlanOffset((prevDelta?.dx ?? 0) + drag.dx)
      const dy = snapPlanOffset((prevDelta?.dy ?? 0) + drag.dy)
      onChangeRef.current?.(
        ud.layer === 'furniture'
          ? patchFurnitureEdit(prevEdits, ud.id, { dx, dy })
          : patchDeviceEdit(prevEdits, ud.layer, ud.id, { dx, dy }),
      )
      drag = null
      controls.enabled = true
    }
    renderer.domElement.addEventListener('pointerdown', onPointerDown)
    renderer.domElement.addEventListener('pointermove', onPointerMove)
    renderer.domElement.addEventListener('pointerup', onPointerUp)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    controls.autoRotate = !reduced
    controls.autoRotateSpeed = 0.55
    let idleTimer: ReturnType<typeof setTimeout>
    controls.addEventListener('start', () => {
      controls.autoRotate = false
      clearTimeout(idleTimer)
    })
    controls.addEventListener('end', () => {
      idleTimer = setTimeout(() => {
        if (!reduced) controls.autoRotate = true
      }, 3000)
    })

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    ro.observe(mount)

    let raf = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      controls.update()
      const scene = builtRef.current?.scene
      if (scene) renderer.render(scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(idleTimer)
      ro.disconnect()
      controls.dispose()
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      renderer.domElement.removeEventListener('pointermove', onPointerMove)
      renderer.domElement.removeEventListener('pointerup', onPointerUp)
      const current = builtRef.current
      if (current) {
        current.stopAsyncAssets()
        current.scene.traverse((obj) => {
          const mesh = obj as THREE.Mesh
          if (mesh.geometry) mesh.geometry.dispose()
          const mat = mesh.material as THREE.Material | THREE.Material[] | undefined
          if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
          else mat?.dispose()
        })
        builtRef.current = null
      }
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [model])

  // Layer visibility side effects.
  useEffect(() => {
    const b = builtRef.current
    if (!b) return
    b.groups.lights.visible = layers.lights
    // Framing is a rough-in view: the wires, boxes and pipes that coordinate
    // through the structure stay visible with the studs.
    b.groups.electrical.visible = layers.electrical || layers.framing
    b.groups.plumbing.visible = layers.plumbing || layers.framing
    b.groups.framing.visible = layers.framing
    for (const pl of b.pointLights) pl.visible = layers.lights
    for (const fm of b.fixtureMats) fm.emissiveIntensity = layers.lights ? 1.2 : 0.08
    b.ambient.intensity = layers.lights ? 1.2 : 0.78
    for (const wm of b.wallMats) {
      wm.opacity = layers.framing ? 0.08 : Math.max(0.12, 1 - cutaway / 115)
      wm.needsUpdate = true
    }
    for (const material of b.systemMats) material.emissiveIntensity = 0.1 + systemGlow / 70
  }, [layers, cutaway, systemGlow, sceneVersion])

  const chips: [Layer, string][] = [
    ['lights', 'Lights on'],
    ['electrical', 'Electrical'],
    ['plumbing', 'Plumbing'],
    ['framing', 'Framing'],
  ]

  const allDevices = [...layoutPower(model, edits).map((d) => ({ ...d, layer: 'power' as const })), ...layoutLighting(model, edits).map((d) => ({ ...d, layer: 'lighting' as const }))]
  const allFurniture = layoutFurniture(model, edits)
  const selectedDevice = selected && selected.layer !== 'furniture' ? allDevices.find((d) => d.layer === selected.layer && d.id === selected.id) : undefined
  const selectedFurniture = selected?.layer === 'furniture' ? allFurniture.find((item) => item.id === selected.id) : undefined
  const updateSelected = (update: { dx?: number; dy?: number; removed?: boolean; circuit?: string }) => {
    if (!selected || selected.layer === 'furniture') return
    onChange?.(patchDeviceEdit(edits ?? {}, selected.layer, selected.id, update))
  }
  const nudge = (dx: number, dy: number) => {
    if (!selected) return
    if (selected.layer === 'furniture') {
      const current = edits?.furniture?.[selected.id]
      onChange?.(patchFurnitureEdit(edits ?? {}, selected.id, { dx: snapPlanOffset((current?.dx ?? 0) + dx), dy: snapPlanOffset((current?.dy ?? 0) + dy) }))
      return
    }
    const current = edits?.[selected.layer]?.[selected.id]
    updateSelected({ dx: snapPlanOffset((current?.dx ?? 0) + dx), dy: snapPlanOffset((current?.dy ?? 0) + dy) })
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mountRef} className="absolute inset-0" role="img" aria-label="3D model of your project" />
      <div className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-wrap justify-center gap-2">
        {chips.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setLayers((s) => ({ ...s, [id]: !s[id] }))}
            className={`pointer-events-auto rounded-lg border px-3 py-1.5 text-xs font-500 transition ${
              layers[id] ? 'border-build bg-build text-ink' : 'border-line bg-panel/90 text-muted hover:text-mist'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="pointer-events-none absolute left-3 top-3 rounded-md bg-panel/80 px-2 py-1 text-[10px] text-muted">
        drag empty space to orbit · select and drag furniture, fixtures, or devices
      </div>
      {selected && selectedDevice && (
        <div className="absolute right-3 top-3 w-56 rounded-xl border border-cyan/40 bg-[#08111e]/95 p-3 text-xs shadow-glow backdrop-blur">
          <div className="flex items-center justify-between"><span className="font-600 capitalize text-white">{selected.kind}</span><span className="font-mono text-[9px] uppercase text-cyan">Synced object</span></div>
          <p className="mt-1 font-mono text-[10px] text-muted">X {selectedDevice.x.toFixed(2)}′ · Y {selectedDevice.y.toFixed(2)}′</p>
          <div className="mt-3 grid grid-cols-3 gap-1">
            <span /><button onClick={() => nudge(0, -0.25)} className="rounded border border-line py-1.5 text-cyan">↑</button><span />
            <button onClick={() => nudge(-0.25, 0)} className="rounded border border-line py-1.5 text-cyan">←</button><span className="grid place-items-center font-mono text-[8px] text-muted">3″</span><button onClick={() => nudge(0.25, 0)} className="rounded border border-line py-1.5 text-cyan">→</button>
            <span /><button onClick={() => nudge(0, 0.25)} className="rounded border border-line py-1.5 text-cyan">↓</button><span />
          </div>
          <label className="mt-3 block text-muted">Circuit<input value={selectedDevice.circuit ?? ''} onChange={(e) => updateSelected({ circuit: e.target.value })} className="mt-1 w-full rounded border border-line bg-ink px-2 py-1.5 text-white outline-none focus:border-cyan" /></label>
          <button onClick={() => { updateSelected({ removed: true }); setSelected(null) }} className="mt-3 w-full rounded border border-line py-2 text-muted hover:border-red-400 hover:text-red-300">Remove object</button>
        </div>
      )}
      {selected && selectedFurniture && (
        <div className="absolute right-3 top-3 w-56 rounded-xl border border-cyan/40 bg-[#08111e]/95 p-3 text-xs shadow-glow backdrop-blur">
          <div className="flex items-center justify-between"><span className="font-600 capitalize text-white">{selectedFurniture.kind.replace(/-/g, ' ')}</span><span className="font-mono text-[9px] uppercase text-cyan">Linked object</span></div>
          <p className="mt-1 font-mono text-[10px] text-muted">X {selectedFurniture.x.toFixed(2)}′ · Y {selectedFurniture.y.toFixed(2)}′</p>
          <p className="mt-1 font-mono text-[9px] text-muted">{selectedFurniture.width.toFixed(1)}′ × {selectedFurniture.depth.toFixed(1)}′ measured footprint</p>
          <div className="mt-3 grid grid-cols-3 gap-1">
            <span /><button onClick={() => nudge(0, -0.25)} className="rounded border border-line py-1.5 text-cyan">↑</button><span />
            <button onClick={() => nudge(-0.25, 0)} className="rounded border border-line py-1.5 text-cyan">←</button><span className="grid place-items-center font-mono text-[8px] text-muted">3″</span><button onClick={() => nudge(0.25, 0)} className="rounded border border-line py-1.5 text-cyan">→</button>
            <span /><button onClick={() => nudge(0, 0.25)} className="rounded border border-line py-1.5 text-cyan">↓</button><span />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1"><button onClick={() => onChange?.(patchFurnitureEdit(edits ?? {}, selected.id, { rotation: (selectedFurniture.rotation ?? 0) - Math.PI / 12 }))} className="rounded border border-line py-2 text-cyan">↺ 15°</button><button onClick={() => onChange?.(patchFurnitureEdit(edits ?? {}, selected.id, { rotation: (selectedFurniture.rotation ?? 0) + Math.PI / 12 }))} className="rounded border border-line py-2 text-cyan">15° ↻</button></div>
          <button onClick={() => { onChange?.(patchFurnitureEdit(edits ?? {}, selected.id, { removed: true })); setSelected(null) }} className="mt-3 w-full rounded border border-line py-2 text-muted hover:border-red-400 hover:text-red-300">Remove object</button>
        </div>
      )}
    </div>
  )
}

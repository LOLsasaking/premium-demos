import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import type { Answers, ProjectPackage } from '../interview/engine'
import { buildModel, layoutLighting, layoutPower, type PlanEdits, type PlanModel } from '../lib/drawing'

/**
 * 3D model of the generated project — the same PlanModel and device layouts
 * that draw the 2D sheets, extruded into an orbitable three.js scene: walls
 * with door gaps and glass, counters and fixtures, recessed lights, wiring
 * and plumbing runs, and a framing layer that fades the drywall away.
 */

type Layer = 'lights' | 'electrical' | 'plumbing' | 'framing'

const C = {
  bg: 0x0a0f1c,
  floor: 0x131c30,
  wall: 0x223252,
  edge: 0x4a68a8,
  counter: 0x1c2a47,
  fixture: 0x2c3d61,
  glass: 0x3b82f6,
  wire: 0x3b82f6,
  water: 0x22d3ee,
  light: 0xf59e0b,
  stud: 0x8da0bf,
}
const WALL_H = 8

interface Built {
  scene: THREE.Scene
  groups: Record<Layer, THREE.Group>
  wallMats: THREE.MeshStandardMaterial[]
  pointLights: THREE.PointLight[]
  fixtureMats: THREE.MeshStandardMaterial[]
  ambient: THREE.AmbientLight
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

function buildScene(m: PlanModel, edits: PlanEdits | undefined): Built {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(C.bg)
  scene.fog = new THREE.Fog(C.bg, 70, 160)

  const root = new THREE.Group()
  root.position.set(-m.wFt / 2, 0, -m.hFt / 2)
  scene.add(root)

  const ambient = new THREE.AmbientLight(0xbfd2f0, 0.5)
  const hemi = new THREE.HemisphereLight(0x3b82f6, 0x0a0f1c, 0.35)
  const key = new THREE.DirectionalLight(0x9db8e8, 0.55)
  key.position.set(30, 45, 25)
  scene.add(ambient, hemi, key)

  const wallMats: THREE.MeshStandardMaterial[] = []
  const wallMat = () => {
    const mat = new THREE.MeshStandardMaterial({ color: C.wall, roughness: 0.85, transparent: true, opacity: 0.96 })
    wallMats.push(mat)
    return mat
  }
  const counterMat = new THREE.MeshStandardMaterial({ color: C.counter, roughness: 0.6 })
  const fixtureMat = new THREE.MeshStandardMaterial({ color: C.fixture, roughness: 0.5 })

  // Floor + grid.
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(m.wFt, 0.25, m.hFt),
    new THREE.MeshStandardMaterial({ color: C.floor, roughness: 0.9 }),
  )
  floor.position.set(m.wFt / 2, -0.125, m.hFt / 2)
  root.add(floor)
  const grid = new THREE.GridHelper(Math.max(m.wFt, m.hFt) * 1.7, Math.round(Math.max(m.wFt, m.hFt) / 2), 0x24304a, 0x18233c)
  grid.position.set(m.wFt / 2, -0.26, m.hFt / 2)
  root.add(grid)

  // Exterior shell (front-door gap on its wall).
  const ext = wallMat()
  const fd = m.door
  const T = 0.4
  wallWithGaps(root, ext, 0, 0, m.wFt, 0, T, fd.wall === 'N' ? [{ pos: fd.pos, width: fd.width }] : [])
  wallWithGaps(root, ext, 0, m.hFt, m.wFt, m.hFt, T, fd.wall === 'S' ? [{ pos: fd.pos, width: fd.width }] : [])
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

  // Counters, island, appliances & fixtures.
  const box = (x: number, z: number, w: number, d: number, h: number, mat: THREE.Material, y = 0) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
    mesh.position.set(x + w / 2, y + h / 2, z + d / 2)
    root.add(mesh)
    return mesh
  }
  for (const ct of m.counters) box(ct.x, ct.y, ct.w, ct.h, 3, counterMat)
  if (m.island) {
    const isl = box(m.island.x, m.island.y, m.island.w, m.island.h, 3, counterMat)
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(isl.geometry),
      new THREE.LineBasicMaterial({ color: C.edge }),
    )
    edges.position.copy(isl.position)
    root.add(edges)
  }
  for (const ap of m.appliances) {
    if (ap.label === 'REF') box(ap.x - 1.2, ap.y - 1.2, 2.4, 2.4, 6, fixtureMat)
    else if (ap.label === 'WH') {
      const wh = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 4.6, 16), fixtureMat)
      wh.position.set(ap.x, 2.3, ap.y)
      root.add(wh)
    } else if (ap.label === 'TUB') box(ap.x - 1.35, ap.y - 0.7, 2.7, 1.4, 1.6, fixtureMat)
    else if (ap.label === 'WC') {
      const wc = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.42, 1.4, 12), fixtureMat)
      wc.position.set(ap.x, 0.7, ap.y + 0.3)
      root.add(wc)
      box(ap.x - 0.65, ap.y - 0.55, 1.3, 0.5, 2.4, fixtureMat)
    } else if (ap.label === 'LAV') box(ap.x - 0.65, ap.y - 0.5, 1.3, 1, 2.8, fixtureMat)
  }

  /* ---- LIGHTS layer ------------------------------------------------ */
  const lightDevs = layoutLighting(m, edits)
  const grpLights = new THREE.Group()
  const fixtureMats: THREE.MeshStandardMaterial[] = []
  const pointLights: THREE.PointLight[] = []
  const cans = lightDevs.filter((d) => d.kind === 'can' || d.kind === 'pendant')
  cans.forEach((d, i) => {
    const emat = new THREE.MeshStandardMaterial({ color: 0xffe9c0, emissive: C.light, emissiveIntensity: 1.2 })
    fixtureMats.push(emat)
    if (d.kind === 'pendant') {
      const cord = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 1.8, 6),
        new THREE.MeshBasicMaterial({ color: C.edge }),
      )
      cord.position.set(d.x, WALL_H - 0.9, d.y)
      grpLights.add(cord)
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.32, 14, 12), emat)
      bulb.position.set(d.x, WALL_H - 1.9, d.y)
      grpLights.add(bulb)
    } else {
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.1, 14), emat)
      disc.position.set(d.x, WALL_H - 0.06, d.y)
      grpLights.add(disc)
    }
    // Budget the real lights (forward renderer): at most 6 point lights.
    if (i % Math.ceil(cans.length / 6) === 0) {
      const pl = new THREE.PointLight(0xffd9a0, 14, 26, 1.8)
      pl.position.set(d.x, WALL_H - 1.6, d.y)
      pointLights.push(pl)
      grpLights.add(pl)
    }
  })
  root.add(grpLights)

  /* ---- ELECTRICAL layer -------------------------------------------- */
  const powerDevs = layoutPower(m, edits)
  const grpElec = new THREE.Group()
  const outletMat = new THREE.MeshStandardMaterial({ color: C.wire, emissive: C.wire, emissiveIntensity: 0.5 })
  for (const d of powerDevs) {
    const o = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.42, 0.32), outletMat)
    o.position.set(d.x, 1.3, d.y)
    grpElec.add(o)
  }
  const tube = (pts: THREE.Vector3[], color: number, radius: number) => {
    if (pts.length < 2) return null
    const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.08)
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, Math.max(24, pts.length * 10), radius, 7, false),
      new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.7, roughness: 0.45 }),
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
  const wh = m.appliances.find((ap) => ap.label === 'WH')
  if (wh && m.hasPlumbing) {
    for (const ap of m.appliances) {
      if (!['SINK', 'LAV', 'TUB', 'WC', 'DW'].includes(ap.label)) continue
      const t = tube(
        [new THREE.Vector3(wh.x, 0.4, wh.y), new THREE.Vector3((wh.x + ap.x) / 2, 0.35, (wh.y + ap.y) / 2), new THREE.Vector3(ap.x, 0.5, ap.y)],
        C.water,
        0.07,
      )
      if (t) grpPlumb.add(t)
    }
  }
  root.add(grpPlumb)

  /* ---- FRAMING layer ------------------------------------------------ */
  const grpStuds = new THREE.Group()
  const studMat = new THREE.MeshStandardMaterial({ color: C.stud, roughness: 0.8 })
  const studWall = (x1: number, z1: number, x2: number, z2: number) => {
    const len = Math.hypot(x2 - x1, z2 - z1)
    const ux = (x2 - x1) / len
    const uz = (z2 - z1) / len
    for (let f = 16 / 12; f < len; f += 16 / 12) {
      const s = new THREE.Mesh(new THREE.BoxGeometry(0.13, WALL_H - 0.4, 0.3), studMat)
      s.position.set(x1 + ux * f, WALL_H / 2, z1 + uz * f)
      s.rotation.y = -Math.atan2(uz, ux)
      grpStuds.add(s)
    }
  }
  studWall(0, 0, m.wFt, 0)
  studWall(0, m.hFt, m.wFt, m.hFt)
  studWall(0, 0, 0, m.hFt)
  studWall(m.wFt, 0, m.wFt, m.hFt)
  grpStuds.visible = false
  root.add(grpStuds)

  return {
    scene,
    groups: { lights: grpLights, electrical: grpElec, plumbing: grpPlumb, framing: grpStuds },
    wallMats,
    pointLights,
    fixtureMats,
    ambient,
  }
}

export default function Plan3DViewer({
  answers,
  pkg,
  edits,
  className = '',
}: {
  answers: Answers
  pkg: ProjectPackage
  edits?: PlanEdits
  className?: string
}) {
  const mountRef = useRef<HTMLDivElement>(null)
  const builtRef = useRef<Built | null>(null)
  const [layers, setLayers] = useState<Record<Layer, boolean>>({
    lights: true,
    electrical: true,
    plumbing: false,
    framing: false,
  })

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const m = buildModel(answers, pkg)
    const built = buildScene(m, edits)
    builtRef.current = built

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const span = Math.max(m.wFt, m.hFt)
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 400)
    camera.position.set(span * 0.75, span * 0.62, span * 0.95)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.target.set(0, 1.5, 0)
    controls.maxPolarAngle = Math.PI / 2.05
    controls.minDistance = span * 0.35
    controls.maxDistance = span * 2.2
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
      renderer.render(built.scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(idleTimer)
      ro.disconnect()
      controls.dispose()
      built.scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
        else mat?.dispose()
      })
      renderer.dispose()
      mount.removeChild(renderer.domElement)
      builtRef.current = null
    }
  }, [answers, pkg, edits])

  // Layer visibility side effects.
  useEffect(() => {
    const b = builtRef.current
    if (!b) return
    b.groups.lights.visible = layers.lights
    b.groups.electrical.visible = layers.electrical
    b.groups.plumbing.visible = layers.plumbing
    b.groups.framing.visible = layers.framing
    for (const pl of b.pointLights) pl.visible = layers.lights
    for (const fm of b.fixtureMats) fm.emissiveIntensity = layers.lights ? 1.2 : 0.08
    b.ambient.intensity = layers.lights ? 0.5 : 0.3
    for (const wm of b.wallMats) {
      wm.opacity = layers.framing ? 0.13 : 0.96
      wm.needsUpdate = true
    }
  }, [layers])

  const chips: [Layer, string][] = [
    ['lights', 'Lights on'],
    ['electrical', 'Electrical'],
    ['plumbing', 'Plumbing'],
    ['framing', 'Framing'],
  ]

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
        drag to orbit · scroll to zoom
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

/* ------------------------------------------------------------------ */
/* Model                                                               */
/* ------------------------------------------------------------------ */

export type TwinLayer = 'lights' | 'electrical' | 'plumbing' | 'framing'

interface BoxSpec {
  /** center x (ft) */ x: number
  /** center z (ft) */ z: number
  /** size along x (ft) */ w: number
  /** size along z (ft) */ d: number
  /** height (ft) */ h: number
}

export interface RoomModel {
  /** interior width, east–west, ft */
  widthFt: number
  /** interior depth, north–south, ft */
  depthFt: number
  wallHeightFt: number
  counters: BoxSpec[]
  island: BoxSpec
  /** where the plumbing surfaces (sink on the west counter) */
  sink: { x: number; z: number }
}

/** Default kitchen: 19ft x 14ft, 8ft walls, L-counter (west + south), island. */
const KITCHEN: RoomModel = {
  widthFt: 19,
  depthFt: 14,
  wallHeightFt: 8,
  counters: [
    // West run: 2ft deep, full 14ft length, tight to the west wall
    { x: -8.5, z: 0, w: 2, d: 14, h: 3 },
    // South run: 2ft deep, 10ft long, tight to the south wall
    { x: -4.5, z: 6, w: 10, d: 2, h: 3 },
  ],
  island: { x: 0.25, z: 0, w: 6.5, d: 3.5, h: 3 },
  sink: { x: -8.5, z: -2 },
}

const COLOR = {
  bg: 0x0a0f1c,
  panel: 0x111827,
  panel2: 0x161f31,
  line: 0x24304a,
  wall: 0x1b2740,
  edge: 0x3f5a8f,
  blueprint: 0x3b82f6,
  amber: 0xf59e0b,
  cyan: 0x22d3ee,
  stud: 0x8da0bf,
  warmLight: 0xffd9a0,
} as const

const WALL_T = 0.5 // wall thickness, ft

/* ------------------------------------------------------------------ */
/* Scene construction                                                  */
/* ------------------------------------------------------------------ */

interface TwinScene {
  scene: THREE.Scene
  layerGroups: Record<TwinLayer, THREE.Group>
  ambient: THREE.AmbientLight
  hemi: THREE.HemisphereLight
  wallMat: THREE.MeshStandardMaterial
  /** emissive fixture materials (can discs + pendant bulbs) */
  fixtureMats: THREE.MeshStandardMaterial[]
  pointLights: THREE.PointLight[]
}

function boxWithEdges(
  size: [number, number, number],
  pos: [number, number, number],
  mat: THREE.Material,
  edgeColor: number
): THREE.Group {
  const g = new THREE.Group()
  const geo = new THREE.BoxGeometry(...size)
  const mesh = new THREE.Mesh(geo, mat)
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo),
    new THREE.LineBasicMaterial({ color: edgeColor, transparent: true, opacity: 0.85 })
  )
  g.add(mesh, edges)
  g.position.set(...pos)
  return g
}

function tube(points: THREE.Vector3[], radius: number, color: number, emissive = 0.8): THREE.Mesh {
  const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.15)
  const geo = new THREE.TubeGeometry(curve, 96, radius, 8, false)
  const mat = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: emissive,
    roughness: 0.4,
  })
  return new THREE.Mesh(geo, mat)
}

/** Builds the full digital-twin scene for a room model. */
function buildTwinScene(model: RoomModel): TwinScene {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(COLOR.bg)
  scene.fog = new THREE.Fog(COLOR.bg, 45, 95)

  const halfW = model.widthFt / 2
  const halfD = model.depthFt / 2
  const H = model.wallHeightFt

  /* --- base lighting --------------------------------------------- */
  const ambient = new THREE.AmbientLight(0xbfd2f0, 0.45)
  const hemi = new THREE.HemisphereLight(0x3b82f6, 0x0a0f1c, 0.35)
  const key = new THREE.DirectionalLight(0x9db8e8, 0.5)
  key.position.set(20, 26, 14)
  scene.add(ambient, hemi, key)

  /* --- floor + grid ----------------------------------------------- */
  const floorMat = new THREE.MeshStandardMaterial({
    color: COLOR.panel,
    roughness: 0.85,
    metalness: 0.1,
    transparent: true,
    opacity: 0.9,
  })
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(model.widthFt, model.depthFt), floorMat)
  floor.rotation.x = -Math.PI / 2
  scene.add(floor)

  const grid = new THREE.GridHelper(34, 34, COLOR.line, 0x18233a)
  grid.position.y = 0.02
  const gridMat = grid.material as THREE.Material
  gridMat.transparent = true
  gridMat.opacity = 0.55
  scene.add(grid)

  /* --- walls (N, W, S — east open toward camera) ------------------ */
  const wallMat = new THREE.MeshStandardMaterial({
    color: COLOR.wall,
    roughness: 0.9,
    transparent: true,
    opacity: 0.92,
    side: THREE.DoubleSide,
  })
  const wallEdge = (size: [number, number, number], pos: [number, number, number]) =>
    boxWithEdges(size, pos, wallMat, COLOR.edge)

  const westWall = wallEdge([WALL_T, H, model.depthFt + WALL_T * 2], [-halfW - WALL_T / 2, H / 2, 0])
  const northWall = wallEdge([model.widthFt + WALL_T * 2, H, WALL_T], [0, H / 2, -halfD - WALL_T / 2])
  const southWall = wallEdge([model.widthFt + WALL_T * 2, H, WALL_T], [0, H / 2, halfD + WALL_T / 2])
  scene.add(westWall, northWall, southWall)

  /* --- counters + island ------------------------------------------ */
  const counterMat = new THREE.MeshStandardMaterial({
    color: COLOR.panel2,
    roughness: 0.6,
    metalness: 0.15,
  })
  for (const c of [...model.counters, model.island]) {
    scene.add(boxWithEdges([c.w, c.h, c.d], [c.x, c.h / 2, c.z], counterMat, COLOR.stud))
  }

  /* --- LIGHTS layer ------------------------------------------------ */
  const lightsGroup = new THREE.Group()
  const fixtureMats: THREE.MeshStandardMaterial[] = []
  const pointLights: THREE.PointLight[] = []

  // 6 recessed cans on an invisible ceiling plane
  const canMat = new THREE.MeshStandardMaterial({
    color: 0x0e1422,
    emissive: COLOR.amber,
    emissiveIntensity: 2.2,
  })
  fixtureMats.push(canMat)
  const canGeo = new THREE.CircleGeometry(0.42, 24)
  for (const cx of [-6, 0, 6]) {
    for (const cz of [-3.5, 3.5]) {
      const disc = new THREE.Mesh(canGeo, canMat)
      disc.rotation.x = Math.PI / 2 // face down
      disc.position.set(cx, H - 0.05, cz)
      scene.add(disc)

      const pl = new THREE.PointLight(COLOR.warmLight, 26, 22, 2)
      pl.position.set(cx, H - 0.7, cz)
      pointLights.push(pl)
      lightsGroup.add(pl)
    }
  }

  // 2 pendants over the island
  const bulbMat = new THREE.MeshStandardMaterial({
    color: 0x2a2413,
    emissive: COLOR.amber,
    emissiveIntensity: 2.6,
  })
  fixtureMats.push(bulbMat)
  const cordMat = new THREE.MeshStandardMaterial({ color: COLOR.line, roughness: 0.7 })
  for (const px of [model.island.x - 1.6, model.island.x + 1.6]) {
    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.6, 8), cordMat)
    cord.position.set(px, H - 0.8, model.island.z)
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 16), bulbMat)
    bulb.position.set(px, H - 1.75, model.island.z)
    scene.add(cord, bulb)

    const pl = new THREE.PointLight(COLOR.warmLight, 18, 16, 2)
    pl.position.set(px, H - 1.95, model.island.z)
    pointLights.push(pl)
    lightsGroup.add(pl)
  }
  scene.add(lightsGroup)

  /* --- ELECTRICAL layer -------------------------------------------- */
  const electrical = new THREE.Group()
  const wireY = 1.5
  const wx = -halfW - WALL_T / 2 // west wall centerline
  const nz = -halfD - WALL_T / 2 // north wall centerline
  const sz = halfD + WALL_T / 2 // south wall centerline

  // Run 1: up the west wall, around the NW corner, along the north wall
  electrical.add(
    tube(
      [
        new THREE.Vector3(wx, wireY, 4.5),
        new THREE.Vector3(wx, wireY, 0),
        new THREE.Vector3(wx, wireY, nz + 0.6),
        new THREE.Vector3(wx + 0.6, wireY, nz),
        new THREE.Vector3(-3, wireY, nz),
        new THREE.Vector3(4, wireY, nz),
        new THREE.Vector3(halfW - 0.5, wireY, nz),
      ],
      0.09,
      COLOR.blueprint,
      0.7
    )
  )
  // Run 2: SW corner along the south wall
  electrical.add(
    tube(
      [
        new THREE.Vector3(wx, wireY, 4.5),
        new THREE.Vector3(wx, wireY, sz - 0.6),
        new THREE.Vector3(wx + 0.6, wireY, sz),
        new THREE.Vector3(-2, wireY, sz),
        new THREE.Vector3(5, wireY, sz),
        new THREE.Vector3(halfW - 0.5, wireY, sz),
      ],
      0.09,
      COLOR.blueprint,
      0.7
    )
  )

  // Outlets on inner wall faces
  const outletMat = new THREE.MeshStandardMaterial({
    color: COLOR.blueprint,
    emissive: COLOR.blueprint,
    emissiveIntensity: 0.35,
    roughness: 0.5,
  })
  const outletW = new THREE.BoxGeometry(0.12, 0.5, 0.35) // west wall orientation
  const outletNS = new THREE.BoxGeometry(0.35, 0.5, 0.12) // north/south orientation
  const outlets: Array<[THREE.BoxGeometry, number, number]> = [
    [outletW, -halfW + 0.06, 2],
    [outletW, -halfW + 0.06, -4],
  ]
  for (const [geo, x, z] of outlets) {
    const m = new THREE.Mesh(geo, outletMat)
    m.position.set(x, 1.25, z)
    electrical.add(m)
  }
  for (const [x, z] of [
    [-3, -halfD + 0.06],
    [4, -halfD + 0.06],
    [-2, halfD - 0.06],
    [6, halfD - 0.06],
  ]) {
    const m = new THREE.Mesh(outletNS, outletMat)
    m.position.set(x, 1.25, z)
    electrical.add(m)
  }
  scene.add(electrical)

  /* --- PLUMBING layer ----------------------------------------------- */
  const plumbing = new THREE.Group()

  // Water heater in the SE corner
  const heaterMat = new THREE.MeshStandardMaterial({
    color: 0x1e3a4f,
    roughness: 0.45,
    metalness: 0.35,
  })
  const heater = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 3.6, 24), heaterMat)
  const heaterPos = new THREE.Vector3(halfW - 1.3, 1.8, halfD - 1.4)
  heater.position.copy(heaterPos)
  const heaterRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.92, 0.035, 8, 32),
    new THREE.MeshStandardMaterial({ color: COLOR.cyan, emissive: COLOR.cyan, emissiveIntensity: 0.9 })
  )
  heaterRing.rotation.x = Math.PI / 2
  heaterRing.position.set(heaterPos.x, 3.2, heaterPos.z)
  plumbing.add(heater, heaterRing)

  // Supply lines: from the heater, under the floor, rising to the sink
  const sinkX = model.sink.x
  const sinkZ = model.sink.z
  const supply = (offset: number) =>
    tube(
      [
        new THREE.Vector3(heaterPos.x + offset, 0.5, heaterPos.z),
        new THREE.Vector3(heaterPos.x + offset, -0.7, heaterPos.z - 1),
        new THREE.Vector3(3, -0.85, 2 + offset * 4),
        new THREE.Vector3(-4, -0.85, sinkZ + offset * 4),
        new THREE.Vector3(sinkX - offset, -0.6, sinkZ + offset * 3),
        new THREE.Vector3(sinkX - offset, 1.2, sinkZ + offset * 3),
        new THREE.Vector3(sinkX - offset, 2.9, sinkZ + offset * 3),
      ],
      0.1,
      COLOR.cyan,
      0.85
    )
  plumbing.add(supply(0.12), supply(-0.12))

  // Sink basin hint on the west counter
  const basin = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.18, 1.8),
    new THREE.MeshStandardMaterial({ color: 0x0d3b46, emissive: COLOR.cyan, emissiveIntensity: 0.25 })
  )
  basin.position.set(sinkX, 3.05, sinkZ)
  plumbing.add(basin)
  scene.add(plumbing)

  /* --- FRAMING layer ------------------------------------------------ */
  const framing = new THREE.Group()
  const studMat = new THREE.MeshStandardMaterial({ color: COLOR.stud, roughness: 0.8 })
  const spacing = 16 / 12 // 16" o.c.
  const studW = 1.5 / 12 // 2x6: 1.5" wide
  const studD = 5.5 / 12 // 5.5" deep
  const studH = H - 0.1

  // West wall studs run along z
  const studWGeo = new THREE.BoxGeometry(studD, studH, studW)
  for (let z = -halfD; z <= halfD + 0.01; z += spacing) {
    const s = new THREE.Mesh(studWGeo, studMat)
    s.position.set(wx, studH / 2, z)
    framing.add(s)
  }
  // North + south wall studs run along x
  const studNSGeo = new THREE.BoxGeometry(studW, studH, studD)
  for (let x = -halfW; x <= halfW + 0.01; x += spacing) {
    for (const z of [nz, sz]) {
      const s = new THREE.Mesh(studNSGeo, studMat)
      s.position.set(x, studH / 2, z)
      framing.add(s)
    }
  }
  scene.add(framing)

  return {
    scene,
    layerGroups: { lights: lightsGroup, electrical, plumbing, framing },
    ambient,
    hemi,
    wallMat,
    fixtureMats,
    pointLights,
  }
}

/** Applies layer visibility plus lighting / wall-opacity side effects. */
function applyLayers(ts: TwinScene, on: Record<TwinLayer, boolean>): void {
  ts.layerGroups.electrical.visible = on.electrical
  ts.layerGroups.plumbing.visible = on.plumbing
  ts.layerGroups.framing.visible = on.framing

  // Lights: toggle the point lights and fixture glow, and dim the ambience
  ts.layerGroups.lights.visible = on.lights
  for (const pl of ts.pointLights) pl.visible = on.lights
  for (const m of ts.fixtureMats) m.emissiveIntensity = on.lights ? 2.4 : 0.06
  ts.ambient.intensity = on.lights ? 0.45 : 0.07
  ts.hemi.intensity = on.lights ? 0.35 : 0.1

  // Framing: walls go nearly transparent so the studs read
  ts.wallMat.opacity = on.framing ? 0.12 : 0.92
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

const LAYER_META: { id: TwinLayer; label: string; color: string }[] = [
  { id: 'lights', label: 'Lights on', color: '#F59E0B' },
  { id: 'electrical', label: 'Electrical routing', color: '#3B82F6' },
  { id: 'plumbing', label: 'Plumbing', color: '#22D3EE' },
  { id: 'framing', label: 'Framing', color: '#8DA0BF' },
]

export default function TwinViewer({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const twinRef = useRef<TwinScene | null>(null)
  const [layers, setLayers] = useState<Record<TwinLayer, boolean>>({
    lights: true,
    electrical: true,
    plumbing: false,
    framing: false,
  })

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const twin = buildTwinScene(KITCHEN)
    twinRef.current = twin

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200)
    camera.position.set(26, 14, 13)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor(COLOR.bg, 1)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.inset = '0'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    mount.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 2.5, 0)
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    controls.autoRotate = !reducedMotion
    controls.autoRotateSpeed = 0.5
    controls.minDistance = 14
    controls.maxDistance = 48
    controls.minPolarAngle = 0.2
    controls.maxPolarAngle = Math.PI / 2 - 0.06 // never below the floor
    controls.enablePan = false

    // Pause auto-rotate while interacting; resume after 3s idle
    let idleTimer: number | undefined
    const onStart = () => {
      controls.autoRotate = false
      if (idleTimer !== undefined) window.clearTimeout(idleTimer)
    }
    const onEnd = () => {
      if (idleTimer !== undefined) window.clearTimeout(idleTimer)
      if (!reducedMotion) {
        idleTimer = window.setTimeout(() => {
          controls.autoRotate = true
        }, 3000)
      }
    }
    controls.addEventListener('start', onStart)
    controls.addEventListener('end', onEnd)

    const resize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (w === 0 || h === 0) return
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(mount)

    let raf = 0
    const animate = () => {
      raf = window.requestAnimationFrame(animate)
      controls.update()
      renderer.render(twin.scene, camera)
    }
    animate()

    return () => {
      window.cancelAnimationFrame(raf)
      if (idleTimer !== undefined) window.clearTimeout(idleTimer)
      observer.disconnect()
      controls.removeEventListener('start', onStart)
      controls.removeEventListener('end', onEnd)
      controls.dispose()
      twin.scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
          obj.geometry.dispose()
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
          for (const m of mats) m.dispose()
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
      twinRef.current = null
    }
  }, [])

  useEffect(() => {
    if (twinRef.current) applyLayers(twinRef.current, layers)
  }, [layers])

  const toggle = (l: TwinLayer) => setLayers((s) => ({ ...s, [l]: !s[l] }))

  return (
    <div className={`relative ${className}`}>
      <div ref={mountRef} className="absolute inset-0" aria-label="Interactive 3D kitchen digital twin" role="img" />
      <div className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-wrap justify-center gap-2">
        {LAYER_META.map((t) => (
          <button
            key={t.id}
            onClick={() => toggle(t.id)}
            aria-pressed={layers[t.id]}
            className={`pointer-events-auto rounded-lg border px-3 py-1.5 text-xs font-500 transition ${
              layers[t.id]
                ? 'border-transparent text-ink'
                : 'border-line bg-panel text-muted hover:text-mist'
            }`}
            style={layers[t.id] ? { background: t.color } : undefined}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}

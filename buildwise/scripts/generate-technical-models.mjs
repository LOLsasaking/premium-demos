import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as THREE from 'three'
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js'

// GLTFExporter targets browsers. This tiny adapter gives it the FileReader
// surface it needs while keeping model generation deterministic in Node.
globalThis.FileReader ??= class FileReader {
  result = null
  onloadend = null
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((value) => {
      this.result = value
      this.onloadend?.()
    })
  }
}

const here = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(here, '../public/models/technical')
const exporter = new GLTFExporter()

const material = (color, metalness = 0.1, roughness = 0.45, emissive = 0x000000) =>
  new THREE.MeshStandardMaterial({ color, metalness, roughness, emissive, emissiveIntensity: emissive ? 1.1 : 0 })

const M = {
  white: material(0xeaf2f7, 0.02, 0.35),
  ceramic: material(0xf8fbff, 0.02, 0.22),
  dark: material(0x172235, 0.22, 0.28),
  metal: material(0x9cacbc, 0.82, 0.2),
  brass: material(0xc69343, 0.72, 0.22),
  copper: material(0xb7653b, 0.7, 0.25),
  blue: material(0x3478ff, 0.34, 0.28, 0x0b2e78),
  cyan: material(0x22d3ee, 0.25, 0.25, 0x075c68),
  glass: new THREE.MeshPhysicalMaterial({ color: 0xfff2c8, transmission: 0.65, transparent: true, opacity: 0.82, roughness: 0.08, thickness: 0.12, emissive: 0xffc663, emissiveIntensity: 0.35 }),
  led: material(0x7eeaff, 0.05, 0.18, 0x22d3ee),
  black: material(0x090d14, 0.18, 0.35),
  concrete: material(0x8793a0, 0.02, 0.88),
}

const group = (name) => {
  const g = new THREE.Group()
  g.name = name
  return g
}
const mesh = (g, geometry, mat, pos = [0, 0, 0], rot = [0, 0, 0], name = '') => {
  const m = new THREE.Mesh(geometry, mat)
  m.position.set(...pos)
  m.rotation.set(...rot)
  m.name = name
  g.add(m)
  return m
}
const box = (g, size, mat, pos, rot, name) => mesh(g, new THREE.BoxGeometry(...size), mat, pos, rot, name)
const cyl = (g, radius, height, mat, pos, rot = [0, 0, 0], segments = 24, name = '') =>
  mesh(g, new THREE.CylinderGeometry(radius, radius, height, segments), mat, pos, rot, name)
const torus = (g, radius, tube, arc, mat, pos, rot = [0, 0, 0], name = '') =>
  mesh(g, new THREE.TorusGeometry(radius, tube, 12, 32, arc), mat, pos, rot, name)

function a19(smart = false) {
  const g = group(smart ? 'Smart A19 bulb' : 'A19 bulb')
  mesh(g, new THREE.SphereGeometry(0.45, 24, 18), M.glass, [0, 0.55, 0], [0, 0, 0], 'glass bulb')
  cyl(g, 0.27, 0.48, smart ? M.white : M.metal, [0, 0.08, 0])
  for (let y = -0.2; y > -0.66; y -= 0.1) torus(g, 0.22, 0.035, Math.PI * 2, M.metal, [0, y, 0], [Math.PI / 2, 0, 0])
  cyl(g, 0.2, 0.45, M.metal, [0, -0.43, 0])
  if (smart) torus(g, 0.31, 0.035, Math.PI * 2, M.led, [0, 0.22, 0], [Math.PI / 2, 0, 0], 'status ring')
  return g
}

function outlet(smart = false) {
  const g = group(smart ? 'Smart duplex outlet' : 'Duplex outlet')
  box(g, [0.9, 1.45, 0.12], M.white, [0, 0, 0])
  for (const y of [-0.36, 0.34]) {
    box(g, [0.58, 0.48, 0.08], M.ceramic, [0, y, -0.1])
    box(g, [0.06, 0.17, 0.06], M.black, [-0.13, y + 0.06, -0.17])
    box(g, [0.06, 0.17, 0.06], M.black, [0.13, y + 0.06, -0.17])
    cyl(g, 0.065, 0.05, M.black, [0, y - 0.13, -0.17], [Math.PI / 2, 0, 0], 16)
  }
  if (smart) {
    torus(g, 0.12, 0.025, Math.PI * 2, M.led, [0, 0.64, -0.1], [Math.PI / 2, 0, 0])
    cyl(g, 0.055, 0.05, M.dark, [0, 0.64, -0.17], [Math.PI / 2, 0, 0], 16)
  }
  return g
}

function plug() {
  const g = group('Grounded plug')
  box(g, [0.68, 0.74, 0.38], M.dark, [0, 0.15, 0])
  box(g, [0.1, 0.45, 0.08], M.metal, [-0.16, -0.42, 0])
  box(g, [0.1, 0.45, 0.08], M.metal, [0.16, -0.42, 0])
  cyl(g, 0.065, 0.42, M.metal, [0, -0.42, 0.11], [0, 0, 0], 16)
  cyl(g, 0.11, 0.75, M.black, [0, 0.86, 0], [0, 0, 0], 18, 'cord')
  return g
}

function wallSwitch(smart = false) {
  const g = group(smart ? 'Smart switch' : 'Rocker switch')
  box(g, [0.86, 1.55, 0.12], M.white, [0, 0, 0])
  if (smart) {
    box(g, [0.58, 0.96, 0.1], M.dark, [0, 0.1, -0.11])
    torus(g, 0.13, 0.024, Math.PI * 2, M.led, [0, 0.22, -0.18], [Math.PI / 2, 0, 0])
    cyl(g, 0.035, 0.05, M.led, [0, -0.35, -0.18], [Math.PI / 2, 0, 0], 12)
  } else {
    box(g, [0.48, 0.92, 0.2], M.ceramic, [0, 0, -0.12], [-0.12, 0, 0])
  }
  return g
}

function junctionBox() {
  const g = group('Junction box')
  box(g, [1.4, 1.4, 0.55], M.metal, [0, 0, 0])
  box(g, [1.2, 1.2, 0.08], M.dark, [0, 0, -0.32])
  for (const x of [-0.42, 0, 0.42]) cyl(g, 0.12, 0.08, M.metal, [x, 0, -0.38], [Math.PI / 2, 0, 0], 18)
  return g
}

function panel() {
  const g = group('Electrical panel')
  box(g, [2.2, 3.2, 0.48], M.metal, [0, 0, 0])
  box(g, [1.95, 2.92, 0.1], M.dark, [0, 0, -0.3])
  for (let row = 0; row < 7; row++) for (const x of [-0.47, 0.47]) {
    box(g, [0.7, 0.24, 0.14], M.white, [x, 1.02 - row * 0.34, -0.39])
    box(g, [0.12, 0.12, 0.08], row < 2 ? M.blue : M.black, [x + (x < 0 ? 0.19 : -0.19), 1.02 - row * 0.34, -0.5])
  }
  box(g, [1.4, 0.3, 0.08], M.white, [0, 1.35, -0.39])
  return g
}

function pipeStraight() {
  const g = group('Straight service pipe')
  cyl(g, 0.18, 2.5, M.cyan, [0, 0, 0], [0, 0, Math.PI / 2], 24)
  for (const x of [-1.1, 1.1]) torus(g, 0.19, 0.045, Math.PI * 2, M.blue, [x, 0, 0], [Math.PI / 2, 0, 0])
  return g
}

function pipeElbow() {
  const g = group('Ninety degree pipe elbow')
  torus(g, 0.72, 0.18, Math.PI / 2, M.cyan, [0, 0, 0], [Math.PI / 2, 0, 0])
  cyl(g, 0.18, 0.7, M.cyan, [0.72, 0.35, 0], [0, 0, 0])
  cyl(g, 0.18, 0.7, M.cyan, [0.35, 0.72, 0], [0, 0, Math.PI / 2])
  return g
}

function pipeTee() {
  const g = group('Pipe tee')
  cyl(g, 0.18, 2.2, M.blue, [0, 0, 0], [0, 0, Math.PI / 2])
  cyl(g, 0.18, 1.25, M.blue, [0, 0.62, 0])
  torus(g, 0.22, 0.045, Math.PI * 2, M.cyan, [0, 0.18, 0], [Math.PI / 2, 0, 0])
  return g
}

function pTrap() {
  const g = group('P-trap')
  torus(g, 0.58, 0.15, Math.PI * 1.55, M.cyan, [0, 0, 0], [Math.PI / 2, 0, -0.28])
  cyl(g, 0.15, 0.95, M.cyan, [-0.48, 0.54, 0], [0, 0, 0])
  cyl(g, 0.15, 0.85, M.cyan, [0.77, 0.27, 0], [0, 0, Math.PI / 2])
  return g
}

function valve() {
  const g = group('Shutoff valve')
  cyl(g, 0.18, 1.8, M.blue, [0, 0, 0], [0, 0, Math.PI / 2])
  cyl(g, 0.34, 0.5, M.brass, [0, 0, 0], [0, 0, Math.PI / 2])
  cyl(g, 0.09, 0.7, M.brass, [0, 0.55, 0])
  torus(g, 0.42, 0.075, Math.PI * 2, M.blue, [0, 0.92, 0], [Math.PI / 2, 0, 0])
  for (let i = 0; i < 4; i++) box(g, [0.08, 0.72, 0.07], M.blue, [0, 0.92, 0], [0, 0, i * Math.PI / 2])
  return g
}

function floorDrain() {
  const g = group('Floor drain')
  cyl(g, 0.58, 0.12, M.metal, [0, 0, 0], [0, 0, 0], 28)
  for (let i = -4; i <= 4; i++) box(g, [0.07, 0.05, 0.88], M.dark, [i * 0.11, -0.08, 0])
  return g
}

function recessed() {
  const g = group('Recessed light')
  cyl(g, 0.48, 0.35, M.dark, [0, 0, 0], [0, 0, 0], 28)
  torus(g, 0.48, 0.07, Math.PI * 2, M.white, [0, -0.2, 0], [Math.PI / 2, 0, 0])
  cyl(g, 0.32, 0.06, M.glass, [0, -0.22, 0], [0, 0, 0], 28)
  return g
}

function pendant() {
  const g = group('Pendant light')
  cyl(g, 0.06, 1.4, M.dark, [0, 0.8, 0])
  cyl(g, 0.32, 0.12, M.dark, [0, 1.52, 0], [0, 0, 0], 24)
  mesh(g, new THREE.ConeGeometry(0.68, 0.72, 28, 1, true), M.dark, [0, -0.06, 0], [0, 0, 0], 'shade')
  const bulb = a19(false)
  bulb.scale.setScalar(0.55)
  bulb.position.y = -0.32
  g.add(bulb)
  return g
}

const assets = {
  'bulb-a19': () => a19(false),
  'bulb-smart': () => a19(true),
  'outlet-duplex': () => outlet(false),
  'outlet-smart': () => outlet(true),
  'plug-grounded': plug,
  'switch-rocker': () => wallSwitch(false),
  'switch-smart': () => wallSwitch(true),
  'junction-box': junctionBox,
  panel,
  'pipe-straight': pipeStraight,
  'pipe-elbow': pipeElbow,
  'pipe-tee': pipeTee,
  'pipe-ptrap': pTrap,
  'valve-shutoff': valve,
  'floor-drain': floorDrain,
  'light-recessed': recessed,
  'light-pendant': pendant,
}

await mkdir(outDir, { recursive: true })
const manifest = { generated: new Date().toISOString(), license: 'Original Cadvora asset kit — project use permitted', totalBytes: 0, assets: {} }
for (const [id, make] of Object.entries(assets)) {
  const scene = make()
  scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true
      obj.receiveShadow = true
    }
  })
  const data = await exporter.parseAsync(scene, { binary: true, onlyVisible: true })
  const bytes = Buffer.from(data)
  const file = `${id}.glb`
  await writeFile(resolve(outDir, file), bytes)
  manifest.assets[id] = { file, bytes: bytes.byteLength }
  manifest.totalBytes += bytes.byteLength
}
await writeFile(resolve(outDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
await writeFile(resolve(outDir, 'ASSET_LICENSES.md'), `# Cadvora technical model kit\n\nThese GLB files were generated from original geometry authored for the Cadvora project. They are not redistributed third-party models.\n\nGenerated by \`scripts/generate-technical-models.mjs\`.\n`)

console.log(`Generated ${Object.keys(assets).length} GLB assets (${manifest.totalBytes.toLocaleString()} bytes).`)

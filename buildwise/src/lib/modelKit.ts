import * as THREE from 'three'
import type { PlanEdits, PlanModel, Room } from './drawing'

export type ModelKind =
  | 'bed'
  | 'sofa'
  | 'coffee-table'
  | 'dining-table'
  | 'base-cabinet'
  | 'sink-base'
  | 'range'
  | 'refrigerator'
  | 'island'
  | 'vanity'
  | 'toilet'
  | 'tub'
  | 'shower'
  | 'garage-storage'

export interface ModelPlacement {
  id: string
  kind: ModelKind
  x: number
  y: number
  width: number
  depth: number
  rotation?: number
}

type PlacementDraft = Omit<ModelPlacement, 'id'>

export interface ModelMaterials {
  wood: THREE.MeshStandardMaterial
  fabric: THREE.MeshStandardMaterial
  fabricLight: THREE.MeshStandardMaterial
  cabinet: THREE.MeshStandardMaterial
  counter: THREE.MeshStandardMaterial
  metal: THREE.MeshStandardMaterial
  white: THREE.MeshStandardMaterial
  dark: THREE.MeshStandardMaterial
  glass: THREE.MeshStandardMaterial
}

const inside = (room: Room, kind: ModelKind, x: number, y: number, width: number, depth: number, rotation = 0): PlacementDraft => ({
  kind,
  x: Math.max(room.x + 0.35, Math.min(x, room.x + room.w - width - 0.35)),
  y: Math.max(room.y + 0.35, Math.min(y, room.y + room.h - depth - 0.35)),
  width: Math.min(width, room.w - 0.7),
  depth: Math.min(depth, room.h - 0.7),
  rotation,
})

export function planRoomModels(model: PlanModel): ModelPlacement[] {
  const out: PlacementDraft[] = []
  const finish = (placements: PlacementDraft[]) => placements.map((placement, index) => ({ ...placement, id: `${placement.kind}-${index + 1}` }))
  if (!model.rooms) {
    if (model.isKitchen) {
      out.push(
        { kind: 'base-cabinet', x: 0.1, y: 0.6, width: 1.8, depth: Math.max(2, model.hFt * 0.3) },
        { kind: 'sink-base', x: 0.1, y: Math.max(2.8, model.hFt * 0.31), width: 1.8, depth: 3 },
        { kind: 'base-cabinet', x: 2.1, y: model.hFt - 1.9, width: Math.max(2, model.wFt * 0.24), depth: 1.8 },
        { kind: 'range', x: Math.max(2.4, model.wFt * 0.42), y: model.hFt - 2.35, width: 2.5, depth: 2.1 },
        { kind: 'refrigerator', x: model.wFt - 3.1, y: model.hFt - 2.8, width: 2.6, depth: 2.5 },
      )
      if (model.island) out.push({ kind: 'island', x: model.island.x, y: model.island.y, width: model.island.w, depth: model.island.h })
    } else if (model.appliances.some((appliance) => appliance.label === 'SHWR')) {
      const shower = model.appliances.find((appliance) => appliance.label === 'SHWR')!
      const toilet = model.appliances.find((appliance) => appliance.label === 'WC')!
      out.push(
        { kind: 'shower', x: shower.x - (shower.w ?? 3) / 2, y: shower.y - (shower.h ?? 3) / 2, width: shower.w ?? 3, depth: shower.h ?? 3 },
        { kind: 'toilet', x: toilet.x - 0.85, y: toilet.y - 1.1, width: 1.7, depth: 2.2 },
        { kind: 'vanity', x: model.wFt - 2.2, y: 0.35, width: 1.85, depth: 3.1 },
      )
    }
    return finish(out.map((p) => ({ ...p, x: Math.max(0, Math.min(p.x, model.wFt - p.width)), y: Math.max(0, Math.min(p.y, model.hFt - p.depth)) })))
  }

  for (const room of model.rooms) {
    const cx = room.x + room.w / 2
    const cy = room.y + room.h / 2
    if (room.type === 'bed') {
      out.push(inside(room, 'bed', cx - 2.5, cy - 3.2, 5, 6.4))
    } else if (room.type === 'living') {
      out.push(inside(room, 'sofa', room.x + 0.7, cy - 1.5, Math.min(6.5, room.w * 0.48), 3))
      out.push(inside(room, 'coffee-table', cx - 1.8, cy - 1, 3.6, 2))
      out.push(inside(room, 'dining-table', room.x + room.w - 6.2, cy - 2.3, 5.3, 4.6))
    } else if (room.type === 'kitchen') {
      out.push(inside(room, 'base-cabinet', room.x + 0.4, room.y + room.h - 2, room.w * 0.35, 1.6))
      out.push(inside(room, 'sink-base', room.x + room.w * 0.37, room.y + room.h - 2, 3, 1.6))
      out.push(inside(room, 'range', room.x + room.w * 0.65, room.y + room.h - 2.35, 2.5, 2.1))
      out.push(inside(room, 'refrigerator', room.x + room.w - 3.1, room.y + 0.5, 2.6, 2.5))
      if (room.w > 10 && room.h > 8) out.push(inside(room, 'island', cx - 2.5, cy - 1.5, 5, 3))
    } else if (room.type === 'bath' || room.type === 'powder') {
      out.push(inside(room, 'vanity', room.x + room.w - 3.2, room.y + 0.45, 2.7, 1.6))
      out.push(inside(room, 'toilet', room.x + 0.55, room.y + room.h - 2.5, 1.7, 2.1))
      if (room.type === 'bath' && room.w > 6) out.push(inside(room, 'shower', cx - 1.5, room.y + room.h - 3.4, 3, 3))
    } else if (room.type === 'garage') {
      out.push(inside(room, 'garage-storage', room.x + 0.45, room.y + 0.45, Math.min(6, room.w - 1), 1.5))
    }
  }
  return finish(out)
}

/** Insertable furniture catalog — real footprints, grouped for the UI. */
export interface CatalogItem {
  label: string
  kind: ModelKind
  width: number
  depth: number
  group: 'beds' | 'seating' | 'tables' | 'storage'
}

export const FURNITURE_CATALOG: CatalogItem[] = [
  { label: 'Twin bed', kind: 'bed', width: 3.25, depth: 6.25, group: 'beds' },
  { label: 'Full bed', kind: 'bed', width: 4.5, depth: 6.25, group: 'beds' },
  { label: 'Queen bed', kind: 'bed', width: 5, depth: 6.67, group: 'beds' },
  { label: 'King bed', kind: 'bed', width: 6.33, depth: 6.67, group: 'beds' },
  { label: 'Cal-King bed', kind: 'bed', width: 6, depth: 7, group: 'beds' },
  { label: 'Sofa', kind: 'sofa', width: 6.5, depth: 3, group: 'seating' },
  { label: 'Armchair', kind: 'sofa', width: 3, depth: 2.8, group: 'seating' },
  { label: 'Dining table', kind: 'dining-table', width: 5.3, depth: 4.6, group: 'tables' },
  { label: 'Coffee table', kind: 'coffee-table', width: 3.6, depth: 2, group: 'tables' },
  { label: 'Dresser', kind: 'base-cabinet', width: 5, depth: 1.7, group: 'storage' },
  { label: 'Nightstand', kind: 'base-cabinet', width: 1.8, depth: 1.5, group: 'storage' },
]

export const BED_SIZES = FURNITURE_CATALOG.filter((item) => item.group === 'beds')

export function layoutFurniture(model: PlanModel, edits?: PlanEdits): ModelPlacement[] {
  const added: ModelPlacement[] = (edits?.furnitureAdditions ?? []).map((f) => ({
    id: f.id,
    kind: f.kind as ModelKind,
    x: f.x,
    y: f.y,
    width: f.width,
    depth: f.depth,
    rotation: f.rotation ?? 0,
  }))
  return [...planRoomModels(model), ...added]
    .filter((placement) => !edits?.furniture?.[placement.id]?.removed)
    .map((placement) => {
      const edit = edits?.furniture?.[placement.id]
      if (!edit) return placement
      return {
        ...placement,
        x: Math.max(0, Math.min(model.wFt - placement.width, placement.x + (edit.dx ?? 0))),
        y: Math.max(0, Math.min(model.hFt - placement.depth, placement.y + (edit.dy ?? 0))),
        rotation: edit.rotation ?? placement.rotation ?? 0,
      }
    })
}

export interface FramingMember {
  id: string
  kind: 'stud' | 'plate' | 'header' | 'joist' | 'blocking'
  scope: 'exterior' | 'interior' | 'floor'
  x: number
  y: number
  z: number
  length: number
  height: number
  width: number
  depth: number
  rotation: number
}

export function framingMembers(model: PlanModel): FramingMember[] {
  const members: FramingMember[] = []
  let n = 0
  const add = (member: Omit<FramingMember, 'id'>) => members.push({ ...member, id: `${member.kind}-${++n}` })
  const wall = (x1: number, z1: number, x2: number, z2: number, scope: 'exterior' | 'interior') => {
    const length = Math.hypot(x2 - x1, z2 - z1)
    if (length < 0.5) return
    const rotation = -Math.atan2(z2 - z1, x2 - x1)
    const cx = (x1 + x2) / 2
    const cz = (z1 + z2) / 2
    const depth = scope === 'exterior' ? 0.35 : 0.25
    add({ kind: 'plate', scope, x: cx, y: 0.08, z: cz, length, height: 0.16, width: length, depth, rotation })
    add({ kind: 'plate', scope, x: cx, y: 7.02, z: cz, length, height: 0.28, width: length, depth, rotation })
    const count = Math.ceil(length / (16 / 12))
    for (let i = 0; i <= count; i++) {
      const f = Math.min(length, i * (length / count))
      const t = f / length
      add({ kind: 'stud', scope, x: x1 + (x2 - x1) * t, y: 3.55, z: z1 + (z2 - z1) * t, length: 6.8, height: 6.8, width: 0.14, depth, rotation })
    }
    if (scope === 'exterior' && length > 6) {
      add({ kind: 'blocking', scope, x: cx, y: 3.6, z: cz, length, height: 0.14, width: length, depth, rotation })
    }
  }
  wall(0, 0, model.wFt, 0, 'exterior')
  wall(0, model.hFt, model.wFt, model.hFt, 'exterior')
  wall(0, 0, 0, model.hFt, 'exterior')
  wall(model.wFt, 0, model.wFt, model.hFt, 'exterior')
  const seen = new Set<string>()
  for (const room of model.rooms ?? []) {
    if (room.type === 'hall') continue
    const runs: [number, number, number, number][] = [
      [room.x, room.y, room.x + room.w, room.y],
      [room.x, room.y + room.h, room.x + room.w, room.y + room.h],
      [room.x, room.y, room.x, room.y + room.h],
      [room.x + room.w, room.y, room.x + room.w, room.y + room.h],
    ]
    for (const run of runs) {
      const key = [...run].map((v) => v.toFixed(2)).join(':')
      const reverse = [run[2], run[3], run[0], run[1]].map((v) => v.toFixed(2)).join(':')
      if (seen.has(key) || seen.has(reverse)) continue
      seen.add(key)
      wall(...run, 'interior')
    }
    if (room.door) {
      const horizontal = room.door.wall === 'N' || room.door.wall === 'S'
      const x = horizontal ? room.x + room.door.pos + room.door.width / 2 : room.door.wall === 'W' ? room.x : room.x + room.w
      const z = horizontal ? (room.door.wall === 'N' ? room.y : room.y + room.h) : room.y + room.door.pos + room.door.width / 2
      add({ kind: 'header', scope: 'interior', x, y: 6.85, z, length: room.door.width, height: 0.45, width: room.door.width, depth: 0.3, rotation: horizontal ? 0 : Math.PI / 2 })
    }
  }
  const joistCount = Math.ceil(model.hFt / (16 / 12))
  for (let i = 0; i <= joistCount; i++) {
    const z = Math.min(model.hFt, i * (model.hFt / joistCount))
    add({ kind: 'joist', scope: 'floor', x: model.wFt / 2, y: -0.55, z, length: model.wFt, height: 0.72, width: model.wFt, depth: 0.16, rotation: 0 })
  }
  return members
}

export function createModelMaterials(): ModelMaterials {
  return {
    wood: new THREE.MeshStandardMaterial({ color: 0x8b6846, roughness: 0.72 }),
    fabric: new THREE.MeshStandardMaterial({ color: 0x6f7f91, roughness: 0.92 }),
    fabricLight: new THREE.MeshStandardMaterial({ color: 0xdbe3ea, roughness: 0.9 }),
    cabinet: new THREE.MeshStandardMaterial({ color: 0xc8b79f, roughness: 0.62 }),
    counter: new THREE.MeshStandardMaterial({ color: 0xd9dde2, roughness: 0.34 }),
    metal: new THREE.MeshStandardMaterial({ color: 0x8b97a6, metalness: 0.65, roughness: 0.28 }),
    white: new THREE.MeshStandardMaterial({ color: 0xe8edf1, roughness: 0.42 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x202733, roughness: 0.4 }),
    glass: new THREE.MeshStandardMaterial({ color: 0x8edcff, transparent: true, opacity: 0.35, roughness: 0.12 }),
  }
}

function box(group: THREE.Group, material: THREE.Material, x: number, y: number, z: number, w: number, h: number, d: number, radius = 0) {
  const geometry = radius > 0 ? new THREE.CapsuleGeometry(Math.min(w, d) * radius, Math.max(0.1, h - Math.min(w, d) * radius * 2), 4, 10) : new THREE.BoxGeometry(w, h, d)
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(x, y, z)
  group.add(mesh)
  return mesh
}

function cabinetRun(group: THREE.Group, m: ModelMaterials, width: number, depth: number, sink = false) {
  box(group, m.cabinet, width / 2, 1.45, depth / 2, width, 2.9, depth)
  box(group, m.counter, width / 2, 2.98, depth / 2, width + 0.12, 0.16, depth + 0.12)
  const doors = Math.max(1, Math.round(width / 1.6))
  for (let i = 0; i < doors; i++) {
    const dw = width / doors - 0.08
    box(group, m.fabricLight, dw / 2 + i * width / doors + 0.04, 1.38, depth + 0.02, dw, 2.45, 0.05)
    box(group, m.metal, (i + 0.5) * width / doors, 1.55, depth + 0.07, 0.06, 0.42, 0.06)
  }
  if (sink) {
    box(group, m.dark, width / 2, 3.06, depth / 2, Math.min(1.8, width * 0.6), 0.05, depth * 0.62)
    const faucet = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.05, 8, 18, Math.PI), m.metal)
    faucet.rotation.x = Math.PI / 2
    faucet.position.set(width / 2, 3.45, depth * 0.2)
    group.add(faucet)
  }
}

export function buildDetailedModel(kind: ModelKind, m: ModelMaterials, width = 4, depth = 3): THREE.Group {
  const g = new THREE.Group()
  if (kind === 'base-cabinet' || kind === 'sink-base') cabinetRun(g, m, width, depth, kind === 'sink-base')
  else if (kind === 'island') {
    cabinetRun(g, m, width, depth)
    for (let i = 0; i < Math.max(2, Math.floor(width / 2)); i++) {
      const x = ((i + 1) * width) / (Math.max(2, Math.floor(width / 2)) + 1)
      box(g, m.dark, x, 1.15, -0.65, 0.7, 0.16, 0.7)
      box(g, m.metal, x, 0.55, -0.65, 0.08, 1.1, 0.08)
    }
  } else if (kind === 'bed') {
    box(g, m.wood, width / 2, 0.45, depth / 2, width, 0.7, depth)
    box(g, m.fabricLight, width / 2, 0.92, depth / 2, width - 0.2, 0.35, depth - 0.35)
    box(g, m.wood, width / 2, 2.2, 0.12, width, 3.1, 0.22)
    box(g, m.white, width * 0.28, 1.28, 0.9, width * 0.38, 0.22, 1.1, 0.35)
    box(g, m.white, width * 0.72, 1.28, 0.9, width * 0.38, 0.22, 1.1, 0.35)
  } else if (kind === 'sofa') {
    box(g, m.fabric, width / 2, 0.62, depth / 2, width, 0.8, depth - 0.5)
    box(g, m.fabric, width / 2, 1.45, 0.28, width, 1.45, 0.45)
    box(g, m.fabric, 0.25, 1.05, depth / 2, 0.5, 1.25, depth)
    box(g, m.fabric, width - 0.25, 1.05, depth / 2, 0.5, 1.25, depth)
    for (let i = 0; i < 3; i++) box(g, m.fabricLight, width * (0.2 + i * 0.3), 1.25, 0.72, width * 0.24, 0.7, 0.38, 0.2)
  } else if (kind === 'coffee-table' || kind === 'dining-table') {
    const tableH = kind === 'coffee-table' ? 1.4 : 2.6
    box(g, m.wood, width / 2, tableH, depth / 2, width, 0.18, depth)
    for (const x of [0.25, width - 0.25]) for (const z of [0.25, depth - 0.25]) box(g, m.dark, x, tableH / 2, z, 0.12, tableH, 0.12)
    if (kind === 'dining-table') {
      for (const [x, z] of [[width * 0.25, -0.45], [width * 0.75, -0.45], [width * 0.25, depth + 0.45], [width * 0.75, depth + 0.45]]) {
        box(g, m.fabric, x, 1.35, z, 0.75, 0.18, 0.75)
        box(g, m.wood, x, 0.65, z, 0.1, 1.3, 0.1)
        box(g, m.fabric, x, 2, z + (z < 0 ? -0.25 : 0.25), 0.75, 1.3, 0.15)
      }
    }
  } else if (kind === 'refrigerator') {
    box(g, m.metal, width / 2, 3.1, depth / 2, width, 6.2, depth)
    box(g, m.dark, width / 2, 3.7, depth + 0.03, 0.04, 4.4, 0.08)
    box(g, m.dark, width * 0.42, 3.6, depth + 0.08, 0.07, 2.2, 0.07)
    box(g, m.dark, width * 0.58, 3.6, depth + 0.08, 0.07, 2.2, 0.07)
  } else if (kind === 'range') {
    box(g, m.dark, width / 2, 1.5, depth / 2, width, 3, depth)
    box(g, m.metal, width / 2, 3.03, depth / 2, width, 0.12, depth)
    for (const x of [width * 0.28, width * 0.72]) for (const z of [depth * 0.28, depth * 0.72]) {
      const burner = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.035, 7, 18), m.dark)
      burner.rotation.x = Math.PI / 2
      burner.position.set(x, 3.12, z)
      g.add(burner)
    }
    box(g, m.glass, width / 2, 1.45, depth + 0.04, width * 0.72, 1.25, 0.06)
  } else if (kind === 'vanity') cabinetRun(g, m, width, depth, true)
  else if (kind === 'toilet') {
    const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.65, 18, 12), m.white)
    bowl.scale.set(1, 0.55, 1.35)
    bowl.position.set(width / 2, 0.72, depth * 0.62)
    g.add(bowl)
    box(g, m.white, width / 2, 1.45, 0.35, width * 0.86, 1.55, 0.62)
  } else if (kind === 'tub') {
    const outer = new THREE.Mesh(new THREE.BoxGeometry(width, 1.6, depth), m.white)
    outer.position.set(width / 2, 0.8, depth / 2)
    g.add(outer)
    box(g, m.dark, width / 2, 1.65, depth / 2, width - 0.45, 0.08, depth - 0.45)
  } else if (kind === 'shower') {
    box(g, m.white, width / 2, 0.1, depth / 2, width, 0.2, depth)
    box(g, m.dark, width / 2, 0.24, depth / 2, width - 0.2, 0.08, depth - 0.2)
    box(g, m.glass, 0.04, 3.2, depth / 2, 0.08, 6.2, depth)
    box(g, m.glass, width / 2, 3.2, 0.04, width, 6.2, 0.08)
    const riser = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 4.1, 10), m.metal)
    riser.position.set(width * 0.18, 3.25, depth * 0.12)
    g.add(riser)
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.08, 18), m.metal)
    head.rotation.z = Math.PI / 2
    head.position.set(width * 0.38, 5.2, depth * 0.12)
    g.add(head)
    const drain = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.04, 18), m.metal)
    drain.position.set(width / 2, 0.25, depth / 2)
    g.add(drain)
  } else if (kind === 'garage-storage') {
    box(g, m.dark, width / 2, 3.2, depth / 2, width, 6.4, depth)
    for (let y = 1.2; y < 6; y += 1.4) box(g, m.metal, width / 2, y, depth + 0.05, width - 0.2, 0.06, 0.1)
  }
  return g
}

export function disposeModelMaterials(materials: ModelMaterials) {
  Object.values(materials).forEach((material) => material.dispose())
}

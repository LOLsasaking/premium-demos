/**
 * Electrical plan sheet generator.
 *
 * Produces professional-looking plan sheets modeled on real residential
 * electrical drawings:
 *
 *   E-1 POWER    — receptacles (duplex + GFCI per NEC 210.52), dedicated
 *                  appliance outlets, dash-dot circuit runs drawn as curved
 *                  arcs between devices.
 *   E-2 LIGHTING — recessed cans, pendants, under-cabinet lights, S/S3
 *                  switches with curved switch legs, dimmer note.
 *
 * Both sheets share one deterministic PlanModel built from the interview
 * answers (kitchen gets an L-counter + island layout; other projects get a
 * generic room). When an uploaded floor-plan image was analyzed, its aspect
 * ratio (stashed in answers._aspect) shapes the room; when the Claude vision
 * backend returns real geometry the same model fields are filled from it.
 *
 * Three render themes:
 *   'blueprint' — the app's dark navy/blue look
 *   'autocad'   — classic AutoCAD model space (black, white/cyan/yellow layers)
 *   'paper'     — white print sheet (used by the exported package)
 *
 * Output is an SVG string so the app and the export share one renderer.
 */

import { AREA_SQFT, type Answers, type ProjectPackage } from '../interview/engine'

export type SheetTheme = 'blueprint' | 'autocad' | 'paper'

export type SheetKind = 'construction' | 'power' | 'lighting' | 'plumbing' | 'hvac' | 'framing'

export interface Sheet {
  id: SheetKind
  no: string
  name: string
  svg: string
}

const SHEET_META: Record<SheetKind, { no: string; name: string }> = {
  construction: { no: 'C-1', name: 'CONSTRUCTION PLAN' },
  power: { no: 'E-1', name: 'POWER PLAN' },
  lighting: { no: 'E-2', name: 'LIGHTING PLAN' },
  plumbing: { no: 'P-1', name: 'PLUMBING PLAN' },
  hvac: { no: 'M-1', name: 'MECHANICAL PLAN' },
  framing: { no: 'S-1', name: 'FRAMING PLAN' },
}

interface Palette {
  bg: string
  wall: string
  device: string // power symbols
  light: string // lighting symbols
  lightFill: string // fixture fill (lighting sheets)
  circuit: string // power circuit runs
  leg: string // switch legs
  text: string
  dim: string // dimension lines / secondary
  title: string
}

const PALETTES: Record<SheetTheme, Palette> = {
  blueprint: {
    bg: '#0B1220',
    wall: '#5B9BFF',
    device: '#8FC1FF',
    light: '#F59E0B',
    lightFill: 'rgba(245,158,11,.28)',
    circuit: '#8DA0BF',
    leg: '#22D3EE',
    text: '#E6EDF7',
    dim: '#8DA0BF',
    title: '#5B9BFF',
  },
  autocad: {
    bg: '#000000',
    wall: '#FFFFFF',
    device: '#00FFFF',
    light: '#FFFF00',
    lightFill: 'rgba(255,255,0,.22)',
    circuit: '#FF5555',
    leg: '#00FF7F',
    text: '#FFFFFF',
    dim: '#9A9A9A',
    title: '#FFFFFF',
  },
  paper: {
    bg: '#FFFFFF',
    wall: '#111111',
    device: '#111111',
    light: '#8a6d00',
    lightFill: '#F5D90A',
    circuit: '#333333',
    leg: '#555555',
    text: '#111111',
    dim: '#777777',
    title: '#111111',
  },
}

/* ------------------------------------------------------------------ */
/* Plan model                                                          */
/* ------------------------------------------------------------------ */

interface Pt {
  x: number
  y: number
}
export type Wall = 'N' | 'S' | 'E' | 'W'

export type RoomType = 'bed' | 'bath' | 'powder' | 'kitchen' | 'living' | 'garage' | 'hall'

export interface Room {
  x: number
  y: number
  w: number
  h: number
  label: string
  type: RoomType
  /** interior door: wall + ft along that wall (room-local) */
  door?: { wall: Wall; pos: number; width: number }
  window?: { wall: Wall; pos: number; width: number }
}

export interface PlanModel {
  wFt: number
  hFt: number
  isKitchen: boolean
  counters: { x: number; y: number; w: number; h: number }[] // ft
  island: { x: number; y: number; w: number; h: number } | null
  door: { wall: Wall; pos: number; width: number } // pos = ft along wall
  window: { wall: Wall; pos: number; width: number }
  appliances: { x: number; y: number; label: string; w?: number; h?: number }[]
  hasPlumbing: boolean
  hasEV: boolean
  /** Whole-house mode: the room program (ground-up builds). */
  rooms?: Room[]
  floors?: number
}

export function buildModel(a: Answers, pkg: ProjectPackage): PlanModel {
  if (a.project === 'newbuild') return buildHouseModel(a, pkg)
  const sqft = AREA_SQFT[a.area] ?? 275
  // Aspect from analyzed upload when present, else ~4:3.
  const aspect = clamp(parseFloat(a._aspect ?? '') || 4 / 3, 0.8, 2.0)
  let wFt = Math.max(10, Math.round(Math.sqrt(sqft * aspect)))
  let hFt = Math.max(9, Math.round(sqft / wFt))

  const isKitchen = a.project === 'kitchen'
  const isBathroom = a.project === 'bathroom'
  if (isBathroom) {
    const dimensions: Record<string, [number, number]> = { s: [8, 6], m: [10, 8], l: [12, 9], xl: [14, 10] }
    ;[wFt, hFt] = dimensions[a.area] ?? dimensions.m
  }
  const counters: PlanModel['counters'] = []
  let island: PlanModel['island'] = null
  const appliances: PlanModel['appliances'] = []

  if (isKitchen) {
    // L-shaped counter: full west wall + south wall run. 2 ft deep.
    counters.push({ x: 0, y: 0, w: 2, h: hFt })
    counters.push({ x: 2, y: hFt - 2, w: wFt * 0.55, h: 2 })
    // Island centered-ish.
    const iw = Math.min(6.5, wFt * 0.34)
    const ih = 3.5
    island = { x: wFt / 2 - iw / 2 + 1, y: hFt / 2 - ih / 2 - 1, w: iw, h: ih }
    // Appliances (ft coordinates = symbol centers).
    appliances.push({ x: 1, y: hFt * 0.32, label: 'SINK' })
    appliances.push({ x: 1, y: hFt * 0.32 + 2.6, label: 'DW' })
    appliances.push({ x: island.x + island.w * 0.5, y: island.y + island.h * 0.45, label: 'CT' })
    appliances.push({ x: island.x + island.w * 0.22, y: island.y + island.h * 0.5, label: 'MICRO' })
    appliances.push({ x: wFt - 3, y: hFt - 3.2, label: 'REF' })
  } else if (isBathroom) {
    counters.push({ x: wFt - 2.2, y: 0.35, w: 1.85, h: 3.1 })
    appliances.push({ x: 1.75, y: 1.75, label: 'SHWR', w: 3, h: 3 })
    appliances.push({ x: 2, y: hFt - 1.75, label: 'WC', w: 1.7, h: 2.2 })
    appliances.push({ x: wFt - 1.3, y: 1.8, label: 'LAV', w: 2.4, h: 1.6 })
  }

  return {
    wFt,
    hFt,
    isKitchen,
    counters,
    island,
    door: { wall: 'E', pos: hFt * 0.7, width: 3 },
    window: { wall: 'W', pos: isKitchen ? hFt * 0.32 - 1.5 : hFt * 0.35, width: isBathroom ? 2.5 : 3.5 },
    appliances,
    hasPlumbing: pkg.disciplines.includes('plumbing'),
    hasEV: a.ev === 'yes' || a.ev === 'future',
  }
}

/**
 * Ground-up build: derives a full single-floor room program from the
 * whole-house interview answers (bedrooms, bathrooms, stories, garage) and
 * lays it out deterministically — bedroom wing across the top, hall, then
 * living/kitchen across the bottom, garage on the west.
 */
function buildHouseModel(a: Answers, pkg: ProjectPackage): PlanModel {
  const beds = clamp(parseInt(a.beds ?? '3', 10) || 3, 2, 5)
  const bathsTotal = parseFloat(a.baths ?? '2') || 2
  const stories = parseInt(a.stories ?? '1', 10) || 1
  const cars = clamp(parseInt(a.garage ?? '2', 10) || 0, 0, 3)

  // Floor 1 program (two-story homes push most bedrooms upstairs).
  const beds1 = stories === 2 ? Math.max(1, beds - 2) : beds
  const baths1 = stories === 2 ? Math.max(1, Math.ceil(bathsTotal) - 1) : Math.ceil(bathsTotal)
  const powder = stories === 1 && bathsTotal % 1 !== 0

  const sqft = Math.max(AREA_SQFT[a.area] ?? 1400, 520 + beds1 * 200 + baths1 * 90 + (cars ? 60 : 0))
  const aspect = clamp(parseFloat(a._aspect ?? '') || 1.55, 1.2, 2.0)
  const garW = cars ? Math.min(12 + (cars - 1) * 8, Math.sqrt(sqft * aspect) * 0.34) : 0
  const W = Math.round(Math.sqrt(sqft * aspect) + garW * 0.6)
  const H = Math.max(24, Math.round(sqft / (W - garW * 0.4)))

  const hallH = 3.5
  const topH = Math.round((H - hallH) * 0.52)
  const botY = topH + hallH
  const botH = H - botY
  const mainX = garW
  const mainW = W - garW

  const rooms: Room[] = []

  // Top band: bedrooms with baths interleaved.
  const seq: RoomType[] = []
  let bathsLeft = baths1
  for (let i = 0; i < beds1; i++) {
    seq.push('bed')
    if (bathsLeft > 0 && (i === 0 || i === 2)) {
      seq.push('bath')
      bathsLeft--
    }
  }
  while (bathsLeft-- > 0) seq.push('bath')
  const unit = (t: RoomType) => (t === 'bed' ? 1.5 : 1.0)
  const totalUnits = seq.reduce((s, t) => s + unit(t), 0)
  let cx = mainX
  let bedN = 0
  let bathN = 0
  for (const t of seq) {
    const w = (unit(t) / totalUnits) * mainW
    const label = t === 'bed' ? `BEDROOM ${++bedN}` : `BATH ${++bathN}`
    rooms.push({
      x: cx,
      y: 0,
      w,
      h: topH,
      label,
      type: t,
      door: { wall: 'S', pos: w / 2 - 1.25, width: 2.5 },
      window: t === 'bed' ? { wall: 'N', pos: w / 2 - 1.5, width: 3 } : undefined,
    })
    cx += w
  }

  // Bottom band: living (+ powder) + kitchen.
  const botUnits = 1.6 + (powder ? 0.5 : 0) + 1.25
  const livW = (1.6 / botUnits) * mainW
  const pdrW = powder ? (0.5 / botUnits) * mainW : 0
  const kitW = mainW - livW - pdrW
  rooms.push({
    x: mainX,
    y: botY,
    w: livW,
    h: botH,
    label: 'LIVING',
    type: 'living',
    door: { wall: 'N', pos: livW / 2 - 1.25, width: 2.5 },
    window: { wall: 'S', pos: livW * 0.5 - 2, width: 4 },
  })
  if (powder)
    rooms.push({
      x: mainX + livW,
      y: botY,
      w: pdrW,
      h: botH,
      label: 'PWDR',
      type: 'powder',
      door: { wall: 'N', pos: pdrW / 2 - 1, width: 2 },
    })
  const kitX = mainX + livW + pdrW
  rooms.push({
    x: kitX,
    y: botY,
    w: kitW,
    h: botH,
    label: 'KITCHEN',
    type: 'kitchen',
    door: { wall: 'N', pos: kitW / 2 - 1.25, width: 2.5 },
    window: { wall: 'S', pos: kitW / 2 - 1.5, width: 3 },
  })

  // Hall + garage.
  rooms.push({ x: mainX, y: topH, w: mainW, h: hallH, label: 'HALL', type: 'hall' })
  if (cars)
    rooms.push({
      x: 0,
      y: 0,
      w: garW,
      h: H,
      label: `${cars}-CAR GARAGE`,
      type: 'garage',
      door: { wall: 'E', pos: topH + 0.5, width: 2.5 },
    })

  // Kitchen counters + appliances, bath fixtures, water heater.
  const counters = [{ x: kitX + 0.4, y: botY + botH - 2, w: kitW - 0.8, h: 2 }]
  const appliances: PlanModel['appliances'] = [
    { x: kitX + kitW / 2, y: botY + botH - 1, label: 'SINK' },
    { x: kitX + kitW / 2 + 2.4, y: botY + botH - 1, label: 'DW' },
    { x: kitX + 2, y: botY + botH - 1.2, label: 'CT' },
    { x: kitX + kitW - 1.6, y: botY + 1.8, label: 'REF' },
  ]
  for (const r of rooms.filter((r) => r.type === 'bath' || r.type === 'powder')) {
    appliances.push({ x: r.x + 1.1, y: r.y + 1.3, label: 'WC' })
    appliances.push({ x: r.x + r.w - 1.1, y: r.y + 1.1, label: 'LAV' })
    if (r.type === 'bath' && r.w >= 5.5) appliances.push({ x: r.x + r.w / 2, y: r.y + r.h - 1.8, label: 'SHWR', w: 3, h: 3 })
  }
  appliances.push({ x: cars ? garW - 1.6 : W - 1.6, y: cars ? H - 1.6 : 1.6, label: 'WH' })

  return {
    wFt: W,
    hFt: H,
    isKitchen: false,
    counters,
    island: null,
    door: { wall: 'S', pos: mainX + livW * 0.25, width: 3 }, // front door into living
    window: { wall: 'S', pos: kitX + kitW / 2 - 1.5, width: 3 },
    appliances,
    hasPlumbing: pkg.disciplines.includes('plumbing'),
    hasEV: a.ev === 'yes' || a.ev === 'future',
    rooms,
    floors: stories,
  }
}

/* ------------------------------------------------------------------ */
/* Device layouts (ft space) — shared by the SVG sheets and DXF export */
/* ------------------------------------------------------------------ */

export interface FtPt {
  x: number
  y: number
}

/** A user edit applied to one generated device (keyed by device id). */
export interface DeviceEdit {
  dx?: number
  dy?: number
  removed?: boolean
  circuit?: string
  wetLocationRated?: boolean
}

export interface FurnitureEdit {
  dx?: number
  dy?: number
  rotation?: number
  removed?: boolean
}

export interface PlanEdits {
  power?: Record<string, DeviceEdit>
  lighting?: Record<string, DeviceEdit>
  furniture?: Record<string, FurnitureEdit>
  additions?: { power?: PowerDevice[]; lighting?: LightDevice[] }
}

export type EditableLayer = 'power' | 'lighting'

export function snapPlanOffset(value: number): number {
  return Math.round(value * 4) / 4
}

export function deviceEditOrigin<T extends FtPt & { id: string }>(baseDevices: T[], current: T): FtPt {
  const base = baseDevices.find((device) => device.id === current.id)
  return { x: base?.x ?? current.x, y: base?.y ?? current.y }
}

export function patchDeviceEdit(
  edits: PlanEdits,
  layer: EditableLayer,
  id: string,
  update: Partial<DeviceEdit>,
): PlanEdits {
  return {
    ...edits,
    [layer]: {
      ...(edits[layer] ?? {}),
      [id]: { ...edits[layer]?.[id], ...update },
    },
  }
}

export function patchFurnitureEdit(edits: PlanEdits, id: string, update: Partial<FurnitureEdit>): PlanEdits {
  return {
    ...edits,
    furniture: {
      ...(edits.furniture ?? {}),
      [id]: { ...edits.furniture?.[id], ...update },
    },
  }
}

export interface PowerDevice extends FtPt {
  id: string
  kind: 'gfci' | 'recep' | 'dedicated'
  label?: string
  circuit?: string
}

export interface LightDevice extends FtPt {
  id: string
  kind: 'can' | 'pendant' | 'uc' | 'switch'
  label?: string
  circuit?: string
  wetLocationRated?: boolean
}

export function addPlanDevice(
  edits: PlanEdits,
  layer: 'power',
  device: PowerDevice,
): PlanEdits
export function addPlanDevice(
  edits: PlanEdits,
  layer: 'lighting',
  device: LightDevice,
): PlanEdits
export function addPlanDevice(
  edits: PlanEdits,
  layer: EditableLayer,
  device: PowerDevice | LightDevice,
): PlanEdits {
  const current = layer === 'power' ? edits.additions?.power ?? [] : edits.additions?.lighting ?? []
  return {
    ...edits,
    additions: {
      ...edits.additions,
      [layer]: [...current, device],
    },
  } as PlanEdits
}

/** Applies user edits to a generated device list (ids refer to base order). */
function applyEdits<T extends { id: string; x: number; y: number; circuit?: string }>(
  devices: T[],
  edits?: Record<string, DeviceEdit>,
): T[] {
  if (!edits) return devices
  return devices
    .filter((d) => !edits[d.id]?.removed)
    .map((d) => {
      const e = edits[d.id]
      if (!e) return d
      return { ...d, x: d.x + (e.dx ?? 0), y: d.y + (e.dy ?? 0), circuit: e.circuit ?? d.circuit, ...(e.wetLocationRated === undefined ? {} : { wetLocationRated: e.wetLocationRated }) }
    })
}

/** Perimeter receptacles for one room (NEC 210.52(A): one per ≤12 ft of wall). */
function roomRecepts(r: Room): FtPt[] {
  const out: FtPt[] = []
  const inset = 0.35
  const walls: [Wall, number][] = [['N', r.w], ['S', r.w], ['W', r.h], ['E', r.h]]
  for (const [wall, len] of walls) {
    const n = Math.max(1, Math.round(len / 12))
    for (let i = 1; i <= n; i++) {
      const pos = (len * i) / (n + 1)
      if (r.door && r.door.wall === wall && pos > r.door.pos - 1 && pos < r.door.pos + r.door.width + 1) continue
      const pt = roomWallPt(r, wall, pos)
      out.push({
        x: pt.x + (wall === 'W' ? inset : wall === 'E' ? -inset : 0),
        y: pt.y + (wall === 'N' ? inset : wall === 'S' ? -inset : 0),
      })
    }
  }
  return out
}

function layoutHousePower(m: PlanModel): { gfci: FtPt[]; plain: FtPt[]; dedicated: { x: number; y: number; label: string }[] } {
  const gfci: FtPt[] = []
  const plain: FtPt[] = []
  const dedicated: { x: number; y: number; label: string }[] = []
  for (const r of m.rooms!) {
    if (r.type === 'bed' || r.type === 'living') plain.push(...roomRecepts(r))
    else if (r.type === 'bath' || r.type === 'powder') gfci.push({ x: r.x + r.w - 1.1, y: r.y + 0.45 }) // at the lav
    else if (r.type === 'kitchen') {
      // Counter GFCI per 210.52(C) plus dedicated appliance outlets.
      const n = Math.max(2, Math.ceil((r.w - 1) / 4))
      for (let i = 1; i <= n; i++) gfci.push({ x: r.x + ((r.w - 1) * i) / (n + 0.4) + 0.5, y: r.y + r.h - 2.35 })
    } else if (r.type === 'garage') {
      gfci.push({ x: r.x + 0.4, y: r.y + r.h * 0.3 }, { x: r.x + 0.4, y: r.y + r.h * 0.7 })
      if (m.hasEV) dedicated.push({ x: r.x + r.w - 0.6, y: r.y + r.h - 2, label: 'EV' })
    } else if (r.type === 'hall') plain.push({ x: r.x + r.w * 0.4, y: r.y + r.h / 2 })
  }
  for (const ap of m.appliances) {
    if (ap.label === 'CT') dedicated.push({ x: ap.x, y: ap.y - 1.4, label: '240V' })
    if (ap.label === 'DW') dedicated.push({ x: ap.x + 1.3, y: ap.y - 0.8, label: 'DW' })
    if (ap.label === 'REF') dedicated.push({ x: ap.x, y: ap.y - 1.9, label: 'REF' })
    if (ap.label === 'WH') dedicated.push({ x: ap.x, y: ap.y - 1.5, label: 'WH' })
  }
  if (!m.rooms!.some((r) => r.type === 'garage') && m.hasEV)
    dedicated.push({ x: 0.6, y: m.hFt - 1.2, label: 'EV' })
  return { gfci, plain, dedicated }
}

export function layoutPower(m: PlanModel, edits?: PlanEdits): PowerDevice[] {
  if (m.rooms) {
    const h = layoutHousePower(m)
    const devices: PowerDevice[] = [
      ...h.gfci.map((pt, i) => ({ ...pt, id: `g${i}`, kind: 'gfci' as const })),
      ...h.plain.map((pt, i) => ({ ...pt, id: `p${i}`, kind: 'recep' as const })),
      ...h.dedicated.map((d, i) => ({ x: d.x, y: d.y, id: `d${i}`, kind: 'dedicated' as const, label: d.label })),
    ]
    return applyEdits([...devices, ...(edits?.additions?.power ?? [])], edits?.power)
  }
  const gfci: FtPt[] = []
  const plain: FtPt[] = []

  if (m.isKitchen) {
    // GFCI along counter runs — NEC 210.52(C): ≤ 4 ft spacing.
    const westRun = m.hFt - 2
    const nWest = Math.max(2, Math.ceil(westRun / 4))
    for (let i = 1; i <= nWest; i++) gfci.push({ x: 2.35, y: (westRun * i) / (nWest + 0.4) })
    const southLen = m.counters[1]?.w ?? m.wFt * 0.5
    const nSouth = Math.max(2, Math.ceil(southLen / 4))
    for (let i = 1; i <= nSouth; i++) gfci.push({ x: 2 + (southLen * i) / (nSouth + 0.4), y: m.hFt - 2.35 })
    if (m.island) {
      gfci.push({ x: m.island.x - 0.35, y: m.island.y + m.island.h / 2 })
      gfci.push({ x: m.island.x + m.island.w + 0.35, y: m.island.y + m.island.h / 2 })
    }
    plain.push({ x: m.wFt * 0.3, y: 0.35 }, { x: m.wFt * 0.65, y: 0.35 }, { x: m.wFt - 0.35, y: m.hFt * 0.3 })
  } else {
    // Generic room: receptacles per 12 ft of wall (NEC 210.52(A)).
    const walls: [Wall, number][] = [['N', m.wFt], ['S', m.wFt], ['W', m.hFt], ['E', m.hFt]]
    for (const [wall, len] of walls) {
      const n = Math.max(2, Math.ceil(len / 12))
      for (let i = 1; i <= n; i++) {
        const pos = (len * i) / (n + 1)
        if (wall === m.door.wall && pos > m.door.pos - 1 && pos < m.door.pos + m.door.width + 1) continue
        const inset = 0.35
        if (wall === 'N') plain.push({ x: pos, y: inset })
        else if (wall === 'S') plain.push({ x: pos, y: m.hFt - inset })
        else if (wall === 'W') plain.push({ x: inset, y: pos })
        else plain.push({ x: m.wFt - inset, y: pos })
      }
    }
    if (m.hasPlumbing) {
      const lav = m.appliances.find((ap) => ap.label === 'LAV' || ap.label === 'SINK')
      gfci.push(lav ? { x: Math.max(0.4, lav.x - 1), y: lav.y } : { x: 1.2, y: m.window.pos + 1.5 })
    }
  }

  const dedicated: { x: number; y: number; label: string }[] = []
  for (const ap of m.appliances) {
    if (ap.label === 'SINK') dedicated.push({ x: ap.x + 1.4, y: ap.y + 1.2, label: 'GD' })
    if (ap.label === 'DW') dedicated.push({ x: ap.x + 1.4, y: ap.y, label: 'DW' })
    if (ap.label === 'CT') dedicated.push({ x: ap.x, y: ap.y - 1.3, label: '240V' })
    if (ap.label === 'REF') dedicated.push({ x: ap.x, y: ap.y - 1.8, label: 'REF' })
    if (ap.label === 'MICRO') dedicated.push({ x: ap.x, y: ap.y + 1.2, label: 'MICR' })
  }
  if (m.hasEV && !m.isKitchen) dedicated.push({ x: 0.6, y: m.hFt - 1.2, label: 'EV' })

  const devices: PowerDevice[] = [
    ...gfci.map((pt, i) => ({ ...pt, id: `g${i}`, kind: 'gfci' as const })),
    ...plain.map((pt, i) => ({ ...pt, id: `p${i}`, kind: 'recep' as const })),
    ...dedicated.map((d, i) => ({ x: d.x, y: d.y, id: `d${i}`, kind: 'dedicated' as const, label: d.label })),
  ]
  return applyEdits([...devices, ...(edits?.additions?.power ?? [])], edits?.power)
}

export function layoutLighting(m: PlanModel, edits?: PlanEdits): LightDevice[] {
  if (m.rooms) {
    const cans: FtPt[] = []
    const ucs: FtPt[] = [] // vanity/utility lights in house mode
    const switches: { x: number; y: number; label: string }[] = []
    for (const r of m.rooms) {
      const cx = r.x + r.w / 2
      const cy = r.y + r.h / 2
      if (r.type === 'bed') cans.push({ x: cx, y: cy })
      else if (r.type === 'living') cans.push({ x: cx - r.w * 0.22, y: cy }, { x: cx + r.w * 0.22, y: cy })
      else if (r.type === 'kitchen') cans.push({ x: cx - r.w * 0.2, y: cy - 0.5 }, { x: cx + r.w * 0.2, y: cy - 0.5 })
      else if (r.type === 'hall') cans.push({ x: r.x + r.w * 0.25, y: cy }, { x: r.x + r.w * 0.72, y: cy })
      else if (r.type === 'bath' || r.type === 'powder') ucs.push({ x: r.x + r.w - 1.1, y: r.y + 0.5 }) // vanity bar
      else if (r.type === 'garage') cans.push({ x: cx, y: r.y + r.h * 0.35 }, { x: cx, y: r.y + r.h * 0.7 })
      // Switch just inside each room door.
      if (r.door) {
        const d = roomWallPt(r, r.door.wall, r.door.pos + r.door.width + 0.5)
        const insetY = r.door.wall === 'S' ? -0.5 : r.door.wall === 'N' ? 0.5 : 0
        const insetX = r.door.wall === 'E' ? -0.5 : r.door.wall === 'W' ? 0.5 : 0
        switches.push({ x: d.x + insetX, y: d.y + insetY, label: r.type === 'living' || r.type === 'hall' ? 'S3' : 'S' })
      }
    }
    const devices: LightDevice[] = [
      ...cans.map((pt, i) => ({ ...pt, id: `c${i}`, kind: 'can' as const })),
      ...ucs.map((pt, i) => ({ ...pt, id: `u${i}`, kind: 'uc' as const })),
      ...switches.map((sw, i) => ({ x: sw.x, y: sw.y, id: `s${i}`, kind: 'switch' as const, label: sw.label })),
    ]
    return applyEdits([...devices, ...(edits?.additions?.lighting ?? [])], edits?.lighting)
  }
  const cans: FtPt[] = []
  const cx = m.wFt / 2
  const cy = m.hFt / 2
  const rx = m.wFt * 0.26
  const ry = m.hFt * 0.3
  const ringN = m.wFt * m.hFt > 260 ? 6 : 4
  for (let i = 0; i < ringN; i++) {
    const th = (Math.PI * 2 * i) / ringN + Math.PI / ringN
    cans.push({ x: cx + rx * Math.cos(th), y: cy + ry * Math.sin(th) })
  }

  const pendants: FtPt[] = []
  if (m.island) {
    pendants.push({ x: m.island.x + m.island.w * 0.3, y: m.island.y + m.island.h / 2 })
    pendants.push({ x: m.island.x + m.island.w * 0.72, y: m.island.y + m.island.h / 2 })
  }

  const ucs: FtPt[] = []
  if (m.isKitchen) {
    const n = Math.max(3, Math.round((m.hFt - 2) / 3))
    for (let i = 1; i <= n; i++) ucs.push({ x: 0.6, y: ((m.hFt - 2) * i) / (n + 0.5) })
  }

  const swWallX = m.door.wall === 'E' ? m.wFt - 0.45 : 0.45
  const switches = [
    { x: swWallX, y: m.door.pos + m.door.width + 0.8, label: 'S3' },
    { x: 0.8, y: m.hFt - 0.8, label: m.isKitchen ? 'S3' : 'S' },
  ]

  const devices: LightDevice[] = [
    ...cans.map((pt, i) => ({ ...pt, id: `c${i}`, kind: 'can' as const })),
    ...pendants.map((pt, i) => ({ ...pt, id: `pd${i}`, kind: 'pendant' as const })),
    ...ucs.map((pt, i) => ({ ...pt, id: `u${i}`, kind: 'uc' as const })),
    ...switches.map((sw, i) => ({ x: sw.x, y: sw.y, id: `s${i}`, kind: 'switch' as const, label: sw.label })),
  ]
  return applyEdits([...devices, ...(edits?.additions?.lighting ?? [])], edits?.lighting)
}

export function hasPlanDrawing(pkg: ProjectPackage): boolean {
  return pkg.disciplines.some(
    (d) => d === 'electrical' || d === 'plumbing' || d === 'hvac' || d === 'smart' || d === 'structural',
  )
}

/* ------------------------------------------------------------------ */
/* Sheet renderer                                                      */
/* ------------------------------------------------------------------ */

const W = 880
const H = 620
const M = 56 // plan margin

/** Sheet canvas size (viewBox units) — the editor overlays in this space. */
export const SHEET_SIZE = { w: W, h: H }

/** Plan-area transform: ft → sheet units. Shared with the interactive editor. */
export function sheetTransform(m: PlanModel): { x0: number; y0: number; s: number } {
  const planW = W - 300 // leave room for legend column
  const planH = H - 170
  return { x0: M, y0: M + 8, s: Math.min(planW / m.wFt, planH / m.hFt) }
}

interface Ctx {
  p: Palette
  s: number // px per ft
  x0: number
  y0: number
  m: PlanModel
  parts: string[]
  legend: [string, string][] // svg glyph, label
}

/** Full sheet set for the package — one professional sheet per relevant trade. */
export function generateSheetSet(
  a: Answers,
  pkg: ProjectPackage,
  theme: SheetTheme,
  edits?: PlanEdits,
): Sheet[] {
  const model = buildModel(a, pkg)
  const has = (d: string) => pkg.disciplines.includes(d as ProjectPackage['disciplines'][number])
  const kinds: SheetKind[] = ['construction']
  if (has('electrical') || has('smart')) kinds.push('power', 'lighting')
  if (has('plumbing')) kinds.push('plumbing')
  if (has('hvac')) kinds.push('hvac')
  if (has('structural')) kinds.push('framing')
  return kinds.map((k) => ({ id: k, ...SHEET_META[k], svg: renderSheet(model, pkg, theme, k, edits) }))
}

export function sheetEditableLayers(kind: SheetKind): Array<'power' | 'lighting'> {
  if (kind === 'power') return ['power']
  if (kind === 'lighting') return ['lighting']
  return []
}

export function viewerLayerPreset(kind: SheetKind) {
  return {
    lights: kind === 'lighting',
    electrical: kind === 'power',
    plumbing: kind === 'plumbing',
    framing: kind === 'framing',
  }
}

/** Architecture-only sheet (no devices/legend) — the editor's backdrop. */
export function generateShellSVG(a: Answers, pkg: ProjectPackage, theme: SheetTheme): string {
  return renderSheet(buildModel(a, pkg), pkg, theme, 'power', undefined, true)
}

function renderSheet(
  m: PlanModel,
  pkg: ProjectPackage,
  theme: SheetTheme,
  kind: SheetKind,
  edits?: PlanEdits,
  shellOnly = false,
): string {
  const p = PALETTES[theme]
  const { x0, y0, s } = sheetTransform(m)
  const c: Ctx = { p, s, x0, y0, m, parts: [], legend: [] }

  // Sheet background.
  c.parts.push(`<rect width="${W}" height="${H}" fill="${p.bg}"/>`)
  if (theme === 'blueprint') {
    for (let g = 0; g <= W; g += 22) c.parts.push(`<line x1="${g}" y1="0" x2="${g}" y2="${H}" stroke="rgba(91,155,255,.07)" stroke-width="0.5"/>`)
    for (let g = 0; g <= H; g += 22) c.parts.push(`<line x1="0" y1="${g}" x2="${W}" y2="${g}" stroke="rgba(91,155,255,.07)" stroke-width="0.5"/>`)
  }
  if (theme === 'autocad') {
    // Sparse model-space grid dots + UCS icon.
    for (let gx = 30; gx < W; gx += 44)
      for (let gy = 30; gy < H; gy += 44) c.parts.push(`<circle cx="${gx}" cy="${gy}" r="0.7" fill="rgba(255,255,255,.14)"/>`)
    c.parts.push(
      `<g stroke="#FFFFFF" stroke-width="1.4" fill="none"><path d="M22 ${H - 22} h34M22 ${H - 22} v-34"/><path d="M52 ${H - 26} l4 4-4 4M18 ${H - 52} l4-4 4 4"/></g>`,
      `<text x="60" y="${H - 18}" fill="#FFFFFF" font-size="10" font-family="monospace">X</text>`,
      `<text x="26" y="${H - 58}" fill="#FFFFFF" font-size="10" font-family="monospace">Y</text>`,
    )
  }

  drawRoom(c)
  if (!shellOnly) {
    if (kind === 'construction') drawConstruction(c)
    else if (kind === 'power') drawPower(c, edits)
    else if (kind === 'lighting') drawLighting(c, edits)
    else if (kind === 'plumbing') drawPlumbing(c)
    else if (kind === 'hvac') drawHvac(c)
    else drawFraming(c)
    drawLegend(c, kind)
    drawNotes(c, kind)
  }
  drawTitleBlock(c, pkg, kind, theme)

  const meta = SHEET_META[kind]
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${meta.no} ${meta.name.toLowerCase()} sheet">${c.parts.join('')}</svg>`
}

function drawConstruction(c: Ctx) {
  const { p } = c
  c.legend.push([`<path d="M2 16V4h16v12" fill="none" stroke="${p.wall}" stroke-width="2.2"/>`, 'wall / partition'])
  c.legend.push([`<path d="M3 17V5h12M3 17A12 12 0 0 1 15 5" fill="none" stroke="${p.dim}" stroke-width="1.2"/>`, 'door and swing'])
  c.legend.push([`<line x1="2" y1="7" x2="18" y2="7" stroke="${p.wall}"/><line x1="2" y1="11" x2="18" y2="11" stroke="${p.wall}"/><line x1="2" y1="15" x2="18" y2="15" stroke="${p.wall}"/>`, 'window'])
  c.legend.push([`<line x1="2" y1="10" x2="18" y2="10" stroke="${p.dim}"/><path d="M2 5v10M18 5v10" stroke="${p.dim}"/>`, 'dimension'])
}

/* ---------- room shell, counters, door, window, dims -------------- */

function ft(c: Ctx, fx: number, fy: number): Pt {
  return { x: c.x0 + fx * c.s, y: c.y0 + fy * c.s }
}

/** Point on a room-local wall (ft along the wall) in absolute ft coords. */
function roomWallPt(r: Room, wall: Wall, pos: number): FtPt {
  if (wall === 'N') return { x: r.x + pos, y: r.y }
  if (wall === 'S') return { x: r.x + pos, y: r.y + r.h }
  if (wall === 'W') return { x: r.x, y: r.y + pos }
  return { x: r.x + r.w, y: r.y + pos }
}

/** Multi-room house plan: exterior shell, interior walls, doors, windows. */
function drawHouse(c: Ctx) {
  const { p, m, s } = c
  const rooms = m.rooms!

  // Interior room walls first (thinner), then the exterior shell on top.
  for (const r of rooms) {
    const t = ft(c, r.x, r.y)
    c.parts.push(
      `<rect x="${t.x}" y="${t.y}" width="${r.w * s}" height="${r.h * s}" fill="none" stroke="${p.wall}" stroke-width="1.8"/>`,
    )
  }
  const o = ft(c, 0, 0)
  c.parts.push(
    `<rect x="${o.x}" y="${o.y}" width="${m.wFt * s}" height="${m.hFt * s}" fill="none" stroke="${p.wall}" stroke-width="3.5"/>`,
  )

  // Doors (gap + leaf + swing) and windows per room.
  for (const r of rooms) {
    if (r.door) {
      const d = r.door
      const a1 = roomWallPt(r, d.wall, d.pos)
      const a2 = roomWallPt(r, d.wall, d.pos + d.width)
      const p1 = ft(c, a1.x, a1.y)
      const p2 = ft(c, a2.x, a2.y)
      c.parts.push(`<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${p.bg}" stroke-width="5"/>`)
      const leaf = d.width * s
      const horiz = d.wall === 'N' || d.wall === 'S'
      const lx = horiz ? p1.x : p1.x + (d.wall === 'W' ? leaf : -leaf) * 0
      c.parts.push(
        horiz
          ? `<line x1="${p1.x}" y1="${p1.y}" x2="${p1.x}" y2="${p1.y + (d.wall === 'N' ? leaf : -leaf)}" stroke="${p.wall}" stroke-width="1.3"/><path d="M${p1.x} ${p1.y + (d.wall === 'N' ? leaf : -leaf)} A${leaf} ${leaf} 0 0 ${d.wall === 'N' ? 0 : 1} ${p2.x} ${p2.y}" fill="none" stroke="${p.dim}" stroke-width="0.9" stroke-dasharray="3 3"/>`
          : `<line x1="${lx}" y1="${p1.y}" x2="${p1.x + (d.wall === 'W' ? leaf : -leaf)}" y2="${p1.y}" stroke="${p.wall}" stroke-width="1.3"/><path d="M${p1.x + (d.wall === 'W' ? leaf : -leaf)} ${p1.y} A${leaf} ${leaf} 0 0 ${d.wall === 'W' ? 1 : 0} ${p2.x} ${p2.y}" fill="none" stroke="${p.dim}" stroke-width="0.9" stroke-dasharray="3 3"/>`,
      )
    }
    if (r.window) {
      const w = r.window
      const a1 = roomWallPt(r, w.wall, w.pos)
      const a2 = roomWallPt(r, w.wall, w.pos + w.width)
      const p1 = ft(c, a1.x, a1.y)
      const p2 = ft(c, a2.x, a2.y)
      const off = w.wall === 'W' || w.wall === 'E' ? { x: 2.5, y: 0 } : { x: 0, y: 2.5 }
      c.parts.push(
        `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${p.bg}" stroke-width="5"/>`,
        `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${p.wall}" stroke-width="1.2"/>`,
        `<line x1="${p1.x - off.x}" y1="${p1.y - off.y}" x2="${p2.x - off.x}" y2="${p2.y - off.y}" stroke="${p.wall}" stroke-width="1.2"/>`,
        `<line x1="${p1.x + off.x}" y1="${p1.y + off.y}" x2="${p2.x + off.x}" y2="${p2.y + off.y}" stroke="${p.wall}" stroke-width="1.2"/>`,
      )
    }
    // Room label.
    if (r.type !== 'hall') {
      const ctr = ft(c, r.x + r.w / 2, r.y + r.h / 2)
      c.parts.push(
        `<text x="${ctr.x}" y="${ctr.y + (r.type === 'kitchen' || r.type === 'living' ? -r.h * s * 0.28 : 0)}" fill="${p.text}" font-size="${r.w * s > 70 ? 10.5 : 8}" font-family="Arial, sans-serif" text-anchor="middle" letter-spacing="1">${esc(r.label)}</text>`,
      )
    }
  }
  // Front door gap on the exterior wall.
  const fd = m.door
  const f1 = wallPoint(c, fd.wall, fd.pos)
  const f2 = wallPoint(c, fd.wall, fd.pos + fd.width)
  c.parts.push(
    `<line x1="${f1.x}" y1="${f1.y}" x2="${f2.x}" y2="${f2.y}" stroke="${p.bg}" stroke-width="6"/>`,
    `<line x1="${f1.x}" y1="${f1.y}" x2="${f1.x}" y2="${f1.y - fd.width * s}" stroke="${p.wall}" stroke-width="1.5"/>`,
    `<path d="M${f1.x} ${f1.y - fd.width * s} A${fd.width * s} ${fd.width * s} 0 0 1 ${f2.x} ${f2.y}" fill="none" stroke="${p.dim}" stroke-width="1" stroke-dasharray="4 3"/>`,
  )

  // Counters + appliances + dims.
  for (const r of m.counters) {
    const t = ft(c, r.x, r.y)
    c.parts.push(
      `<rect x="${t.x}" y="${t.y}" width="${r.w * s}" height="${r.h * s}" fill="none" stroke="${p.dim}" stroke-width="1" stroke-dasharray="5 3"/>`,
    )
  }
  for (const ap of m.appliances) drawAppliance(c, ap)

  const top1 = ft(c, 0, 0)
  const top2 = ft(c, m.wFt, 0)
  c.parts.push(dimLine(top1.x, top1.y - 20, top2.x, top2.y - 20, `${m.wFt}'-0"`, p, false))
  const r1 = ft(c, m.wFt, 0)
  const r2 = ft(c, m.wFt, m.hFt)
  c.parts.push(dimLine(r1.x + 22, r1.y, r2.x + 22, r2.y, `${m.hFt}'-0"`, p, true))
  if ((m.floors ?? 1) > 1) {
    const tag = ft(c, 0, m.hFt)
    c.parts.push(txt(tag.x, tag.y + 16, 'FLOOR 1 OF 2 SHOWN', p))
  }
}

function drawRoom(c: Ctx) {
  const { p, m, s } = c
  if (m.rooms) return drawHouse(c)
  const a = ft(c, 0, 0)
  const b = ft(c, m.wFt, m.hFt)

  // Door gap on its wall.
  const d = m.door
  const dp = wallPoint(c, d.wall, d.pos)
  const dq = wallPoint(c, d.wall, d.pos + d.width)

  // Walls as one path with the door gap (door is on E wall in the model,
  // but handle all four for generality).
  const seg = (x1: number, y1: number, x2: number, y2: number) => `M${x1} ${y1} L${x2} ${y2}`
  const paths: string[] = []
  paths.push(seg(a.x, a.y, b.x, a.y)) // N
  paths.push(seg(a.x, b.y, b.x, b.y)) // S
  paths.push(seg(a.x, a.y, a.x, b.y)) // W
  if (d.wall === 'E') {
    paths.push(seg(b.x, a.y, dp.x, dp.y))
    paths.push(seg(dq.x, dq.y, b.x, b.y))
  } else paths.push(seg(b.x, a.y, b.x, b.y)) // E
  c.parts.push(`<path d="${paths.join(' ')}" stroke="${p.wall}" stroke-width="3.5" fill="none" stroke-linecap="square"/>`)

  // Door leaf + swing arc (quarter circle) — like the reference plans.
  const leaf = d.width * s
  c.parts.push(
    `<line x1="${dp.x}" y1="${dp.y}" x2="${dp.x - leaf}" y2="${dp.y}" stroke="${p.wall}" stroke-width="1.6"/>`,
    `<path d="M${dp.x - leaf} ${dp.y} A${leaf} ${leaf} 0 0 1 ${dq.x} ${dq.y}" fill="none" stroke="${p.dim}" stroke-width="1" stroke-dasharray="4 3"/>`,
  )

  // Window: triple line on its wall.
  const w = m.window
  const w1 = wallPoint(c, w.wall, w.pos)
  const w2 = wallPoint(c, w.wall, w.pos + w.width)
  const off = w.wall === 'W' || w.wall === 'E' ? { x: 3, y: 0 } : { x: 0, y: 3 }
  c.parts.push(
    `<line x1="${w1.x}" y1="${w1.y}" x2="${w2.x}" y2="${w2.y}" stroke="${p.bg}" stroke-width="5"/>`,
    `<line x1="${w1.x}" y1="${w1.y}" x2="${w2.x}" y2="${w2.y}" stroke="${p.wall}" stroke-width="1.3"/>`,
    `<line x1="${w1.x - off.x}" y1="${w1.y - off.y}" x2="${w2.x - off.x}" y2="${w2.y - off.y}" stroke="${p.wall}" stroke-width="1.3"/>`,
    `<line x1="${w1.x + off.x}" y1="${w1.y + off.y}" x2="${w2.x + off.x}" y2="${w2.y + off.y}" stroke="${p.wall}" stroke-width="1.3"/>`,
  )

  // Counters (dashed outline, like cabinetry on the references).
  for (const r of m.counters) {
    const t = ft(c, r.x, r.y)
    c.parts.push(
      `<rect x="${t.x}" y="${t.y}" width="${r.w * s}" height="${r.h * s}" fill="none" stroke="${p.dim}" stroke-width="1.1" stroke-dasharray="6 4"/>`,
    )
  }
  if (m.island) {
    const t = ft(c, m.island.x, m.island.y)
    c.parts.push(
      `<rect x="${t.x}" y="${t.y}" width="${m.island.w * s}" height="${m.island.h * s}" rx="6" fill="none" stroke="${p.wall}" stroke-width="1.6"/>`,
    )
  }

  // Room label + dimensions.
  const mid = ft(c, m.wFt / 2, m.hFt / 2)
  const label = m.isKitchen ? 'KITCHEN' : 'ROOM'
  c.parts.push(
    `<text x="${mid.x + (m.isKitchen ? 30 : 0)}" y="${mid.y + 44}" fill="${p.text}" font-size="17" font-weight="bold" font-family="Arial, sans-serif" text-anchor="middle" letter-spacing="2">${label}</text>`,
  )
  const top1 = ft(c, 0, 0)
  const top2 = ft(c, m.wFt, 0)
  c.parts.push(dimLine(top1.x, top1.y - 20, top2.x, top2.y - 20, `${m.wFt}'-0"`, p, false))
  const r1 = ft(c, m.wFt, 0)
  const r2 = ft(c, m.wFt, m.hFt)
  c.parts.push(dimLine(r1.x + 22, r1.y, r2.x + 22, r2.y, `${m.hFt}'-0"`, p, true))

  // Appliances.
  for (const ap of m.appliances) drawAppliance(c, ap)
}

function wallPoint(c: Ctx, wall: Wall, pos: number): Pt {
  const { m } = c
  if (wall === 'N') return ft(c, pos, 0)
  if (wall === 'S') return ft(c, pos, m.hFt)
  if (wall === 'W') return ft(c, 0, pos)
  return ft(c, m.wFt, pos)
}

function drawAppliance(c: Ctx, ap: { x: number; y: number; label: string; w?: number; h?: number }) {
  const { p, s } = c
  const t = ft(c, ap.x, ap.y)
  const ink = p.wall
  if (ap.label === 'SINK') {
    // Double-bowl sink with faucet.
    c.parts.push(
      `<rect x="${t.x - 0.9 * s}" y="${t.y - 0.7 * s}" width="${1.8 * s}" height="${1.4 * s}" rx="4" fill="none" stroke="${ink}" stroke-width="1.3"/>`,
      `<rect x="${t.x - 0.72 * s}" y="${t.y - 0.5 * s}" width="${0.65 * s}" height="${s}" rx="3" fill="none" stroke="${ink}" stroke-width="1"/>`,
      `<rect x="${t.x + 0.08 * s}" y="${t.y - 0.5 * s}" width="${0.65 * s}" height="${s}" rx="3" fill="none" stroke="${ink}" stroke-width="1"/>`,
      `<circle cx="${t.x}" cy="${t.y - 0.58 * s}" r="2.4" fill="${ink}"/>`,
    )
  } else if (ap.label === 'CT') {
    // Cooktop: 4 burners.
    const r = 0.28 * s
    c.parts.push(`<rect x="${t.x - 0.95 * s}" y="${t.y - 0.75 * s}" width="${1.9 * s}" height="${1.5 * s}" rx="3" fill="none" stroke="${ink}" stroke-width="1.3"/>`)
    for (const [dx, dy] of [[-0.45, -0.32], [0.45, -0.32], [-0.45, 0.32], [0.45, 0.32]])
      c.parts.push(`<circle cx="${t.x + dx * s}" cy="${t.y + dy * s}" r="${r}" fill="none" stroke="${ink}" stroke-width="1.1"/>`)
    c.parts.push(txt(t.x + 1.25 * s, t.y - 0.4 * s, 'CT', c.p))
  } else if (ap.label === 'REF') {
    c.parts.push(
      `<rect x="${t.x - 1 * s}" y="${t.y - 1.1 * s}" width="${2 * s}" height="${2.2 * s}" fill="none" stroke="${ink}" stroke-width="1.3" stroke-dasharray="5 3"/>`,
      txt(t.x, t.y + 3, 'REF', c.p, 'middle'),
    )
  } else if (ap.label === 'WC') {
    // Toilet: tank + bowl.
    c.parts.push(
      `<rect x="${t.x - 0.75 * s}" y="${t.y - 0.55 * s}" width="${1.5 * s}" height="${0.5 * s}" fill="none" stroke="${ink}" stroke-width="1.1"/>`,
      `<ellipse cx="${t.x}" cy="${t.y + 0.35 * s}" rx="${0.55 * s}" ry="${0.7 * s}" fill="none" stroke="${ink}" stroke-width="1.1"/>`,
    )
  } else if (ap.label === 'LAV') {
    c.parts.push(
      `<rect x="${t.x - 0.65 * s}" y="${t.y - 0.5 * s}" width="${1.3 * s}" height="${s}" rx="3" fill="none" stroke="${ink}" stroke-width="1.1"/>`,
      `<circle cx="${t.x}" cy="${t.y}" r="${0.32 * s}" fill="none" stroke="${ink}" stroke-width="1"/>`,
    )
  } else if (ap.label === 'TUB') {
    c.parts.push(
      `<rect x="${t.x - 1.3 * s}" y="${t.y - 0.65 * s}" width="${2.6 * s}" height="${1.3 * s}" rx="${0.3 * s}" fill="none" stroke="${ink}" stroke-width="1.2"/>`,
      `<rect x="${t.x - 1.1 * s}" y="${t.y - 0.45 * s}" width="${2.2 * s}" height="${0.9 * s}" rx="${0.3 * s}" fill="none" stroke="${ink}" stroke-width="0.9"/>`,
    )
  } else if (ap.label === 'SHWR') {
    const w = (ap.w ?? 3) * s
    const h = (ap.h ?? 3) * s
    c.parts.push(
      `<rect x="${t.x - w / 2}" y="${t.y - h / 2}" width="${w}" height="${h}" fill="none" stroke="${ink}" stroke-width="1.3"/>`,
      `<line x1="${t.x - w / 2}" y1="${t.y - h / 2}" x2="${t.x + w / 2}" y2="${t.y + h / 2}" stroke="${ink}" stroke-width="0.8"/>`,
      `<line x1="${t.x + w / 2}" y1="${t.y - h / 2}" x2="${t.x - w / 2}" y2="${t.y + h / 2}" stroke="${ink}" stroke-width="0.8"/>`,
      `<circle cx="${t.x}" cy="${t.y}" r="${0.16 * s}" fill="none" stroke="${ink}" stroke-width="1"/>`,
      txt(t.x, t.y + h / 2 + 12, 'SHOWER', c.p, 'middle'),
    )
  } else if (ap.label === 'WH') {
    c.parts.push(
      `<circle cx="${t.x}" cy="${t.y}" r="${0.85 * s}" fill="none" stroke="${ink}" stroke-width="1.3"/>`,
      txt(t.x, t.y + 3, 'WH', c.p, 'middle'),
    )
  } else {
    c.parts.push(txt(t.x + 8, t.y + 3, ap.label, c.p))
  }
}

/* ---------- power sheet ------------------------------------------- */

function drawPower(c: Ctx, edits?: PlanEdits) {
  const { p, m } = c
  const devices = layoutPower(m, edits)
  const gfci = devices.filter((d) => d.kind === 'gfci')
  const plain = devices.filter((d) => d.kind === 'recep')

  // Circuit runs first (under symbols): chain each group with curved arcs.
  const px = (d: FtPt) => ft(c, d.x, d.y)
  if (gfci.length > 1) c.parts.push(curveChain(gfci.map(px), p.circuit, '7 4 2 4')) // dash-dot
  if (plain.length > 1) c.parts.push(curveChain(plain.map(px), p.circuit, '7 4 2 4'))

  // Symbols.
  for (const d of devices) {
    const pt = px(d)
    receptacle(c, pt, d.kind === 'gfci')
    if (d.kind === 'dedicated' && d.label) c.parts.push(txt(pt.x + 9, pt.y - 7, d.label, p))
    if (d.circuit) c.parts.push(txt(pt.x + 9, pt.y + 14, `CKT ${d.circuit}`, p))
  }

  c.legend.push([recepGlyph(p, true), 'GFCI receptacle'])
  c.legend.push([recepGlyph(p, false), 'duplex receptacle'])
  c.legend.push([`<circle cx="9" cy="9" r="5.5" fill="none" stroke="${p.device}" stroke-width="1.4"/><text x="20" y="12" fill="${p.device}" font-size="9" font-family="monospace">240V</text>`, 'dedicated circuit'])
  c.legend.push([`<path d="M2 12 Q9 2 16 12" fill="none" stroke="${p.circuit}" stroke-width="1.3" stroke-dasharray="6 3 2 3"/>`, 'circuit run'])
}

function receptacle(c: Ctx, pt: Pt, isGfci: boolean) {
  const { p } = c
  c.parts.push(
    `<circle cx="${pt.x}" cy="${pt.y}" r="5.5" fill="${p.bg}" stroke="${p.device}" stroke-width="1.6"/>`,
    `<line x1="${pt.x - 9}" y1="${pt.y}" x2="${pt.x - 5.5}" y2="${pt.y}" stroke="${p.device}" stroke-width="1.6"/>`,
    `<line x1="${pt.x + 5.5}" y1="${pt.y}" x2="${pt.x + 9}" y2="${pt.y}" stroke="${p.device}" stroke-width="1.6"/>`,
  )
  if (isGfci) c.parts.push(txt(pt.x, pt.y - 9, 'GFCI', p, 'middle'))
}

function recepGlyph(p: Palette, gfci: boolean): string {
  return (
    `<circle cx="9" cy="11" r="5" fill="none" stroke="${p.device}" stroke-width="1.4"/>` +
    `<line x1="1" y1="11" x2="4" y2="11" stroke="${p.device}" stroke-width="1.4"/>` +
    `<line x1="14" y1="11" x2="17" y2="11" stroke="${p.device}" stroke-width="1.4"/>` +
    (gfci ? `<text x="9" y="4" fill="${p.device}" font-size="6.5" text-anchor="middle" font-family="monospace">GFCI</text>` : '')
  )
}

/* ---------- lighting sheet ---------------------------------------- */

function drawLighting(c: Ctx, edits?: PlanEdits) {
  const { p, m } = c
  const devices = layoutLighting(m, edits)

  if (m.rooms) {
    // House mode: every room gets a switch; each fixture legs to its
    // nearest switch instead of one long chain across rooms.
    const fixtures = devices.filter((d) => d.kind !== 'switch')
    const sws = devices.filter((d) => d.kind === 'switch')
    for (const f of fixtures) {
      let best = sws[0]
      let bd = Infinity
      for (const sw of sws) {
        const dd = (sw.x - f.x) ** 2 + (sw.y - f.y) ** 2
        if (dd < bd) {
          bd = dd
          best = sw
        }
      }
      if (best) c.parts.push(curve(ft(c, best.x, best.y), ft(c, f.x, f.y), p.leg, ''))
    }
    for (const d of fixtures) {
      const pt = ft(c, d.x, d.y)
      if (d.kind === 'can') canSymbol(c, pt)
      else if (d.kind === 'pendant') pendantSymbol(c, pt)
      else ucSymbol(c, pt)
    }
    for (const sw of sws) switchSymbol(c, ft(c, sw.x, sw.y), sw.label ?? 'S')
    const note = ft(c, m.wFt * 0.02, -0.8)
    c.parts.push(
      `<text x="${note.x}" y="${note.y - 14}" fill="${p.text}" font-size="10.5" font-family="Arial, sans-serif">Note: all lighting on dimmer switches · bath fans 50 CFM min vented to exterior</text>`,
    )
    c.legend.push([`<circle cx="9" cy="10" r="6.5" fill="${p.lightFill}" stroke="${p.light}" stroke-width="1.4"/><line x1="4.5" y1="5.5" x2="13.5" y2="14.5" stroke="${p.light}" stroke-width="1.2"/><line x1="13.5" y1="5.5" x2="4.5" y2="14.5" stroke="${p.light}" stroke-width="1.2"/>`, 'recessed can'])
    c.legend.push([`<circle cx="9" cy="10" r="3.6" fill="none" stroke="${p.light}" stroke-width="1.3"/>`, 'vanity / utility light'])
    c.legend.push([`<text x="4" y="14" fill="${p.text}" font-size="12" font-style="italic" font-family="Georgia, serif">S</text>`, 'switch (S3 = 3-way)'])
    c.legend.push([`<path d="M2 12 Q9 2 16 12" fill="none" stroke="${p.leg}" stroke-width="1.2"/>`, 'switch leg'])
    return
  }
  const cans = devices.filter((d) => d.kind === 'can').map((d) => ft(c, d.x, d.y))
  const pendants = devices.filter((d) => d.kind === 'pendant').map((d) => ft(c, d.x, d.y))
  const ucs = devices.filter((d) => d.kind === 'uc').map((d) => ft(c, d.x, d.y))
  const sws = devices.filter((d) => d.kind === 'switch')
  const sw1 = sws[0] ? ft(c, sws[0].x, sws[0].y) : ft(c, m.wFt - 0.45, m.hFt * 0.7)
  const sw2 = sws[1] ? ft(c, sws[1].x, sws[1].y) : ft(c, 0.8, m.hFt - 0.8)

  // Switch legs (curved, solid-thin) drawn under fixtures.
  if (cans.length) {
    c.parts.push(curveChain([{ x: sw1.x - 8, y: sw1.y }, ...cans], p.leg, ''))
    c.parts.push(curve(sw2, cans[Math.floor(cans.length / 2)], p.leg, ''))
  }
  if (pendants.length) c.parts.push(curveChain([{ x: sw1.x - 8, y: sw1.y + 6 }, ...pendants], p.leg, '4 3'))
  if (ucs.length) c.parts.push(curveChain([sw2, ...ucs], p.leg, '4 3'))

  // Fixtures.
  for (const pt of cans) canSymbol(c, pt)
  for (const pt of pendants) pendantSymbol(c, pt)
  for (const pt of ucs) ucSymbol(c, pt)

  // Switch glyphs.
  if (sws[0]) switchSymbol(c, sw1, sws[0].label ?? 'S3')
  if (sws[1]) switchSymbol(c, sw2, sws[1].label ?? 'S')

  // Dimmer note — straight from the reference sheet.
  const note = ft(c, m.wFt * 0.08, m.hFt * 0.52)
  c.parts.push(
    `<text x="${note.x}" y="${note.y}" fill="${p.text}" font-size="11" font-family="Arial, sans-serif">Note: all lighting</text>`,
    `<text x="${note.x}" y="${note.y + 14}" fill="${p.text}" font-size="11" font-family="Arial, sans-serif">on dimmer switches</text>`,
  )

  c.legend.push([`<circle cx="9" cy="10" r="6.5" fill="${p.lightFill}" stroke="${p.light}" stroke-width="1.4"/><line x1="4.5" y1="5.5" x2="13.5" y2="14.5" stroke="${p.light}" stroke-width="1.2"/><line x1="13.5" y1="5.5" x2="4.5" y2="14.5" stroke="${p.light}" stroke-width="1.2"/>`, 'recessed can'])
  if (pendants.length) c.legend.push([`<circle cx="9" cy="10" r="6.5" fill="${p.lightFill}" stroke="${p.light}" stroke-width="1.4"/><circle cx="9" cy="10" r="2.6" fill="${p.light}"/>`, 'pendant'])
  if (ucs.length) c.legend.push([`<circle cx="9" cy="10" r="3.6" fill="none" stroke="${p.light}" stroke-width="1.3"/><text x="16" y="13" fill="${p.light}" font-size="8" font-family="monospace">UC</text>`, 'under-cabinet light'])
  c.legend.push([`<text x="4" y="14" fill="${p.text}" font-size="12" font-style="italic" font-family="Georgia, serif">S3</text>`, '3-way switch (dimmer)'])
  c.legend.push([`<path d="M2 12 Q9 2 16 12" fill="none" stroke="${p.leg}" stroke-width="1.2"/>`, 'switch leg'])
}

function canSymbol(c: Ctx, pt: Pt) {
  const { p } = c
  const r = 8
  c.parts.push(
    `<circle cx="${pt.x}" cy="${pt.y}" r="${r}" fill="${p.lightFill}" stroke="${p.light}" stroke-width="1.5"/>`,
    `<line x1="${pt.x - r * 0.7}" y1="${pt.y - r * 0.7}" x2="${pt.x + r * 0.7}" y2="${pt.y + r * 0.7}" stroke="${p.light}" stroke-width="1.2"/>`,
    `<line x1="${pt.x + r * 0.7}" y1="${pt.y - r * 0.7}" x2="${pt.x - r * 0.7}" y2="${pt.y + r * 0.7}" stroke="${p.light}" stroke-width="1.2"/>`,
  )
}

function pendantSymbol(c: Ctx, pt: Pt) {
  const { p } = c
  c.parts.push(
    `<circle cx="${pt.x}" cy="${pt.y}" r="8" fill="${p.lightFill}" stroke="${p.light}" stroke-width="1.5"/>`,
    `<circle cx="${pt.x}" cy="${pt.y}" r="3" fill="${p.light}"/>`,
  )
}

function ucSymbol(c: Ctx, pt: Pt) {
  const { p } = c
  c.parts.push(
    `<circle cx="${pt.x}" cy="${pt.y}" r="4.2" fill="none" stroke="${p.light}" stroke-width="1.4"/>`,
    txt(pt.x + 8, pt.y + 3, 'UC', p),
  )
}

function switchSymbol(c: Ctx, pt: Pt, label: string) {
  const { p } = c
  c.parts.push(
    `<text x="${pt.x}" y="${pt.y + 5}" fill="${p.text}" font-size="15" font-style="italic" font-family="Georgia, serif" text-anchor="middle">S</text>`,
  )
  if (label.length > 1)
    c.parts.push(`<text x="${pt.x + 7}" y="${pt.y + 9}" fill="${p.text}" font-size="9" font-family="Georgia, serif">${label.slice(1)}</text>`)
}

/* ---------- plumbing sheet (P-1) ----------------------------------- */

function drawPlumbing(c: Ctx) {
  const { p, m } = c

  if (m.rooms) {
    // Whole house: 3" DWV main under the hall, branches from each wet room,
    // stack + cleanout at the west end, CW/HW distribution from the WH.
    const hall = m.rooms.find((r) => r.type === 'hall')!
    const wet = m.rooms.filter((r) => r.type === 'bath' || r.type === 'powder' || r.type === 'kitchen')
    const mainY = hall.y + hall.h / 2
    const stackFt = { x: hall.x + 0.8, y: mainY }
    const mainA = ft(c, stackFt.x, mainY)
    const mainB = ft(c, m.wFt - 0.8, mainY)
    c.parts.push(pipe([mainA, mainB], p.circuit, '10 4 2 4', 2.6))
    c.parts.push(txt(mainA.x + 30, mainA.y - 8, '3" DWV MAIN — SLOPE 1/4"/FT', p))
    for (const r of wet) {
      const src = ft(c, r.x + r.w / 2, r.y + (r.y < hall.y ? r.h - 0.8 : 0.8))
      const drop = ft(c, r.x + r.w / 2, mainY)
      c.parts.push(pipe([src, drop], p.circuit, '10 4 2 4', 2))
      // Vent up from each wet room.
      const vTop = ft(c, r.x + r.w / 2, r.y + (r.y < hall.y ? r.h - 3 : 3))
      c.parts.push(pipe([src, vTop], p.leg, '3 4', 1.1))
    }
    const stack = ft(c, stackFt.x, stackFt.y)
    c.parts.push(
      `<circle cx="${stack.x}" cy="${stack.y}" r="7" fill="${p.bg}" stroke="${p.circuit}" stroke-width="1.6"/>`,
      `<line x1="${stack.x - 5}" y1="${stack.y + 5}" x2="${stack.x + 5}" y2="${stack.y - 5}" stroke="${p.circuit}" stroke-width="1.4"/>`,
      txt(stack.x + 10, stack.y + 14, '3" STACK + CO', p),
    )
    // Water: meter at the front wall, cold to WH, CW/HW mains along the hall.
    const wh = m.appliances.find((ap) => ap.label === 'WH')!
    const whPt = ft(c, wh.x, wh.y)
    const meter = ft(c, m.wFt * 0.45, m.hFt)
    c.parts.push(
      `<rect x="${meter.x - 7}" y="${meter.y - 7}" width="14" height="14" fill="${p.bg}" stroke="${p.device}" stroke-width="1.5"/>`,
      txt(meter.x + 10, meter.y - 2, 'M', p),
    )
    c.parts.push(pipe([meter, { x: meter.x, y: whPt.y }, { x: whPt.x + 12, y: whPt.y }], p.device, '', 1.6))
    const cwY = ft(c, 0, mainY + 0.9).y
    const hwY = cwY + 7
    c.parts.push(pipe([{ x: whPt.x, y: whPt.y - 12 }, { x: whPt.x, y: cwY }, { x: mainA.x, y: cwY }], p.device, '', 1.4))
    c.parts.push(pipe([{ x: whPt.x - 6, y: whPt.y - 12 }, { x: whPt.x - 6, y: hwY }, { x: mainA.x, y: hwY }], p.light, '7 4', 1.4))
    c.parts.push(txt(mainB.x - 120, cwY - 5, '3/4" CW', p), txt(mainB.x - 120, hwY + 12, '3/4" HW', p))

    c.legend.push([`<line x1="2" y1="10" x2="18" y2="10" stroke="${p.device}" stroke-width="1.6"/>`, 'cold water (3/4")'])
    c.legend.push([`<line x1="2" y1="10" x2="18" y2="10" stroke="${p.light}" stroke-width="1.6" stroke-dasharray="6 3"/>`, 'hot water (3/4")'])
    c.legend.push([`<line x1="2" y1="10" x2="18" y2="10" stroke="${p.circuit}" stroke-width="2.4" stroke-dasharray="8 3 2 3"/>`, 'drain-waste (2"–3")'])
    c.legend.push([`<line x1="2" y1="10" x2="18" y2="10" stroke="${p.leg}" stroke-width="1.2" stroke-dasharray="3 4"/>`, 'vent (1-1/2")'])
    c.legend.push([`<circle cx="9" cy="10" r="6.5" fill="none" stroke="${p.wall}" stroke-width="1.4"/><text x="9" y="13" fill="${p.text}" font-size="6.5" text-anchor="middle" font-family="monospace">WH</text>`, 'water heater'])
    c.legend.push([`<circle cx="9" cy="10" r="5.5" fill="none" stroke="${p.circuit}" stroke-width="1.4"/><line x1="5" y1="14" x2="13" y2="6" stroke="${p.circuit}" stroke-width="1.2"/>`, 'stack + cleanout'])
    return
  }
  const bathroomFixtures = m.appliances.filter((ap) => ['LAV', 'WC', 'SHWR', 'TUB'].includes(ap.label))
  if (bathroomFixtures.some((fixture) => fixture.label === 'SHWR' || fixture.label === 'TUB')) {
    const meter = ft(c, m.wFt * 0.52, m.hFt)
    const wh = ft(c, m.wFt - 1.15, m.hFt - 1.1)
    const stack = ft(c, 0.55, m.hFt - 0.65)
    const coldY = ft(c, 0, m.hFt - 0.55).y
    const hotY = coldY - 10
    const drainY = coldY - 26

    c.parts.push(
      pipe([meter, { x: meter.x, y: coldY }, { x: stack.x + 20, y: coldY }], p.device, '', 1.8),
      pipe([{ x: wh.x, y: wh.y - 12 }, { x: wh.x, y: hotY }, { x: stack.x + 20, y: hotY }], p.light, '7 4', 1.6),
      txt(meter.x + 8, coldY + 15, '3/4" CW MAIN', p),
      txt(wh.x - 92, hotY - 6, '3/4" HW MAIN', p),
    )

    for (const fixture of bathroomFixtures) {
      const target = ft(c, fixture.x, fixture.y)
      const needsHot = fixture.label !== 'WC'
      const drainSize = fixture.label === 'WC' ? '3"' : fixture.label === 'LAV' ? '1-1/2"' : '2"'
      c.parts.push(pipe([{ x: target.x + 5, y: coldY }, { x: target.x + 5, y: target.y + 8 }], p.device, '', 1.35))
      if (needsHot) c.parts.push(pipe([{ x: target.x - 5, y: hotY }, { x: target.x - 5, y: target.y + 8 }], p.light, '7 4', 1.25))
      c.parts.push(
        pipe([target, { x: target.x, y: drainY }, { x: stack.x + 12, y: drainY }], p.circuit, '10 4 2 4', fixture.label === 'WC' ? 2.8 : 2.2),
        txt(target.x + 8, target.y - 10, `${drainSize} ${fixture.label}`, p),
      )
      if (fixture.label === 'LAV') {
        c.parts.push(pipe([target, { x: target.x, y: Math.max(c.y0 + 18, target.y - 62) }], p.leg, '3 4', 1.2))
        c.parts.push(txt(target.x + 8, target.y - 48, '1-1/2" VENT', p))
      }
    }

    c.parts.push(
      `<circle cx="${wh.x}" cy="${wh.y}" r="15" fill="${p.bg}" stroke="${p.wall}" stroke-width="1.6"/><text x="${wh.x}" y="${wh.y + 4}" fill="${p.text}" font-size="9.5" font-family="monospace" text-anchor="middle">WH</text>`,
      `<rect x="${meter.x - 7}" y="${meter.y - 7}" width="14" height="14" fill="${p.bg}" stroke="${p.device}" stroke-width="1.5"/>`,
      txt(meter.x + 10, meter.y - 2, 'M', p),
      `<circle cx="${stack.x}" cy="${stack.y}" r="7" fill="${p.bg}" stroke="${p.circuit}" stroke-width="1.6"/><line x1="${stack.x - 5}" y1="${stack.y + 5}" x2="${stack.x + 5}" y2="${stack.y - 5}" stroke="${p.circuit}" stroke-width="1.4"/>`,
      txt(stack.x + 10, stack.y + 14, '3" STACK + CO', p),
    )
    c.legend.push([`<line x1="2" y1="10" x2="18" y2="10" stroke="${p.device}" stroke-width="1.6"/>`, 'cold water (3/4")'])
    c.legend.push([`<line x1="2" y1="10" x2="18" y2="10" stroke="${p.light}" stroke-width="1.6" stroke-dasharray="6 3"/>`, 'hot water (3/4")'])
    c.legend.push([`<line x1="2" y1="10" x2="18" y2="10" stroke="${p.circuit}" stroke-width="2.4" stroke-dasharray="8 3 2 3"/>`, 'drain-waste (1-1/2"–3")'])
    c.legend.push([`<line x1="2" y1="10" x2="18" y2="10" stroke="${p.leg}" stroke-width="1.2" stroke-dasharray="3 4"/>`, 'vent (1-1/2")'])
    c.legend.push([`<circle cx="9" cy="10" r="6.5" fill="none" stroke="${p.wall}" stroke-width="1.4"/><text x="9" y="13" fill="${p.text}" font-size="6.5" text-anchor="middle" font-family="monospace">WH</text>`, 'water heater'])
    return
  }
  // Fixture anchor points (ft): sink from the model or a default wet wall spot.
  const sinkAp = m.appliances.find((ap) => ap.label === 'SINK')
  const sinkFt = sinkAp ? { x: sinkAp.x, y: sinkAp.y } : { x: 1.2, y: m.window.pos + m.window.width / 2 }
  if (!sinkAp) drawAppliance(c, { ...sinkFt, label: 'SINK' })
  const dwAp = m.appliances.find((ap) => ap.label === 'DW')

  const sink = ft(c, sinkFt.x, sinkFt.y)
  const wh = ft(c, m.wFt - 1.8, m.hFt - 1.8) // water heater, SE corner
  const meter = ft(c, m.wFt * 0.4, m.hFt) // service entry on south wall
  const stack = ft(c, 0.6, m.hFt - 0.6) // DWV stack + cleanout, SW corner

  // Cold water: meter → WH and meter → sink (solid).
  c.parts.push(pipe([meter, { x: meter.x, y: wh.y }, { x: wh.x - 14, y: wh.y }], p.device, '', 1.6))
  c.parts.push(pipe([{ x: meter.x, y: sink.y + 40 }, { x: sink.x + 8, y: sink.y + 40 }, { x: sink.x + 8, y: sink.y + 12 }], p.device, '', 1.6))
  c.parts.push(txt(meter.x + 6, sink.y + 52, '3/4" CW', p))

  // Hot water: WH → sink (dashed), tee to DW when present.
  const hotY = sink.y + 52
  c.parts.push(pipe([{ x: wh.x, y: wh.y - 16 }, { x: wh.x, y: hotY }, { x: sink.x - 8, y: hotY }, { x: sink.x - 8, y: sink.y + 12 }], p.light, '7 4', 1.6))
  c.parts.push(txt(wh.x - 58, hotY - 6, '3/4" HW', p))
  if (dwAp) {
    const dw = ft(c, dwAp.x, dwAp.y)
    c.parts.push(pipe([{ x: sink.x - 8, y: hotY }, { x: dw.x + 20, y: hotY }, { x: dw.x + 20, y: dw.y }], p.light, '7 4', 1.3))
  }

  // DWV: sink → stack (heavy dash-dot) + vent up (thin dashed) + cleanout.
  c.parts.push(pipe([sink, { x: sink.x, y: stack.y - 14 }, { x: stack.x + 12, y: stack.y - 14 }], p.circuit, '10 4 2 4', 2.4))
  c.parts.push(txt(sink.x + 6, stack.y - 22, '2" DWV', p))
  c.parts.push(pipe([sink, { x: sink.x, y: sink.y - 46 }], p.leg, '3 4', 1.2))
  c.parts.push(txt(sink.x + 6, sink.y - 34, '1-1/2" VENT', p))

  // Water heater symbol.
  c.parts.push(
    `<circle cx="${wh.x}" cy="${wh.y}" r="15" fill="none" stroke="${p.wall}" stroke-width="1.6"/>`,
    `<text x="${wh.x}" y="${wh.y + 4}" fill="${p.text}" font-size="9.5" font-family="monospace" text-anchor="middle">WH</text>`,
  )
  // Meter + cleanout.
  c.parts.push(
    `<rect x="${meter.x - 7}" y="${meter.y - 7}" width="14" height="14" fill="none" stroke="${p.device}" stroke-width="1.5"/>`,
    txt(meter.x + 10, meter.y - 2, 'M', p),
    `<circle cx="${stack.x}" cy="${stack.y - 14}" r="7" fill="none" stroke="${p.circuit}" stroke-width="1.6"/>`,
    `<line x1="${stack.x - 5}" y1="${stack.y - 9}" x2="${stack.x + 5}" y2="${stack.y - 19}" stroke="${p.circuit}" stroke-width="1.4"/>`,
    txt(stack.x + 10, stack.y - 10, 'CO', p),
  )

  c.legend.push([`<line x1="2" y1="10" x2="18" y2="10" stroke="${p.device}" stroke-width="1.6"/>`, 'cold water (3/4")'])
  c.legend.push([`<line x1="2" y1="10" x2="18" y2="10" stroke="${p.light}" stroke-width="1.6" stroke-dasharray="6 3"/>`, 'hot water (3/4")'])
  c.legend.push([`<line x1="2" y1="10" x2="18" y2="10" stroke="${p.circuit}" stroke-width="2.4" stroke-dasharray="8 3 2 3"/>`, 'drain-waste (2")'])
  c.legend.push([`<line x1="2" y1="10" x2="18" y2="10" stroke="${p.leg}" stroke-width="1.2" stroke-dasharray="3 4"/>`, 'vent (1-1/2")'])
  c.legend.push([`<circle cx="9" cy="10" r="6.5" fill="none" stroke="${p.wall}" stroke-width="1.4"/><text x="9" y="13" fill="${p.text}" font-size="6.5" text-anchor="middle" font-family="monospace">WH</text>`, 'water heater'])
  c.legend.push([`<circle cx="9" cy="10" r="5.5" fill="none" stroke="${p.circuit}" stroke-width="1.4"/><line x1="5" y1="14" x2="13" y2="6" stroke="${p.circuit}" stroke-width="1.2"/>`, 'cleanout'])
}

/* ---------- mechanical sheet (M-1) ---------------------------------- */

function drawHvac(c: Ctx) {
  const { p, m } = c

  if (m.rooms) {
    // Whole house: trunk along the hall, branch + register per habitable
    // room (CFM sized by area), central return, AHU in the garage/corner.
    const hall = m.rooms.find((r) => r.type === 'hall')!
    const served = m.rooms.filter((r) => ['bed', 'living', 'kitchen'].includes(r.type))
    const trunkY = hall.y + hall.h / 2
    const garage = m.rooms.find((r) => r.type === 'garage')
    const ahuFt = garage ? { x: garage.x + garage.w - 1.6, y: trunkY } : { x: m.wFt - 1.8, y: trunkY }
    const ahu = ft(c, ahuFt.x, ahuFt.y)
    const t1 = ft(c, Math.min(...served.map((r) => r.x + r.w / 2)), trunkY)
    const t2 = ft(c, Math.max(...served.map((r) => r.x + r.w / 2)), trunkY)
    c.parts.push(duct([ahu, t1.x < ahu.x ? t1 : t2], p))
    c.parts.push(duct([t1, t2], p))
    c.parts.push(txt((t1.x + t2.x) / 2 - 40, t1.y - 10, '14x10 TRUNK', p))
    for (const r of served) {
      const reg = ft(c, r.x + r.w / 2, r.y + r.h / 2 + (r.y < hall.y ? 0.8 : -0.8))
      const tap = ft(c, r.x + r.w / 2, trunkY)
      c.parts.push(duct([tap, reg], p))
      registerSymbol(c, reg)
      const cfm = Math.max(60, Math.round((r.w * r.h) / 2 / 10) * 10)
      c.parts.push(txt(reg.x + 12, reg.y - 10, `${cfm} CFM · 6"Ø`, p))
    }
    // Central return in the hall + thermostat + condenser outside.
    const ret = ft(c, hall.x + hall.w * 0.55, trunkY)
    c.parts.push(`<rect x="${ret.x - 16}" y="${ret.y - 8}" width="32" height="16" fill="${p.bg}" stroke="${p.leg}" stroke-width="1.5"/>`)
    for (let i = 1; i <= 3; i++)
      c.parts.push(`<line x1="${ret.x - 16}" y1="${ret.y - 8 + i * 4}" x2="${ret.x + 16}" y2="${ret.y - 8 + i * 4}" stroke="${p.leg}" stroke-width="1"/>`)
    c.parts.push(txt(ret.x - 12, ret.y + 22, '20x20 RA', p))
    const stat = ft(c, hall.x + hall.w * 0.35, trunkY)
    c.parts.push(
      `<circle cx="${stat.x}" cy="${stat.y}" r="7" fill="${p.bg}" stroke="${p.device}" stroke-width="1.5"/>`,
      `<text x="${stat.x}" y="${stat.y + 3.5}" fill="${p.device}" font-size="9" font-family="monospace" text-anchor="middle">T</text>`,
    )
    const cu = ft(c, m.wFt + 1.8, m.hFt * 0.25)
    c.parts.push(
      `<rect x="${ahu.x - 16}" y="${ahu.y - 14}" width="32" height="28" fill="${p.bg}" stroke="${p.wall}" stroke-width="1.6"/>`,
      `<text x="${ahu.x}" y="${ahu.y + 4}" fill="${p.text}" font-size="9" font-family="monospace" text-anchor="middle">AHU</text>`,
      `<rect x="${cu.x - 14}" y="${cu.y - 14}" width="28" height="28" fill="none" stroke="${p.wall}" stroke-width="1.4" stroke-dasharray="4 3"/>`,
      `<text x="${cu.x}" y="${cu.y + 3.5}" fill="${p.text}" font-size="8.5" font-family="monospace" text-anchor="middle">CU</text>`,
    )
    c.parts.push(pipe([{ x: ahu.x, y: ahu.y - 14 }, { x: ahu.x, y: cu.y }, { x: cu.x - 14, y: cu.y }], p.circuit, '4 3', 1.3))

    c.legend.push([`<g stroke="${p.dim}" stroke-width="1.2"><rect x="2" y="4" width="14" height="14" fill="none"/><line x1="2" y1="4" x2="16" y2="18"/><line x1="16" y1="4" x2="2" y2="18"/></g>`, 'supply diffuser + CFM'])
    c.legend.push([`<rect x="2" y="5" width="16" height="10" fill="none" stroke="${p.leg}" stroke-width="1.3"/><line x1="2" y1="9" x2="18" y2="9" stroke="${p.leg}" stroke-width="0.9"/><line x1="2" y1="12" x2="18" y2="12" stroke="${p.leg}" stroke-width="0.9"/>`, 'return grille'])
    c.legend.push([`<line x1="2" y1="10" x2="18" y2="10" stroke="${p.dim}" stroke-width="5" opacity=".45"/><line x1="2" y1="10" x2="18" y2="10" stroke="${p.dim}" stroke-width="1"/>`, 'supply duct'])
    c.legend.push([`<circle cx="9" cy="10" r="6" fill="none" stroke="${p.device}" stroke-width="1.3"/><text x="9" y="13" fill="${p.device}" font-size="7" text-anchor="middle" font-family="monospace">T</text>`, 'thermostat'])
    c.legend.push([`<rect x="3" y="4" width="13" height="13" fill="none" stroke="${p.wall}" stroke-width="1.2" stroke-dasharray="3 2"/>`, 'condenser (exterior)'])
    return
  }
  const ahu = ft(c, m.wFt - 2.2, 1.6) // air handler, NE
  const cu = ft(c, m.wFt + 1.8, 3.6) // condenser, outside E wall
  const stat = ft(c, m.wFt - 0.45, m.hFt * 0.45) // thermostat on E wall
  const registers = [ft(c, m.wFt * 0.28, m.hFt * 0.3), ft(c, m.wFt * 0.28, m.hFt * 0.72), ft(c, m.wFt * 0.62, m.hFt * 0.72)]
  const ret = ft(c, m.wFt * 0.72, 0.55) // return grille high on N wall

  // Trunk + branch ducts (double-line reading, drawn as wide + centerline).
  const trunk: Pt[] = [ahu, { x: ahu.x, y: registers[1].y }, { x: registers[0].x, y: registers[1].y }]
  c.parts.push(duct(trunk, p))
  c.parts.push(duct([{ x: registers[0].x, y: registers[1].y }, registers[0]], p))
  c.parts.push(duct([{ x: registers[2].x, y: registers[1].y }, registers[2]], p))
  c.parts.push(txt(ahu.x - 84, registers[1].y - 8, '12x8 SUPPLY', p))

  // Return duct to AHU.
  c.parts.push(pipe([ret, { x: ahu.x, y: ret.y }, { x: ahu.x, y: ahu.y - 14 }], p.leg, '8 4', 2))
  c.parts.push(txt(ret.x + 14, ret.y + 4, '14x8 RA', p))

  // Refrigerant lineset to the outdoor condenser (dashed through wall).
  c.parts.push(pipe([{ x: ahu.x + 14, y: ahu.y }, { x: cu.x, y: ahu.y }, { x: cu.x, y: cu.y - 14 }], p.circuit, '4 3', 1.3))

  // Equipment symbols.
  c.parts.push(
    `<rect x="${ahu.x - 16}" y="${ahu.y - 14}" width="32" height="28" fill="none" stroke="${p.wall}" stroke-width="1.6"/>`,
    `<text x="${ahu.x}" y="${ahu.y + 4}" fill="${p.text}" font-size="9" font-family="monospace" text-anchor="middle">AHU</text>`,
    `<rect x="${cu.x - 14}" y="${cu.y - 14}" width="28" height="28" fill="none" stroke="${p.wall}" stroke-width="1.4" stroke-dasharray="4 3"/>`,
    `<text x="${cu.x}" y="${cu.y + 3.5}" fill="${p.text}" font-size="8.5" font-family="monospace" text-anchor="middle">CU</text>`,
  )

  // Registers (supply diffusers) + CFM tags.
  for (const r of registers) {
    registerSymbol(c, r)
    c.parts.push(txt(r.x + 12, r.y - 10, '100 CFM', p))
  }
  // Return grille.
  c.parts.push(`<rect x="${ret.x - 16}" y="${ret.y - 8}" width="32" height="16" fill="none" stroke="${p.leg}" stroke-width="1.5"/>`)
  for (let i = 1; i <= 3; i++)
    c.parts.push(`<line x1="${ret.x - 16}" y1="${ret.y - 8 + i * 4}" x2="${ret.x + 16}" y2="${ret.y - 8 + i * 4}" stroke="${p.leg}" stroke-width="1"/>`)

  // Thermostat.
  c.parts.push(
    `<circle cx="${stat.x}" cy="${stat.y}" r="7" fill="none" stroke="${p.device}" stroke-width="1.5"/>`,
    `<text x="${stat.x}" y="${stat.y + 3.5}" fill="${p.device}" font-size="9" font-family="monospace" text-anchor="middle">T</text>`,
  )

  c.legend.push([`<g stroke="${p.dim}" stroke-width="1.2"><rect x="2" y="4" width="14" height="14" fill="none"/><line x1="2" y1="4" x2="16" y2="18"/><line x1="16" y1="4" x2="2" y2="18"/></g>`, 'supply diffuser'])
  c.legend.push([`<rect x="2" y="5" width="16" height="10" fill="none" stroke="${p.leg}" stroke-width="1.3"/><line x1="2" y1="9" x2="18" y2="9" stroke="${p.leg}" stroke-width="0.9"/><line x1="2" y1="12" x2="18" y2="12" stroke="${p.leg}" stroke-width="0.9"/>`, 'return grille'])
  c.legend.push([`<line x1="2" y1="10" x2="18" y2="10" stroke="${p.dim}" stroke-width="5" opacity=".45"/><line x1="2" y1="10" x2="18" y2="10" stroke="${p.dim}" stroke-width="1"/>`, 'supply duct'])
  c.legend.push([`<circle cx="9" cy="10" r="6" fill="none" stroke="${p.device}" stroke-width="1.3"/><text x="9" y="13" fill="${p.device}" font-size="7" text-anchor="middle" font-family="monospace">T</text>`, 'thermostat'])
  c.legend.push([`<rect x="3" y="4" width="13" height="13" fill="none" stroke="${p.wall}" stroke-width="1.2" stroke-dasharray="3 2"/>`, 'condenser (exterior)'])
}

function registerSymbol(c: Ctx, pt: Pt) {
  const { p } = c
  const r = 9
  c.parts.push(
    `<rect x="${pt.x - r}" y="${pt.y - r}" width="${r * 2}" height="${r * 2}" fill="${p.bg}" stroke="${p.dim}" stroke-width="1.5"/>`,
    `<line x1="${pt.x - r}" y1="${pt.y - r}" x2="${pt.x + r}" y2="${pt.y + r}" stroke="${p.dim}" stroke-width="1.2"/>`,
    `<line x1="${pt.x + r}" y1="${pt.y - r}" x2="${pt.x - r}" y2="${pt.y + r}" stroke="${p.dim}" stroke-width="1.2"/>`,
  )
}

/* ---------- framing sheet (S-1) ------------------------------------- */

function drawFraming(c: Ctx) {
  const { p, m } = c
  const stud = 16 / 12 // 16" o.c. in ft

  // Stud ticks along each wall (skip the door opening).
  const walls: [Wall, number][] = [['N', m.wFt], ['S', m.wFt], ['W', m.hFt], ['E', m.hFt]]
  for (const [wall, len] of walls) {
    for (let f = stud; f < len; f += stud) {
      if (wall === m.door.wall && f > m.door.pos - 0.4 && f < m.door.pos + m.door.width + 0.4) continue
      const pt = wallPoint(c, wall, f)
      const t = 5
      const line =
        wall === 'N' || wall === 'S'
          ? `<line x1="${pt.x}" y1="${pt.y - t}" x2="${pt.x}" y2="${pt.y + t}"`
          : `<line x1="${pt.x - t}" y1="${pt.y}" x2="${pt.x + t}" y2="${pt.y}"`
      c.parts.push(`${line} stroke="${p.device}" stroke-width="1.1"/>`)
    }
  }
  const nLabel = ft(c, m.wFt * 0.14, 0)
  c.parts.push(txt(nLabel.x, nLabel.y + 16, `2x6 STUDS @ 16" O.C.`, p))

  // Headers over the door and window openings.
  const dh1 = wallPoint(c, m.door.wall, m.door.pos)
  const dh2 = wallPoint(c, m.door.wall, m.door.pos + m.door.width)
  c.parts.push(
    `<line x1="${dh1.x}" y1="${dh1.y}" x2="${dh2.x}" y2="${dh2.y}" stroke="${p.light}" stroke-width="4" opacity=".8"/>`,
    txt(dh1.x - 78, (dh1.y + dh2.y) / 2, '(2) 2x10 HDR', p),
  )
  const wh1 = wallPoint(c, m.window.wall, m.window.pos)
  const wh2 = wallPoint(c, m.window.wall, m.window.pos + m.window.width)
  c.parts.push(
    `<line x1="${wh1.x}" y1="${wh1.y}" x2="${wh2.x}" y2="${wh2.y}" stroke="${p.light}" stroke-width="4" opacity=".8"/>`,
    txt(wh1.x + 10, (wh1.y + wh2.y) / 2 + 3, '(2) 2x10 HDR', p),
  )

  // Ceiling joist direction: double-headed arrow across the room.
  const j1 = ft(c, m.wFt * 0.18, m.hFt * 0.42)
  const j2 = ft(c, m.wFt * 0.82, m.hFt * 0.42)
  c.parts.push(
    `<line x1="${j1.x}" y1="${j1.y}" x2="${j2.x}" y2="${j2.y}" stroke="${p.wall}" stroke-width="1.4"/>`,
    `<path d="M${j1.x} ${j1.y} l10 -5 v10 z M${j2.x} ${j2.y} l-10 -5 v10 z" fill="${p.wall}"/>`,
    txt((j1.x + j2.x) / 2 - 62, j1.y - 10, `2x10 CLG JOISTS @ 16" O.C.`, p),
  )

  // Beam over the island span (when there is one) with posts.
  if (m.island) {
    const b1 = ft(c, m.island.x - 1, m.island.y - 1.2)
    const b2 = ft(c, m.island.x + m.island.w + 1, m.island.y - 1.2)
    c.parts.push(
      `<line x1="${b1.x}" y1="${b1.y}" x2="${b2.x}" y2="${b2.y}" stroke="${p.circuit}" stroke-width="5" stroke-dasharray="14 6"/>`,
      `<rect x="${b1.x - 5}" y="${b1.y - 5}" width="10" height="10" fill="${p.circuit}"/>`,
      `<rect x="${b2.x - 5}" y="${b2.y - 5}" width="10" height="10" fill="${p.circuit}"/>`,
      txt((b1.x + b2.x) / 2 - 70, b1.y - 10, '(3) 1-3/4x11-7/8 LVL — ENGINEER TO VERIFY', p),
    )
  }

  c.legend.push([`<line x1="9" y1="3" x2="9" y2="17" stroke="${p.device}" stroke-width="1.2"/><line x1="14" y1="3" x2="14" y2="17" stroke="${p.device}" stroke-width="1.2"/>`, 'studs @ 16" o.c.'])
  c.legend.push([`<line x1="2" y1="10" x2="18" y2="10" stroke="${p.light}" stroke-width="4" opacity=".8"/>`, 'header'])
  c.legend.push([`<line x1="2" y1="10" x2="18" y2="10" stroke="${p.wall}" stroke-width="1.3"/><path d="M2 10 l6 -3 v6 z M18 10 l-6 -3 v6 z" fill="${p.wall}"/>`, 'joist direction'])
  c.legend.push([`<line x1="2" y1="10" x2="18" y2="10" stroke="${p.circuit}" stroke-width="4" stroke-dasharray="8 4"/>`, 'beam (LVL)'])
  c.legend.push([`<rect x="6" y="6" width="8" height="8" fill="${p.circuit}"/>`, 'post'])
}

/* ---------- shared drawing helpers --------------------------------- */

/** Orthogonal pipe/line run through a list of points. */
function pipe(pts: Pt[], stroke: string, dash: string, width: number): string {
  const d = pts.map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt.x} ${pt.y}`).join(' ')
  return `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${width}"${dash ? ` stroke-dasharray="${dash}"` : ''} stroke-linejoin="round"/>`
}

/** Duct: wide translucent band with a centerline, reads as double-line. */
function duct(pts: Pt[], p: Palette): string {
  const d = pts.map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt.x} ${pt.y}`).join(' ')
  return (
    `<path d="${d}" fill="none" stroke="${p.dim}" stroke-width="9" opacity=".35" stroke-linejoin="round"/>` +
    `<path d="${d}" fill="none" stroke="${p.dim}" stroke-width="1.1" stroke-linejoin="round"/>`
  )
}

/** Curved run between two points (quadratic arc, drafting style). */
function curve(a: Pt, b: Pt, stroke: string, dash: string): string {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  // Perpendicular offset for the arc's bow.
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy) || 1
  const bow = Math.min(30, len * 0.3)
  const cx = mx - (dy / len) * bow
  const cy = my + (dx / len) * bow
  return `<path d="M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}" fill="none" stroke="${stroke}" stroke-width="1.2"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}

function curveChain(pts: Pt[], stroke: string, dash: string): string {
  let out = ''
  for (let i = 0; i < pts.length - 1; i++) out += curve(pts[i], pts[i + 1], stroke, dash)
  return out
}

function txt(x: number, y: number, t: string, p: Palette, anchor = 'start'): string {
  return `<text x="${x}" y="${y}" fill="${p.text}" font-size="9.5" font-family="monospace"${anchor !== 'start' ? ` text-anchor="${anchor}"` : ''}>${esc(t)}</text>`
}

function dimLine(x1: number, y1: number, x2: number, y2: number, label: string, p: Palette, vertical: boolean): string {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const ticks = vertical
    ? `<line x1="${x1 - 4}" y1="${y1}" x2="${x1 + 4}" y2="${y1}" stroke="${p.dim}" stroke-width="1"/><line x1="${x2 - 4}" y1="${y2}" x2="${x2 + 4}" y2="${y2}" stroke="${p.dim}" stroke-width="1"/>`
    : `<line x1="${x1}" y1="${y1 - 4}" x2="${x1}" y2="${y1 + 4}" stroke="${p.dim}" stroke-width="1"/><line x1="${x2}" y1="${y2 - 4}" x2="${x2}" y2="${y2 + 4}" stroke="${p.dim}" stroke-width="1"/>`
  const text = vertical
    ? `<text x="${mx}" y="${my}" fill="${p.dim}" font-size="10" font-family="monospace" text-anchor="middle" transform="rotate(90 ${mx} ${my})" dy="-5">${esc(label)}</text>`
    : `<text x="${mx}" y="${my - 6}" fill="${p.dim}" font-size="10" font-family="monospace" text-anchor="middle">${esc(label)}</text>`
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${p.dim}" stroke-width="1"/>${ticks}${text}`
}

/** General notes per trade — the code references a working pro expects. */
const SHEET_NOTES: Record<SheetKind, string[]> = {
  construction: [
    '1. VERIFY ALL FIELD DIMENSIONS BEFORE',
    '   ORDERING OR FABRICATION.',
    '2. DO NOT SCALE DRAWINGS; USE WRITTEN',
    '   DIMENSIONS AND FIELD CONDITIONS.',
    '3. MAINTAIN REQUIRED EGRESS, FIRE-',
    '   BLOCKING AND SMOKE/CO PROTECTION.',
    '4. COORDINATE OPENINGS WITH STRUCTURAL,',
    '   ELECTRICAL, PLUMBING AND MECHANICAL.',
    '5. LOCAL PERMIT AND PROFESSIONAL REVIEW',
    '   REQUIRED BEFORE CONSTRUCTION.',
  ],
  power: [
    '1. ALL WORK PER NEC 2023 AND LOCAL',
    '   AMENDMENTS. PERMIT REQUIRED.',
    '2. KITCHEN/BATH/EXTERIOR/GARAGE',
    '   RECEPTS GFCI PER 210.8.',
    '3. BEDROOM CIRCUITS AFCI PER 210.12.',
    '4. COUNTER RECEPTS MAX 4\'-0" O.C.',
    '   PER 210.52(C).',
    '5. RECEPTS 18" AFF, SWITCHES 48" AFF',
    '   TO C/L, U.N.O.',
    '6. SMOKE/CO ALARMS INTERCONNECTED,',
    '   120V W/ BATTERY BACKUP, R314/R315.',
    '7. VERIFY SERVICE SIZE AND METER',
    '   LOCATION WITH SERVING UTILITY.',
  ],
  lighting: [
    '1. ALL LIGHTING ON DIMMERS U.N.O.',
    '2. RECESSED CANS IC-RATED AIR-TIGHT',
    '   IN INSULATED CEILINGS.',
    '3. SWITCH HEIGHT 48" AFF TO C/L.',
    '4. BATH FANS 50 CFM MIN, VENTED',
    '   TO EXTERIOR, ON TIMER.',
    '5. CLOSET LUMINAIRES PER NEC 410.16.',
    '6. EXTERIOR FIXTURES WET-LISTED.',
  ],
  plumbing: [
    '1. ALL WORK PER IPC/UPC AS ADOPTED.',
    '2. DWV SLOPE 1/4" PER FT MIN (<=3" DIA).',
    '3. VENTS WITHIN TRAP-ARM LIMITS;',
    '   TERMINATE 10\'-0" FROM OPENINGS.',
    '4. WH T&P RELIEF PIPED TO APPROVED',
    '   LOCATION; SEISMIC STRAPS PER CODE.',
    '5. WATER-TEST DWV; PRESSURE-TEST',
    '   SUPPLY AT 50 PSI / 15 MIN.',
    '6. SUPPLY PEX-A W/ MANIFOLD OR EQUAL;',
    '   INSULATE HW RUNS.',
  ],
  hvac: [
    '1. DESIGN PER ACCA MANUAL J / S / D.',
    '2. DUCTS IN UNCONDITIONED SPACE R-8',
    '   MIN, JOINTS MASTIC-SEALED.',
    '3. BALANCE SYSTEM TO CFM SHOWN +/-10%.',
    '4. CONDENSATE TO APPROVED DRAIN W/',
    '   TRAP + OVERFLOW PROTECTION.',
    '5. BATH/KITCHEN EXHAUST VENTED TO',
    '   EXTERIOR — NOT INTO ATTIC.',
    '6. T-STAT 52" AFF ON INTERIOR WALL.',
  ],
  framing: [
    '1. LUMBER DF#2 OR BETTER U.N.O.',
    '2. LVL PER MFR SPEC; 3" MIN BEARING.',
    '3. SIMPSON (OR EQUAL) CONNECTORS',
    '   AS NOTED; NAIL PER SCHEDULE.',
    '4. HEADERS (2) 2x10 U.N.O. AT OPENINGS.',
    '5. FIRE-BLOCK PER IRC R302.11.',
    '6. ENGINEER OF RECORD TO VERIFY ALL',
    '   BEAMS, POSTS AND FOUNDATIONS.',
  ],
}

function drawNotes(c: Ctx, kind: SheetKind) {
  const { p } = c
  const lx = W - 218
  const top = M + 8 + c.legend.length * 26 + 34 + 14
  const lines = SHEET_NOTES[kind]
  const maxLines = Math.floor((H - 90 - top - 24) / 12.5)
  const shown = lines.slice(0, Math.max(0, maxLines))
  c.parts.push(
    `<text x="${lx}" y="${top}" fill="${p.text}" font-size="10" font-family="monospace" letter-spacing="2.5">GENERAL NOTES</text>`,
  )
  shown.forEach((line, i) =>
    c.parts.push(
      `<text x="${lx}" y="${top + 16 + i * 12.5}" fill="${p.dim}" font-size="8.5" font-family="monospace">${esc(line)}</text>`,
    ),
  )
}

function drawLegend(c: Ctx, kind: SheetKind) {
  const { p } = c
  const lx = W - 218
  const ly = M + 8
  c.parts.push(
    `<rect x="${lx - 14}" y="${ly - 6}" width="200" height="${c.legend.length * 26 + 34}" fill="none" stroke="${p.dim}" stroke-width="1"/>`,
    `<text x="${lx}" y="${ly + 12}" fill="${p.text}" font-size="10" font-family="monospace" letter-spacing="2.5">LEGEND — ${SHEET_META[kind].name.split(' ')[0]}</text>`,
  )
  c.legend.forEach(([glyph, label], i) => {
    const y = ly + 28 + i * 26
    c.parts.push(`<g transform="translate(${lx}, ${y})">${glyph}</g>`, `<text x="${lx + 42}" y="${y + 13}" fill="${p.text}" font-size="10.5" font-family="Arial, sans-serif">${esc(label)}</text>`)
  })
}

function drawTitleBlock(c: Ctx, pkg: ProjectPackage, kind: SheetKind, theme: SheetTheme) {
  const p = c.p
  const ty = H - 74
  const sheetNo = SHEET_META[kind].no
  const sheetName = SHEET_META[kind].name
  c.parts.push(
    `<rect x="24" y="${ty}" width="${W - 48}" height="52" fill="none" stroke="${p.title}" stroke-width="1.2"/>`,
    `<line x1="${W * 0.5}" y1="${ty}" x2="${W * 0.5}" y2="${ty + 52}" stroke="${p.title}" stroke-width="1"/>`,
    `<line x1="${W * 0.72}" y1="${ty}" x2="${W * 0.72}" y2="${ty + 52}" stroke="${p.title}" stroke-width="1"/>`,
    `<line x1="${W * 0.87}" y1="${ty}" x2="${W * 0.87}" y2="${ty + 52}" stroke="${p.title}" stroke-width="1"/>`,
    `<text x="34" y="${ty + 21}" fill="${p.text}" font-size="12" font-family="monospace" font-weight="bold">${esc(pkg.headline.toUpperCase().slice(0, 46))}</text>`,
    `<text x="34" y="${ty + 40}" fill="${p.dim}" font-size="10" font-family="monospace">CADVORA · ${theme === 'autocad' ? 'MODEL SPACE PREVIEW' : 'DRAFT PLAN SET'}</text>`,
    `<text x="${W * 0.5 + 12}" y="${ty + 21}" fill="${p.text}" font-size="11" font-family="monospace">${sheetName}</text>`,
    `<text x="${W * 0.5 + 12}" y="${ty + 40}" fill="${p.dim}" font-size="9.5" font-family="monospace">SCALE: 1/4" = 1'-0" (NOM.)</text>`,
    `<text x="${W * 0.72 + 12}" y="${ty + 21}" fill="${p.light}" font-size="10" font-family="monospace">DRAFT</text>`,
    `<text x="${W * 0.72 + 12}" y="${ty + 40}" fill="${p.dim}" font-size="8.5" font-family="monospace">NOT FOR CONSTRUCTION</text>`,
    `<text x="${W * 0.87 + 14}" y="${ty + 34}" fill="${p.text}" font-size="22" font-family="monospace" font-weight="bold">${sheetNo}</text>`,
  )
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n))
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!)
}

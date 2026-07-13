/**
 * DXF (R12 ASCII) export — the CAD handoff.
 *
 * Generates a real .dxf an electrician or drafter can open in AutoCAD,
 * LibreCAD, or any CAD viewer: architectural shell plus the electrical
 * power + lighting layers, in feet, on named layers with ACI colors.
 *
 * R12 entities only (LINE, CIRCLE, ARC, TEXT) for maximum compatibility.
 * Geometry comes from the same PlanModel + layouts that draw the SVG
 * sheets, so what you see is what the pro opens.
 */

import type { Answers, ProjectPackage } from '../interview/engine'
import { buildModel, layoutLighting, layoutPower, type PlanEdits, type PlanModel } from './drawing'

// AutoCAD Color Index: 7 white, 4 cyan, 2 yellow, 1 red, 3 green, 8 gray.
const LAYERS: [name: string, aci: number][] = [
  ['A-WALL', 7],
  ['A-DOOR', 8],
  ['A-GLAZ', 4],
  ['A-CASE', 8],
  ['E-POWR', 4],
  ['E-LITE', 2],
  ['E-CIRC', 1],
  ['ANNO', 3],
]

class Dxf {
  private ents: string[] = []
  private g(code: number, value: string | number) {
    this.ents.push(`${code}`, `${value}`)
  }

  line(layer: string, x1: number, y1: number, x2: number, y2: number) {
    this.g(0, 'LINE'); this.g(8, layer)
    this.g(10, r(x1)); this.g(20, r(y1)); this.g(30, 0)
    this.g(11, r(x2)); this.g(21, r(y2)); this.g(31, 0)
  }

  circle(layer: string, x: number, y: number, radius: number) {
    this.g(0, 'CIRCLE'); this.g(8, layer)
    this.g(10, r(x)); this.g(20, r(y)); this.g(30, 0); this.g(40, r(radius))
  }

  arc(layer: string, x: number, y: number, radius: number, a1: number, a2: number) {
    this.g(0, 'ARC'); this.g(8, layer)
    this.g(10, r(x)); this.g(20, r(y)); this.g(30, 0); this.g(40, r(radius))
    this.g(50, r(a1)); this.g(51, r(a2))
  }

  text(layer: string, x: number, y: number, height: number, value: string) {
    this.g(0, 'TEXT'); this.g(8, layer)
    this.g(10, r(x)); this.g(20, r(y)); this.g(30, 0); this.g(40, r(height)); this.g(1, value)
  }

  rect(layer: string, x: number, y: number, w: number, h: number) {
    this.line(layer, x, y, x + w, y)
    this.line(layer, x + w, y, x + w, y + h)
    this.line(layer, x + w, y + h, x, y + h)
    this.line(layer, x, y + h, x, y)
  }

  toString(): string {
    const out: string[] = []
    const push = (code: number, value: string | number) => out.push(`${code}`, `${value}`)
    // TABLES: layer definitions.
    push(0, 'SECTION'); push(2, 'TABLES')
    push(0, 'TABLE'); push(2, 'LAYER'); push(70, LAYERS.length)
    for (const [name, aci] of LAYERS) {
      push(0, 'LAYER'); push(2, name); push(70, 0); push(62, aci); push(6, 'CONTINUOUS')
    }
    push(0, 'ENDTAB'); push(0, 'ENDSEC')
    // ENTITIES.
    push(0, 'SECTION'); push(2, 'ENTITIES')
    out.push(...this.ents)
    push(0, 'ENDSEC'); push(0, 'EOF')
    return out.join('\n') + '\n'
  }
}

function r(n: number): string {
  return (Math.round(n * 1000) / 1000).toString()
}

export function generateDXF(a: Answers, pkg: ProjectPackage, edits?: PlanEdits): string {
  const m = buildModel(a, pkg)
  const d = new Dxf()
  // DXF Y grows up; the plan model's grows down — flip.
  const Y = (y: number) => m.hFt - y

  drawShell(d, m, Y)
  drawPowerLayer(d, m, Y, edits)
  drawLightingLayer(d, m, Y, edits)

  // Annotation.
  d.text('ANNO', m.wFt / 2 - 2.4, Y(m.hFt / 2) - 0.4, 0.5, m.isKitchen ? 'KITCHEN' : 'ROOM')
  d.text('ANNO', 0, -1.2, 0.35, `${pkg.headline.toUpperCase()} - CADVORA DRAFT - NOT FOR CONSTRUCTION`)
  d.text('ANNO', 0, -1.9, 0.28, `E-1/E-2 COMBINED - UNITS: FEET - SCALE FROM DIMENSIONS`)

  return d.toString()
}

function drawShell(d: Dxf, m: PlanModel, Y: (y: number) => number) {
  const door = m.door
  // Walls with the door gap (door lives on the E wall in the model).
  d.line('A-WALL', 0, Y(0), m.wFt, Y(0))
  d.line('A-WALL', 0, Y(m.hFt), m.wFt, Y(m.hFt))
  d.line('A-WALL', 0, Y(0), 0, Y(m.hFt))
  if (door.wall === 'E') {
    d.line('A-WALL', m.wFt, Y(0), m.wFt, Y(door.pos))
    d.line('A-WALL', m.wFt, Y(door.pos + door.width), m.wFt, Y(m.hFt))
    // Door leaf + swing.
    d.line('A-DOOR', m.wFt, Y(door.pos), m.wFt - door.width, Y(door.pos))
    d.arc('A-DOOR', m.wFt, Y(door.pos), door.width, 180, 270)
  } else {
    d.line('A-WALL', m.wFt, Y(0), m.wFt, Y(m.hFt))
  }
  // Window (triple line) on the W wall.
  const w = m.window
  for (const off of [-0.12, 0, 0.12]) d.line('A-GLAZ', off, Y(w.pos), off, Y(w.pos + w.width))
  // Counters + island.
  for (const c of m.counters) d.rect('A-CASE', c.x, Y(c.y + c.h), c.w, c.h)
  if (m.island) d.rect('A-CASE', m.island.x, Y(m.island.y + m.island.h), m.island.w, m.island.h)
  // Appliance tags.
  for (const ap of m.appliances) d.text('A-CASE', ap.x + 0.3, Y(ap.y), 0.3, ap.label)
}

function drawPowerLayer(d: Dxf, m: PlanModel, Y: (y: number) => number, edits?: PlanEdits) {
  const devices = layoutPower(m, edits)
  const recep = (x: number, y: number, gfci: boolean) => {
    d.circle('E-POWR', x, Y(y), 0.22)
    d.line('E-POWR', x - 0.38, Y(y), x - 0.22, Y(y))
    d.line('E-POWR', x + 0.22, Y(y), x + 0.38, Y(y))
    if (gfci) d.text('E-POWR', x - 0.45, Y(y) + 0.32, 0.22, 'GFCI')
  }
  for (const dev of devices) {
    recep(dev.x, dev.y, dev.kind === 'gfci')
    if (dev.kind === 'dedicated' && dev.label) d.text('E-POWR', dev.x + 0.4, Y(dev.y) + 0.3, 0.22, dev.label)
    if (dev.circuit) d.text('E-CIRC', dev.x + 0.4, Y(dev.y) - 0.45, 0.2, `CKT ${dev.circuit}`)
  }
  // Circuit chain (straight segments on the circuit layer).
  const chain = (pts: { x: number; y: number }[]) => {
    for (let i = 0; i < pts.length - 1; i++) d.line('E-CIRC', pts[i].x, Y(pts[i].y), pts[i + 1].x, Y(pts[i + 1].y))
  }
  const gfci = devices.filter((dev) => dev.kind === 'gfci')
  const plain = devices.filter((dev) => dev.kind === 'recep')
  if (gfci.length > 1) chain(gfci)
  if (plain.length > 1) chain(plain)
}

function drawLightingLayer(d: Dxf, m: PlanModel, Y: (y: number) => number, edits?: PlanEdits) {
  for (const dev of layoutLighting(m, edits)) {
    if (dev.kind === 'can') {
      d.circle('E-LITE', dev.x, Y(dev.y), 0.35)
      const k = 0.25
      d.line('E-LITE', dev.x - k, Y(dev.y) - k, dev.x + k, Y(dev.y) + k)
      d.line('E-LITE', dev.x - k, Y(dev.y) + k, dev.x + k, Y(dev.y) - k)
    } else if (dev.kind === 'pendant') {
      d.circle('E-LITE', dev.x, Y(dev.y), 0.35)
      d.circle('E-LITE', dev.x, Y(dev.y), 0.12)
    } else if (dev.kind === 'uc') {
      d.circle('E-LITE', dev.x, Y(dev.y), 0.18)
      d.text('E-LITE', dev.x + 0.3, Y(dev.y) - 0.1, 0.18, 'UC')
    } else {
      d.text('E-LITE', dev.x - 0.15, Y(dev.y) - 0.15, 0.35, dev.label ?? 'S')
    }
  }
}

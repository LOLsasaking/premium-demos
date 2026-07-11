/**
 * Draft plan drawing generator.
 *
 * Produces a blueprint-style SVG floor plan from the interview answers:
 * walls, door, window, receptacles spaced per NEC 210.52 (no point along a
 * wall more than 6 ft from an outlet → ~12 ft spacing), a recessed lighting
 * grid, panel location, EV charger, plumbing fixtures and HVAC registers for
 * the disciplines in the package — plus a legend and a title block.
 *
 * Returns an SVG *string* so the same drawing renders in the React app and
 * embeds directly into the exported package document. Deterministic on
 * purpose: same answers, same drawing.
 */

import { AREA_SQFT, type Answers, type ProjectPackage } from '../interview/engine'

const BLUE = '#5B9BFF'
const CYAN = '#22D3EE'
const AMBER = '#F59E0B'
const GRAY = '#8DA0BF'
const INK = '#0B1220'
const LINE = 'rgba(91,155,255,.16)'

export function hasPlanDrawing(pkg: ProjectPackage): boolean {
  return pkg.disciplines.some((d) => d === 'electrical' || d === 'plumbing' || d === 'hvac')
}

export function generatePlanSVG(a: Answers, pkg: ProjectPackage): string {
  const sqft = AREA_SQFT[a.area] ?? 275
  // Room proportions ~4:3.
  const wFt = Math.max(10, Math.round(Math.sqrt((sqft * 4) / 3)))
  const hFt = Math.max(8, Math.round(sqft / wFt))

  const W = 640
  const H = 470
  const planW = 400
  const planH = 260
  const s = Math.min(planW / wFt, planH / hFt) // px per ft
  const rw = wFt * s
  const rh = hFt * s
  const x0 = 48
  const y0 = 64
  const x1 = x0 + rw
  const y1 = y0 + rh

  const has = (d: string) => pkg.disciplines.includes(d as ProjectPackage['disciplines'][number])
  const parts: string[] = []
  const legend: [string, string][] = []

  // Backdrop + grid.
  parts.push(`<rect width="${W}" height="${H}" fill="${INK}"/>`)
  for (let gx = 0; gx <= W; gx += 20) parts.push(`<line x1="${gx}" y1="0" x2="${gx}" y2="${H}" stroke="${LINE}" stroke-width="0.5"/>`)
  for (let gy = 0; gy <= H; gy += 20) parts.push(`<line x1="0" y1="${gy}" x2="${W}" y2="${gy}" stroke="${LINE}" stroke-width="0.5"/>`)

  // Walls (door gap on bottom wall).
  const doorW = Math.min(3 * s, rw * 0.25)
  const doorX = x0 + rw * 0.15
  parts.push(
    `<path d="M${x0} ${y0} H${x1} V${y1} H${doorX + doorW} M${doorX} ${y1} H${x0} Z M${x0} ${y1} V${y0}" fill="none" stroke="${BLUE}" stroke-width="3"/>`,
  )
  // Door swing arc.
  parts.push(
    `<path d="M${doorX} ${y1} v${-doorW}" stroke="${GRAY}" stroke-width="1.4"/><path d="M${doorX} ${y1 - doorW} A${doorW} ${doorW} 0 0 1 ${doorX + doorW} ${y1}" fill="none" stroke="${GRAY}" stroke-width="1" stroke-dasharray="3 3"/>`,
  )
  // Window on top wall.
  const winW = Math.min(4 * s, rw * 0.3)
  const winX = x0 + rw * 0.55
  parts.push(
    `<line x1="${winX}" y1="${y0}" x2="${winX + winW}" y2="${y0}" stroke="${INK}" stroke-width="3"/><line x1="${winX}" y1="${y0}" x2="${winX + winW}" y2="${y0}" stroke="${CYAN}" stroke-width="1.6"/><line x1="${winX}" y1="${y0 - 3}" x2="${winX + winW}" y2="${y0 - 3}" stroke="${CYAN}" stroke-width="1"/>`,
  )

  // Dimension labels.
  parts.push(dim(x0, y0 - 18, x1, y0 - 18, `${wFt}'-0"`))
  parts.push(dim(x1 + 18, y0, x1 + 18, y1, `${hFt}'-0"`, true))

  let outlets = 0
  if (has('electrical')) {
    // Receptacles: one per ≤12 ft of wall run (NEC 210.52 spirit).
    const place: [number, number, number][] = [] // x, y, rotation
    const walls: { len: number; pt: (t: number) => [number, number]; rot: number }[] = [
      { len: wFt, pt: (t) => [x0 + t * rw, y0], rot: 0 },
      { len: wFt, pt: (t) => [x0 + t * rw, y1], rot: 180 },
      { len: hFt, pt: (t) => [x0, y0 + t * rh], rot: 270 },
      { len: hFt, pt: (t) => [x1, y0 + t * rh], rot: 90 },
    ]
    for (const w of walls) {
      const count = Math.max(2, Math.ceil(w.len / 12))
      for (let i = 1; i <= count; i++) {
        const t = i / (count + 1)
        const [px, py] = w.pt(t)
        // Skip the door gap.
        if (Math.abs(py - y1) < 2 && px > doorX - 6 && px < doorX + doorW + 6) continue
        place.push([px, py, w.rot])
        outlets++
      }
    }
    for (const [px, py, rot] of place)
      parts.push(
        `<g transform="translate(${px} ${py}) rotate(${rot})"><circle r="4.5" fill="${INK}" stroke="${BLUE}" stroke-width="1.6"/><line x1="-4.5" y1="0" x2="-7.5" y2="0" stroke="${BLUE}" stroke-width="1.6"/><line x1="4.5" y1="0" x2="7.5" y2="0" stroke="${BLUE}" stroke-width="1.6"/></g>`,
      )
    legend.push(['⏛ duplex receptacle', BLUE])

    // Recessed lighting grid ~8 ft o.c.
    const cols = Math.max(1, Math.round(wFt / 8))
    const rows = Math.max(1, Math.round(hFt / 8))
    for (let c = 1; c <= cols; c++)
      for (let r = 1; r <= rows; r++) {
        const lx = x0 + (c / (cols + 1)) * rw
        const ly = y0 + (r / (rows + 1)) * rh
        parts.push(
          `<g stroke="${AMBER}" stroke-width="1.4"><circle cx="${lx}" cy="${ly}" r="6" fill="none"/><line x1="${lx - 4.2}" y1="${ly - 4.2}" x2="${lx + 4.2}" y2="${ly + 4.2}"/><line x1="${lx - 4.2}" y1="${ly + 4.2}" x2="${lx + 4.2}" y2="${ly - 4.2}"/></g>`,
        )
      }
    legend.push(['⊗ recessed LED', AMBER])

    // Switch by the door + panel top-left.
    parts.push(
      `<text x="${doorX + doorW + 8}" y="${y1 - 6}" fill="${BLUE}" font-size="11" font-family="monospace">S₃</text>`,
    )
    parts.push(
      `<rect x="${x0 - 7}" y="${y0 + 14}" width="14" height="26" fill="${BLUE}" rx="2"/><text x="${x0 - 24}" y="${y0 + 31}" fill="${BLUE}" font-size="10" font-family="monospace">P</text>`,
    )
    legend.push(['▮ panel (P)', BLUE])

    if (a.ev === 'yes' || a.ev === 'future') {
      parts.push(
        `<rect x="${x0 - 8}" y="${y1 - 46}" width="16" height="22" fill="none" stroke="${AMBER}" stroke-width="1.6" rx="3"/><text x="${x0 - 30}" y="${y1 - 30}" fill="${AMBER}" font-size="10" font-family="monospace">EV</text>`,
      )
      legend.push(['▯ EV charger 240V/50A', AMBER])
    }
  }

  if (has('plumbing')) {
    // Sink centered under the window with supply/drain drop.
    const sx = winX + winW / 2
    parts.push(
      `<rect x="${sx - 16}" y="${y0 + 4}" width="32" height="16" fill="none" stroke="${CYAN}" stroke-width="1.6" rx="3"/><circle cx="${sx}" cy="${y0 + 12}" r="4" fill="none" stroke="${CYAN}" stroke-width="1.4"/>`,
    )
    // Water heater in the corner.
    const wx = x1 - 22
    const wy = y1 - 22
    parts.push(
      `<circle cx="${wx}" cy="${wy}" r="13" fill="none" stroke="${CYAN}" stroke-width="1.6"/><text x="${wx}" y="${wy + 3.5}" fill="${CYAN}" font-size="9" font-family="monospace" text-anchor="middle">WH</text>`,
    )
    // Supply run.
    parts.push(
      `<path d="M${wx} ${wy - 13} V${y0 + 12} H${sx + 16}" fill="none" stroke="${CYAN}" stroke-width="1.4" stroke-dasharray="6 4"/>`,
    )
    legend.push(['◌ fixture / WH, ─ ─ supply', CYAN])
  }

  if (has('hvac')) {
    // Two supply registers + dashed duct run.
    const r1x = x0 + rw * 0.3
    const r2x = x0 + rw * 0.7
    const ry = y0 + rh * 0.5
    for (const rx of [r1x, r2x])
      parts.push(
        `<g stroke="${GRAY}" stroke-width="1.4"><rect x="${rx - 8}" y="${ry - 8}" width="16" height="16" fill="none"/><line x1="${rx - 8}" y1="${ry - 8}" x2="${rx + 8}" y2="${ry + 8}"/><line x1="${rx + 8}" y1="${ry - 8}" x2="${rx - 8}" y2="${ry + 8}"/></g>`,
      )
    parts.push(
      `<line x1="${r1x}" y1="${ry}" x2="${r2x}" y2="${ry}" stroke="${GRAY}" stroke-width="1.2" stroke-dasharray="8 5"/>`,
    )
    legend.push(['⊠ supply register', GRAY])
  }

  // Legend block.
  const lx = x1 + 44
  parts.push(`<text x="${lx}" y="${y0 + 4}" fill="${GRAY}" font-size="10" font-family="monospace" letter-spacing="2">LEGEND</text>`)
  legend.forEach(([label, color], i) =>
    parts.push(`<text x="${lx}" y="${y0 + 24 + i * 18}" fill="${color}" font-size="11" font-family="monospace">${esc(label)}</text>`),
  )

  // Title block.
  const ty = H - 64
  parts.push(
    `<rect x="24" y="${ty}" width="${W - 48}" height="46" fill="none" stroke="${BLUE}" stroke-width="1"/>`,
    `<line x1="${W * 0.55}" y1="${ty}" x2="${W * 0.55}" y2="${ty + 46}" stroke="${BLUE}" stroke-width="1"/>`,
    `<line x1="${W * 0.78}" y1="${ty}" x2="${W * 0.78}" y2="${ty + 46}" stroke="${BLUE}" stroke-width="1"/>`,
    `<text x="34" y="${ty + 19}" fill="#E6EDF7" font-size="12" font-family="monospace" font-weight="bold">${esc(pkg.headline.toUpperCase().slice(0, 42))}</text>`,
    `<text x="34" y="${ty + 36}" fill="${GRAY}" font-size="10" font-family="monospace">BUILDWISE AI · DRAFT PLAN E-1</text>`,
    `<text x="${W * 0.55 + 10}" y="${ty + 19}" fill="${GRAY}" font-size="10" font-family="monospace">AREA ~${wFt}×${hFt} FT</text>`,
    `<text x="${W * 0.55 + 10}" y="${ty + 36}" fill="${GRAY}" font-size="10" font-family="monospace">${outlets ? `RECEPTACLES: ${outlets}` : 'SCHEMATIC'}</text>`,
    `<text x="${W * 0.78 + 10}" y="${ty + 19}" fill="${AMBER}" font-size="10" font-family="monospace">DRAFT</text>`,
    `<text x="${W * 0.78 + 10}" y="${ty + 36}" fill="${GRAY}" font-size="9" font-family="monospace">NOT FOR CONSTRUCTION</text>`,
  )

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Draft plan drawing">${parts.join('')}</svg>`
}

/** Dimension line with arrowheads and a centered label. */
function dim(x1: number, y1: number, x2: number, y2: number, label: string, vertical = false): string {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const text = vertical
    ? `<text x="${mx}" y="${my}" fill="${GRAY}" font-size="10" font-family="monospace" text-anchor="middle" transform="rotate(90 ${mx} ${my})" dy="-4">${esc(label)}</text>`
    : `<text x="${mx}" y="${my - 5}" fill="${GRAY}" font-size="10" font-family="monospace" text-anchor="middle">${esc(label)}</text>`
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${GRAY}" stroke-width="1"/>${text}`
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
}

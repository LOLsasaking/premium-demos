import type { LightDevice, PlanModel, PowerDevice } from './drawing'
import type { ModelPlacement } from './modelKit'

export interface CodeProfile {
  jurisdiction: string
  residentialCode: '2021 IRC' | '2024 IRC'
  electricalCode: '2020 NEC' | '2023 NEC'
}

export type CodeCheckStatus = 'pass' | 'warn' | 'block' | 'review'

export interface CodeCheck {
  id: string
  discipline: 'electrical' | 'plumbing' | 'fire' | 'general'
  status: CodeCheckStatus
  title: string
  detail: string
  reference: string
  sourceUrl: string
}

const SOURCES = {
  electrical: 'https://codes.iccsafe.org/content/IRC2021P3/chapter-39-power-and-lighting-distribution',
  bathroomReceptacle: 'https://codes.iccsafe.org/s/IRC2021P2/chapter-39-power-and-lighting-distribution/IRC2021P2-Pt08-Ch39-SecE3901.6',
  wetLight: 'https://codes.iccsafe.org/content/IRC2021P3/chapter-40-devices-and-luminaires',
  plumbingFixture: 'https://codes.iccsafe.org/s/IPC2021P1/chapter-4-fixtures-faucets-and-fixture-fittings/IPC2021P1-Ch04-Sec405.3.1',
  shower: 'https://codes.iccsafe.org/content/IRC2021V3.0/chapter-27-plumbing-fixtures',
  fire: 'https://codes.iccsafe.org/content/IRC2021P1/chapter-3-building-planning',
} as const

const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y)
const footprintBounds = (item: ModelPlacement) => {
  const angle = item.rotation ?? 0
  const halfW = (Math.abs(Math.cos(angle)) * item.width + Math.abs(Math.sin(angle)) * item.depth) / 2
  const halfH = (Math.abs(Math.sin(angle)) * item.width + Math.abs(Math.cos(angle)) * item.depth) / 2
  const cx = item.x + item.width / 2
  const cy = item.y + item.depth / 2
  return { left: cx - halfW, right: cx + halfW, top: cy - halfH, bottom: cy + halfH }
}

export function evaluatePlanChecks(
  model: PlanModel,
  power: PowerDevice[],
  lighting: LightDevice[],
  profile: CodeProfile,
  furniture: ModelPlacement[] = [],
): CodeCheck[] {
  const checks: CodeCheck[] = []
  const lavatories = model.appliances.filter((fixture) => fixture.label === 'LAV')
  const gfci = power.filter((device) => device.kind === 'gfci')

  if (lavatories.length > 0 && model.hasPlumbing) {
    const maxNearest = Math.max(...lavatories.map((lav) => Math.min(...gfci.map((outlet) => distance(lav, outlet)), Infinity)))
    checks.push({
      id: 'bath-gfci', discipline: 'electrical', status: maxNearest <= 3 ? 'pass' : 'block',
      title: maxNearest <= 3 ? 'Bathroom receptacle is within 3 ft of the basin' : 'Bathroom basin needs a nearby GFCI receptacle',
      detail: maxNearest <= 3 ? `Nearest generated GFCI is ${maxNearest.toFixed(1)} ft from a basin.` : 'Place at least one GFCI-protected receptacle within 36 inches of each lavatory basin and verify the dedicated bathroom circuit.',
      reference: `${profile.residentialCode} E3901.6; ${profile.electricalCode} 210.52(D), 210.8`, sourceUrl: SOURCES.bathroomReceptacle,
    })
  }

  if (model.isKitchen) {
    checks.push({
      id: 'kitchen-counter-gfci', discipline: 'electrical', status: gfci.length > 0 ? 'pass' : 'block',
      title: gfci.length > 0 ? `${gfci.length} countertop GFCI locations are represented` : 'Kitchen countertop receptacles need GFCI locations',
      detail: 'Verify countertop/work-surface spacing, required small-appliance branch circuits, island/peninsula rules, and local amendments against the selected adopted code.',
      reference: `${profile.residentialCode} E3901.3–E3901.4; ${profile.electricalCode} 210.52(C), 210.8`, sourceUrl: SOURCES.electrical,
    })
  }

  for (const shower of model.appliances.filter((fixture) => fixture.label === 'SHWR')) {
    const widthIn = (shower.w ?? 0) * 12
    const depthIn = (shower.h ?? 0) * 12
    const area = widthIn * depthIn
    const passes = area >= 900 && Math.min(widthIn, depthIn) >= 30
    checks.push({
      id: 'shower-size', discipline: 'plumbing', status: passes ? 'pass' : 'block',
      title: passes ? 'Shower compartment meets the model-code minimum size' : 'Shower compartment is undersized',
      detail: `${Math.round(widthIn)} × ${Math.round(depthIn)} in (${Math.round(area)} sq in). Baseline minimum is 900 sq in with a 30 in minimum dimension; exceptions require separate review.`,
      reference: `${profile.residentialCode} P2708.1`, sourceUrl: SOURCES.shower,
    })
  }

  for (const toilet of model.appliances.filter((fixture) => fixture.label === 'WC')) {
    const sideClearance = Math.min(toilet.x, model.wFt - toilet.x) * 12
    checks.push({
      id: 'toilet-side-clearance', discipline: 'plumbing', status: sideClearance >= 15 ? 'pass' : 'block',
      title: sideClearance >= 15 ? 'Water-closet side clearance is available' : 'Water closet is too close to a side obstruction',
      detail: `${Math.round(sideClearance)} in from centerline to the nearest footprint edge. Confirm 21 in clear in front and check vanity, door swing, and local amendments.`,
      reference: '2021 IPC 405.3.1 / IRC P2705.1', sourceUrl: SOURCES.plumbingFixture,
    })
  }

  if (model.rooms?.some((room) => room.type === 'bed')) {
    checks.push({
      id: 'smoke-alarm-review', discipline: 'fire', status: 'review',
      title: 'Smoke/CO alarm layout requires confirmation',
      detail: 'Confirm an alarm in every sleeping room, outside each sleeping area, and on every story; keep smoke alarms at least 3 ft from bathroom openings where practicable.',
      reference: `${profile.residentialCode} R314.3 and R315.3`, sourceUrl: SOURCES.fire,
    })
  }

  const fixedLights = lighting.filter((device) => device.kind === 'can' || device.kind === 'pendant' || device.kind === 'uc')
  checks.push({
    id: 'lighting-coverage', discipline: 'electrical', status: fixedLights.length > 0 ? 'pass' : 'warn',
    title: fixedLights.length > 0 ? `${fixedLights.length} lighting outlets are represented` : 'No lighting outlet is represented',
    detail: 'Fixture photometrics, circuit loading, box fill, conductor sizing, and switching still require project-specific design review.',
    reference: `${profile.residentialCode} E3903; ${profile.electricalCode} 210.70`, sourceUrl: SOURCES.electrical,
  })

  const collisions: [ModelPlacement, ModelPlacement][] = []
  for (let i = 0; i < furniture.length; i++) for (let j = i + 1; j < furniture.length; j++) {
    const a = furniture[i]
    const b = furniture[j]
    const ab = footprintBounds(a)
    const bb = footprintBounds(b)
    const overlapX = Math.min(ab.right, bb.right) - Math.max(ab.left, bb.left)
    const overlapY = Math.min(ab.bottom, bb.bottom) - Math.max(ab.top, bb.top)
    if (overlapX > 0.15 && overlapY > 0.15) collisions.push([a, b])
  }
  checks.push({
    id: 'object-clearance', discipline: 'general', status: collisions.length ? 'warn' : 'pass',
    title: collisions.length ? `${collisions.length} object-footprint conflict${collisions.length === 1 ? '' : 's'} detected` : 'Modeled object footprints do not overlap',
    detail: collisions.length
      ? collisions.slice(0, 3).map(([a, b]) => `${a.kind.replace(/-/g, ' ')} overlaps ${b.kind.replace(/-/g, ' ')}`).join('; ') + '. Verify circulation, required fixture clearances, door swings, and accessibility dimensions.'
      : 'Measured plan footprints clear one another. Door swings, work clearances, accessibility, and manufacturer service zones still require project review.',
    reference: 'Measured coordination screen; verify applicable IRC/IPC and accessibility provisions', sourceUrl: SOURCES.fire,
  })
  const outside = furniture.filter((item) => {
    const bounds = footprintBounds(item)
    return bounds.left < 0 || bounds.top < 0 || bounds.right > model.wFt || bounds.bottom > model.hFt
  })
  checks.push({
    id: 'object-boundary', discipline: 'general', status: outside.length ? 'block' : 'pass',
    title: outside.length ? `${outside.length} rotated object${outside.length === 1 ? '' : 's'} cross the modeled boundary` : 'Object footprints stay inside the modeled boundary',
    detail: outside.length ? `${outside.map((item) => item.kind.replace(/-/g, ' ')).join(', ')} must be moved or rotated within the plan.` : 'Measured rotated bounding boxes remain inside the generated footprint.',
    reference: 'Measured plan geometry', sourceUrl: SOURCES.fire,
  })

  checks.push({
    id: 'authority-review', discipline: 'general', status: 'review',
    title: `${profile.jurisdiction} adoption and amendments must be verified`,
    detail: 'This is an automated model-code screen, not permit approval. A licensed professional and the authority having jurisdiction must verify the adopted editions, amendments, existing conditions, and final documents.',
    reference: `${profile.residentialCode} / ${profile.electricalCode} model-code baseline`, sourceUrl: SOURCES.electrical,
  })
  return checks
}

export function evaluateProposedLight(
  model: PlanModel,
  proposal: { x: number; y: number; wetLocationRated: boolean },
  profile: CodeProfile,
): CodeCheck {
  if (proposal.x < 0 || proposal.y < 0 || proposal.x > model.wFt || proposal.y > model.hFt) {
    return { id: 'proposed-light', discipline: 'electrical', status: 'block', title: 'Light is outside the modeled room', detail: 'Move the fixture inside the finished room boundary.', reference: 'Plan geometry', sourceUrl: SOURCES.electrical }
  }
  const wetFixture = model.appliances.find((fixture) => {
    if (fixture.label !== 'SHWR' && fixture.label !== 'TUB') return false
    const halfW = (fixture.w ?? 3) / 2
    const halfH = (fixture.h ?? 3) / 2
    return proposal.x >= fixture.x - halfW && proposal.x <= fixture.x + halfW && proposal.y >= fixture.y - halfH && proposal.y <= fixture.y + halfH
  })
  if (wetFixture && !proposal.wetLocationRated) {
    return { id: 'proposed-light', discipline: 'electrical', status: 'block', title: 'Select a wet-location-rated luminaire', detail: 'The proposed fixture is within the actual tub/shower footprint and may be subject to spray.', reference: `${profile.residentialCode} E4003.9 and E4003.11; ${profile.electricalCode} 410.10(D)`, sourceUrl: SOURCES.wetLight }
  }
  return { id: 'proposed-light', discipline: 'electrical', status: 'review', title: wetFixture ? 'Wet-location rating selected' : 'Location clears the basic geometric screen', detail: 'Confirm listing, mounting type, clearances, circuit loading, switching, and local amendments before installation.', reference: `${profile.residentialCode} E4003.11; ${profile.electricalCode} 410.10(D)`, sourceUrl: SOURCES.wetLight }
}

/**
 * BuildWise AI — interview engine + construction-package generator.
 *
 * This module is the self-contained "brain" of the MVP. It runs a branching
 * contractor-style interview and turns the answers into a structured
 * construction package (per-discipline deliverables, material list, cost band,
 * timeline, and a permit/review note).
 *
 * It is intentionally deterministic and dependency-free so the demo installs
 * and runs with ZERO API keys. To swap in a real LLM, replace `nextQuestion`
 * and `generatePackage` with calls to the Claude API — the `Answers` shape and
 * `ProjectPackage` shape are the contract the UI depends on. See src/lib/ai.ts.
 */

export type DisciplineId =
  | 'electrical'
  | 'plumbing'
  | 'hvac'
  | 'structural'
  | 'interior'
  | 'exterior'
  | 'solar'
  | 'smart'

export interface Discipline {
  id: DisciplineId
  name: string
  blurb: string
  icon: string // inline svg path data (24x24, stroke)
  scopeItems: string[]
}

export const DISCIPLINES: Record<DisciplineId, Discipline> = {
  electrical: {
    id: 'electrical',
    name: 'Electrical',
    blurb: 'Outlets, lighting, panel schedule, load calcs & breaker sizing.',
    icon: 'M13 2 3 14h7l-1 8 10-12h-7z',
    scopeItems: [
      'Outlet & lighting layout',
      'Panel schedule',
      'Load calculation (NEC Art. 220)',
      'Breaker sizing',
      'EV charger & smart-home wiring',
    ],
  },
  plumbing: {
    id: 'plumbing',
    name: 'Plumbing',
    blurb: 'Supply, drain & vent layout, pipe sizing and fixture schedule.',
    icon: 'M12 2v6m0 0a4 4 0 1 0 4 4M6 20h12',
    scopeItems: [
      'Water supply layout',
      'Drain-waste-vent (DWV) layout',
      'Pipe sizing',
      'Fixture schedule',
      'Water heater recommendation',
    ],
  },
  hvac: {
    id: 'hvac',
    name: 'HVAC',
    blurb: 'Heat-load (Manual J), equipment sizing, duct & mini-split layout.',
    icon: 'M3 12h18M12 3v18M5 7l3 3M19 7l-3 3',
    scopeItems: [
      'Manual J heat-load calc',
      'Equipment sizing',
      'Duct / mini-split layout',
      'Register & return locations',
    ],
  },
  structural: {
    id: 'structural',
    name: 'Structural',
    blurb: 'Framing, beam sizing, foundation & roof concepts (engineer review).',
    icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6',
    scopeItems: [
      'Wall framing plan',
      'Beam & header sizing (prelim)',
      'Foundation concept',
      'Roof / truss layout',
    ],
  },
  interior: {
    id: 'interior',
    name: 'Interior Design',
    blurb: 'Layouts, finishes, paint, flooring, kitchen & bath design.',
    icon: 'M4 4h16v16H4zM4 12h16M12 4v8',
    scopeItems: ['Furniture / cabinet layout', 'Paint & finish palette', 'Flooring plan', 'Fixture selections'],
  },
  exterior: {
    id: 'exterior',
    name: 'Exterior',
    blurb: 'Landscaping, irrigation, driveways & outdoor living.',
    icon: 'M3 20h18M6 20V9l6-5 6 5v11M9 20v-5h6v5',
    scopeItems: ['Site & landscape concept', 'Irrigation zones', 'Hardscape / driveway', 'Exterior lighting'],
  },
  solar: {
    id: 'solar',
    name: 'Solar & Storage',
    blurb: 'Array placement, battery sizing & production estimates.',
    icon: 'M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M17 7l2-2M5 19l2-2M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0',
    scopeItems: ['Panel placement', 'System & battery sizing', 'Annual production estimate', 'EV charging tie-in'],
  },
  smart: {
    id: 'smart',
    name: 'Smart Home',
    blurb: 'Wi-Fi, cameras, automation, sensors & low-voltage plan.',
    icon: 'M5 12a7 7 0 0 1 14 0M8 12a4 4 0 0 1 8 0M11 12h2',
    scopeItems: ['Wi-Fi access-point plan', 'Camera & sensor placement', 'Low-voltage runs', 'Automation scenes'],
  },
}

/* ------------------------------------------------------------------ */
/* Interview                                                           */
/* ------------------------------------------------------------------ */

export type AnswerValue = string
export type Answers = Record<string, AnswerValue>

export interface Choice {
  label: string
  value: AnswerValue
  hint?: string
}

export interface Question {
  id: string
  /** Contractor-style prompt shown in the chat. */
  prompt: string
  choices: Choice[]
  /** Optional predicate — question is skipped when it returns false. */
  when?: (a: Answers) => boolean
}

export const PROJECT_TYPES = {
  kitchen: 'Kitchen remodel',
  bathroom: 'Bathroom remodel',
  addition: 'Room addition',
  adu: 'Garage → ADU conversion',
  newbuild: 'New home build',
  electrical: 'Electrical upgrade',
  solar: 'Solar + battery',
} as const

const QUESTIONS: Question[] = [
  {
    id: 'project',
    prompt: "Hi — I'm your BuildWise project lead. Let's scope this out. What are you working on?",
    choices: [
      { label: PROJECT_TYPES.kitchen, value: 'kitchen', hint: 'Cabinets, appliances, layout' },
      { label: PROJECT_TYPES.bathroom, value: 'bathroom', hint: 'Fixtures, wet walls, ventilation' },
      { label: PROJECT_TYPES.addition, value: 'addition', hint: 'New square footage' },
      { label: PROJECT_TYPES.adu, value: 'adu', hint: 'Full living unit' },
      { label: PROJECT_TYPES.newbuild, value: 'newbuild', hint: 'Ground-up home' },
      { label: PROJECT_TYPES.electrical, value: 'electrical', hint: 'Panel / service' },
      { label: PROJECT_TYPES.solar, value: 'solar', hint: 'Generation + storage' },
    ],
  },
  {
    id: 'structure',
    prompt: 'Got it. How is the house built? This drives framing, anchoring and drilling.',
    choices: [
      { label: 'Wood frame', value: 'wood' },
      { label: 'Concrete / CMU block', value: 'concrete' },
      { label: 'Not sure', value: 'unknown', hint: "That's fine — I'll flag it for verification" },
    ],
  },
  {
    id: 'area',
    prompt: 'Roughly how much area does the work touch?',
    choices: [
      { label: 'Under 150 sq ft', value: 's', hint: 'Powder room, small kitchen' },
      { label: '150–400 sq ft', value: 'm', hint: 'Standard kitchen / bath' },
      { label: '400–800 sq ft', value: 'l', hint: 'Large addition / ADU' },
      { label: '800+ sq ft', value: 'xl', hint: 'Whole home' },
    ],
  },
  {
    id: 'gas',
    prompt: 'Do you have natural gas at the property?',
    when: (a) => a.project !== 'solar',
    choices: [
      { label: 'Yes', value: 'yes' },
      { label: 'No — all electric', value: 'no' },
      { label: 'Not sure', value: 'unknown' },
    ],
  },
  {
    id: 'budget',
    prompt: "What budget band are we designing to? I'll keep specs realistic for it.",
    choices: [
      { label: 'Value', value: 'value', hint: 'Stretch every dollar' },
      { label: 'Mid-range', value: 'mid', hint: 'Quality, sensible' },
      { label: 'Premium', value: 'premium', hint: 'Best-in-class' },
    ],
  },
  {
    id: 'tenure',
    prompt: 'Planning to stay more than 5 years? It changes what pays off.',
    choices: [
      { label: 'Yes — long-term', value: 'long' },
      { label: 'No — 5 years or less', value: 'short' },
    ],
  },
  {
    id: 'ev',
    prompt: 'Do you own an EV, or expect to within a few years?',
    choices: [
      { label: 'Yes', value: 'yes' },
      { label: 'Not yet — but plan for it', value: 'future' },
      { label: 'No', value: 'no' },
    ],
  },
  {
    id: 'smart',
    prompt: 'Want smart lighting and home automation designed in?',
    choices: [
      { label: 'Yes, fully', value: 'full' },
      { label: 'Just the basics', value: 'basic' },
      { label: 'Skip it', value: 'no' },
    ],
  },
  {
    id: 'solar',
    prompt: 'And solar — now, later, or not at all?',
    when: (a) => a.project !== 'solar',
    choices: [
      { label: 'Install now', value: 'now' },
      { label: 'Wire for it, add later', value: 'later' },
      { label: 'Not interested', value: 'no' },
    ],
  },
  {
    id: 'region',
    prompt: 'Last one — where is the project? Codes and climate loads are regional.',
    choices: [
      { label: 'California', value: 'CA', hint: 'CEC Title 24, seismic' },
      { label: 'Texas', value: 'TX', hint: 'IECC, cooling-dominated' },
      { label: 'Florida', value: 'FL', hint: 'HVHZ, humidity' },
      { label: 'Northeast', value: 'NE', hint: 'Heating-dominated' },
      { label: 'Other US', value: 'US' },
    ],
  },
]

/**
 * Maps free-typed text to the closest choice for a question. Lets the local
 * engine feel conversational without a live LLM. When the real backend is on,
 * free text is passed through to Claude verbatim instead.
 */
export function matchChoice(q: Question, text: string): Choice | null {
  const t = text.trim().toLowerCase()
  if (!t) return null

  // Direct hits on label / value / hint.
  for (const c of q.choices) {
    if (c.value.toLowerCase() === t) return c
    if (c.label.toLowerCase() === t) return c
  }
  for (const c of q.choices) {
    const hay = `${c.label} ${c.hint ?? ''}`.toLowerCase()
    if (hay.includes(t) || t.includes(c.value.toLowerCase())) return c
  }

  // Keyword affinity — score shared word stems.
  const words = t.split(/[^a-z0-9]+/).filter((w) => w.length > 2)
  let best: Choice | null = null
  let bestScore = 0
  for (const c of q.choices) {
    const hay = `${c.label} ${c.hint ?? ''}`.toLowerCase()
    let score = 0
    for (const w of words) if (hay.includes(w)) score++
    // Common yes/no affirmations.
    if (/(yes|yeah|yep|sure|definitely|absolutely)/.test(t) && /^(yes|full|now|long)/.test(c.value)) score += 1
    if (/(no|nope|nah|skip|not)/.test(t) && /^(no|skip)/.test(c.value)) score += 1
    if (score > bestScore) {
      bestScore = score
      best = c
    }
  }
  return bestScore > 0 ? best : null
}

/** Returns the next unanswered, applicable question, or null when complete. */
export function nextQuestion(answers: Answers): Question | null {
  for (const q of QUESTIONS) {
    if (q.when && !q.when(answers)) continue
    if (answers[q.id] === undefined) return q
  }
  return null
}

export function totalQuestions(answers: Answers): number {
  return QUESTIONS.filter((q) => !q.when || q.when(answers)).length
}

export function answeredCount(answers: Answers): number {
  return QUESTIONS.filter((q) => (!q.when || q.when(answers)) && answers[q.id] !== undefined).length
}

/* ------------------------------------------------------------------ */
/* Package generation                                                  */
/* ------------------------------------------------------------------ */

export interface Deliverable {
  discipline: DisciplineId
  title: string
  items: string[]
  /** review = needs a licensed professional stamp before permit. */
  needsReview: boolean
}

export interface MaterialLine {
  category: string
  item: string
  qty: string
}

/** One phase of the construction schedule. */
export interface Phase {
  name: string
  weeks: number
  items: string[]
}

/** Cost band contribution of one discipline. */
export interface CostLine {
  discipline: DisciplineId
  low: number
  high: number
}

export interface ProjectPackage {
  headline: string
  summary: string
  disciplines: DisciplineId[]
  deliverables: Deliverable[]
  materials: MaterialLine[]
  costLow: number
  costHigh: number
  /** Optional on older saved projects. */
  costBreakdown?: CostLine[]
  timelineWeeks: [number, number]
  /** Optional on older saved projects. */
  schedule?: Phase[]
  permitNote: string
  highlights: string[]
}

export const AREA_SQFT: Record<string, number> = { s: 120, m: 275, l: 600, xl: 1400 }
const AREA_LABEL: Record<string, string> = {
  s: 'under 150 sq ft',
  m: '150–400 sq ft',
  l: '400–800 sq ft',
  xl: '800+ sq ft',
}
const BUDGET_MULT: Record<string, number> = { value: 0.75, mid: 1, premium: 1.55 }

function pickDisciplines(a: Answers): DisciplineId[] {
  const set = new Set<DisciplineId>()
  const p = a.project

  // Base disciplines by project type.
  if (p === 'kitchen') ['electrical', 'plumbing', 'hvac', 'interior'].forEach((d) => set.add(d as DisciplineId))
  else if (p === 'bathroom') ['electrical', 'plumbing', 'hvac', 'interior'].forEach((d) => set.add(d as DisciplineId))
  else if (p === 'addition' || p === 'adu' || p === 'newbuild')
    ['structural', 'electrical', 'plumbing', 'hvac', 'interior', 'exterior'].forEach((d) => set.add(d as DisciplineId))
  else if (p === 'electrical') set.add('electrical')
  else if (p === 'solar') set.add('solar')

  // Cross-cutting add-ons from lifestyle answers.
  if (a.solar === 'now' || p === 'solar') set.add('solar')
  if (a.ev === 'yes' || a.ev === 'future') set.add('electrical')
  if (a.smart === 'full' || a.smart === 'basic') set.add('smart')

  return Array.from(set)
}

function buildDeliverables(a: Answers, disciplines: DisciplineId[]): Deliverable[] {
  const out: Deliverable[] = []
  for (const id of disciplines) {
    const d = DISCIPLINES[id]
    const items = [...d.scopeItems]

    // Tailor a few items to the answers so it feels bespoke.
    if (id === 'electrical') {
      if (a.ev === 'yes' || a.ev === 'future')
        items.push('Level 2 EV charger circuit (240V / 50A) + load management')
      if (a.smart === 'full') items.push('Neutral-at-switch plan for smart switches')
      if (a.gas === 'no') items.push('All-electric appliance circuits (induction / heat-pump)')
    }
    if (id === 'plumbing' && a.gas === 'no') items.push('Heat-pump water heater layout (no gas line)')
    if (id === 'hvac')
      items.push(a.gas === 'yes' ? 'Gas furnace + AC option' : 'Heat-pump system (all-electric)')
    if (id === 'solar') {
      items.push(a.tenure === 'long' ? 'Sized for full offset (long-term ROI)' : 'Sized for fast payback')
      if (a.ev !== 'no') items.push('Extra capacity for EV charging demand')
    }
    if (id === 'structural' && a.structure === 'concrete')
      items.push('CMU/concrete anchoring & lintel details')

    out.push({
      discipline: id,
      title: `${d.name} plan set`,
      items,
      needsReview: id === 'structural' || (id === 'solar' && a.tenure === 'long'),
    })
  }
  return out
}

function buildMaterials(a: Answers, disciplines: DisciplineId[]): MaterialLine[] {
  const sqft = AREA_SQFT[a.area] ?? 275
  const m: MaterialLine[] = []
  const has = (d: DisciplineId) => disciplines.includes(d)

  if (has('electrical')) {
    m.push({ category: 'Electrical', item: 'Romex 12/2 & 14/2 wiring', qty: `${Math.round(sqft * 2.2)} ft` })
    m.push({ category: 'Electrical', item: 'Duplex receptacles (TR)', qty: `${Math.max(6, Math.round(sqft / 45))} ea` })
    m.push({ category: 'Electrical', item: 'Recessed LED downlights', qty: `${Math.max(4, Math.round(sqft / 55))} ea` })
    if (a.ev !== 'no') m.push({ category: 'Electrical', item: 'EV charger (Level 2, 48A)', qty: '1 ea' })
  }
  if (has('plumbing')) {
    m.push({ category: 'Plumbing', item: 'PEX-A supply lines (½" & ¾")', qty: `${Math.round(sqft * 1.4)} ft` })
    m.push({ category: 'Plumbing', item: 'PVC DWV pipe & fittings', qty: `${Math.round(sqft * 0.9)} ft` })
    m.push({
      category: 'Plumbing',
      item: a.gas === 'no' ? 'Heat-pump water heater (50 gal)' : 'Tankless water heater',
      qty: '1 ea',
    })
  }
  if (has('hvac')) {
    m.push({ category: 'HVAC', item: a.gas === 'yes' ? 'Gas furnace + coil' : 'Heat-pump condenser + air handler', qty: '1 system' })
    m.push({ category: 'HVAC', item: 'Insulated flex duct / mini-split lines', qty: `${Math.round(sqft * 0.6)} ft` })
  }
  if (has('structural')) {
    m.push({ category: 'Structural', item: 'Dimensional lumber (2×6 / 2×10)', qty: `${Math.round(sqft * 3.1)} bd ft` })
    m.push({ category: 'Structural', item: 'LVL beams', qty: `${Math.max(1, Math.round(sqft / 350))} ea` })
    m.push({ category: 'Structural', item: 'Simpson connectors & fasteners', qty: '1 lot' })
  }
  if (has('interior')) {
    m.push({ category: 'Finishes', item: '½" drywall sheets', qty: `${Math.round(sqft / 32)} ea` })
    m.push({ category: 'Finishes', item: 'Flooring (LVP / tile)', qty: `${Math.round(sqft * 1.08)} sq ft` })
    m.push({ category: 'Finishes', item: 'Interior paint', qty: `${Math.max(3, Math.round(sqft / 90))} gal` })
  }
  if (has('solar')) {
    const kw = a.tenure === 'long' ? 9.6 : 6.4
    m.push({ category: 'Solar', item: '410W bifacial panels', qty: `${Math.round((kw * 1000) / 410)} ea` })
    m.push({ category: 'Solar', item: 'Hybrid inverter', qty: '1 ea' })
    m.push({ category: 'Solar', item: 'LiFePO₄ battery', qty: a.tenure === 'long' ? '2 × 13.5 kWh' : '1 × 13.5 kWh' })
  }
  if (has('smart')) {
    m.push({ category: 'Smart', item: 'Wi-Fi 6E access points', qty: `${Math.max(1, Math.round(sqft / 700))} ea` })
    m.push({ category: 'Smart', item: 'Smart switches / dimmers', qty: `${Math.max(4, Math.round(sqft / 60))} ea` })
    if (a.smart === 'full') m.push({ category: 'Smart', item: 'Cameras & door/window sensors', qty: '1 kit' })
  }
  return m
}

function estimateCost(
  a: Answers,
  disciplines: DisciplineId[],
): { low: number; high: number; breakdown: CostLine[] } {
  const sqft = AREA_SQFT[a.area] ?? 275
  const mult = BUDGET_MULT[a.budget] ?? 1
  // Regional cost-of-living nudge.
  const regionMult: Record<string, number> = { CA: 1.25, NE: 1.15, FL: 1.0, TX: 0.95, US: 1.0 }
  const rm = regionMult[a.region] ?? 1

  // Rough $/sq ft baselines per discipline (design + install, US average).
  const rate: Partial<Record<DisciplineId, number>> = {
    electrical: 18,
    plumbing: 22,
    hvac: 20,
    structural: 45,
    interior: 60,
    exterior: 15,
    solar: 0, // priced as a flat system below
    smart: 8,
  }

  const breakdown: CostLine[] = []
  for (const id of disciplines) {
    let base = (rate[id] ?? 0) * sqft
    if (id === 'solar') base = a.tenure === 'long' ? 26000 : 17000
    const low = Math.round((base * mult * rm) / 100) * 100
    breakdown.push({ discipline: id, low, high: Math.round((low * 1.4) / 100) * 100 })
  }
  const low = Math.round(breakdown.reduce((s, l) => s + l.low, 0) / 500) * 500
  const high = Math.round(breakdown.reduce((s, l) => s + l.high, 0) / 500) * 500
  return { low, high, breakdown }
}

function buildSchedule(
  a: Answers,
  disciplines: DisciplineId[],
): { phases: Phase[]; low: number; high: number } {
  const has = (d: DisciplineId) => disciplines.includes(d)
  const mep = has('electrical') || has('plumbing') || has('hvac')
  const isRemodel = ['kitchen', 'bathroom', 'addition', 'adu'].includes(a.project)
  const big = a.area === 'l' || a.area === 'xl'

  const phases: Phase[] = []
  phases.push({
    name: 'Design & engineering',
    weeks: has('structural') ? 3 : 2,
    items: ['Final drawings', 'Load & sizing calcs', has('structural') ? 'Engineer review & stamp' : 'Plan check prep'],
  })
  phases.push({ name: 'Permits & approvals', weeks: 2, items: ['Permit submittal', 'Jurisdiction plan review'] })
  if (isRemodel)
    phases.push({ name: 'Demolition & prep', weeks: 1, items: ['Protection & tear-out', 'Debris removal'] })
  if (has('structural'))
    phases.push({
      name: 'Foundation & framing',
      weeks: big ? (a.area === 'xl' ? 4 : 3) : 2,
      items: ['Footings / slab work', 'Wall & roof framing', 'Beams & headers'],
    })
  if (mep) {
    const trades = ['electrical', 'plumbing', 'hvac'].filter((d) => has(d as DisciplineId))
    phases.push({
      name: 'MEP rough-in',
      weeks: Math.max(1, Math.round(trades.length * 0.8)),
      items: trades.map((t) => `${t[0].toUpperCase()}${t.slice(1)} rough-in`),
    })
    phases.push({ name: 'Rough inspections', weeks: 1, items: ['Trade inspections', 'Corrections'] })
  }
  if (has('interior')) {
    phases.push({ name: 'Insulation & drywall', weeks: 2, items: ['Insulation', 'Hang, tape & texture'] })
    phases.push({
      name: 'Finishes & fixtures',
      weeks: a.budget === 'premium' ? 3 : 2,
      items: ['Flooring & paint', 'Cabinets & counters', 'Fixture set-out'],
    })
  }
  if (has('solar'))
    phases.push({ name: 'Solar install & interconnection', weeks: 1, items: ['Array & inverter install', 'Utility PTO'] })
  if (has('smart'))
    phases.push({ name: 'Smart home & low-voltage', weeks: 1, items: ['AP & camera mounting', 'Automation scenes'] })
  phases.push({ name: 'Final inspection & punch list', weeks: 1, items: ['Final sign-off', 'Walkthrough & touch-ups'] })

  const low = phases.reduce((s, p) => s + p.weeks, 0)
  return { phases, low, high: Math.ceil(low * 1.5) }
}

/**
 * Local stand-in for the vision endpoint: describes what the uploads likely
 * contain from their filenames so the chat can acknowledge them. The live
 * backend replaces this with real Claude vision (see server/claude.js).
 */
export function describeUploads(names: string[]): string {
  if (names.length === 0) return ''
  const joined = names.join(' ').toLowerCase()
  let seen = 'photos of your space'
  if (/floor.?plan|blueprint|\.dwg|\.dxf/.test(joined)) seen = 'a floor plan — I can work with the room layout'
  else if (/zillow|listing|mls/.test(joined)) seen = 'a listing screenshot — I can make out the main living areas'
  else if (/sketch|drawing|hand/.test(joined)) seen = 'a hand sketch — rough dimensions are enough to start'
  else if (/kitchen/.test(joined)) seen = 'kitchen photos — counters, appliances and the working wall'
  else if (/bath/.test(joined)) seen = 'bathroom photos — I can see the wet wall and fixture spots'
  else if (/drone|roof|aerial/.test(joined)) seen = 'aerial shots — useful for the roof and solar exposure'
  const n = names.length
  return `Thanks — I read ${n} file${n > 1 ? 's' : ''}. Looks like ${seen}. I'll fill in what I can from the imagery and ask about the rest.`
}

export function generatePackage(a: Answers): ProjectPackage {
  const disciplines = pickDisciplines(a)
  const deliverables = buildDeliverables(a, disciplines)
  const materials = buildMaterials(a, disciplines)
  const { low: costLow, high: costHigh, breakdown: costBreakdown } = estimateCost(a, disciplines)
  const { phases: schedule, low: weeksLow, high: weeksHigh } = buildSchedule(a, disciplines)
  const timelineWeeks: [number, number] = [weeksLow, weeksHigh]

  const projectLabel = (PROJECT_TYPES as Record<string, string>)[a.project] ?? 'Project'
  const needsReview = deliverables.some((d) => d.needsReview)

  const highlights: string[] = []
  if (a.gas === 'no') highlights.push('Designed all-electric — no gas appliances or lines.')
  if (a.ev !== 'no') highlights.push('EV-ready: Level 2 charging circuit sized and load-managed.')
  if (a.solar === 'now' || a.project === 'solar') highlights.push('Solar + battery included with production estimate.')
  else if (a.solar === 'later') highlights.push('Pre-wired for a future solar + battery add-on.')
  if (a.smart === 'full') highlights.push('Full smart-home low-voltage plan integrated.')
  if (a.tenure === 'long') highlights.push('Specs favor long-term ROI over lowest upfront cost.')
  if (a.structure === 'concrete') highlights.push('Concrete/CMU anchoring details included.')

  return {
    headline: `${projectLabel} — construction package`,
    summary: `A ${AREA_LABEL[a.area] ?? ''} ${projectLabel.toLowerCase()} in ${regionName(a.region)}, ${a.structure === 'unknown' ? 'structure to be verified on-site' : `${a.structure} construction`}. Coordinated across ${disciplines.length} disciplines with a material list, cost band and schedule.`,
    disciplines,
    deliverables,
    materials,
    costLow,
    costHigh,
    costBreakdown,
    timelineWeeks,
    schedule,
    permitNote: needsReview
      ? 'Structural and long-term solar elements require review and stamping by a licensed engineer in your jurisdiction before permitting. BuildWise can route this to a vetted local pro.'
      : 'Drawings are permit-ready pending standard local plan review. BuildWise can connect you with a licensed pro to stamp where your jurisdiction requires it.',
    highlights,
  }
}

function regionName(r: string): string {
  return { CA: 'California', TX: 'Texas', FL: 'Florida', NE: 'the Northeast', US: 'the US' }[r] ?? 'your area'
}

/* ------------------------------------------------------------------ */
/* Panel schedule                                                      */
/* ------------------------------------------------------------------ */

export interface Circuit {
  ckt: number
  description: string
  breaker: string
  poles: 1 | 2
  wire: string
}

/**
 * Derives a numbered panel schedule from the project answers — the kind of
 * table an electrician expects next to an E-1 sheet.
 */
export function buildPanelSchedule(a: Answers, pkg: ProjectPackage): Circuit[] {
  const has = (d: DisciplineId) => pkg.disciplines.includes(d)
  const rows: Omit<Circuit, 'ckt'>[] = []
  const p = a.project

  if (has('electrical')) {
    if (p === 'kitchen' || p === 'adu' || p === 'newbuild') {
      rows.push({ description: 'Kitchen small appliance #1 (GFCI)', breaker: '20A', poles: 1, wire: '#12' })
      rows.push({ description: 'Kitchen small appliance #2 (GFCI)', breaker: '20A', poles: 1, wire: '#12' })
      rows.push({ description: 'Dishwasher', breaker: '15A', poles: 1, wire: '#14' })
      rows.push({ description: 'Garbage disposal', breaker: '15A', poles: 1, wire: '#14' })
      rows.push({ description: 'Microwave', breaker: '20A', poles: 1, wire: '#12' })
      rows.push({ description: 'Refrigerator', breaker: '20A', poles: 1, wire: '#12' })
      if (a.gas !== 'yes') rows.push({ description: 'Induction cooktop', breaker: '40A / 240V', poles: 2, wire: '#8' })
    }
    if (p === 'bathroom') rows.push({ description: 'Bathroom receptacles (GFCI)', breaker: '20A', poles: 1, wire: '#12' })
    rows.push({ description: 'General receptacles', breaker: '20A', poles: 1, wire: '#12' })
    rows.push({ description: 'Lighting (dimmed)', breaker: '15A', poles: 1, wire: '#14' })
    if (a.ev === 'yes' || a.ev === 'future') rows.push({ description: 'EV charger (load-managed)', breaker: '50A / 240V', poles: 2, wire: '#6' })
  }
  if (has('hvac')) {
    rows.push({ description: 'Air handler / furnace', breaker: '15A', poles: 1, wire: '#14' })
    rows.push({ description: a.gas === 'yes' ? 'AC condenser' : 'Heat-pump condenser', breaker: '30A / 240V', poles: 2, wire: '#10' })
  }
  if (has('plumbing') && a.gas !== 'yes')
    rows.push({ description: 'Heat-pump water heater', breaker: '30A / 240V', poles: 2, wire: '#10' })
  if (has('solar')) rows.push({ description: 'Solar backfeed (interlock)', breaker: '40A / 240V', poles: 2, wire: '#8' })

  return rows.map((r, i) => ({ ckt: i + 1, ...r }))
}

export function formatUSD(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

import { describe, expect, it } from 'vitest'
import {
  PROJECT_TYPES,
  buildPanelSchedule,
  describeUploads,
  generatePackage,
  matchChoice,
  nextQuestion,
  totalQuestions,
  type Answers,
} from './engine'
import {
  buildModel,
  generateSheetSet,
  hasPlanDrawing,
  layoutPower,
  type PlanEdits,
  type Sheet,
} from '../lib/drawing'
import { generateDXF } from '../lib/dxf'

/** Answer every question with its first choice until the interview completes. */
function runInterview(seed: Answers = {}): Answers {
  const a: Answers = { ...seed }
  for (let i = 0; i < 20; i++) {
    const q = nextQuestion(a)
    if (!q) return a
    if (a[q.id] !== undefined) throw new Error(`repeated question: ${q.id}`)
    a[q.id] = q.choices[0].value
  }
  throw new Error('interview did not terminate in 20 steps')
}

const BASE: Answers = {
  project: 'kitchen',
  structure: 'wood',
  area: 'm',
  gas: 'no',
  budget: 'mid',
  tenure: 'long',
  ev: 'yes',
  smart: 'full',
  solar: 'now',
  region: 'CA',
}

describe('interview', () => {
  it('terminates for every project type', () => {
    for (const project of Object.keys(PROJECT_TYPES)) {
      const a = runInterview({ project })
      expect(nextQuestion(a)).toBeNull()
      expect(Object.keys(a).length).toBe(totalQuestions(a))
    }
  })

  it('skips the gas and solar questions for a solar project', () => {
    const a = runInterview({ project: 'solar' })
    expect(a.gas).toBeUndefined()
    expect(a.solar).toBeUndefined()
  })
})

describe('matchChoice', () => {
  const gasQ = (() => {
    // Reach the gas question by answering up to it.
    const a: Answers = { project: 'kitchen', structure: 'wood', area: 'm' }
    const q = nextQuestion(a)!
    expect(q.id).toBe('gas')
    return q
  })()

  it('maps affirmations to yes', () => {
    expect(matchChoice(gasQ, 'yeah we have gas')?.value).toBe('yes')
  })
  it('maps all-electric phrasing to no', () => {
    expect(matchChoice(gasQ, 'no, everything is electric')?.value).toBe('no')
  })
  it('maps garage-apartment phrasing to the ADU project', () => {
    const first = nextQuestion({})!
    expect(matchChoice(first, 'I want to convert my garage into an apartment')?.value).toBe('adu')
  })
  it('returns null for unmappable input', () => {
    expect(matchChoice(gasQ, 'purple elephants')).toBeNull()
  })
})

describe('generatePackage', () => {
  const pkg = generatePackage(BASE)

  it('produces a coherent cost band and breakdown', () => {
    expect(pkg.costLow).toBeGreaterThan(0)
    expect(pkg.costHigh).toBeGreaterThan(pkg.costLow)
    const sumLow = pkg.costBreakdown!.reduce((s, l) => s + l.low, 0)
    // Package totals are the rounded sum of the per-discipline lines.
    expect(Math.abs(pkg.costLow - sumLow)).toBeLessThanOrEqual(500)
  })

  it('derives the timeline from the schedule', () => {
    const weeks = pkg.schedule!.reduce((s, p) => s + p.weeks, 0)
    expect(pkg.timelineWeeks[0]).toBe(weeks)
    expect(pkg.timelineWeeks[1]).toBeGreaterThan(weeks)
  })

  it('reflects lifestyle answers in the output', () => {
    // EV → charger in materials; all-electric → heat pump, no gas furnace.
    expect(pkg.materials.some((m) => /EV charger/.test(m.item))).toBe(true)
    expect(pkg.materials.some((m) => /Heat-pump/.test(m.item))).toBe(true)
    expect(pkg.materials.some((m) => /Gas furnace/.test(m.item))).toBe(false)
    expect(pkg.disciplines).toContain('solar')
    expect(pkg.disciplines).toContain('smart')
  })

  it('flags structural work for licensed review', () => {
    const adu = generatePackage({ ...BASE, project: 'adu', area: 'l' })
    const structural = adu.deliverables.find((d) => d.discipline === 'structural')
    expect(structural?.needsReview).toBe(true)
    expect(adu.permitNote).toMatch(/licensed engineer/i)
  })

  it('handles every project type without throwing', () => {
    for (const project of Object.keys(PROJECT_TYPES)) {
      const p = generatePackage(runInterview({ project }))
      expect(p.disciplines.length).toBeGreaterThan(0)
      expect(p.materials.length).toBeGreaterThan(0)
      expect(p.schedule!.length).toBeGreaterThan(1)
    }
  })
})

describe('plan sheets', () => {
  const pkg = generatePackage(BASE)
  const sheets = generateSheetSet(BASE, pkg, 'blueprint')
  const byId = (id: string) => sheets.find((s: Sheet) => s.id === id)

  it('produces one sheet per relevant trade', () => {
    expect(hasPlanDrawing(pkg)).toBe(true)
    // Kitchen w/ solar+smart+EV: electrical, plumbing, HVAC (no structural).
    expect(sheets.map((s: Sheet) => s.no)).toEqual(['E-1', 'E-2', 'P-1', 'M-1'])
  })

  it('draws real trade symbols on each sheet', () => {
    expect(byId('power')!.svg).toContain('GFCI')
    expect(byId('power')!.svg).toContain('NOT FOR CONSTRUCTION')
    expect(byId('lighting')!.svg).toContain('dimmer switches')
    expect(byId('plumbing')!.svg).toContain('DWV')
    expect(byId('plumbing')!.svg).toContain('WH')
    expect(byId('hvac')!.svg).toContain('CFM')
    expect(byId('hvac')!.svg).toContain('AHU')
  })

  it('adds an S-1 framing sheet for structural projects', () => {
    const adu = generatePackage({ ...BASE, project: 'adu', area: 'l' })
    const aduSheets = generateSheetSet({ ...BASE, project: 'adu', area: 'l' }, adu, 'blueprint')
    const framing = aduSheets.find((s: Sheet) => s.id === 'framing')
    expect(framing).toBeDefined()
    expect(framing!.svg).toContain('HDR')
    expect(framing!.svg).toContain('O.C.')
  })

  it('renders all three themes with their palettes', () => {
    const cad = generateSheetSet(BASE, pkg, 'autocad')[0].svg
    expect(cad).toContain('#000000') // model-space black
    expect(cad).toContain('#00FFFF') // cyan device layer
    expect(cad).toContain('MODEL SPACE PREVIEW')
    expect(generateSheetSet(BASE, pkg, 'paper')[0].svg).toContain('#FFFFFF')
  })

  it('shapes the room from an analyzed upload aspect ratio', () => {
    const wide = generateSheetSet({ ...BASE, _aspect: '2.0' }, pkg, 'blueprint')[0].svg
    const tall = generateSheetSet({ ...BASE, _aspect: '0.8' }, pkg, 'blueprint')[0].svg
    const widthOf = (svg: string) => parseInt(/(\d{2})&#39;-0/.exec(svg)?.[1] ?? '0', 10)
    expect(widthOf(wide)).toBeGreaterThan(widthOf(tall))
  })

  it('skips the drawing for a solar-only package', () => {
    const answers = runInterview({ project: 'solar' })
    // Ensure no electrical add-ons sneak in via the first-choice answers.
    const solarPkg = generatePackage({ ...answers, ev: 'no', smart: 'no' })
    expect(hasPlanDrawing(solarPkg)).toBe(false)
  })
})

describe('panel schedule', () => {
  const pkg = generatePackage(BASE)
  const panel = buildPanelSchedule(BASE, pkg)

  it('numbers circuits sequentially with breaker and wire sizes', () => {
    expect(panel.length).toBeGreaterThan(5)
    expect(panel.map((c) => c.ckt)).toEqual(panel.map((_, i) => i + 1))
    for (const c of panel) {
      expect(c.breaker).toMatch(/A/)
      expect(c.wire).toMatch(/#\d+/)
    }
  })

  it('reflects the answers: EV circuit, induction, no gas', () => {
    const desc = panel.map((c) => c.description).join(' | ')
    expect(desc).toMatch(/EV charger/)
    expect(desc).toMatch(/Induction cooktop/)
    expect(desc).toMatch(/Heat-pump water heater/)
    // Two kitchen small-appliance circuits per NEC 210.11(C)(1).
    expect(panel.filter((c) => /small appliance/.test(c.description)).length).toBe(2)
  })
})

describe('DXF export', () => {
  it('emits a valid R12 document with layers and electrical entities', () => {
    const pkg = generatePackage(BASE)
    const dxf = generateDXF(BASE, pkg)
    expect(dxf).toContain('SECTION')
    expect(dxf.trim().endsWith('EOF')).toBe(true)
    for (const layer of ['A-WALL', 'E-POWR', 'E-LITE', 'E-CIRC']) expect(dxf).toContain(layer)
    expect(dxf).toContain('CIRCLE') // receptacles / cans
    expect(dxf).toContain('ARC') // door swing
    expect(dxf).toContain('GFCI')
    expect(dxf).toContain('NOT FOR CONSTRUCTION')
  })
})

describe('whole-house (ground-up) mode', () => {
  const HOUSE: Answers = {
    ...BASE,
    project: 'newbuild',
    area: 'xl',
    beds: '4',
    baths: '2.5',
    stories: '1',
    garage: '2',
  }
  const pkg = generatePackage(HOUSE)
  const sheets = generateSheetSet(HOUSE, pkg, 'blueprint')

  it('asks the whole-house program questions only for new builds', () => {
    const a = runInterview({ project: 'newbuild' })
    expect(a.beds).toBeDefined()
    expect(a.baths).toBeDefined()
    expect(a.stories).toBeDefined()
    expect(a.garage).toBeDefined()
    expect(runInterview({ project: 'kitchen' }).beds).toBeUndefined()
  })

  it('lays out the full room program on the sheets', () => {
    const power = sheets.find((s: Sheet) => s.id === 'power')!.svg
    expect(power).toContain('BEDROOM 1')
    expect(power).toContain('BEDROOM 4')
    expect(power).toContain('BATH 1')
    expect(power).toContain('KITCHEN')
    expect(power).toContain('LIVING')
    expect(power).toContain('2-CAR GARAGE')
    expect(power).toContain('PWDR') // the half bath
  })

  it('puts trade content a pro expects on each sheet', () => {
    const power = sheets.find((s: Sheet) => s.id === 'power')!.svg
    expect(power).toContain('GENERAL NOTES')
    expect(power).toContain('210.12') // AFCI note
    const plumbing = sheets.find((s: Sheet) => s.id === 'plumbing')!.svg
    expect(plumbing).toContain('DWV MAIN')
    expect(plumbing).toContain('SLOPE 1/4')
    const hvac = sheets.find((s: Sheet) => s.id === 'hvac')!.svg
    expect(hvac).toContain('TRUNK')
    expect(hvac).toContain('CFM')
    expect(hvac).toContain('MANUAL J')
  })

  it('builds a whole-house panel schedule with AFCI bedroom circuits', () => {
    const panel = buildPanelSchedule(HOUSE, pkg)
    const desc = panel.map((ckt) => ckt.description).join(' | ')
    expect(desc).toMatch(/AFCI per 210.12/)
    expect(desc).toMatch(/Bathroom 1/)
    expect(desc).toMatch(/Laundry/)
    expect(desc).toMatch(/Garage/)
    expect(desc).toMatch(/Smoke\/CO/)
    expect(panel.length).toBeGreaterThan(15)
  })

  it('house devices are still editable by id', () => {
    const model = buildModel(HOUSE, pkg)
    const devices = layoutPower(model)
    expect(devices.length).toBeGreaterThan(10)
    const edited = layoutPower(model, { power: { [devices[0].id]: { removed: true } } })
    expect(edited.length).toBe(devices.length - 1)
  })
})

describe('device edits', () => {
  const pkg = generatePackage(BASE)
  const model = buildModel(BASE, pkg)
  const base = layoutPower(model)

  it('moves, removes and tags devices by id', () => {
    const first = base[0]
    const edits: PlanEdits = {
      power: {
        [first.id]: { dx: 1.5, dy: -0.5, circuit: '3' },
        [base[1].id]: { removed: true },
      },
    }
    const edited = layoutPower(model, edits)
    expect(edited.length).toBe(base.length - 1)
    const moved = edited.find((d) => d.id === first.id)!
    expect(moved.x).toBeCloseTo(first.x + 1.5)
    expect(moved.y).toBeCloseTo(first.y - 0.5)
    expect(moved.circuit).toBe('3')
    expect(edited.find((d) => d.id === base[1].id)).toBeUndefined()
  })

  it('flows edits into the rendered sheet and the DXF', () => {
    const edits: PlanEdits = { power: { [base[0].id]: { circuit: '7' } } }
    const sheet = generateSheetSet(BASE, pkg, 'blueprint', edits).find((s: Sheet) => s.id === 'power')!
    expect(sheet.svg).toContain('CKT 7')
    expect(generateDXF(BASE, pkg, edits)).toContain('CKT 7')
  })
})

describe('describeUploads', () => {
  it('recognizes floor plans and counts files', () => {
    const t = describeUploads(['kitchen-floorplan.pdf', 'photo.jpg'])
    expect(t).toMatch(/2 files/)
    expect(t).toMatch(/floor plan/i)
  })
  it('is empty for no uploads', () => {
    expect(describeUploads([])).toBe('')
  })
})

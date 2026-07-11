import { describe, expect, it } from 'vitest'
import {
  PROJECT_TYPES,
  describeUploads,
  generatePackage,
  matchChoice,
  nextQuestion,
  totalQuestions,
  type Answers,
} from './engine'
import { generatePlanSVG, hasPlanDrawing } from '../lib/drawing'

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

describe('plan drawing', () => {
  it('draws an MEP plan with receptacles and title block', () => {
    const pkg = generatePackage(BASE)
    expect(hasPlanDrawing(pkg)).toBe(true)
    const svg = generatePlanSVG(BASE, pkg)
    expect(svg).toContain('<svg')
    expect(svg).toContain('RECEPTACLES')
    expect(svg).toContain('NOT FOR CONSTRUCTION')
    expect(svg).toContain('EV') // EV owner → charger on the plan
  })

  it('skips the drawing for a solar-only package', () => {
    const answers = runInterview({ project: 'solar' })
    // Ensure no electrical add-ons sneak in via the first-choice answers.
    const pkg = generatePackage({ ...answers, ev: 'no', smart: 'no' })
    expect(hasPlanDrawing(pkg)).toBe(false)
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

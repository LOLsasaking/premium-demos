import { describe, expect, it } from 'vitest'
import { generatePackage, type Answers } from '../interview/engine'
import { buildModel } from './drawing'
import { planRoomModels } from './modelKit'

const base: Answers = { structure: 'wood', area: 'm', gas: 'no', budget: 'mid', tenure: 'long', ev: 'no', smart: 'basic', solar: 'no', region: 'US' }

describe('detailed house model planning', () => {
  it('furnishes a generated kitchen with real kitchen objects', () => {
    const answers = { ...base, project: 'kitchen' }
    const models = planRoomModels(buildModel(answers, generatePackage(answers)))
    const kinds = models.map((model) => model.kind)
    expect(kinds).toContain('base-cabinet')
    expect(kinds).toContain('sink-base')
    expect(kinds).toContain('range')
    expect(kinds).toContain('refrigerator')
    expect(kinds).toContain('island')
  })

  it('furnishes a generated house by room type', () => {
    const answers: Answers = { ...base, project: 'newbuild', area: 'xl', beds: '3', baths: '2', stories: '1', garage: '2' }
    const models = planRoomModels(buildModel(answers, generatePackage(answers)))
    const kinds = models.map((model) => model.kind)
    expect(kinds).toContain('bed')
    expect(kinds).toContain('sofa')
    expect(kinds).toContain('dining-table')
    expect(kinds).toContain('vanity')
    expect(kinds).toContain('toilet')
    expect(kinds).toContain('garage-storage')
  })

  it('builds a complete bathroom with vanity, toilet, and shower models', () => {
    const answers: Answers = { ...base, project: 'bathroom', area: 'm' }
    const models = planRoomModels(buildModel(answers, generatePackage(answers)))
    const kinds = models.map((model) => model.kind)
    expect(kinds).toContain('vanity')
    expect(kinds).toContain('toilet')
    expect(kinds).toContain('shower')
  })

  it('keeps every placement inside the generated footprint', () => {
    const answers: Answers = { ...base, project: 'newbuild', area: 'l', beds: '2', baths: '2', stories: '1', garage: '1' }
    const model = buildModel(answers, generatePackage(answers))
    for (const placement of planRoomModels(model)) {
      expect(placement.x).toBeGreaterThanOrEqual(0)
      expect(placement.y).toBeGreaterThanOrEqual(0)
      expect(placement.x + placement.width).toBeLessThanOrEqual(model.wFt)
      expect(placement.y + placement.depth).toBeLessThanOrEqual(model.hFt)
    }
  })
})

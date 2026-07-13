import { describe, expect, it } from 'vitest'
import { evaluatePlanChecks, evaluateProposedLight, type CodeProfile } from './codeChecks'
import { buildModel, layoutLighting, layoutPower, type PlanModel } from './drawing'
import { generatePackage, type Answers } from '../interview/engine'
import type { ModelPlacement } from './modelKit'

const profile: CodeProfile = { jurisdiction: 'Model code baseline', residentialCode: '2021 IRC', electricalCode: '2023 NEC' }
const base: Answers = { project: 'bathroom', structure: 'wood', area: 'm', gas: 'no', budget: 'mid', tenure: 'long', ev: 'no', smart: 'basic', solar: 'no', region: 'US' }

describe('advisory code checks', () => {
  it('checks bathroom electrical and plumbing clearances with traceable references', () => {
    const pkg = generatePackage(base)
    const model = buildModel(base, pkg)
    const checks = evaluatePlanChecks(model, layoutPower(model), layoutLighting(model), profile)
    expect(checks.some((check) => check.id === 'bath-gfci' && check.reference.includes('E3901.6'))).toBe(true)
    expect(checks.some((check) => check.id === 'shower-size' && check.reference.includes('P2708.1'))).toBe(true)
    expect(checks.every((check) => check.sourceUrl.startsWith('https://'))).toBe(true)
  })

  it('flags an undersized shower against the selected residential baseline', () => {
    const model: PlanModel = {
      wFt: 8, hFt: 7, isKitchen: false, counters: [], island: null,
      door: { wall: 'E', pos: 4, width: 2.5 }, window: { wall: 'N', pos: 2, width: 2 },
      appliances: [{ x: 1.2, y: 1.2, label: 'SHWR', w: 2.4, h: 2.4 }], hasPlumbing: true, hasEV: false,
    }
    const shower = evaluatePlanChecks(model, [], [], profile).find((check) => check.id === 'shower-size')
    expect(shower?.status).toBe('block')
  })

  it('blocks a normal light in the shower zone but allows a wet-location-rated proposal', () => {
    const model: PlanModel = {
      wFt: 8, hFt: 7, isKitchen: false, counters: [], island: null,
      door: { wall: 'E', pos: 4, width: 2.5 }, window: { wall: 'N', pos: 2, width: 2 },
      appliances: [{ x: 1.75, y: 1.75, label: 'SHWR', w: 3, h: 3 }], hasPlumbing: true, hasEV: false,
    }
    expect(evaluateProposedLight(model, { x: 1.7, y: 1.7, wetLocationRated: false }, profile).status).toBe('block')
    expect(evaluateProposedLight(model, { x: 1.7, y: 1.7, wetLocationRated: true }, profile).status).toBe('review')
  })

  it('does not misclassify a kitchen sink as a bathroom lavatory', () => {
    const kitchenAnswers: Answers = { ...base, project: 'kitchen' }
    const pkg = generatePackage(kitchenAnswers)
    const model = buildModel(kitchenAnswers, pkg)
    expect(evaluatePlanChecks(model, layoutPower(model), layoutLighting(model), profile).some((check) => check.id === 'bath-gfci')).toBe(false)
  })

  it('flags overlapping edited object footprints as a measured coordination conflict', () => {
    const model: PlanModel = {
      wFt: 12, hFt: 10, isKitchen: false, counters: [], island: null,
      door: { wall: 'E', pos: 4, width: 3 }, window: { wall: 'N', pos: 2, width: 3 },
      appliances: [], hasPlumbing: false, hasEV: false,
    }
    const furniture: ModelPlacement[] = [
      { id: 'sofa-1', kind: 'sofa', x: 2, y: 2, width: 5, depth: 3 },
      { id: 'coffee-table-2', kind: 'coffee-table', x: 4, y: 3, width: 3, depth: 2 },
    ]
    const check = evaluatePlanChecks(model, [], [], profile, furniture).find((item) => item.id === 'object-clearance')
    expect(check?.status).toBe('warn')
    expect(check?.detail).toContain('sofa')
  })
})

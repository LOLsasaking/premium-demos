import { describe, expect, it } from 'vitest'
import { addPlanDevice, buildModel, deviceEditOrigin, layoutLighting, layoutPower, patchDeviceEdit, snapPlanOffset, type PlanEdits } from './drawing'
import { generatePackage, type Answers } from '../interview/engine'

const answers: Answers = { project: 'kitchen', structure: 'wood', area: 'm', gas: 'no', budget: 'mid', tenure: 'long', ev: 'no', smart: 'some', solar: 'no', region: 'US' }

describe('synchronized plan editing', () => {
  it('snaps offsets to the shared three-inch grid', () => {
    expect(snapPlanOffset(1.13)).toBe(1.25)
    expect(snapPlanOffset(-0.14)).toBe(-0.25)
  })

  it('patches one stable device without discarding other layers', () => {
    const initial: PlanEdits = { lighting: { c0: { dx: 1 } } }
    expect(patchDeviceEdit(initial, 'power', 'g0', { dx: 2, dy: -1 })).toEqual({
      lighting: { c0: { dx: 1 } },
      power: { g0: { dx: 2, dy: -1 } },
    })
  })

  it('projects the same edit into the generated 2D device layout', () => {
    const pkg = generatePackage(answers)
    const model = buildModel(answers, pkg)
    const base = layoutPower(model)
    const edits = patchDeviceEdit({}, 'power', base[0].id, { dx: 1.25, dy: -0.5 })
    const moved = layoutPower(model, edits)
    expect(moved[0].x).toBe(base[0].x + 1.25)
    expect(moved[0].y).toBe(base[0].y - 0.5)
  })

  it('adds a user light to the shared 2D/3D device model', () => {
    const pkg = generatePackage(answers)
    const model = buildModel(answers, pkg)
    const edits = addPlanDevice({}, 'lighting', { id: 'user-light-1', kind: 'can', x: 4, y: 5, wetLocationRated: false })
    const devices = layoutLighting(model, edits)
    expect(devices.find((device) => device.id === 'user-light-1')).toMatchObject({ x: 4, y: 5, kind: 'can' })
    const added = devices.find((device) => device.id === 'user-light-1')!
    expect(deviceEditOrigin(layoutLighting(model), added)).toEqual({ x: 4, y: 5 })
  })
})

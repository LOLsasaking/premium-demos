import { describe, expect, it } from 'vitest'
import { generateSheetSet, sheetEditableLayers, viewerLayerPreset, type SheetKind } from './drawing'
import { generatePackage, type Answers } from '../interview/engine'

const answers: Answers = {
  project: 'kitchen', structure: 'wood', area: 'm', gas: 'no', budget: 'mid', tenure: 'long',
  ev: 'no', smart: 'basic', solar: 'no', region: 'US', plumbing: 'yes',
}

describe('trade sheet routing', () => {
  const pkg = generatePackage(answers)
  const sheets = generateSheetSet(answers, pkg, 'autocad')

  it('always includes a dedicated construction floor-plan sheet', () => {
    expect(sheets.map((sheet) => sheet.id)).toContain('construction')
    expect(sheets.find((sheet) => sheet.id === 'construction')?.no).toBe('C-1')
  })

  it('renders distinct plumbing and construction content', () => {
    const plumbing = sheets.find((sheet) => sheet.id === 'plumbing')?.svg ?? ''
    const construction = sheets.find((sheet) => sheet.id === 'construction')?.svg ?? ''
    expect(plumbing).toContain('PLUMBING PLAN')
    expect(plumbing).toContain('DWV')
    expect(construction).toContain('CONSTRUCTION PLAN')
    expect(construction).not.toContain('GFCI receptacle')
  })

  it('routes a complete bathroom fixture group instead of a generic sink line', () => {
    const bathroomAnswers: Answers = { ...answers, project: 'bathroom', area: 'm' }
    const bathroomPkg = generatePackage(bathroomAnswers)
    const plumbing = generateSheetSet(bathroomAnswers, bathroomPkg, 'autocad').find((sheet) => sheet.id === 'plumbing')?.svg ?? ''
    expect(plumbing).toContain('3&quot; WC')
    expect(plumbing).toContain('2&quot; SHWR')
    expect(plumbing).toContain('1-1/2&quot; LAV')
  })

  it.each<[SheetKind, Array<'power' | 'lighting'>]>([
    ['power', ['power']],
    ['lighting', ['lighting']],
    ['plumbing', []],
    ['hvac', []],
    ['framing', []],
    ['construction', []],
  ])('shows only editable layers belonging to %s', (sheet, expected) => {
    expect(sheetEditableLayers(sheet)).toEqual(expected)
  })

  it('focuses the matching 3D system when a trade sheet is selected', () => {
    expect(viewerLayerPreset('plumbing')).toEqual({ lights: false, electrical: false, plumbing: true, framing: false })
    expect(viewerLayerPreset('power')).toEqual({ lights: false, electrical: true, plumbing: false, framing: false })
    expect(viewerLayerPreset('lighting')).toEqual({ lights: true, electrical: false, plumbing: false, framing: false })
  })
})

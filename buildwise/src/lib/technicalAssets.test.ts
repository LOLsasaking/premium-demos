import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { cutawayGeometry, plumbingServiceSource, technicalAssetForDevice, TECHNICAL_ASSET_PATHS } from './technicalAssets'

const required = ['bulb-a19','bulb-smart','outlet-duplex','outlet-smart','plug-grounded','switch-rocker','switch-smart','junction-box','panel','pipe-straight','pipe-elbow','pipe-tee','pipe-ptrap','valve-shutoff','floor-drain','light-recessed','light-pendant'] as const
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../public/models/technical')

describe('technical GLB asset kit', () => {
  it('contains every required model in the generated manifest', () => {
    const manifestPath = resolve(root, 'manifest.json')
    expect(existsSync(manifestPath)).toBe(true)
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as { assets: Record<string, { file: string; bytes: number }> }
    for (const id of required) {
      expect(manifest.assets[id]).toBeDefined()
      const file = resolve(root, manifest.assets[id].file)
      expect(existsSync(file)).toBe(true)
      expect(statSync(file).size).toBeGreaterThan(500)
      expect(statSync(file).size).toBe(manifest.assets[id].bytes)
    }
  })

  it('keeps the complete technical kit within the web payload budget', () => {
    const manifestPath = resolve(root, 'manifest.json')
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as { totalBytes: number }
    expect(manifest.totalBytes).toBeLessThan(2 * 1024 * 1024)
  })

  it('maps plan devices to physical models and respects smart-home mode', () => {
    expect(technicalAssetForDevice('lighting', 'can', false)).toBe('light-recessed')
    expect(technicalAssetForDevice('lighting', 'pendant', true)).toBe('light-pendant')
    expect(technicalAssetForDevice('lighting', 'switch', true)).toBe('switch-smart')
    expect(technicalAssetForDevice('lighting', 'switch', false)).toBe('switch-rocker')
    expect(technicalAssetForDevice('power', 'recep', true)).toBe('outlet-smart')
    expect(technicalAssetForDevice('power', 'gfci', false)).toBe('outlet-duplex')
    expect(technicalAssetForDevice('power', 'dedicated', false)).toBe('plug-grounded')
  })

  it('exposes a deploy-safe local URL for every model', () => {
    for (const id of required) expect(TECHNICAL_ASSET_PATHS[id]).toMatch(/^models\/technical\/.+\.glb$/)
  })

  it('uses the water heater or a service-entry fallback for pipe routing', () => {
    expect(plumbingServiceSource([{ label: 'WH', x: 8, y: 9 }], 16, 12)).toEqual({ x: 8, y: 9 })
    expect(plumbingServiceSource([{ label: 'SINK', x: 7, y: 4 }], 16, 12)).toEqual({ x: 1.5, y: 10.5 })
  })

  it('opens the viewer-facing wall and floor to expose the service level', () => {
    expect(cutawayGeometry(20, 16)).toEqual({ floorDepth: 11.84, sideReturn: 3.2, openingStart: 3.2, openingEnd: 16.8, serviceZ: 16.8 })
  })
})

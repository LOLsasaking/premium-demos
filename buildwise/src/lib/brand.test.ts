import { describe, expect, it } from 'vitest'
import { BRAND, assetUrl, preferredStoredValue } from './brand'

describe('Cadvora brand', () => {
  it('uses the new customer-facing identity', () => {
    expect(BRAND.name).toBe('Cadvora')
    expect(BRAND.downloadPrefix).toBe('cadvora')
    expect(BRAND.apiEnv).toBe('VITE_CADVORA_API_URL')
  })

  it('prefers new persisted data while retaining legacy data as a fallback', () => {
    expect(preferredStoredValue('new', 'legacy')).toBe('new')
    expect(preferredStoredValue(null, 'legacy')).toBe('legacy')
    expect(preferredStoredValue(null, null)).toBeNull()
  })

  it('joins public assets to a deployment subpath', () => {
    expect(assetUrl('/premium-demos/', 'cadvora-mark.svg')).toBe('/premium-demos/cadvora-mark.svg')
    expect(assetUrl('/', 'cadvora-hero.mp4')).toBe('/cadvora-hero.mp4')
  })
})

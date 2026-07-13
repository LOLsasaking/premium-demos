export const BRAND = {
  name: 'Cadvora',
  tagline: 'From idea to technical plan',
  downloadPrefix: 'cadvora',
  projectStorageKey: 'cadvora.projects.v1',
  waitlistStorageKey: 'cadvora.waitlist.v1',
  apiEnv: 'VITE_CADVORA_API_URL',
} as const

export function preferredStoredValue(current: string | null, legacy: string | null): string | null {
  return current ?? legacy
}

export function assetUrl(base: string, filename: string): string {
  return `${base.endsWith('/') ? base : `${base}/`}${filename.replace(/^\//, '')}`
}

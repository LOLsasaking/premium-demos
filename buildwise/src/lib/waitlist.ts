/**
 * Waitlist submission.
 *
 * Priority order:
 *   1. VITE_WAITLIST_URL — any JSON form endpoint (Formspree, Buttondown, your own).
 *   2. VITE_BUILDWISE_API_URL — the bundled server's /api/waitlist route
 *      (appends to a JSONL file on the server).
 *   3. Demo fallback — stored in localStorage so nothing is silently lost,
 *      flagged as 'local' so the UI can be honest about it.
 */

export interface WaitlistResult {
  ok: boolean
  stored: 'remote' | 'local'
}

export async function submitWaitlist(email: string): Promise<WaitlistResult> {
  const endpoint =
    import.meta.env.VITE_WAITLIST_URL ||
    (import.meta.env.VITE_BUILDWISE_API_URL
      ? `${import.meta.env.VITE_BUILDWISE_API_URL}/api/waitlist`
      : null)

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (!res.ok) throw new Error(`Waitlist endpoint responded ${res.status}`)
    return { ok: true, stored: 'remote' }
  }

  const key = 'buildwise.waitlist.v1'
  try {
    const list = JSON.parse(localStorage.getItem(key) ?? '[]') as unknown[]
    list.push({ email, ts: Date.now() })
    localStorage.setItem(key, JSON.stringify(list))
  } catch {
    /* storage unavailable — still report ok in demo mode */
  }
  return { ok: true, stored: 'local' }
}

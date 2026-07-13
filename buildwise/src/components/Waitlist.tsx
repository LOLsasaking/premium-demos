import { useState } from 'react'
import Icon from './Icon'
import { submitWaitlist } from '../lib/waitlist'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Waitlist() {
  const [status, setStatus] = useState<Status>('idle')
  const [email, setEmail] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      await submitWaitlist(email.trim())
      setStatus('sent')
    } catch (err) {
      console.error('Waitlist submission failed:', err)
      setStatus('error')
    }
  }

  return (
    <section id="waitlist" className="py-24 md:py-32">
      <div className="container-x">
        <div className="reveal relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-line bg-panel p-10 text-center md:p-16">
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-build/20 blur-[120px]" />
          <div className="relative">
            <h2 className="font-display text-4xl font-700 tracking-tight md:text-5xl">
              Turn the next brief into a coordinated plan.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Join the Cadvora beta for product access, updates and guided onboarding.
            </p>

            {status === 'sent' ? (
              <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-xl border border-build/30 bg-build/10 px-5 py-4 text-build">
                <Icon path="M20 6 9 17l-5-5" size={18} /> You’re on the list — we’ll be in touch.
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                <label htmlFor="waitlist-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="waitlist-email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  autoComplete="email"
                  className="flex-1 rounded-xl border border-line bg-ink px-4 py-3.5 text-sm outline-none transition focus:border-blueprint"
                />
                <button type="submit" className="btn-build py-3.5 disabled:opacity-60" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Joining…' : 'Get early access'}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="relative mt-4 text-sm text-build">
                That didn’t go through — check your connection and try again.
              </p>
            )}
            {status !== 'error' && (
              <p className="relative mt-4 text-xs text-muted">No spam. We’ll only email about your access.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

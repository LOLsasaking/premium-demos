import { Suspense, lazy } from 'react'
import Icon from './Icon'

// three.js is heavy — split it out so the landing page stays fast.
const TwinViewer = lazy(() => import('./TwinViewer'))

export default function DigitalTwin() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div className="reveal">
          <p className="eyebrow">Signature feature</p>
          <h2 className="mt-4 font-display text-4xl font-700 tracking-tight md:text-5xl">
            A digital twin you can walk through
          </h2>
          <p className="mt-4 text-muted">
            BuildWise assembles a real 3D model of your project. Orbit it, flip the lights on, trace
            the wiring inside the walls, follow the plumbing, or fade the drywall away and inspect
            the framing — before a single board is cut.
          </p>
          <ul className="mt-6 space-y-2.5">
            {[
              'Orbit the model — drag to rotate, scroll to zoom',
              'Toggle lights, electrical, plumbing and framing layers',
              'See wiring routed inside the walls',
              'Watch the framing appear as walls go transparent',
            ].map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-sm text-mist/90">
                <span className="text-build">
                  <Icon path="M20 6 9 17l-5-5" size={16} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal card overflow-hidden">
          <Suspense
            fallback={
              <div className="grid h-[420px] place-items-center text-sm text-muted">Loading 3D model…</div>
            }
          >
            <TwinViewer className="h-[420px]" />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

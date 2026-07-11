import { useState } from 'react'
import Icon from './Icon'

type Layer = 'lights' | 'electrical' | 'plumbing' | 'framing'

const toggles: { id: Layer; label: string; color: string }[] = [
  { id: 'lights', label: 'Lights on', color: '#F59E0B' },
  { id: 'electrical', label: 'Electrical routing', color: '#3B82F6' },
  { id: 'plumbing', label: 'Plumbing', color: '#22D3EE' },
  { id: 'framing', label: 'Framing', color: '#8DA0BF' },
]

export default function DigitalTwin() {
  const [on, setOn] = useState<Record<Layer, boolean>>({
    lights: true,
    electrical: true,
    plumbing: false,
    framing: false,
  })
  const toggle = (l: Layer) => setOn((s) => ({ ...s, [l]: !s[l] }))

  return (
    <section className="py-24 md:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div className="reveal">
          <p className="eyebrow">Signature feature</p>
          <h2 className="mt-4 font-display text-4xl font-700 tracking-tight md:text-5xl">
            A digital twin you can walk through
          </h2>
          <p className="mt-4 text-muted">
            BuildWise assembles a complete model of your home. Flip on the lights, peel back a wall to
            trace the wiring, follow a drain line, or inspect the framing before a single board is cut.
          </p>
          <ul className="mt-6 space-y-2.5">
            {[
              'Turn lights and circuits on and off',
              'See electrical routing and plumbing behind walls',
              'Inspect framing, beams and headers',
              'Preview finishes, paint and flooring',
            ].map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-sm text-mist/90">
                <span className="text-build">
                  <Icon path="M20 6 9 17l-5-5" size={16} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-2">
            {toggles.map((t) => (
              <button
                key={t.id}
                onClick={() => toggle(t.id)}
                className={`rounded-xl border px-4 py-2 text-sm font-500 transition ${
                  on[t.id]
                    ? 'border-transparent text-ink'
                    : 'border-line bg-panel text-muted hover:text-mist'
                }`}
                style={on[t.id] ? { background: t.color } : undefined}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="reveal card overflow-hidden p-4">
          <RoomSVG on={on} />
        </div>
      </div>
    </section>
  )
}

function RoomSVG({ on }: { on: Record<Layer, boolean> }) {
  return (
    <svg viewBox="0 0 400 300" className="w-full">
      <defs>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#161F31" />
          <stop offset="1" stopColor="#111827" />
        </linearGradient>
      </defs>

      {/* Room shell (isometric-ish) */}
      <polygon points="40,120 200,60 360,120 200,180" fill="url(#floor)" stroke="#24304A" />
      <polygon points="40,120 200,180 200,270 40,210" fill="#0F1626" stroke="#24304A" />
      <polygon points="360,120 200,180 200,270 360,210" fill="#0C1220" stroke="#24304A" />

      {/* Framing layer */}
      {on.framing && (
        <g stroke="#8DA0BF" strokeWidth="1.4" opacity="0.9">
          {[70, 105, 140, 170].map((x, i) => (
            <line key={i} x1={x} y1={135 - i * 3} x2={x} y2={225 - i * 3} />
          ))}
          {[230, 265, 300, 330].map((x, i) => (
            <line key={i} x1={x} y1={165 - i * 3} x2={x} y2={255 - i * 3} />
          ))}
          <line x1="40" y1="150" x2="200" y2="210" stroke="#8DA0BF" />
          <line x1="360" y1="150" x2="200" y2="210" stroke="#8DA0BF" />
        </g>
      )}

      {/* Plumbing layer */}
      {on.plumbing && (
        <g stroke="#22D3EE" strokeWidth="2.4" fill="none" opacity="0.95">
          <path d="M110 250 L110 205 L150 185" />
          <path d="M150 185 L150 150" strokeDasharray="5 4" />
          <circle cx="110" cy="250" r="4" fill="#22D3EE" />
          <circle cx="150" cy="150" r="4" fill="#22D3EE" />
        </g>
      )}

      {/* Electrical layer */}
      {on.electrical && (
        <g stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.95">
          <path d="M60 175 L120 145 L200 110 L280 145 L330 172" />
          <path d="M200 110 L200 90" />
          {[60, 330].map((x, i) => (
            <rect key={i} x={x - 4} y={i ? 165 : 168} width="8" height="10" fill="#3B82F6" rx="1.5" />
          ))}
        </g>
      )}

      {/* Ceiling light + glow */}
      <line x1="200" y1="90" x2="200" y2="60" stroke="#24304A" strokeWidth="1.4" />
      <circle cx="200" cy="92" r="6" fill={on.lights ? '#F59E0B' : '#24304A'} />
      {on.lights && (
        <>
          <circle cx="200" cy="92" r="16" fill="#F59E0B" opacity="0.25" />
          <polygon points="200,92 150,180 250,180" fill="#F59E0B" opacity="0.10" />
        </>
      )}
    </svg>
  )
}

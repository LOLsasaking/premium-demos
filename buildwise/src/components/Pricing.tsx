import Icon from './Icon'

const tiers = [
  {
    name: 'Explore',
    price: 'Free',
    sub: 'Kick the tires',
    features: ['AI interview', '1 room concept', 'Material list preview', 'Rough cost band'],
    cta: 'Start free',
    highlight: false,
  },
  {
    name: 'Project',
    price: '$149',
    sub: 'per project',
    features: [
      'Everything in Explore',
      'Full multi-discipline package',
      'Digital twin walkthrough',
      'Material & labor estimates',
      'DWG / BIM / PDF export',
    ],
    cta: 'Start a project',
    highlight: true,
  },
  {
    name: 'Pro',
    price: '$79',
    sub: 'per month',
    features: [
      'Unlimited projects',
      'Priority AI generation',
      'Marketplace review routing',
      'Permit document assembly',
      'Team collaboration',
    ],
    cta: 'Go Pro',
    highlight: false,
  },
]

const streams = [
  'Credit-based AI generation',
  'Pay-per-project',
  'Professional review fees',
  'Marketplace commissions',
  'Material supplier referrals',
  'Premium exports (DWG / BIM)',
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow">Pricing</p>
          <h2 className="mt-4 font-display text-4xl font-700 tracking-tight md:text-5xl">
            Pay for what you build
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`reveal relative flex flex-col rounded-2xl border p-8 ${
                t.highlight
                  ? 'border-blueprint bg-panel shadow-glow'
                  : 'border-line bg-panel'
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-8 rounded-full bg-blueprint px-3 py-1 text-xs font-600 text-white">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-lg font-600 text-mist">{t.name}</h3>
              <div className="mt-3 flex items-end gap-2">
                <span className="font-display text-4xl font-700 text-mist">{t.price}</span>
                <span className="mb-1 text-sm text-muted">{t.sub}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-mist/90">
                    <span className="mt-0.5 text-build">
                      <Icon path="M20 6 9 17l-5-5" size={15} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#waitlist" className={`mt-8 ${t.highlight ? 'btn-build' : 'btn-ghost'} justify-center py-3`}>
                {t.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="reveal mx-auto mt-10 max-w-3xl text-center">
          <p className="text-xs uppercase tracking-wider text-muted">Revenue model</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {streams.map((s) => (
              <span key={s} className="rounded-lg border border-line bg-panel px-3 py-1.5 text-xs text-muted">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import Icon from './Icon'

const tiers = [
  { name: 'Starter', sub: 'For homeowners and individual projects', features: ['Guided project brief', '2D plan generation', 'Editable outputs', 'PDF and JSON handoff'] },
  { name: 'Professional', sub: 'For electricians, plumbers and contractors', features: ['Full coordinated package', 'DXF export', 'Interactive 3D model', 'Professional handoff'], featured: true },
  { name: 'Business', sub: 'For teams and higher project volume', features: ['Higher project volume', 'Shared standards', 'Priority onboarding', 'Team workflow roadmap'] },
]

export default function Pricing() {
  return <section id="pricing" className="border-y border-line bg-panel/30 py-24 md:py-32"><div className="container-x">
    <div className="reveal max-w-2xl"><p className="eyebrow">Early access</p><h2 className="mt-4 font-display text-4xl font-600 tracking-[-.04em] md:text-5xl">A plan for every kind of project.</h2><p className="mt-4 text-muted">Pricing will be finalized with beta users. Join the current program for product access and onboarding details.</p></div>
    <div className="mt-12 grid gap-5 md:grid-cols-3">{tiers.map(t => <article key={t.name} className={`reveal flex flex-col rounded-2xl border p-7 ${t.featured ? 'border-cyan/50 bg-cyan/5 shadow-glow' : 'border-line bg-panel'}`}><h3 className="font-display text-2xl font-600">{t.name}</h3><p className="mt-2 min-h-10 text-sm text-muted">{t.sub}</p><ul className="mt-7 flex-1 space-y-3">{t.features.map(f => <li key={f} className="flex gap-2.5 text-sm text-mist/90"><span className="text-cyan"><Icon path="M20 6 9 17l-5-5" size={15} /></span>{f}</li>)}</ul><a href="#waitlist" className={`${t.featured ? 'btn-blue' : 'btn-ghost'} mt-8 py-3`}>Request Early Access</a></article>)}</div>
  </div></section>
}

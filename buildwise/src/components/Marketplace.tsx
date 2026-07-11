import Icon from './Icon'

const pros = [
  { role: 'Structural Engineers', note: 'Stamp beams, foundations & framing' },
  { role: 'Master Electricians', note: 'Verify load calcs & panel schedules' },
  { role: 'Licensed Plumbers', note: 'Review DWV & supply sizing' },
  { role: 'HVAC Contractors', note: 'Confirm Manual J & equipment' },
  { role: 'Architects', note: 'Seal permit-ready drawing sets' },
  { role: 'Interior Designers', note: 'Refine finishes & selections' },
]

export default function Marketplace() {
  return (
    <section id="marketplace" className="border-y border-line bg-panel/40 py-24 md:py-32">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow">Marketplace</p>
          <h2 className="mt-4 font-display text-4xl font-700 tracking-tight md:text-5xl">
            AI drafts it. Humans stamp it.
          </h2>
          <p className="mt-4 text-muted">
            When you need a permit-ready, stamped drawing, BuildWise routes your project to a vetted,
            licensed professional in your area for review, finalization and sign-off.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pros.map((p) => (
            <div key={p.role} className="card reveal flex items-center gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-build/15 text-build">
                <Icon path="M9 12l2 2 4-4|M12 3l7 4v5c0 4.4-3 8.5-7 9.5C8 20.5 5 16.4 5 12V7z" size={20} />
              </span>
              <div>
                <div className="font-600 text-mist">{p.role}</div>
                <div className="text-sm text-muted">{p.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted">
          <span className="flex items-center gap-2">
            <Icon path="M20 6 9 17l-5-5" size={16} className="text-build" /> Licensed &amp; insured
          </span>
          <span className="flex items-center gap-2">
            <Icon path="M20 6 9 17l-5-5" size={16} className="text-build" /> Local to your jurisdiction
          </span>
          <span className="flex items-center gap-2">
            <Icon path="M20 6 9 17l-5-5" size={16} className="text-build" /> Fixed review fees, no surprises
          </span>
        </div>
      </div>
    </section>
  )
}

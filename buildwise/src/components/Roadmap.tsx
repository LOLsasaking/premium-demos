const phases = [
  {
    tag: 'Phase 1 · MVP',
    now: true,
    title: 'Interview → package',
    body: 'AI interviews users, reads uploads, and generates concepts, layouts, material lists, cost bands and a 3D preview.',
  },
  {
    tag: 'Phase 2',
    now: false,
    title: 'Code-aware MEP drafts',
    body: 'Electrical and plumbing draft plans with code-aware recommendations and load/pipe sizing.',
  },
  {
    tag: 'Phase 3',
    now: false,
    title: 'Collaboration & permits',
    body: 'Contractor collaboration, permit-document generation, and licensed professional review.',
  },
  {
    tag: 'Phase 4',
    now: false,
    title: 'Construction OS',
    body: 'A complete AI construction operating system managing projects from concept through completion.',
  },
]

export default function Roadmap() {
  return (
    <section className="border-t border-line bg-panel/40 py-24 md:py-32">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow">The plan</p>
          <h2 className="mt-4 font-display text-4xl font-700 tracking-tight md:text-5xl">
            From remodel tool to construction OS
          </h2>
          <p className="mt-4 text-muted">
            The hard part isn’t the chat — it’s fusing vision, construction knowledge, regional codes,
            CAD/BIM generation and professional review. We build it in phases.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-4">
          {phases.map((p, i) => (
            <div
              key={p.tag}
              className={`reveal relative rounded-2xl border p-6 ${
                p.now ? 'border-build/40 bg-build/5' : 'border-line bg-panel'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                {p.now && (
                  <span className="rounded-full bg-build/20 px-2 py-0.5 text-[11px] font-600 text-build">
                    Live now
                  </span>
                )}
              </div>
              <div className="mt-2 text-xs font-600 uppercase tracking-wider text-blueprint">{p.tag}</div>
              <h3 className="mt-2 font-display text-lg font-600">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

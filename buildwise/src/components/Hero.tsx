import Icon from './Icon'

const stats = [
  ['8', 'engineering disciplines'],
  ['~4 min', 'from photos to a plan'],
  ['1', 'coordinated package'],
]

const uploads = ['Floor plans', 'Photos', 'Zillow screenshots', 'Hand sketches', 'Drone shots', 'PDFs / CAD']

export default function Hero() {
  return (
    <header id="top" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-blueprint/20 blur-[140px]" />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="reveal inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-1.5 text-xs font-500 text-muted">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-build" />
            The AI architect &amp; engineer for residential construction
          </span>
          <h1 className="reveal mt-6 font-display text-5xl font-700 leading-[1.02] tracking-tight md:text-7xl">
            Upload your house.
            <br />
            Get <span className="text-blueprint">professional plans</span> in minutes.
          </h1>
          <p className="reveal mx-auto mt-6 max-w-2xl text-lg text-muted">
            BuildWise interviews you like a seasoned contractor, reads your floor plans and photos,
            and produces a coordinated construction package — electrical, plumbing, HVAC, structural
            and more — with material lists, cost bands and a schedule.
          </p>
          <div className="reveal mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#studio" className="btn-build px-8 py-4 text-base">
              <Icon path="M12 5v14M5 12h14" size={18} /> Start a project
            </a>
            <a href="#how" className="btn-ghost px-8 py-4 text-base">
              See how it works
            </a>
          </div>

          <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-muted">
            <span className="mr-1 text-mist/70">Upload anything:</span>
            {uploads.map((u) => (
              <span key={u} className="rounded-md border border-line bg-panel px-2.5 py-1">
                {u}
              </span>
            ))}
          </div>
        </div>

        <div className="reveal mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-4">
          {stats.map(([big, label]) => (
            <div key={label} className="card px-4 py-6 text-center">
              <div className="font-display text-3xl font-700 text-mist md:text-4xl">{big}</div>
              <div className="mt-1 text-xs text-muted">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}

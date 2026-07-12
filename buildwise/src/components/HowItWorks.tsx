import Icon from './Icon'

const steps = [
  {
    n: '01',
    title: 'Upload anything',
    body: 'Floor plans, phone photos, a Zillow screenshot, a napkin sketch, a PDF or CAD file. Vision AI reads the space and figures out what it is looking at.',
    icon: 'M12 16V4m0 0 4 4m-4-4L8 8|M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2',
  },
  {
    n: '02',
    title: 'Have a conversation',
    body: 'No 40-field form. BuildWise asks what a great contractor would — structure, gas, budget, EV, solar, how long you’ll stay — and keeps going until it has enough.',
    icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  },
  {
    n: '03',
    title: 'Receive the package',
    body: 'Coordinated plans across every discipline, a material list, labor & cost estimate, a build schedule, and a clear note on what needs a licensed stamp.',
    icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M9 15l2 2 4-4',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 md:py-32">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-4 font-display text-4xl font-700 tracking-tight md:text-5xl">
            Three steps, not three weeks
          </h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="card reveal p-8">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-blueprint/15 text-blueprint">
                  <Icon path={s.icon} size={24} />
                </span>
                <span className="font-display text-4xl font-700 text-line">{s.n}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-600">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import Icon from './Icon'
import { DISCIPLINES, type DisciplineId } from '../interview/engine'

const order: DisciplineId[] = [
  'electrical',
  'plumbing',
  'hvac',
  'structural',
  'interior',
  'exterior',
  'solar',
  'smart',
]

export default function Disciplines() {
  return (
    <section id="disciplines" className="border-y border-line bg-panel/40 py-24 md:py-32">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow">Not one product — a platform</p>
          <h2 className="mt-4 font-display text-4xl font-700 tracking-tight md:text-5xl">
            Every discipline, coordinated
          </h2>
          <p className="mt-4 text-muted">
            BuildWise doesn’t just draw a schematic. It designs the whole house and keeps every trade
            in agreement — so the electrician, plumber and framer aren’t fighting over the same wall.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {order.map((id) => {
            const d = DISCIPLINES[id]
            return (
              <div
                key={id}
                className="card reveal group p-6 transition hover:-translate-y-1 hover:border-blueprint hover:shadow-glow"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-blueprint/15 text-blueprint transition group-hover:bg-blueprint group-hover:text-white">
                  <Icon path={d.icon} size={22} />
                </span>
                <h3 className="mt-4 font-display text-lg font-600">{d.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{d.blurb}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

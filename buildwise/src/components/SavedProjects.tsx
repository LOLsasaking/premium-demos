import Icon from './Icon'
import { formatUSD } from '../interview/engine'
import type { SavedProject } from '../lib/store'

export default function SavedProjects({
  projects,
  onOpen,
  onDelete,
}: {
  projects: SavedProject[]
  onOpen: (p: SavedProject) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="mt-8 border-t border-line pt-6">
      <div className="flex items-center gap-2 text-xs font-600 uppercase tracking-wider text-muted">
        <Icon path="M4 4h6l2 2h8a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" size={14} />
        Your saved projects
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.id}
            className="group flex items-center gap-3 rounded-xl border border-line bg-panel px-4 py-3 transition hover:border-blueprint"
          >
            <button onClick={() => onOpen(p)} className="flex-1 text-left">
              <div className="truncate text-sm font-500 text-mist">{p.pkg.headline}</div>
              <div className="mt-0.5 text-xs text-muted">
                {formatUSD(p.pkg.costLow)}–{formatUSD(p.pkg.costHigh)} · {p.pkg.disciplines.length} disciplines ·{' '}
                {new Date(p.createdAt).toLocaleDateString()}
              </div>
            </button>
            <button
              onClick={() => onDelete(p.id)}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted opacity-0 transition hover:bg-panel2 hover:text-mist group-hover:opacity-100"
              aria-label="Delete project"
            >
              <Icon path="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

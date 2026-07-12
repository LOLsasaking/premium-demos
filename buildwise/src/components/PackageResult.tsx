import { useMemo, useState } from 'react'
import Icon from './Icon'
import { DISCIPLINES, buildPanelSchedule, type Answers, type ProjectPackage, formatUSD } from '../interview/engine'
import { exportDXF, exportHTML, exportJSON } from '../lib/export'
import { generateSheetSet, hasPlanDrawing, type SheetKind, type SheetTheme } from '../lib/drawing'

export default function PackageResult({
  pkg,
  answers,
  onRestart,
}: {
  pkg: ProjectPackage
  answers: Answers
  onRestart: () => void
}) {
  const [openMaterials, setOpenMaterials] = useState(false)
  const [openCosts, setOpenCosts] = useState(false)
  const [exported, setExported] = useState(false)
  const [sheetId, setSheetId] = useState<SheetKind>('power')
  const [theme, setTheme] = useState<SheetTheme>('blueprint')

  const sheets = useMemo(
    () => (hasPlanDrawing(pkg) ? generateSheetSet(answers, pkg, theme) : null),
    [answers, pkg, theme],
  )
  const active = sheets?.find((s) => s.id === sheetId) ?? sheets?.[0]
  const [openPanel, setOpenPanel] = useState(false)
  const panel = useMemo(() => buildPanelSchedule(answers, pkg), [answers, pkg])

  function handleExport() {
    exportHTML(answers, pkg)
    setExported(true)
    setTimeout(() => setExported(false), 2500)
  }

  return (
    <div className="rounded-2xl border border-blueprint/30 bg-panel2/60 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-build/15 px-2.5 py-1 text-xs font-600 text-build">
            <Icon path="M20 6 9 17l-5-5" size={12} /> Package ready
          </span>
          <h3 className="mt-3 font-display text-xl font-700 text-mist">{pkg.headline}</h3>
          <p className="mt-1 text-sm text-muted">{pkg.summary}</p>
        </div>
      </div>

      {/* Estimate tiles */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Tile label="Estimated cost" value={`${formatUSD(pkg.costLow)}–${formatUSD(pkg.costHigh)}`} />
        <Tile label="Timeline" value={`${pkg.timelineWeeks[0]}–${pkg.timelineWeeks[1]} wks`} />
        <Tile label="Disciplines" value={String(pkg.disciplines.length)} />
      </div>

      {/* Highlights */}
      {pkg.highlights.length > 0 && (
        <ul className="mt-5 space-y-1.5">
          {pkg.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-mist/90">
              <span className="mt-0.5 text-build">
                <Icon path="M20 6 9 17l-5-5" size={14} />
              </span>
              {h}
            </li>
          ))}
        </ul>
      )}

      {/* Draft plan sheets */}
      {sheets && active && (
        <>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-xs font-600 uppercase tracking-wider text-muted">
              Draft plan sheets ({sheets.length})
            </h4>
            <div className="flex overflow-hidden rounded-lg border border-line text-xs">
              {(['blueprint', 'autocad'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-3 py-1.5 font-500 transition ${
                    theme === t ? 'bg-build text-ink' : 'bg-panel text-muted hover:text-mist'
                  }`}
                >
                  {t === 'blueprint' ? 'Blueprint' : 'AutoCAD'}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {sheets.map((s) => (
              <button
                key={s.id}
                onClick={() => setSheetId(s.id)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-500 transition ${
                  active.id === s.id
                    ? 'border-blueprint bg-blueprint text-white'
                    : 'border-line bg-panel text-muted hover:text-mist'
                }`}
              >
                {s.no} · {s.name.split(' ')[0].charAt(0) + s.name.split(' ')[0].slice(1).toLowerCase()}
              </button>
            ))}
          </div>
          <div
            className="mt-3 overflow-hidden rounded-xl border border-line [&>svg]:block [&>svg]:w-full"
            dangerouslySetInnerHTML={{ __html: active.svg }}
          />
        </>
      )}

      {/* Build schedule */}
      {pkg.schedule && pkg.schedule.length > 0 && (
        <>
          <h4 className="mt-6 text-xs font-600 uppercase tracking-wider text-muted">Build schedule</h4>
          <div className="mt-3 space-y-1.5">
            {pkg.schedule.map((ph, i) => (
              <div key={ph.name} className="flex items-center gap-3 rounded-lg border border-line bg-panel px-3 py-2">
                <span className="w-6 shrink-0 font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-500 text-mist">{ph.name}</div>
                  <div className="truncate text-xs text-muted">{ph.items.join(' · ')}</div>
                </div>
                <span className="shrink-0 rounded-md bg-blueprint/15 px-2 py-0.5 text-xs font-600 text-blueprint">
                  {ph.weeks} wk{ph.weeks > 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Deliverables per discipline */}
      <h4 className="mt-6 text-xs font-600 uppercase tracking-wider text-muted">Deliverables</h4>
      <div className="mt-3 space-y-2">
        {pkg.deliverables.map((d) => {
          const meta = DISCIPLINES[d.discipline]
          return (
            <div key={d.discipline} className="rounded-xl border border-line bg-panel p-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-blueprint/15 text-blueprint">
                  <Icon path={meta.icon} size={17} />
                </span>
                <span className="font-600 text-mist">{d.title}</span>
                {d.needsReview && (
                  <span className="ml-auto rounded-md bg-build/15 px-2 py-0.5 text-[11px] font-600 text-build">
                    Needs licensed review
                  </span>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {d.items.map((it) => (
                  <span key={it} className="rounded-md border border-line bg-panel2 px-2 py-1 text-xs text-muted">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Materials (collapsible) */}
      <button
        onClick={() => setOpenMaterials((v) => !v)}
        className="mt-4 flex w-full items-center justify-between rounded-xl border border-line bg-panel px-4 py-3 text-sm font-500 text-mist transition hover:border-blueprint"
      >
        <span className="flex items-center gap-2">
          <Icon path="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4M9 3v4h6V3" size={16} />
          Material list ({pkg.materials.length} lines)
        </span>
        <Icon path={openMaterials ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'} size={16} />
      </button>
      {openMaterials && (
        <div className="mt-2 overflow-hidden rounded-xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-panel2 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-2 font-500">Category</th>
                <th className="px-4 py-2 font-500">Item</th>
                <th className="px-4 py-2 text-right font-500">Qty</th>
              </tr>
            </thead>
            <tbody>
              {pkg.materials.map((m, i) => (
                <tr key={i} className="border-t border-line">
                  <td className="px-4 py-2 text-muted">{m.category}</td>
                  <td className="px-4 py-2 text-mist">{m.item}</td>
                  <td className="px-4 py-2 text-right font-mono text-muted">{m.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Panel schedule (collapsible) */}
      {panel.length > 0 && (
        <>
          <button
            onClick={() => setOpenPanel((v) => !v)}
            className="mt-2 flex w-full items-center justify-between rounded-xl border border-line bg-panel px-4 py-3 text-sm font-500 text-mist transition hover:border-blueprint"
          >
            <span className="flex items-center gap-2">
              <Icon path="M13 2 3 14h7l-1 8 10-12h-7z" size={16} />
              Panel schedule ({panel.length} circuits)
            </span>
            <Icon path={openPanel ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'} size={16} />
          </button>
          {openPanel && (
            <div className="mt-2 overflow-hidden rounded-xl border border-line">
              <table className="w-full text-left text-sm">
                <thead className="bg-panel2 text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th className="px-3 py-2 font-500">Ckt</th>
                    <th className="px-3 py-2 font-500">Description</th>
                    <th className="px-3 py-2 text-right font-500">Breaker</th>
                    <th className="px-3 py-2 text-right font-500">Wire</th>
                  </tr>
                </thead>
                <tbody>
                  {panel.map((ckt) => (
                    <tr key={ckt.ckt} className="border-t border-line">
                      <td className="px-3 py-2 font-mono text-muted">{ckt.ckt}</td>
                      <td className="px-3 py-2 text-mist">{ckt.description}</td>
                      <td className="px-3 py-2 text-right font-mono text-muted">
                        {ckt.breaker}
                        {ckt.poles === 2 ? ' · 2P' : ''}
                      </td>
                      <td className="px-3 py-2 text-right font-mono text-muted">{ckt.wire}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Cost breakdown (collapsible) */}
      {pkg.costBreakdown && pkg.costBreakdown.length > 0 && (
        <>
          <button
            onClick={() => setOpenCosts((v) => !v)}
            className="mt-2 flex w-full items-center justify-between rounded-xl border border-line bg-panel px-4 py-3 text-sm font-500 text-mist transition hover:border-blueprint"
          >
            <span className="flex items-center gap-2">
              <Icon path="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" size={16} />
              Cost breakdown by discipline
            </span>
            <Icon path={openCosts ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'} size={16} />
          </button>
          {openCosts && (
            <div className="mt-2 overflow-hidden rounded-xl border border-line">
              <table className="w-full text-left text-sm">
                <tbody>
                  {pkg.costBreakdown.map((c) => (
                    <tr key={c.discipline} className="border-b border-line last:border-0">
                      <td className="px-4 py-2 text-mist">{DISCIPLINES[c.discipline].name}</td>
                      <td className="px-4 py-2 text-right font-mono text-muted">
                        {formatUSD(c.low)}–{formatUSD(c.high)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Permit note */}
      <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-build/25 bg-build/5 p-4 text-sm text-mist/90">
        <span className="mt-0.5 text-build">
          <Icon path="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" size={16} />
        </span>
        {pkg.permitNote}
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button onClick={handleExport} className="btn-build flex-1 py-3">
          {exported ? (
            <>
              <Icon path="M20 6 9 17l-5-5" size={16} /> Downloaded
            </>
          ) : (
            <>
              <Icon path="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" size={16} /> Download package
            </>
          )}
        </button>
        <a href="#marketplace" className="btn-ghost flex-1 py-3">
          Send to a licensed pro
        </a>
        <button onClick={onRestart} className="btn-ghost py-3">
          <Icon path="M3 12a9 9 0 1 0 3-6.7M3 4v4h4" size={16} /> New
        </button>
      </div>
      <div className="mt-2 flex items-center justify-center gap-4 text-xs text-muted">
        {hasPlanDrawing(pkg) && (
          <button onClick={() => exportDXF(answers, pkg)} className="transition hover:text-mist">
            Export DXF (AutoCAD)
          </button>
        )}
        <button onClick={() => exportJSON(answers, pkg)} className="transition hover:text-mist">
          Export JSON (BIM handoff)
        </button>
      </div>
    </div>
  )
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-panel px-4 py-3">
      <div className="text-xs text-muted">{label}</div>
      <div className="mt-1 font-display text-lg font-700 text-mist">{value}</div>
    </div>
  )
}

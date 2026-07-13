import { Suspense, lazy, useMemo, useState } from 'react'
import Icon from './Icon'
import Logo from './Logo'
import SheetEditor from './SheetEditor'
import { exportDXF, exportHTML, exportJSON } from '../lib/export'
import { generateSheetSet, hasPlanDrawing, type PlanEdits, type SheetKind } from '../lib/drawing'
import { DISCIPLINES, formatUSD, type Answers, type ProjectPackage } from '../interview/engine'

const Plan3DViewer = lazy(() => import('./Plan3DViewer'))

interface ProjectWorkspaceProps {
  pkg: ProjectPackage
  answers: Answers
  initialEdits?: PlanEdits
  onEditsChange?: (edits: PlanEdits) => void
  onClose: () => void
  onNew: () => void
}

const tools = [
  ['Select', 'M4 4h6l2 16 3-6 5-2L4 4z'],
  ['Plan', 'M3 3h18v18H3z|M3 9h18M9 3v18'],
  ['Systems', 'M12 2v20M2 12h20'],
  ['Measure', 'M3 17 17 3l4 4L7 21l-4-4z'],
  ['Notes', 'M4 4h16v16H4z|M8 9h8M8 13h6'],
] as const

export default function ProjectWorkspace({ pkg, answers, initialEdits, onEditsChange, onClose, onNew }: ProjectWorkspaceProps) {
  const [view, setView] = useState<'2d' | 'split' | '3d'>('split')
  const [sheetId, setSheetId] = useState<SheetKind>('power')
  const [edits, setEdits] = useState<PlanEdits>(initialEdits ?? {})
  const [exportOpen, setExportOpen] = useState(false)
  const sheets = useMemo(() => hasPlanDrawing(pkg) ? generateSheetSet(answers, pkg, 'autocad', edits) : [], [answers, pkg, edits])
  const active = sheets.find((sheet) => sheet.id === sheetId) ?? sheets[0]
  const editCount = Object.values(edits).reduce((count, layer) => count + Object.keys(layer ?? {}).length, 0)

  function changeEdits(next: PlanEdits) {
    setEdits(next)
    onEditsChange?.(next)
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#050910] text-mist" role="dialog" aria-modal="true" aria-label="Cadvora project workspace">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#1a2b42] bg-[#08111d] px-3 md:px-5">
        <div className="flex min-w-0 items-center gap-4">
          <span className="sm:hidden"><Logo size={29} compact /></span>
          <span className="hidden sm:inline-flex"><Logo size={29} /></span>
          <span className="hidden h-5 w-px bg-line sm:block" />
          <div className="hidden min-w-0 sm:block"><p className="truncate text-xs font-600 text-white">{pkg.headline}</p><p className="hidden font-mono text-[8px] uppercase tracking-[.15em] text-muted md:block">Project workspace · autosaved locally</p></div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-md border border-cyan/20 bg-cyan/5 px-2.5 py-1.5 font-mono text-[9px] uppercase text-cyan md:flex"><span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_#22d3ee]" /> Synced</span>
          <div className="relative"><button onClick={() => setExportOpen((open) => !open)} className="rounded-md border border-line px-3 py-2 text-xs text-white hover:border-cyan">Export</button>{exportOpen && <div className="absolute right-0 top-11 z-50 w-48 rounded-lg border border-line bg-panel p-1.5 shadow-2xl"><button onClick={() => exportHTML(answers, pkg, edits)} className="block w-full rounded px-3 py-2 text-left text-xs hover:bg-panel2">Document / PDF</button><button onClick={() => exportDXF(answers, pkg, edits)} className="block w-full rounded px-3 py-2 text-left text-xs hover:bg-panel2">DXF / AutoCAD</button><button onClick={() => exportJSON(answers, pkg)} className="block w-full rounded px-3 py-2 text-left text-xs hover:bg-panel2">JSON / BIM handoff</button></div>}</div>
          <button onClick={onNew} className="hidden rounded-md bg-blueprint px-3 py-2 text-xs font-600 text-white sm:block">New project</button>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-md border border-line text-muted hover:text-white" aria-label="Close workspace"><Icon path="M18 6 6 18M6 6l12 12" size={18} /></button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-14 shrink-0 flex-col items-center gap-1 border-r border-line bg-[#070e18] py-3 md:flex">{tools.map(([label, path], index) => <button key={label} title={label} aria-label={label} className={`grid h-10 w-10 place-items-center rounded-md border text-muted transition hover:text-white ${index === 0 ? 'border-cyan/30 bg-cyan/10 text-cyan' : 'border-transparent'}`}><Icon path={path} size={18} /></button>)}</aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex min-h-11 shrink-0 flex-wrap items-center justify-between gap-2 border-b border-line bg-[#070e18] px-2 py-1.5">
            <div className="flex gap-1 overflow-x-auto">{sheets.map((sheet) => <button key={sheet.id} onClick={() => setSheetId(sheet.id)} className={`shrink-0 rounded px-3 py-1.5 font-mono text-[9px] uppercase ${active?.id === sheet.id ? 'bg-blueprint text-white' : 'border border-line text-muted hover:text-white'}`}>{sheet.no} · {sheet.name}</button>)}</div>
            <div className="flex shrink-0 overflow-hidden rounded-md border border-line">{(['2d', 'split', '3d'] as const).map((mode) => <button key={mode} aria-pressed={view === mode} onClick={() => setView(mode)} className={`px-3 py-1.5 font-mono text-[9px] uppercase ${view === mode ? 'bg-cyan/15 text-cyan' : 'text-muted'}`}>{mode === 'split' ? '2D + 3D' : mode}</button>)}</div>
          </div>

          <div className={`grid min-h-0 flex-1 bg-black ${view === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
            {view !== '3d' && <section className={`relative min-h-[340px] overflow-auto border-line bg-black ${view === 'split' ? 'lg:border-r' : ''}`} aria-label="Editable 2D plan"><div className="pointer-events-none absolute left-3 top-2 z-10 rounded bg-black/70 px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-cyan">2D plan · editable · live</div><SheetEditor answers={answers} pkg={pkg} theme="autocad" edits={edits} onChange={changeEdits} /></section>}
            {view !== '2d' && <section className="relative min-h-[340px] overflow-hidden" aria-label="Editable 3D model"><Suspense fallback={<div className="grid h-full min-h-[420px] place-items-center font-mono text-xs text-muted">Constructing detailed house model…</div>}><Plan3DViewer answers={answers} pkg={pkg} edits={edits} onChange={changeEdits} className="h-full min-h-[420px]" /></Suspense></section>}
          </div>
        </main>

        <aside className="hidden w-72 shrink-0 overflow-y-auto border-l border-line bg-[#08111d] p-4 xl:block">
          <p className="font-mono text-[9px] uppercase tracking-[.18em] text-cyan">Project systems</p>
          <div className="mt-3 space-y-2">{pkg.disciplines.map((id) => <div key={id} className="flex items-center gap-3 rounded-lg border border-line bg-panel/50 p-3"><span className="grid h-8 w-8 place-items-center rounded bg-blueprint/10 text-blueprint"><Icon path={DISCIPLINES[id].icon} size={16} /></span><div><p className="text-xs font-600 text-white">{DISCIPLINES[id].name}</p><p className="font-mono text-[8px] uppercase text-muted">Layer active</p></div><span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan" /></div>)}</div>
          <div className="mt-6 border-t border-line pt-5"><p className="font-mono text-[9px] uppercase tracking-[.18em] text-muted">Project summary</p><dl className="mt-3 grid grid-cols-2 gap-2"><Summary label="Cost" value={`${formatUSD(pkg.costLow)}–${formatUSD(pkg.costHigh)}`} /><Summary label="Timeline" value={`${pkg.timelineWeeks[0]}–${pkg.timelineWeeks[1]} wks`} /><Summary label="Sheets" value={String(sheets.length)} /><Summary label="Edits" value={String(editCount)} /></dl></div>
          <div className="mt-6 rounded-lg border border-cyan/20 bg-cyan/5 p-3 text-[11px] leading-5 text-muted"><span className="font-600 text-cyan">Professional review required.</span> Cadvora accelerates planning and coordination; qualified professionals must review final construction documents.</div>
        </aside>
      </div>

      <footer className="flex h-8 shrink-0 items-center justify-between border-t border-line bg-[#08111d] px-3 font-mono text-[8px] uppercase tracking-wider text-muted"><span><b className="text-cyan">Live sync</b> · 3-inch snap · {editCount} edits</span><span className="hidden sm:block">2D and 3D share one project model · WebGL</span><span>Scale 1/4″ = 1′</span></footer>
    </div>
  )
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md border border-line bg-panel/60 p-2"><dt className="font-mono text-[8px] uppercase text-muted">{label}</dt><dd className="mt-1 text-[11px] font-600 text-white">{value}</dd></div>
}

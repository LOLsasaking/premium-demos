import { Suspense, lazy, useCallback, useMemo, useState } from 'react'
import FurnitureIcon from './FurnitureIcon'
import Icon from './Icon'
import Logo from './Logo'
import SheetEditor from './SheetEditor'
import { exportDXF, exportHTML, exportJSON } from '../lib/export'
import { addFurniture, addPlanDevice, buildModel, generateSheetSet, hasPlanDrawing, layoutLighting, layoutPower, patchDeviceEdit, patchFurnitureEdit, snapPlanOffset, type PlanEdits, type SheetKind } from '../lib/drawing'
import { DISCIPLINES, formatUSD, type Answers, type ProjectPackage } from '../interview/engine'
import { evaluatePlanChecks, type CodeCheck, type CodeProfile } from '../lib/codeChecks'
import { FURNITURE_CATALOG, layoutFurniture } from '../lib/modelKit'

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
  ['Layers', 'M12 2 2 7l10 5 10-5-10-5z|M2 12l10 5 10-5|M2 17l10 5 10-5'],
  ['Measure', 'M3 17 17 3l4 4L7 21l-4-4z'],
  ['Notes', 'M4 4h16v16H4z|M8 9h8M8 13h6'],
] as const

export default function ProjectWorkspace({ pkg, answers, initialEdits, onEditsChange, onClose, onNew }: ProjectWorkspaceProps) {
  const [view, setView] = useState<'2d' | 'split' | '3d'>('split')
  const [sheetId, setSheetId] = useState<SheetKind>('power')
  const [edits, setEdits] = useState<PlanEdits>(initialEdits ?? {})
  const [exportOpen, setExportOpen] = useState(false)
  const [sidePanel, setSidePanel] = useState<'explorer' | 'inspect' | 'checks'>('explorer')
  const [toolMode, setToolMode] = useState<'select' | 'measure'>('select')
  const [insertOpen, setInsertOpen] = useState(false)
  const [sectionsOpen, setSectionsOpen] = useState(false)
  const [layersOpen, setLayersOpen] = useState(false)
  const [layerOverrides, setLayerOverrides] = useState<Partial<Record<'lights' | 'electrical' | 'plumbing' | 'framing', boolean>>>({})
  const [notesOpen, setNotesOpen] = useState(false)
  const [notes, setNotes] = useState('')
  const [cutaway, setCutaway] = useState(72)
  const [systemGlow, setSystemGlow] = useState(65)
  const [codeProfile, setCodeProfile] = useState<CodeProfile>({ jurisdiction: 'Model code baseline — verify local adoption', residentialCode: '2021 IRC', electricalCode: '2023 NEC' })
  const sheets = useMemo(() => hasPlanDrawing(pkg) ? generateSheetSet(answers, pkg, 'autocad', edits) : [], [answers, pkg, edits])
  const active = sheets.find((sheet) => sheet.id === sheetId) ?? sheets[0]
  const model = useMemo(() => buildModel(answers, pkg), [answers, pkg])
  const codeChecks = useMemo(() => evaluatePlanChecks(model, layoutPower(model, edits), layoutLighting(model, edits), codeProfile, layoutFurniture(model, edits)), [model, edits, codeProfile])
  const issueCount = codeChecks.filter((check) => check.status === 'block' || check.status === 'warn').length
  const editCount = Object.keys(edits.power ?? {}).length + Object.keys(edits.lighting ?? {}).length + Object.keys(edits.furniture ?? {}).length + (edits.additions?.power?.length ?? 0) + (edits.additions?.lighting?.length ?? 0)

  const changeEdits = useCallback((next: PlanEdits) => {
    setEdits(next)
    onEditsChange?.(next)
  }, [onEditsChange])

  function addObject(kind: 'light' | 'outlet') {
    const id = `user-${kind}-${Date.now().toString(36)}`
    const x = snapPlanOffset(model.wFt / 2)
    const y = snapPlanOffset(model.hFt / 2)
    changeEdits(kind === 'light'
      ? addPlanDevice(edits, 'lighting', { id, kind: 'can', x, y, wetLocationRated: false })
      : addPlanDevice(edits, 'power', { id, kind: 'recep', x, y }))
    setSheetId(kind === 'light' ? 'lighting' : 'power')
    setToolMode('select')
    setInsertOpen(false)
  }

  // Every command does one distinct thing:
  //   Insert → object catalog · Inspect → object list panel · Systems → jump
  //   to MEP sheets · Sections → cutaway/glow controls · Perform → code checks
  function runCommand(command: string) {
    setInsertOpen(false)
    setSectionsOpen(false)
    setLayersOpen(false)
    if (command === 'Insert') setInsertOpen(true)
    if (command === 'Inspect') setSidePanel('inspect')
    if (command === 'Systems') { setView('split'); setSheetId(sheets.some((sheet) => sheet.id === 'plumbing') ? 'plumbing' : 'power') }
    if (command === 'Sections') setSectionsOpen(true)
    if (command === 'Perform') setSidePanel('checks')
  }

  // Left rail: Select → transform · Plan → construction sheet · Layers →
  //   3D layer manager · Measure → measurement mode · Notes → callouts
  function runTool(label: string) {
    setLayersOpen(false)
    if (label === 'Select') setToolMode('select')
    if (label === 'Plan') { setToolMode('select'); setView('2d'); setSheetId('construction') }
    if (label === 'Layers') setLayersOpen(true)
    if (label === 'Measure') { setToolMode('measure'); setView('2d') }
    if (label === 'Notes') setNotesOpen(true)
  }

  function insertFurniture(item: (typeof FURNITURE_CATALOG)[number]) {
    const id = `add-${item.label.toLowerCase().replace(/[^a-z]+/g, '-')}-${Date.now().toString(36)}`
    changeEdits(addFurniture(edits, { id, kind: item.kind, width: item.width, depth: item.depth }, model.wFt / 2, model.hFt / 2))
    setInsertOpen(false)
    setToolMode('select')
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#050910] text-mist" role="dialog" aria-modal="true" aria-label="Cadvora project workspace">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#1a2b42] bg-[#08111d] px-3 md:px-5">
        <div className="flex min-w-0 items-center gap-4">
          <span className="sm:hidden"><Logo size={29} compact /></span>
          <span className="hidden sm:inline-flex"><Logo size={29} /></span>
          <span className="hidden h-5 w-px bg-line sm:block" />
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Workspace commands">
            {['Insert', 'Inspect', 'Systems', 'Sections', 'Perform'].map((item, index) => <button key={item} onClick={() => runCommand(item)} className={`rounded px-2.5 py-1.5 text-[11px] transition hover:bg-cyan/10 hover:text-cyan ${index === 0 ? 'text-cyan' : 'text-[#9aabc0]'}`}>{item}</button>)}
          </nav>
          <div className="hidden min-w-0 sm:block"><p className="truncate text-xs font-600 text-white">{pkg.headline}</p><p className="hidden font-mono text-[8px] uppercase tracking-[.15em] text-muted md:block">Project workspace · autosaved locally</p></div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-md border border-cyan/20 bg-cyan/5 px-2.5 py-1.5 font-mono text-[9px] uppercase text-cyan md:flex"><span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_#22d3ee]" /> Synced</span>
          <button onClick={() => setSidePanel('checks')} className={`hidden rounded-md border px-3 py-2 text-xs xl:block ${issueCount ? 'border-amber-300/40 text-amber-200' : 'border-emerald-300/30 text-emerald-200'}`}>Code review · {issueCount}</button>
          <div className="relative"><button onClick={() => setExportOpen((open) => !open)} className="rounded-md border border-line px-3 py-2 text-xs text-white hover:border-cyan">Export</button>{exportOpen && <div className="absolute right-0 top-11 z-50 w-48 rounded-lg border border-line bg-panel p-1.5 shadow-2xl"><button onClick={() => exportHTML(answers, pkg, edits)} className="block w-full rounded px-3 py-2 text-left text-xs hover:bg-panel2">Document / PDF</button><button onClick={() => exportDXF(answers, pkg, edits)} className="block w-full rounded px-3 py-2 text-left text-xs hover:bg-panel2">DXF / AutoCAD</button><button onClick={() => exportJSON(answers, pkg)} className="block w-full rounded px-3 py-2 text-left text-xs hover:bg-panel2">JSON / BIM handoff</button></div>}</div>
          <button onClick={onNew} className="hidden rounded-md bg-blueprint px-3 py-2 text-xs font-600 text-white sm:block">New project</button>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-md border border-line text-muted hover:text-white" aria-label="Close workspace"><Icon path="M18 6 6 18M6 6l12 12" size={18} /></button>
        </div>
      </header>

      {insertOpen && <div className="absolute left-52 top-14 z-[120] w-64 rounded-xl border border-cyan/30 bg-[#0b1624]/98 p-3 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between"><p className="text-xs font-600 text-white">Insert coordinated object</p><button onClick={() => setInsertOpen(false)} className="text-muted hover:text-white">×</button></div>
        <p className="mt-1 text-[10px] leading-4 text-muted">Objects are placed at plan center, then can be dragged in either view.</p>
        <p className="mt-3 font-mono text-[8px] uppercase tracking-wider text-muted">Devices</p>
        <button onClick={() => addObject('light')} className="mt-1.5 flex w-full items-center justify-between rounded-lg border border-line bg-panel px-3 py-2 text-left text-xs text-mist hover:border-cyan"><span>Recessed light</span><span className="text-amber-300">E-2</span></button>
        <button onClick={() => addObject('outlet')} className="mt-1.5 flex w-full items-center justify-between rounded-lg border border-line bg-panel px-3 py-2 text-left text-xs text-mist hover:border-cyan"><span>Duplex receptacle</span><span className="text-cyan">E-1</span></button>
        <p className="mt-3 font-mono text-[8px] uppercase tracking-wider text-muted">Furniture &amp; fixtures</p>
        <div className="mt-1.5 max-h-64 space-y-1.5 overflow-y-auto pr-1">
          {FURNITURE_CATALOG.map((item) => (
            <button key={item.label} onClick={() => insertFurniture(item)} className="flex w-full items-center gap-2.5 rounded-lg border border-line bg-panel px-2.5 py-2 text-left text-xs text-mist hover:border-cyan">
              <FurnitureIcon kind={item.kind} />
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              <span className="shrink-0 font-mono text-[9px] text-muted">{item.width.toFixed(1)}′×{item.depth.toFixed(1)}′</span>
            </button>
          ))}
        </div>
      </div>}

      {sectionsOpen && <div className="absolute left-72 top-14 z-[120] w-64 rounded-xl border border-cyan/30 bg-[#0b1624]/98 p-4 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between"><p className="text-xs font-600 text-white">Sections &amp; cutaway</p><button onClick={() => setSectionsOpen(false)} className="text-muted hover:text-white">×</button></div>
        <label className="mt-4 flex items-center gap-3 text-[10px] text-muted"><span className="w-16">Cutaway</span><input aria-label="Cutaway opacity" type="range" min="0" max="100" value={cutaway} onChange={(event) => setCutaway(Number(event.target.value))} className="h-1 flex-1 accent-cyan" /></label>
        <label className="mt-3 flex items-center gap-3 text-[10px] text-muted"><span className="w-16">System glow</span><input aria-label="System glow" type="range" min="0" max="100" value={systemGlow} onChange={(event) => setSystemGlow(Number(event.target.value))} className="h-1 flex-1 accent-blueprint" /></label>
        <p className="mt-3 text-[9px] leading-4 text-muted">Cutaway fades the shell to reveal interiors; glow highlights routed systems.</p>
      </div>}

      {layersOpen && <div className="absolute left-16 top-24 z-[120] w-56 rounded-xl border border-cyan/30 bg-[#0b1624]/98 p-4 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between"><p className="text-xs font-600 text-white">3D layers</p><button onClick={() => setLayersOpen(false)} className="text-muted hover:text-white">×</button></div>
        {(['lights', 'electrical', 'plumbing', 'framing'] as const).map((layer) => (
          <label key={layer} className="mt-2.5 flex items-center gap-2.5 text-[11px] capitalize text-mist">
            <input
              type="checkbox"
              checked={layerOverrides[layer] ?? (layer === 'lights' || layer === 'electrical')}
              onChange={(event) => setLayerOverrides((prev) => ({ ...prev, [layer]: event.target.checked }))}
              className="accent-cyan"
            />
            {layer === 'framing' ? 'framing + rough-in' : layer}
          </label>
        ))}
        <p className="mt-3 text-[9px] leading-4 text-muted">Framing shows studs with the wiring, boxes and piping routed through them.</p>
      </div>}

      {notesOpen && <div className="absolute left-16 top-20 z-[120] w-80 rounded-xl border border-cyan/30 bg-[#0b1624]/98 p-4 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between"><p className="text-xs font-600 text-white">Project notes</p><button onClick={() => setNotesOpen(false)} className="text-muted hover:text-white">×</button></div>
        <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Add field notes, coordination questions, or review comments…" className="mt-3 h-40 w-full resize-none rounded-lg border border-line bg-[#050910] p-3 text-xs leading-5 text-white outline-none focus:border-cyan" />
        <p className="mt-2 font-mono text-[8px] uppercase text-muted">Saved with this workspace session</p>
      </div>}

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-14 shrink-0 flex-col items-center gap-1 border-r border-line bg-[#070e18] py-3 md:flex">{tools.map(([label, path]) => <button key={label} title={label} aria-label={label} onClick={() => runTool(label)} className={`grid h-10 w-10 place-items-center rounded-md border text-muted transition hover:text-white ${(label === 'Select' && toolMode === 'select') || (label === 'Measure' && toolMode === 'measure') ? 'border-cyan/30 bg-cyan/10 text-cyan' : 'border-transparent'}`}><Icon path={path} size={18} /></button>)}</aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex min-h-11 shrink-0 flex-wrap items-center justify-between gap-2 border-b border-line bg-[#070e18] px-2 py-1.5">
            <div className="flex gap-1 overflow-x-auto">{sheets.map((sheet) => <button key={sheet.id} onClick={() => setSheetId(sheet.id)} className={`shrink-0 rounded px-3 py-1.5 font-mono text-[9px] uppercase ${active?.id === sheet.id ? 'bg-blueprint text-white' : 'border border-line text-muted hover:text-white'}`}>{sheet.no} · {sheet.name}</button>)}</div>
            <div className="flex shrink-0 overflow-hidden rounded-md border border-line">{(['2d', 'split', '3d'] as const).map((mode) => <button key={mode} aria-pressed={view === mode} onClick={() => setView(mode)} className={`px-3 py-1.5 font-mono text-[9px] uppercase ${view === mode ? 'bg-cyan/15 text-cyan' : 'text-muted'}`}>{mode === 'split' ? '2D + 3D' : mode}</button>)}</div>
          </div>

          <div className={`grid min-h-0 flex-1 bg-black ${view === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
            {view !== '3d' && <section className={`relative min-h-[340px] overflow-auto border-line bg-black ${view === 'split' ? 'lg:border-r' : ''}`} aria-label="Editable 2D plan"><div className="pointer-events-none absolute left-3 top-2 z-10 rounded bg-black/70 px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-cyan">{active?.name ?? '2D plan'} · {toolMode === 'measure' ? 'measurement mode' : 'editable · live'}</div><SheetEditor answers={answers} pkg={pkg} theme="autocad" sheetKind={active?.id ?? 'construction'} codeProfile={codeProfile} edits={edits} onChange={changeEdits} toolMode={toolMode} /></section>}
            {view !== '2d' && <section className="relative min-h-[340px] overflow-hidden" aria-label="Editable 3D model"><Suspense fallback={<div className="grid h-full min-h-[420px] place-items-center font-mono text-xs text-muted">Constructing detailed house model…</div>}><Plan3DViewer answers={answers} pkg={pkg} edits={edits} onChange={changeEdits} focusSheet={active?.id} cutaway={cutaway} systemGlow={systemGlow} layersOverride={layerOverrides} className="h-full min-h-[420px]" /></Suspense></section>}
          </div>
        </main>

        <aside className="hidden w-72 shrink-0 overflow-y-auto border-l border-[#1d3048] bg-[#0b1624] xl:block">
          <div className="grid grid-cols-3 border-b border-[#1d3048] p-1.5"><button onClick={() => setSidePanel('explorer')} className={`rounded px-2 py-2 text-[10px] font-600 ${sidePanel === 'explorer' ? 'bg-cyan/10 text-cyan' : 'text-muted'}`}>Explorer</button><button onClick={() => setSidePanel('inspect')} className={`rounded px-2 py-2 text-[10px] font-600 ${sidePanel === 'inspect' ? 'bg-cyan/10 text-cyan' : 'text-muted'}`}>Objects</button><button onClick={() => setSidePanel('checks')} className={`rounded px-2 py-2 text-[10px] font-600 ${sidePanel === 'checks' ? 'bg-cyan/10 text-cyan' : 'text-muted'}`}>Code {issueCount > 0 ? `(${issueCount})` : ''}</button></div>
          {sidePanel === 'inspect' ? (
            <ObjectInspector
              power={layoutPower(model, edits)}
              lighting={layoutLighting(model, edits)}
              furniture={layoutFurniture(model, edits)}
              onRemoveDevice={(layer, id) => changeEdits(patchDeviceEdit(edits, layer, id, { removed: true }))}
              onRemoveFurniture={(id) => changeEdits(patchFurnitureEdit(edits, id, { removed: true }))}
            />
          ) : sidePanel === 'explorer' ? <div className="p-4">
          <label className="flex items-center gap-2 rounded-md border border-line bg-[#07111d] px-2.5 py-2 text-muted"><Icon path="M21 21l-4.35-4.35M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0z" size={13} /><input aria-label="Search project layers" placeholder="Search layers" className="min-w-0 flex-1 bg-transparent text-[11px] text-white outline-none placeholder:text-muted" /></label>
          <div className="mt-4 rounded-md border border-line bg-[#08111d] p-2">
            <p className="flex items-center gap-2 px-1 py-1.5 text-[11px] font-600 text-white"><span className="text-cyan">⌄</span> Cadvora project</p>
            <p className="flex items-center gap-2 border-l border-line py-1.5 pl-5 text-[10px] text-[#9aabc0]"><span className="text-cyan">⌄</span> Floor 01</p>
            {pkg.disciplines.map((id) => <div key={id} className="ml-5 flex items-center gap-2 border-l border-line px-3 py-1.5 text-[10px] text-[#aab8c8]"><Icon path={DISCIPLINES[id].icon} size={12} /><span className="flex-1">{DISCIPLINES[id].name}</span><span className="text-cyan">●</span></div>)}
            <div className="ml-5 flex items-center gap-2 border-l border-line px-3 py-1.5 text-[10px] text-[#aab8c8]"><Icon path="M3 20h18M5 20V8l7-5 7 5v12" size={12} /><span className="flex-1">Architecture</span><span className="text-cyan">●</span></div>
            <div className="ml-5 flex items-center gap-2 border-l border-line px-3 py-1.5 text-[10px] text-[#aab8c8]"><Icon path="M4 4h16v16H4zM4 12h16" size={12} /><span className="flex-1">Furniture</span><span className="text-cyan">●</span></div>
          </div>
          <div className="mt-6 border-t border-line pt-5"><p className="font-mono text-[9px] uppercase tracking-[.18em] text-muted">Project summary</p><dl className="mt-3 grid grid-cols-2 gap-2"><Summary label="Cost" value={`${formatUSD(pkg.costLow)}–${formatUSD(pkg.costHigh)}`} /><Summary label="Timeline" value={`${pkg.timelineWeeks[0]}–${pkg.timelineWeeks[1]} wks`} /><Summary label="Sheets" value={String(sheets.length)} /><Summary label="Edits" value={String(editCount)} /></dl></div>
          <div className="mt-5 border-t border-line pt-5 text-[10px] text-muted">View controls moved: <b className="text-cyan">Sections</b> (top bar) for cutaway &amp; glow · <b className="text-cyan">Layers</b> (left rail) for 3D visibility.</div>
          <div className="mt-6 rounded-lg border border-cyan/20 bg-cyan/5 p-3 text-[11px] leading-5 text-muted"><span className="font-600 text-cyan">Professional review required.</span> Cadvora accelerates planning and coordination; qualified professionals must review final construction documents.</div>
          </div> : <CodeReviewPanel profile={codeProfile} onProfileChange={setCodeProfile} checks={codeChecks} />}
        </aside>
      </div>

      <footer className="flex h-8 shrink-0 items-center justify-between border-t border-line bg-[#08111d] px-3 font-mono text-[8px] uppercase tracking-wider text-muted"><span><b className="text-cyan">Live sync</b> · 3-inch snap · {editCount} edits</span><span className="hidden sm:block">2D and 3D share one project model · WebGL</span><span>Scale 1/4″ = 1′</span></footer>
    </div>
  )
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md border border-line bg-panel/60 p-2"><dt className="font-mono text-[8px] uppercase text-muted">{label}</dt><dd className="mt-1 text-[11px] font-600 text-white">{value}</dd></div>
}

const DEVICE_NAMES: Record<string, string> = {
  gfci: 'GFCI receptacle',
  recep: 'Duplex receptacle',
  dedicated: 'Dedicated outlet',
  can: 'Recessed light',
  pendant: 'Pendant',
  uc: 'Under-cabinet light',
  switch: 'Switch',
}

function ObjectInspector({
  power,
  lighting,
  furniture,
  onRemoveDevice,
  onRemoveFurniture,
}: {
  power: { id: string; kind: string; x: number; y: number; label?: string }[]
  lighting: { id: string; kind: string; x: number; y: number }[]
  furniture: { id: string; kind: string; x: number; y: number; width: number; depth: number }[]
  onRemoveDevice: (layer: 'power' | 'lighting', id: string) => void
  onRemoveFurniture: (id: string) => void
}) {
  const section = (title: string, rows: { key: string; name: string; meta: string; remove: () => void }[]) => (
    <div className="mt-4">
      <p className="font-mono text-[9px] uppercase tracking-[.18em] text-muted">{title} · {rows.length}</p>
      <div className="mt-2 space-y-1.5">
        {rows.map((row) => (
          <div key={row.key} className="flex items-center gap-2 rounded-md border border-line bg-[#07111d] px-2.5 py-1.5">
            <div className="min-w-0 flex-1"><p className="truncate text-[11px] text-white">{row.name}</p><p className="font-mono text-[8px] text-muted">{row.meta}</p></div>
            <button onClick={row.remove} className="rounded border border-line px-2 py-1 text-[9px] text-muted hover:border-red-400 hover:text-red-300">Remove</button>
          </div>
        ))}
      </div>
    </div>
  )
  return (
    <div className="p-4">
      <p className="text-xs font-600 text-white">Object inspector</p>
      <p className="mt-1 text-[10px] leading-4 text-muted">Every coordinated object in the model. Removals apply to the sheets, 3D view and exports.</p>
      {section('Power devices', power.map((d) => ({ key: `p-${d.id}`, name: d.label ?? DEVICE_NAMES[d.kind] ?? d.kind, meta: `${d.x.toFixed(1)}′ , ${d.y.toFixed(1)}′`, remove: () => onRemoveDevice('power', d.id) })))}
      {section('Lighting devices', lighting.map((d) => ({ key: `l-${d.id}`, name: DEVICE_NAMES[d.kind] ?? d.kind, meta: `${d.x.toFixed(1)}′ , ${d.y.toFixed(1)}′`, remove: () => onRemoveDevice('lighting', d.id) })))}
      {section('Furniture', furniture.map((f) => ({ key: `f-${f.id}`, name: f.kind.replace(/-/g, ' '), meta: `${f.width.toFixed(1)}′ × ${f.depth.toFixed(1)}′`, remove: () => onRemoveFurniture(f.id) })))}
    </div>
  )
}

function CodeReviewPanel({ profile, onProfileChange, checks }: { profile: CodeProfile; onProfileChange: (profile: CodeProfile) => void; checks: CodeCheck[] }) {
  const tone: Record<CodeCheck['status'], string> = {
    pass: 'border-emerald-400/30 bg-emerald-400/5 text-emerald-200',
    warn: 'border-amber-300/35 bg-amber-300/5 text-amber-100',
    block: 'border-red-400/40 bg-red-400/10 text-red-200',
    review: 'border-blueprint/30 bg-blueprint/5 text-blue-100',
  }
  return <div className="p-4">
    <p className="text-xs font-600 text-white">Advisory model-code screen</p>
    <p className="mt-1 text-[10px] leading-4 text-muted">Choose the intended baseline. Cadvora flags measurable conflicts; it does not certify compliance or replace the authority having jurisdiction.</p>
    <label className="mt-4 block font-mono text-[8px] uppercase tracking-wider text-muted">Jurisdiction<input value={profile.jurisdiction} onChange={(event) => onProfileChange({ ...profile, jurisdiction: event.target.value })} className="mt-1.5 w-full rounded border border-line bg-[#07111d] px-2.5 py-2 text-[10px] normal-case tracking-normal text-white outline-none focus:border-cyan" /></label>
    <div className="mt-3 grid grid-cols-2 gap-2">
      <label className="font-mono text-[8px] uppercase text-muted">Residential<select value={profile.residentialCode} onChange={(event) => onProfileChange({ ...profile, residentialCode: event.target.value as CodeProfile['residentialCode'] })} className="mt-1.5 w-full rounded border border-line bg-[#07111d] p-2 text-[10px] text-white"><option>2021 IRC</option><option>2024 IRC</option></select></label>
      <label className="font-mono text-[8px] uppercase text-muted">Electrical<select value={profile.electricalCode} onChange={(event) => onProfileChange({ ...profile, electricalCode: event.target.value as CodeProfile['electricalCode'] })} className="mt-1.5 w-full rounded border border-line bg-[#07111d] p-2 text-[10px] text-white"><option>2020 NEC</option><option>2023 NEC</option></select></label>
    </div>
    <div className="mt-4 space-y-2">{checks.map((check) => <article key={check.id} className={`rounded-lg border p-3 ${tone[check.status]}`}><div className="flex items-start gap-2"><span className="mt-0.5 font-mono text-[8px] uppercase">{check.status}</span><p className="text-[11px] font-600 leading-4 text-white">{check.title}</p></div><p className="mt-1.5 text-[9px] leading-4 opacity-80">{check.detail}</p><a href={check.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 block font-mono text-[8px] underline decoration-current/40 underline-offset-2">{check.reference} ↗</a></article>)}</div>
  </div>
}

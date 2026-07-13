import { useState } from 'react'

type Layer = 'electrical' | 'plumbing' | 'construction' | 'all'
type View = '2d' | '3d'

const layerLabels: [Layer, string][] = [['electrical','Electrical'],['plumbing','Plumbing'],['construction','Construction'],['all','All systems']]

export default function ProjectExample() {
  const [layer, setLayer] = useState<Layer>('electrical')
  const [view, setView] = useState<View>('2d')
  const show = (name: Layer) => layer === name || layer === 'all'
  return <section id="example" className="py-24 md:py-32"><div className="container-x">
    <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">Interactive project example</p><h2 className="mt-4 max-w-2xl font-display text-4xl font-600 tracking-[-.04em] md:text-5xl">One project. Every system coordinated.</h2><p className="mt-4 max-w-2xl text-muted">Inspect a residential plan by discipline, then switch from the technical drawing to the coordinated model.</p></div><div className="flex rounded-lg border border-line bg-panel p-1">{(['2d','3d'] as View[]).map(v => <button key={v} aria-pressed={view===v} onClick={() => setView(v)} className={`rounded-md px-5 py-2 font-mono text-xs uppercase ${view===v?'bg-blueprint text-white':'text-muted'}`}>{v}</button>)}</div></div>
    <div className="reveal mt-10 overflow-hidden rounded-2xl border border-line bg-[#07101b]">
      <div className="flex flex-col border-b border-line lg:flex-row lg:items-center lg:justify-between"><div className="flex flex-wrap gap-1 p-3">{layerLabels.map(([id,label]) => <button key={id} aria-pressed={layer===id} onClick={() => setLayer(id)} className={`rounded-md px-3 py-2 font-mono text-[10px] uppercase tracking-wider ${layer===id?'bg-cyan/10 text-cyan ring-1 ring-cyan/30':'text-muted hover:text-white'}`}>{label}</button>)}</div><p className="px-5 pb-3 font-mono text-[10px] uppercase tracking-wider text-muted lg:pb-0">Project C-104 · Residential coordination</p></div>
      <div className={`relative aspect-[16/8] min-h-[360px] overflow-hidden p-6 md:p-10 ${view==='3d'?'perspective-view':''}`}>
        <div className="blueprint-grid absolute inset-0 opacity-60" />
        <svg viewBox="0 0 900 430" className="relative h-full w-full" role="img" aria-label={`${view.toUpperCase()} residential plan showing ${layer} systems`}>
          <g fill="none" stroke="#6f8399" strokeWidth="4" opacity=".8"><path d="M90 45h720v340H90zM90 220h720M305 45v340M575 45v340M305 140h270M190 45v95M690 220v165"/><path d="M180 220v-45a45 45 0 0145 45M575 305h45a45 45 0 00-45-45M305 100h45a45 45 0 01-45 45" strokeWidth="2"/></g>
          {show('construction') && <g stroke="#d8e6f3" strokeWidth="2" opacity=".9"><path d="M80 35h740M80 395h740M70 45v340M830 45v340"/><path d="M90 22v8m720-8v8M57 45h8m-8 340h8"/></g>}
          {show('electrical') && <g fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" style={{filter:'drop-shadow(0 0 7px #22d3ee)'}}><path d="M125 90C210 70 245 105 330 105S490 85 540 120 655 180 760 95M125 275c80-55 170-20 240 25s170 35 230-10 105-20 165 45"/><g fill="#b8f5ff">{[[125,90],[330,105],[540,120],[760,95],[125,275],[365,300],[595,290],[760,335]].map(([x,y])=><circle key={`${x}${y}`} cx={x} cy={y} r="8"/>)}</g></g>}
          {show('plumbing') && <g fill="none" stroke="#3478ff" strokeWidth="7" strokeLinecap="round" style={{filter:'drop-shadow(0 0 7px #3478ff)'}}><path d="M150 365V325H265V245h115V200M265 325h225V245h155V175h105"/><path d="M168 365V340h120V268h112" stroke="#f87171" strokeWidth="4"/></g>}
          <g fill="#91a4bd" fontFamily="monospace" fontSize="11"><text x="110" y="205">LIVING</text><text x="330" y="125">KITCHEN</text><text x="610" y="205">PRIMARY</text><text x="110" y="370">GARAGE</text><text x="335" y="370">BATH</text><text x="620" y="370">BEDROOM 02</text></g>
        </svg>
        <div className="absolute bottom-5 left-5 flex gap-4 rounded-md border border-line bg-ink/85 px-4 py-2 font-mono text-[9px] uppercase text-muted backdrop-blur"><span><i className="mr-2 inline-block h-1.5 w-4 bg-cyan"/>Electrical</span><span><i className="mr-2 inline-block h-1.5 w-4 bg-blueprint"/>Plumbing</span></div>
      </div>
    </div>
  </div></section>
}

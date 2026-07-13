const outputs = ['2D Plans', '3D Models', 'Electrical', 'Plumbing', 'Construction', 'PDF Export']

export default function CredibilityStrip() {
  return <section className="border-y border-line bg-panel/40 py-6"><div className="container-x flex flex-col items-center justify-between gap-5 lg:flex-row"><p className="text-center text-sm text-muted lg:text-left">Built for <span className="text-mist">homeowners, electricians, plumbers, contractors and designers</span></p><div className="flex flex-wrap justify-center gap-2">{outputs.map(item => <span key={item} className="rounded-md border border-line bg-ink/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">{item}</span>)}</div></div></section>
}

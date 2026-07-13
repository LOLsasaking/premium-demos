import { useEffect, useState } from 'react'
import Icon from './Icon'
import Logo from './Logo'

const links = [['Product', '#product'], ['Solutions', '#solutions'], ['Examples', '#examples'], ['How It Works', '#how'], ['Pricing', '#pricing'], ['Resources', '#resources']]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => { const onScroll = () => setSolid(window.scrollY > 32); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll) }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])

  return <nav className={`fixed inset-x-0 top-0 z-50 border-b transition-all ${solid || open ? 'glass border-line py-3' : 'border-transparent py-5'}`}>
    <div className="container-x flex items-center justify-between">
      <a href="#product" aria-label="Cadvora home" onClick={() => setOpen(false)}><Logo /></a>
      <ul className="hidden items-center gap-6 text-[13px] font-500 text-muted lg:flex">{links.map(([label, href]) => <li key={href}><a href={href} className="transition hover:text-white">{label}</a></li>)}</ul>
      <div className="flex items-center gap-3"><a href="#waitlist" className="hidden text-sm text-muted transition hover:text-white sm:block">Sign In</a><a href="#studio" className="btn-blue hidden px-4 py-2.5 sm:inline-flex">Generate a Diagram</a><button className="grid h-10 w-10 place-items-center rounded-lg border border-line text-white lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(v => !v)}><Icon path={open ? 'M18 6 6 18M6 6l12 12' : 'M3 6h18M3 12h18M3 18h18'} size={20} /></button></div>
    </div>
    {open && <div className="glass mt-3 border-t border-line lg:hidden"><ul className="container-x flex flex-col gap-1 py-4">{links.map(([label, href]) => <li key={href}><a href={href} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-3 text-sm text-mist hover:bg-panel">{label}</a></li>)}<li className="mt-2"><a href="#studio" onClick={() => setOpen(false)} className="btn-blue w-full py-3">Generate a Diagram</a></li></ul></div>}
  </nav>
}

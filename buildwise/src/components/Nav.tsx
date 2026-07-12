import { useEffect, useState } from 'react'
import Icon from './Icon'
import Logo from './Logo'

const links = [
  ['How it works', '#how'],
  ['Try the AI', '#studio'],
  ['Disciplines', '#disciplines'],
  ['Marketplace', '#marketplace'],
  ['Pricing', '#pricing'],
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition ${
        solid || open ? 'glass border-b border-line py-3' : 'py-5'
      }`}
    >
      <div className="container-x flex items-center justify-between">
        <a href="#top" aria-label="BuildWise AI home" onClick={() => setOpen(false)}>
          <Logo />
        </a>
        <ul className="hidden items-center gap-8 text-sm font-500 text-muted md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="transition hover:text-mist">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a href="#studio" className="btn-build hidden sm:inline-flex" onClick={() => setOpen(false)}>
            Start a project
          </a>
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-line text-mist md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon path={open ? 'M18 6 6 18M6 6l12 12' : 'M3 6h18M3 12h18M3 18h18'} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="glass border-t border-line md:hidden">
          <ul className="container-x flex flex-col gap-1 py-4">
            {links.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-500 text-mist transition hover:bg-panel"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a href="#studio" onClick={() => setOpen(false)} className="btn-build w-full py-3.5">
                Start a project
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

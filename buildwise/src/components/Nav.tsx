import { useEffect, useState } from 'react'
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
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition ${
        solid ? 'glass border-b border-line py-3' : 'py-5'
      }`}
    >
      <div className="container-x flex items-center justify-between">
        <a href="#top" aria-label="BuildWise AI home">
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
        <a href="#studio" className="btn-build">
          Start a project
        </a>
      </div>
    </nav>
  )
}

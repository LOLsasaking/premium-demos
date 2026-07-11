import Logo from './Logo'

const cols = [
  ['Platform', ['How it works', 'Disciplines', 'Digital twin', 'Marketplace', 'Pricing']],
  ['Company', ['About', 'Careers', 'Blog', 'Contact']],
  ['Legal', ['Terms', 'Privacy', 'Professional disclaimer']],
]

export default function Footer() {
  return (
    <footer className="border-t border-line py-14">
      <div className="container-x grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">
            The AI architect &amp; engineer for residential construction. Concept to permit, in one place.
          </p>
        </div>
        {cols.map(([title, items]) => (
          <div key={title as string}>
            <p className="text-sm font-600 text-mist">{title as string}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {(items as string[]).map((i) => (
                <li key={i}>
                  <a href="#top" className="transition hover:text-mist">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-x mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} BuildWise AI. Concept demo — plans require licensed review before construction.</p>
        <p>Built as a product prototype.</p>
      </div>
    </footer>
  )
}

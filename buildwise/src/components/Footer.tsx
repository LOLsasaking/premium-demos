import Logo from './Logo'

const cols: [string, [string, string][]][] = [
  [
    'Platform',
    [
      ['How it works', '#how'],
      ['Try the AI', '#studio'],
      ['Disciplines', '#disciplines'],
      ['Marketplace', '#marketplace'],
      ['Pricing', '#pricing'],
    ],
  ],
  [
    'Early access',
    [
      ['Join the waitlist', '#waitlist'],
      ['Start a project', '#studio'],
    ],
  ],
  [
    'Legal',
    [
      ['Terms of use', '/terms.html'],
      ['Privacy policy', '/privacy.html'],
    ],
  ],
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
          <div key={title}>
            <p className="text-sm font-600 text-mist">{title}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {items.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="transition hover:text-mist">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-x mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} BuildWise AI. Drafts require licensed professional review before
          construction or permitting.
        </p>
        <p>Early-access beta.</p>
      </div>
    </footer>
  )
}

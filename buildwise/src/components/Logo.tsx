import { assetUrl } from '../lib/brand'

export default function Logo({ size = 34, compact = false }: { size?: number; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img src={assetUrl(import.meta.env.BASE_URL, 'cadvora-mark.svg')} width={size} height={size} alt="" aria-hidden="true" />
      {!compact && <span className="font-display text-xl font-600 tracking-[-0.035em] text-white">Cadvora</span>}
    </span>
  )
}

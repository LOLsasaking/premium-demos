export default function Logo({ size = 34 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect width="40" height="40" rx="10" fill="#111827" stroke="#24304A" />
        <path d="M8 30 20 9l12 21" stroke="#3B82F6" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M14 30v-8h12v8" stroke="#F59E0B" strokeWidth="2.4" strokeLinejoin="round" />
        <circle cx="20" cy="9" r="1.8" fill="#22D3EE" />
      </svg>
      <span className="font-display text-xl font-700 tracking-tight text-mist">
        Build<span className="text-blueprint">Wise</span>
        <span className="ml-1 align-super text-[10px] font-600 tracking-widest text-build">AI</span>
      </span>
    </span>
  )
}

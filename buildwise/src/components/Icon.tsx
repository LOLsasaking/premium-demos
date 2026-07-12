interface IconProps {
  path: string
  size?: number
  className?: string
  strokeWidth?: number
}

/** Minimal stroked-icon renderer for 24×24 path data. */
export default function Icon({ path, size = 22, className = '', strokeWidth = 1.8 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path.split('|').map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}

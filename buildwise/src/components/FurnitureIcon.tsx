import type { ModelKind } from '../lib/modelKit'

/**
 * Small schematic top-down icon for a furniture/fixture kind — the same
 * plan-view glyph language as the 2D editor's PlanFurniture symbols, shrunk
 * to badge size so the Insert catalog shows what each piece looks like
 * instead of a bare label.
 */
export default function FurnitureIcon({ kind, size = 28 }: { kind: ModelKind; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="shrink-0">
      <rect x="1" y="1" width="22" height="22" rx="4" className="stroke-line" strokeWidth="1" />
      <g transform="translate(4 4)" strokeLinecap="round">
        {kind === 'bed' && (
          <>
            <rect x="0" y="0" width="16" height="16" rx="1.5" />
            <line x1="0" y1="4.5" x2="16" y2="4.5" />
            <rect x="1.5" y="1.2" width="5.5" height="2.6" rx="1" />
            <rect x="9" y="1.2" width="5.5" height="2.6" rx="1" />
          </>
        )}
        {kind === 'sofa' && (
          <>
            <rect x="0" y="3" width="16" height="10" rx="2" />
            <line x1="5.3" y1="3" x2="5.3" y2="13" />
            <line x1="10.7" y1="3" x2="10.7" y2="13" />
            <rect x="0" y="0" width="16" height="3" rx="1" />
          </>
        )}
        {(kind === 'coffee-table' || kind === 'dining-table' || kind === 'island') && (
          <>
            <rect x="0" y="0" width="16" height="16" rx="1.5" />
            <line x1="8" y1="0" x2="8" y2="16" />
            <line x1="0" y1="8" x2="16" y2="8" />
          </>
        )}
        {(kind === 'base-cabinet' || kind === 'sink-base' || kind === 'garage-storage') && (
          <>
            <rect x="0" y="0" width="16" height="16" rx="1" strokeDasharray="3 2" />
            <line x1="8" y1="0" x2="8" y2="16" strokeDasharray="2 2" />
          </>
        )}
        {kind === 'refrigerator' && (
          <>
            <rect x="0" y="0" width="16" height="16" rx="1.5" />
            <line x1="8" y1="0" x2="8" y2="16" />
          </>
        )}
        {kind === 'range' && (
          <>
            <rect x="0" y="0" width="16" height="16" rx="1.5" />
            {[[4.4, 4.4], [11.6, 4.4], [4.4, 11.6], [11.6, 11.6]].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.1" />
            ))}
          </>
        )}
        {kind === 'vanity' && (
          <>
            <rect x="0" y="0" width="16" height="16" rx="1.5" />
            <ellipse cx="8" cy="8" rx="4.6" ry="5.2" />
          </>
        )}
        {kind === 'toilet' && (
          <>
            <rect x="3" y="0" width="10" height="4" rx="1.2" />
            <ellipse cx="8" cy="10.5" rx="5.5" ry="5.2" />
          </>
        )}
        {kind === 'tub' && (
          <>
            <rect x="0" y="0" width="16" height="16" rx="4" />
            <rect x="2.4" y="2.4" width="11.2" height="11.2" rx="3" strokeDasharray="2 2" />
          </>
        )}
        {kind === 'shower' && (
          <>
            <rect x="0" y="0" width="16" height="16" rx="1" />
            <line x1="0" y1="0" x2="16" y2="16" />
            <line x1="16" y1="0" x2="0" y2="16" />
            <circle cx="8" cy="8" r="1.6" />
          </>
        )}
      </g>
    </svg>
  )
}

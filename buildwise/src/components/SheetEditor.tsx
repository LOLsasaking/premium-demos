import { useMemo, useRef, useState } from 'react'
import Icon from './Icon'
import type { Answers, ProjectPackage } from '../interview/engine'
import {
  SHEET_SIZE,
  buildModel,
  generateShellSVG,
  layoutLighting,
  layoutPower,
  sheetTransform,
  type LightDevice,
  type PlanEdits,
  type PowerDevice,
  type SheetTheme,
} from '../lib/drawing'

type AnyDevice = (PowerDevice | LightDevice) & { layer: 'power' | 'lighting' }

const KIND_LABEL: Record<string, string> = {
  gfci: 'GFCI receptacle',
  recep: 'Duplex receptacle',
  dedicated: 'Dedicated outlet',
  can: 'Recessed can',
  pendant: 'Pendant light',
  uc: 'Under-cabinet light',
  switch: 'Switch',
}

/**
 * Interactive CAD-style editor: click a device to inspect it, drag to move
 * (snaps to 3"), assign a circuit number, or remove it. Edits flow into the
 * generated sheets, the export document and the DXF.
 */
export default function SheetEditor({
  answers,
  pkg,
  theme,
  edits,
  onChange,
}: {
  answers: Answers
  pkg: ProjectPackage
  theme: SheetTheme
  edits: PlanEdits
  onChange: (e: PlanEdits) => void
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showPower, setShowPower] = useState(true)
  const [showLighting, setShowLighting] = useState(true)
  const svgRef = useRef<SVGSVGElement>(null)
  const drag = useRef<{ id: string; layer: 'power' | 'lighting'; startX: number; startY: number; baseDx: number; baseDy: number } | null>(null)

  const model = useMemo(() => buildModel(answers, pkg), [answers, pkg])
  const tf = useMemo(() => sheetTransform(model), [model])
  const shell = useMemo(
    () => generateShellSVG(answers, pkg, theme).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, ''),
    [answers, pkg, theme],
  )

  const devices: AnyDevice[] = useMemo(
    () => [
      ...layoutPower(model, edits).map((d) => ({ ...d, layer: 'power' as const })),
      ...layoutLighting(model, edits).map((d) => ({ ...d, layer: 'lighting' as const })),
    ],
    [model, edits],
  )
  const sel = devices.find((d) => d.layer + ':' + d.id === selected) ?? null

  function patch(layer: 'power' | 'lighting', id: string, up: Partial<{ dx: number; dy: number; removed: boolean; circuit: string }>) {
    const layerEdits = { ...(edits[layer] ?? {}) }
    layerEdits[id] = { ...layerEdits[id], ...up }
    onChange({ ...edits, [layer]: layerEdits })
  }

  /** Client px → sheet viewBox units. */
  function toSheet(e: React.PointerEvent): { x: number; y: number } {
    const rect = svgRef.current!.getBoundingClientRect()
    return {
      x: ((e.clientX - rect.left) / rect.width) * SHEET_SIZE.w,
      y: ((e.clientY - rect.top) / rect.height) * SHEET_SIZE.h,
    }
  }

  function onDeviceDown(e: React.PointerEvent, d: AnyDevice) {
    e.stopPropagation()
    setSelected(d.layer + ':' + d.id)
    const pt = toSheet(e)
    const cur = edits[d.layer]?.[d.id]
    drag.current = { id: d.id, layer: d.layer, startX: pt.x, startY: pt.y, baseDx: cur?.dx ?? 0, baseDy: cur?.dy ?? 0 }
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }

  function onMove(e: React.PointerEvent) {
    if (!drag.current) return
    const pt = toSheet(e)
    const dFtX = (pt.x - drag.current.startX) / tf.s
    const dFtY = (pt.y - drag.current.startY) / tf.s
    const snap = (n: number) => Math.round(n * 4) / 4 // 3" grid
    patch(drag.current.layer, drag.current.id, {
      dx: snap(drag.current.baseDx + dFtX),
      dy: snap(drag.current.baseDy + dFtY),
    })
  }

  const px = (d: AnyDevice) => ({ x: tf.x0 + d.x * tf.s, y: tf.y0 + d.y * tf.s })
  const dark = theme !== 'paper'
  const powerColor = theme === 'autocad' ? '#00FFFF' : '#8FC1FF'
  const lightColor = theme === 'autocad' ? '#FFFF00' : '#F59E0B'

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SHEET_SIZE.w} ${SHEET_SIZE.h}`}
        className="block w-full touch-none select-none"
        onPointerMove={onMove}
        onPointerUp={() => (drag.current = null)}
        onPointerLeave={() => (drag.current = null)}
        onPointerDown={() => setSelected(null)}
      >
        <g dangerouslySetInnerHTML={{ __html: shell }} />

        {devices.map((d) => {
          if (d.layer === 'power' && !showPower) return null
          if (d.layer === 'lighting' && !showLighting) return null
          const { x, y } = px(d)
          const isSel = selected === d.layer + ':' + d.id
          const color = d.layer === 'power' ? powerColor : lightColor
          return (
            <g
              key={d.layer + d.id}
              transform={`translate(${x} ${y})`}
              onPointerDown={(e) => onDeviceDown(e, d)}
              style={{ cursor: 'grab' }}
            >
              {isSel && <circle r="16" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" />}
              <circle r="12" fill="transparent" />
              {d.kind === 'switch' ? (
                <text fill={color} fontSize="15" fontStyle="italic" fontFamily="Georgia, serif" textAnchor="middle" dy="5">
                  S
                </text>
              ) : d.kind === 'can' ? (
                <>
                  <circle r="8" fill="none" stroke={color} strokeWidth="1.5" />
                  <line x1="-5.5" y1="-5.5" x2="5.5" y2="5.5" stroke={color} strokeWidth="1.2" />
                  <line x1="5.5" y1="-5.5" x2="-5.5" y2="5.5" stroke={color} strokeWidth="1.2" />
                </>
              ) : d.kind === 'pendant' ? (
                <>
                  <circle r="8" fill="none" stroke={color} strokeWidth="1.5" />
                  <circle r="3" fill={color} />
                </>
              ) : d.kind === 'uc' ? (
                <circle r="4.5" fill="none" stroke={color} strokeWidth="1.4" />
              ) : (
                <>
                  <circle r="5.5" fill={dark ? '#0B1220' : '#fff'} stroke={color} strokeWidth="1.6" />
                  <line x1="-9" y1="0" x2="-5.5" y2="0" stroke={color} strokeWidth="1.6" />
                  <line x1="5.5" y1="0" x2="9" y2="0" stroke={color} strokeWidth="1.6" />
                  {d.kind === 'gfci' && (
                    <text fill={color} fontSize="9" fontFamily="monospace" textAnchor="middle" y="-9">
                      GFCI
                    </text>
                  )}
                </>
              )}
              {'label' in d && d.label && d.kind === 'dedicated' && (
                <text fill={color} fontSize="9" fontFamily="monospace" x="9" y="-7">
                  {d.label}
                </text>
              )}
              {d.circuit && (
                <text fill={color} fontSize="9" fontFamily="monospace" x="9" y="14">
                  CKT {d.circuit}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Layer toggles */}
      <div className="absolute left-3 top-3 flex gap-1.5">
        {(
          [
            ['Power', showPower, setShowPower],
            ['Lighting', showLighting, setShowLighting],
          ] as const
        ).map(([label, on, set]) => (
          <button
            key={label}
            onClick={() => set(!on)}
            className={`rounded-md border px-2.5 py-1 text-[11px] font-500 transition ${
              on ? 'border-blueprint bg-blueprint/20 text-mist' : 'border-line bg-panel text-muted'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Inspector */}
      {sel && (
        <div className="absolute right-3 top-3 w-52 rounded-xl border border-line bg-panel/95 p-3 text-xs shadow-soft backdrop-blur">
          <div className="font-600 text-mist">{KIND_LABEL[sel.kind] ?? sel.kind}</div>
          <div className="mt-1 font-mono text-muted">
            {sel.x.toFixed(2)}′ , {sel.y.toFixed(2)}′ · drag to move
          </div>
          <label className="mt-2 block text-muted">
            Circuit #
            <input
              value={sel.circuit ?? ''}
              onChange={(e) => patch(sel.layer, sel.id, { circuit: e.target.value })}
              placeholder="e.g. 3"
              className="mt-1 w-full rounded-lg border border-line bg-ink px-2 py-1.5 text-mist outline-none focus:border-blueprint"
            />
          </label>
          <button
            onClick={() => {
              patch(sel.layer, sel.id, { removed: true })
              setSelected(null)
            }}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-line py-1.5 text-muted transition hover:border-build hover:text-build"
          >
            <Icon path="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" size={13} />
            Remove device
          </button>
        </div>
      )}

      {/* Reset */}
      {(edits.power || edits.lighting) && (
        <button
          onClick={() => onChange({})}
          className="absolute bottom-3 right-3 rounded-lg border border-line bg-panel/90 px-2.5 py-1 text-[11px] text-muted transition hover:text-mist"
        >
          Reset edits
        </button>
      )}
    </div>
  )
}

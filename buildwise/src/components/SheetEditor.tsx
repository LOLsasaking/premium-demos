import { useEffect, useMemo, useRef, useState } from 'react'
import Icon from './Icon'
import type { Answers, ProjectPackage } from '../interview/engine'
import {
  SHEET_SIZE,
  addPlanDevice,
  buildModel,
  deviceMisplaced,
  furnitureMisplaced,
  generateSheetSet,
  generateShellSVG,
  layoutLighting,
  layoutPower,
  patchDeviceEdit,
  patchFurnitureEdit,
  replaceFurniture,
  sheetEditableLayers,
  sheetTransform,
  snapPlanOffset,
  type LightDevice,
  type PlanEdits,
  type PowerDevice,
  type SheetKind,
  type SheetTheme,
} from '../lib/drawing'
import { BED_SIZES, layoutFurniture, planRoomModels, type ModelPlacement } from '../lib/modelKit'
import { evaluateProposedLight, type CodeProfile } from '../lib/codeChecks'

type AnyDevice = (PowerDevice & { layer: 'power' }) | (LightDevice & { layer: 'lighting' })

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
  sheetKind,
  codeProfile,
  edits,
  onChange,
  toolMode = 'select',
}: {
  answers: Answers
  pkg: ProjectPackage
  theme: SheetTheme
  sheetKind: SheetKind
  codeProfile?: CodeProfile
  edits: PlanEdits
  onChange: (e: PlanEdits) => void
  toolMode?: 'select' | 'measure'
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showPower, setShowPower] = useState(true)
  const [showLighting, setShowLighting] = useState(true)
  const [measurePoints, setMeasurePoints] = useState<{ x: number; y: number }[]>([])
  const svgRef = useRef<SVGSVGElement>(null)
  const drag = useRef<{ id: string; layer: 'power' | 'lighting' | 'furniture'; startX: number; startY: number; baseDx: number; baseDy: number } | null>(null)

  const model = useMemo(() => buildModel(answers, pkg), [answers, pkg])
  const tf = useMemo(() => sheetTransform(model), [model])
  const editableLayers = useMemo(() => sheetEditableLayers(sheetKind), [sheetKind])
  // Each editable sheet carries a single layer; its visibility toggle decides
  // whether the fully-drawn plan (fixtures + wiring/legend) or the bare
  // architectural shell is shown underneath the draggable hit-targets.
  const layerOn = editableLayers.includes('power') ? showPower : editableLayers.includes('lighting') ? showLighting : true
  const shell = useMemo(
    () => {
      const svg = editableLayers.length > 0 && !layerOn
        ? generateShellSVG(answers, pkg, theme)
        : generateSheetSet(answers, pkg, theme, edits).find((sheet) => sheet.id === sheetKind)?.svg ?? generateShellSVG(answers, pkg, theme)
      return svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')
    },
    [answers, pkg, theme, edits, sheetKind, editableLayers.length, layerOn],
  )

  const devices: AnyDevice[] = useMemo(
    () => [
      ...(editableLayers.includes('power') ? layoutPower(model, edits).map((d) => ({ ...d, layer: 'power' as const })) : []),
      ...(editableLayers.includes('lighting') ? layoutLighting(model, edits).map((d) => ({ ...d, layer: 'lighting' as const })) : []),
    ],
    [model, edits, editableLayers],
  )
  const baseFurniture = useMemo(() => planRoomModels(model), [model])
  const furniture = useMemo(() => layoutFurniture(model, edits), [model, edits])
  const sel = devices.find((d) => d.layer + ':' + d.id === selected) ?? null
  const selectedFurniture = furniture.find((item) => `furniture:${item.id}` === selected) ?? null

  useEffect(() => setSelected(null), [sheetKind])

  function patch(layer: 'power' | 'lighting', id: string, up: Partial<{ dx: number; dy: number; removed: boolean; circuit: string; wetLocationRated: boolean }>) {
    onChange(patchDeviceEdit(edits, layer, id, up))
  }

  function addLight() {
    const id = `user-light-${Date.now().toString(36)}`
    onChange(addPlanDevice(edits, 'lighting', { id, kind: 'can', x: snapPlanOffset(model.wFt / 2), y: snapPlanOffset(model.hFt / 2), wetLocationRated: false }))
    setSelected(`lighting:${id}`)
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
    if (toolMode === 'measure') return
    e.stopPropagation()
    setSelected(d.layer + ':' + d.id)
    const pt = toSheet(e)
    const cur = edits[d.layer]?.[d.id]
    drag.current = { id: d.id, layer: d.layer, startX: pt.x, startY: pt.y, baseDx: cur?.dx ?? 0, baseDy: cur?.dy ?? 0 }
    try { (e.target as Element).setPointerCapture?.(e.pointerId) } catch { /* synthetic/unsupported pointer capture */ }
  }

  function onFurnitureDown(e: React.PointerEvent, item: ModelPlacement) {
    if (toolMode === 'measure') return
    e.stopPropagation()
    setSelected(`furniture:${item.id}`)
    const pt = toSheet(e)
    const cur = edits.furniture?.[item.id]
    drag.current = { id: item.id, layer: 'furniture', startX: pt.x, startY: pt.y, baseDx: cur?.dx ?? 0, baseDy: cur?.dy ?? 0 }
    try { (e.target as Element).setPointerCapture?.(e.pointerId) } catch { /* synthetic/unsupported pointer capture */ }
  }

  function onMove(e: React.PointerEvent) {
    if (!drag.current) return
    const pt = toSheet(e)
    const dFtX = (pt.x - drag.current.startX) / tf.s
    const dFtY = (pt.y - drag.current.startY) / tf.s
    const update = { dx: snapPlanOffset(drag.current.baseDx + dFtX), dy: snapPlanOffset(drag.current.baseDy + dFtY) }
    if (drag.current.layer === 'furniture') onChange(patchFurnitureEdit(edits, drag.current.id, update))
    else patch(drag.current.layer, drag.current.id, update)
  }

  const px = (d: AnyDevice) => ({ x: tf.x0 + d.x * tf.s, y: tf.y0 + d.y * tf.s })
  const powerColor = theme === 'autocad' ? '#00FFFF' : '#8FC1FF'
  const lightColor = theme === 'autocad' ? '#FFFF00' : '#F59E0B'
  const selectedLightCheck = sel?.layer === 'lighting' && sel.kind !== 'switch'
    ? evaluateProposedLight(model, { x: sel.x, y: sel.y, wetLocationRated: sel.wetLocationRated ?? false }, codeProfile ?? { jurisdiction: 'Model code baseline', residentialCode: '2021 IRC', electricalCode: '2023 NEC' })
    : null
  const measured = measurePoints.length === 2 ? Math.hypot(measurePoints[1].x - measurePoints[0].x, measurePoints[1].y - measurePoints[0].y) : null
  const measureDown = (event: React.PointerEvent<SVGSVGElement>) => {
    if (toolMode !== 'measure') { setSelected(null); return }
    const point = toSheet(event)
    const planPoint = { x: Math.max(0, Math.min(model.wFt, (point.x - tf.x0) / tf.s)), y: Math.max(0, Math.min(model.hFt, (point.y - tf.y0) / tf.s)) }
    setMeasurePoints((current) => current.length >= 2 ? [planPoint] : [...current, planPoint])
  }

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SHEET_SIZE.w} ${SHEET_SIZE.h}`}
        className="block w-full touch-none select-none"
        onPointerMove={onMove}
        onPointerUp={() => (drag.current = null)}
        onPointerLeave={() => (drag.current = null)}
        onPointerDown={measureDown}
      >
        <g dangerouslySetInnerHTML={{ __html: shell }} />

        <g aria-label="Furniture and equipment plan" fill="none" stroke={theme === 'autocad' ? '#91A9C3' : '#64748B'} strokeWidth="1.1">
          {furniture.map((item) => (
            <PlanFurniture key={item.id} item={item} x0={tf.x0} y0={tf.y0} scale={tf.s} selected={selected === `furniture:${item.id}`} misplaced={furnitureMisplaced(model, item)} onPointerDown={(event) => onFurnitureDown(event, item)} onSelect={() => setSelected(`furniture:${item.id}`)} />
          ))}
        </g>

        {measurePoints.length > 0 && <g stroke="#22D3EE" fill="#22D3EE" pointerEvents="none">
          {measurePoints.length === 2 && <line x1={tf.x0 + measurePoints[0].x * tf.s} y1={tf.y0 + measurePoints[0].y * tf.s} x2={tf.x0 + measurePoints[1].x * tf.s} y2={tf.y0 + measurePoints[1].y * tf.s} strokeWidth="2" strokeDasharray="5 3" />}
          {measurePoints.map((point, index) => <circle key={index} cx={tf.x0 + point.x * tf.s} cy={tf.y0 + point.y * tf.s} r="5" fill="#050910" strokeWidth="2" />)}
          {measured !== null && <text x={tf.x0 + ((measurePoints[0].x + measurePoints[1].x) / 2) * tf.s} y={tf.y0 + ((measurePoints[0].y + measurePoints[1].y) / 2) * tf.s - 9} textAnchor="middle" fontFamily="monospace" fontSize="12" stroke="none">{measured.toFixed(2)}′ ({Math.round(measured * 12)}″)</text>}
        </g>}

        {devices.map((d) => {
          if (d.layer === 'power' && !showPower) return null
          if (d.layer === 'lighting' && !showLighting) return null
          const { x, y } = px(d)
          const isSel = selected === d.layer + ':' + d.id
          const bad = deviceMisplaced(model, d.kind, d.x, d.y)
          const color = d.layer === 'power' ? powerColor : lightColor
          return (
            <g
              key={d.layer + d.id}
              transform={`translate(${x} ${y})`}
              onPointerDown={(e) => onDeviceDown(e, d)}
              style={{ cursor: 'grab' }}
            >
              {/* The fixture/receptacle symbol, wiring and tags are drawn by the
                  full plan backdrop; this layer is the transparent drag target
                  plus selection / invalid feedback. */}
              {bad && <circle r="15" fill="none" stroke="#FF4D4F" strokeWidth="2" strokeDasharray="4 3" />}
              {isSel && <circle r="15" fill="none" stroke={bad ? '#FF4D4F' : color} strokeWidth="1.5" strokeDasharray="4 3" />}
              <circle r="13" fill="transparent" />
              {isSel && <circle r="2" fill={bad ? '#FF4D4F' : color} />}
            </g>
          )
        })}
      </svg>

      {toolMode === 'measure' && <div className="absolute bottom-3 left-3 rounded border border-cyan/30 bg-panel/95 px-3 py-2 font-mono text-[10px] text-cyan">{measurePoints.length === 0 ? 'Click the first measurement point' : measurePoints.length === 1 ? 'Click the second measurement point' : `${measured?.toFixed(2)} ft · click to start another measurement`}</div>}

      {/* Layer toggles */}
      {editableLayers.length > 0 && <div className="absolute left-3 top-3 flex gap-1.5">
        {(
          [
            ['Power', showPower, setShowPower],
            ['Lighting', showLighting, setShowLighting],
          ] as const
        ).filter(([label]) => label === 'Power' ? editableLayers.includes('power') : editableLayers.includes('lighting')).map(([label, on, set]) => (
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
        {editableLayers.includes('lighting') && <button onClick={addLight} className="rounded-md border border-cyan/40 bg-cyan/10 px-2.5 py-1 text-[11px] font-600 text-cyan hover:bg-cyan/20">+ Add recessed light</button>}
      </div>}

      {/* Inspector */}
      {sel && (
        <div className="absolute right-3 top-3 w-52 rounded-xl border border-line bg-panel/95 p-3 text-xs shadow-soft backdrop-blur">
          <div className="flex items-center justify-between gap-2"><span className="font-600 text-mist">{KIND_LABEL[sel.kind] ?? sel.kind}</span><button onClick={() => setSelected(null)} aria-label="Close" className="grid h-5 w-5 place-items-center rounded border border-line text-muted hover:border-cyan hover:text-white">×</button></div>
          <div className="mt-1 font-mono text-muted">
            {sel.x.toFixed(2)}′ , {sel.y.toFixed(2)}′ · drag to move
          </div>
          {deviceMisplaced(model, sel.kind, sel.x, sel.y) && <div className="mt-1 rounded border border-red-400/40 bg-red-400/10 px-2 py-1 text-[10px] text-red-300">Off the plan — shown with a red outline.</div>}
          <label className="mt-2 block text-muted">
            Circuit #
            <input
              value={sel.circuit ?? ''}
              onChange={(e) => patch(sel.layer, sel.id, { circuit: e.target.value })}
              placeholder="e.g. 3"
              className="mt-1 w-full rounded-lg border border-line bg-ink px-2 py-1.5 text-mist outline-none focus:border-blueprint"
            />
          </label>
          {sel.layer === 'lighting' && sel.kind !== 'switch' && <label className="mt-2 flex items-center gap-2 rounded border border-line bg-ink/70 p-2 text-[10px] text-muted"><input type="checkbox" checked={sel.wetLocationRated ?? false} onChange={(e) => patch(sel.layer, sel.id, { wetLocationRated: e.target.checked })} className="accent-cyan" /> Wet-location-rated fixture</label>}
          {selectedLightCheck && <div className={`mt-2 rounded border p-2 text-[10px] leading-4 ${selectedLightCheck.status === 'block' ? 'border-red-400/40 bg-red-400/10 text-red-200' : 'border-amber-300/30 bg-amber-300/10 text-amber-100'}`}><p className="font-600">{selectedLightCheck.title}</p><p className="mt-1 opacity-80">{selectedLightCheck.reference}</p></div>}
          {((edits[sel.layer]?.[sel.id]?.dx ?? 0) !== 0 || (edits[sel.layer]?.[sel.id]?.dy ?? 0) !== 0) && (
            <button onClick={() => patch(sel.layer, sel.id, { dx: 0, dy: 0 })} className="mt-2 w-full rounded-lg border border-blueprint/40 bg-blueprint/10 py-1.5 text-blueprint hover:bg-blueprint/20">
              Undo move — keep object
            </button>
          )}
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

      {selectedFurniture && (
        <div className="absolute right-3 top-3 w-56 rounded-xl border border-cyan/40 bg-panel/95 p-3 text-xs shadow-soft backdrop-blur">
          <div className="flex items-center justify-between gap-2"><span className="font-600 capitalize text-mist">{selectedFurniture.kind.replace(/-/g, ' ')}</span><div className="flex items-center gap-2"><span className="font-mono text-[8px] uppercase text-cyan">2D + 3D</span><button onClick={() => setSelected(null)} aria-label="Close" className="grid h-5 w-5 place-items-center rounded border border-line text-muted hover:border-cyan hover:text-white">×</button></div></div>
          <p className="mt-1 font-mono text-[10px] text-muted">X {selectedFurniture.x.toFixed(2)}′ · Y {selectedFurniture.y.toFixed(2)}′</p>
          <p className="mt-1 font-mono text-[9px] text-muted">{selectedFurniture.width.toFixed(1)}′ × {selectedFurniture.depth.toFixed(1)}′ footprint</p>
          {furnitureMisplaced(model, selectedFurniture) && <p className="mt-1 rounded border border-red-400/40 bg-red-400/10 px-2 py-1 text-[10px] text-red-300">Not against a wall / off-plan — flagged red. Drag it back to clear.</p>}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button onClick={() => onChange(patchFurnitureEdit(edits, selectedFurniture.id, { rotation: (selectedFurniture.rotation ?? 0) - Math.PI / 12 }))} className="rounded border border-line py-2 text-cyan hover:border-cyan">↺ Rotate 15°</button>
            <button onClick={() => onChange(patchFurnitureEdit(edits, selectedFurniture.id, { rotation: (selectedFurniture.rotation ?? 0) + Math.PI / 12 }))} className="rounded border border-line py-2 text-cyan hover:border-cyan">Rotate 15° ↻</button>
          </div>
          {selectedFurniture.kind === 'bed' && (
            <div className="mt-3">
              <p className="font-mono text-[8px] uppercase tracking-wider text-muted">Bed size</p>
              <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                {BED_SIZES.map((size) => {
                  const isCurrent =
                    Math.abs(size.width - selectedFurniture.width) < 0.1 &&
                    Math.abs(size.depth - selectedFurniture.depth) < 0.1
                  return (
                    <button
                      key={size.label}
                      disabled={isCurrent}
                      onClick={() => {
                        const center = {
                          x: selectedFurniture.x + selectedFurniture.width / 2,
                          y: selectedFurniture.y + selectedFurniture.depth / 2,
                        }
                        const id = `add-bed-${Date.now().toString(36)}`
                        onChange(replaceFurniture(edits, selectedFurniture.id, center, { id, kind: 'bed', width: size.width, depth: size.depth, rotation: selectedFurniture.rotation }))
                        setSelected(`furniture:${id}`)
                      }}
                      className={`rounded border py-1.5 text-[10px] ${isCurrent ? 'border-cyan/50 bg-cyan/10 text-cyan' : 'border-line text-muted hover:border-cyan hover:text-white'}`}
                    >
                      {size.label.replace(' bed', '')}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
          <button onClick={() => onChange(patchFurnitureEdit(edits, selectedFurniture.id, { dx: 0, dy: 0, rotation: baseFurniture.find((item) => item.id === selectedFurniture.id)?.rotation ?? 0 }))} className="mt-2 w-full rounded border border-line py-2 text-muted hover:text-white">Reset object position</button>
          <button onClick={() => { onChange(patchFurnitureEdit(edits, selectedFurniture.id, { removed: true })); setSelected(null) }} className="mt-2 w-full rounded border border-line py-2 text-muted hover:border-red-400 hover:text-red-300">Remove object</button>
        </div>
      )}

      {/* Reset */}
      {(edits.power || edits.lighting || edits.furniture) && (
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

function PlanFurniture({ item, x0, y0, scale, selected, misplaced, onPointerDown, onSelect }: { item: ModelPlacement; x0: number; y0: number; scale: number; selected: boolean; misplaced: boolean; onPointerDown: (event: React.PointerEvent<SVGGElement>) => void; onSelect: () => void }) {
  const x = x0 + item.x * scale
  const y = y0 + item.y * scale
  const w = item.width * scale
  const h = item.depth * scale
  const rotation = ((item.rotation ?? 0) * 180) / Math.PI
  const transform = `translate(${x} ${y}) rotate(${rotation} ${w / 2} ${h / 2})`
  const rounded = item.kind === 'sofa' || item.kind === 'bed' || item.kind === 'tub'
  const outline = misplaced ? '#FF4D4F' : selected ? '#22D3EE' : undefined
  return (
    <g transform={transform} opacity="0.9" onPointerDown={onPointerDown} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect() } }} role="button" tabIndex={0} aria-label={`Edit ${item.kind.replace(/-/g, ' ')}${misplaced ? ' (invalid placement)' : ''}`} style={{ cursor: 'grab' }} stroke={outline} strokeWidth={outline ? 2 : undefined}>
      <rect width={w} height={h} fill="transparent" stroke="transparent" strokeWidth="12" />
      {misplaced && <rect x="-5" y="-5" width={w + 10} height={h + 10} rx="4" fill="none" stroke="#FF4D4F" strokeWidth="2" strokeDasharray="6 3" />}
      {selected && !misplaced && <rect x="-5" y="-5" width={w + 10} height={h + 10} rx="4" stroke="#22D3EE" strokeDasharray="5 3" />}
      <rect width={w} height={h} rx={rounded ? Math.min(5, w * 0.08) : 1.5} strokeDasharray={item.kind.includes('cabinet') ? '3 2' : undefined} />
      {item.kind === 'bed' && <><line x1="0" y1={h * 0.27} x2={w} y2={h * 0.27} /><rect x={w * 0.08} y={h * 0.06} width={w * 0.36} height={h * 0.14} rx="2" /><rect x={w * 0.56} y={h * 0.06} width={w * 0.36} height={h * 0.14} rx="2" /></>}
      {item.kind === 'sofa' && <><rect x={w * 0.05} y={h * 0.1} width={w * 0.9} height={h * 0.65} rx="3" /><line x1={w / 3} y1={h * 0.1} x2={w / 3} y2={h * 0.75} /><line x1={w * 2 / 3} y1={h * 0.1} x2={w * 2 / 3} y2={h * 0.75} /></>}
      {(item.kind === 'coffee-table' || item.kind === 'dining-table' || item.kind === 'island') && <><line x1={w / 2} y1="0" x2={w / 2} y2={h} /><line x1="0" y1={h / 2} x2={w} y2={h / 2} /></>}
      {item.kind === 'toilet' && <><ellipse cx={w / 2} cy={h * 0.64} rx={w * 0.28} ry={h * 0.27} /><rect x={w * 0.22} y={h * 0.08} width={w * 0.56} height={h * 0.25} rx="2" /></>}
      {item.kind === 'range' && <>{[0.3, 0.7].flatMap((cx) => [0.3, 0.7].map((cy) => <circle key={`${cx}-${cy}`} cx={w * cx} cy={h * cy} r={Math.min(w, h) * 0.12} />))}</>}
      {item.kind === 'sink-base' && <ellipse cx={w / 2} cy={h / 2} rx={w * 0.28} ry={h * 0.3} />}
      {item.kind === 'refrigerator' && <><line x1={w / 2} y1="0" x2={w / 2} y2={h} /><path d={`M ${w * 0.44} ${h * 0.18} v ${h * 0.55} M ${w * 0.56} ${h * 0.18} v ${h * 0.55}`} /></>}
      <title>{item.kind.replace(/-/g, ' ')}</title>
    </g>
  )
}

/**
 * Package export. Turns a generated project into tangible deliverables the
 * homeowner can keep, print, or hand to a contractor:
 *   - a self-contained, print-to-PDF HTML document, and
 *   - a machine-readable JSON file.
 *
 * Premium exports (DWG / BIM) are a Phase-2 server responsibility; this covers
 * the MVP "receive your package" promise entirely client-side.
 */

import { DISCIPLINES, PROJECT_TYPES, formatUSD, type Answers, type ProjectPackage } from '../interview/engine'
import { generatePlanSVG, hasPlanDrawing } from './drawing'

function triggerDownload(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function exportJSON(answers: Answers, pkg: ProjectPackage) {
  const payload = { generatedBy: 'BuildWise AI', generatedAt: new Date().toISOString(), answers, package: pkg }
  triggerDownload(`buildwise-${slug(pkg.headline)}.json`, JSON.stringify(payload, null, 2), 'application/json')
}

export function exportHTML(answers: Answers, pkg: ProjectPackage) {
  triggerDownload(`buildwise-${slug(pkg.headline)}.html`, buildDocument(answers, pkg), 'text/html')
}

function buildDocument(answers: Answers, pkg: ProjectPackage): string {
  const projectLabel = (PROJECT_TYPES as Record<string, string>)[answers.project] ?? 'Project'
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const deliverables = pkg.deliverables
    .map((d) => {
      const meta = DISCIPLINES[d.discipline]
      const items = d.items.map((i) => `<li>${esc(i)}</li>`).join('')
      const badge = d.needsReview
        ? `<span class="badge review">Needs licensed review</span>`
        : `<span class="badge ok">Draft ready</span>`
      return `<section class="deliverable">
        <h3>${esc(meta.name)} plan set ${badge}</h3>
        <ul>${items}</ul>
      </section>`
    })
    .join('')

  const materialRows = pkg.materials
    .map((m) => `<tr><td>${esc(m.category)}</td><td>${esc(m.item)}</td><td class="qty">${esc(m.qty)}</td></tr>`)
    .join('')

  const highlights = pkg.highlights.map((h) => `<li>${esc(h)}</li>`).join('')

  const planSVG = hasPlanDrawing(pkg) ? generatePlanSVG(answers, pkg) : ''

  const scheduleRows = (pkg.schedule ?? [])
    .map(
      (ph, i) =>
        `<tr><td class="num">${String(i + 1).padStart(2, '0')}</td><td><strong>${esc(ph.name)}</strong><br/><span class="sub">${esc(ph.items.join(' · '))}</span></td><td class="qty">${ph.weeks} wk${ph.weeks > 1 ? 's' : ''}</td></tr>`,
    )
    .join('')

  const costRows = (pkg.costBreakdown ?? [])
    .map(
      (c) =>
        `<tr><td>${esc(DISCIPLINES[c.discipline].name)}</td><td class="qty">${formatUSD(c.low)}–${formatUSD(c.high)}</td></tr>`,
    )
    .join('')

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(pkg.headline)} — BuildWise AI</title>
<style>
  :root{--ink:#0A0F1C;--blue:#2563EB;--amber:#B45309;--line:#e2e8f0;--muted:#64748b;}
  *{box-sizing:border-box;}
  body{font-family:-apple-system,Segoe UI,Roboto,Inter,sans-serif;color:#0f172a;margin:0;background:#f8fafc;}
  .page{max-width:820px;margin:0 auto;padding:48px 40px;background:#fff;}
  header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid var(--ink);padding-bottom:18px;}
  .logo{font-weight:800;font-size:22px;letter-spacing:-.02em;}
  .logo b{color:var(--blue);} .logo sup{color:var(--amber);font-size:11px;}
  .meta{text-align:right;font-size:12px;color:var(--muted);}
  h1{font-size:28px;margin:26px 0 6px;letter-spacing:-.02em;}
  .summary{color:#334155;margin:0 0 24px;}
  .tiles{display:flex;gap:12px;margin:0 0 28px;}
  .tile{flex:1;border:1px solid var(--line);border-radius:12px;padding:14px 16px;}
  .tile .l{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);}
  .tile .v{font-size:20px;font-weight:800;margin-top:4px;}
  h2{font-size:13px;text-transform:uppercase;letter-spacing:.1em;color:var(--blue);margin:32px 0 12px;border-bottom:1px solid var(--line);padding-bottom:6px;}
  .deliverable{margin:0 0 16px;} .deliverable h3{font-size:16px;margin:0 0 8px;}
  .deliverable ul{margin:0;padding-left:18px;color:#334155;font-size:14px;line-height:1.6;}
  .badge{font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;margin-left:8px;vertical-align:middle;}
  .badge.review{background:#fef3c7;color:#92400e;} .badge.ok{background:#dcfce7;color:#166534;}
  ul.hl{margin:0;padding-left:18px;color:#334155;font-size:14px;line-height:1.7;}
  table{width:100%;border-collapse:collapse;font-size:13px;}
  th,td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--line);}
  th{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);}
  td.qty{text-align:right;font-variant-numeric:tabular-nums;color:#475569;white-space:nowrap;}
  td.num{color:var(--muted);font-variant-numeric:tabular-nums;width:32px;}
  .sub{color:var(--muted);font-size:12px;}
  .plan{border:1px solid var(--line);border-radius:12px;overflow:hidden;} .plan svg{display:block;width:100%;height:auto;}
  .note{margin-top:28px;border:1px solid #fde68a;background:#fffbeb;border-radius:12px;padding:16px;font-size:13px;color:#92400e;}
  footer{margin-top:40px;border-top:1px solid var(--line);padding-top:16px;font-size:11px;color:var(--muted);}
  @media print{body{background:#fff;} .page{padding:0;} .no-print{display:none;}}
  .actions{margin:24px 0;} .actions button{font:inherit;background:var(--ink);color:#fff;border:0;border-radius:10px;padding:10px 18px;cursor:pointer;}
</style></head>
<body><div class="page">
  <header>
    <div class="logo">Build<b>Wise</b> <sup>AI</sup><div style="font-weight:500;font-size:12px;color:var(--muted);margin-top:2px;">Construction Package</div></div>
    <div class="meta">Generated ${esc(date)}<br/>${esc(projectLabel)}<br/>Region: ${esc(regionName(answers.region))}</div>
  </header>

  <h1>${esc(pkg.headline)}</h1>
  <p class="summary">${esc(pkg.summary)}</p>

  <div class="tiles">
    <div class="tile"><div class="l">Estimated cost</div><div class="v">${formatUSD(pkg.costLow)}–${formatUSD(pkg.costHigh)}</div></div>
    <div class="tile"><div class="l">Timeline</div><div class="v">${pkg.timelineWeeks[0]}–${pkg.timelineWeeks[1]} weeks</div></div>
    <div class="tile"><div class="l">Disciplines</div><div class="v">${pkg.disciplines.length}</div></div>
  </div>

  ${highlights ? `<h2>Highlights</h2><ul class="hl">${highlights}</ul>` : ''}

  ${planSVG ? `<h2>Draft plan drawing</h2><div class="plan">${planSVG}</div>` : ''}

  ${scheduleRows ? `<h2>Build schedule</h2><table><tbody>${scheduleRows}</tbody></table>` : ''}

  <h2>Deliverables</h2>
  ${deliverables}

  <h2>Material list</h2>
  <table><thead><tr><th>Category</th><th>Item</th><th style="text-align:right">Qty</th></tr></thead><tbody>${materialRows}</tbody></table>

  ${costRows ? `<h2>Cost breakdown by discipline</h2><table><tbody>${costRows}</tbody></table>` : ''}

  <div class="note"><strong>Professional review:</strong> ${esc(pkg.permitNote)}</div>

  <div class="actions no-print"><button onclick="window.print()">Print / Save as PDF</button></div>

  <footer>© ${new Date().getFullYear()} BuildWise AI — illustrative planning document. All plans must be reviewed and stamped by appropriately licensed professionals and pass local plan review before construction or permitting.</footer>
</div></body></html>`
}

function regionName(r: string): string {
  return ({ CA: 'California', TX: 'Texas', FL: 'Florida', NE: 'Northeast', US: 'United States' } as Record<string, string>)[r] ?? 'United States'
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
}

# Cadvora

> The AI architect & engineer for residential construction.
> **Upload your house. Tell us what you want. Receive professional construction plans in minutes.**

Cadvora interviews a homeowner the way a seasoned contractor would, reads their
floor plans and photos, and produces a **coordinated construction package** across
every discipline — electrical, plumbing, HVAC, structural, interior, exterior,
solar and smart home — with material lists, cost bands, a schedule, and a clear note
on what needs a licensed professional's stamp before permitting.

This repository is the **Phase 1 MVP**: the conversational interview and the
package generator, wrapped in a polished product site.

## Highlights

- **Conversational AI interview** — no 40-field form. A branching, contractor-style
  Q&A that adapts to the answers (gas vs. all-electric, EV, solar now/later, budget,
  how long you'll stay) and stops when it has enough. Answer by **clicking chips or
  typing freely** — typed answers are mapped to the closest option.
- **Upload anything** — floor plans, photos, Zillow screenshots, sketches, PDFs, CAD.
  (The local demo simulates vision; real Claude vision ships in `server/`.)
- **Live package generation** — deliverables per discipline, a material list with
  quantities, a **phased build schedule**, a cost band with **per-discipline
  breakdown**, and a permit/review note — computed by a transparent construction
  rules engine (or by Claude when the backend is on).
- **Generated professional plan sheets** — a full drawing set per project:
  E-1 Power (receptacles per NEC 210.52 with GFCI labels and curved circuit
  runs), E-2 Lighting (recessed cans, pendants, under-cabinet lights, S3
  switches, dimmer note), P-1 Plumbing (CW/HW/DWV/vent runs with pipe sizes,
  WH, cleanout), M-1 Mechanical (ducts, diffusers with CFM, return, AHU/CU,
  thermostat) and S-1 Framing (studs 16" o.c., headers, joists, LVL beam) —
  each with legend, dimensions, door swings and a title block. Three render
  themes: Blueprint, **AutoCAD model space**, and white Paper for print.
- **Real CAD handoff** — one-click **DXF export** (R12, named layers with ACI
  colors, feet units) that opens in AutoCAD/LibreCAD, plus a numbered **panel
  schedule** (breakers, poles, wire gauges) in the app and the export.
- **Uploads shape the drawings** — an uploaded plan image is measured locally
  (its proportions drive the drawn room); the Claude vision backend extracts
  rooms, doors, windows and fixtures for full geometry.
- **Download your package** — export a polished, **print-to-PDF construction
  document** (drawing and schedule included) or a JSON handoff for CAD/BIM,
  entirely in the browser.
- **Saved projects** — every generated package is saved locally; reopen or delete
  past projects from the studio.
- **Interactive 3D digital twin** — a real three.js model you orbit and zoom,
  with toggleable lights, electrical routing, plumbing and framing layers
  (walls go transparent to reveal the studs).
- **Real Claude backend** — an optional Node/Express server that proxies the
  Anthropic API for the interview, package generation and vision (see below).
- **Working waitlist** — set `VITE_WAITLIST_URL` to any JSON form endpoint
  (Formspree etc.), or use the bundled server's `/api/waitlist` (JSONL file).
  Without either, signups are kept in the visitor's localStorage (demo mode).
- **Legal pages** — `/terms.html` and `/privacy.html` ship as static pages with
  plain-language beta terms (have counsel review before charging money).
- **Marketplace, pricing & roadmap** — the platform vision, phased.

## Run it

```bash
cd buildwise
npm install
npm run dev      # http://localhost:5173
```

No API keys required — the interview and package generation run entirely in the
browser on a deterministic rules engine.

```bash
npm test         # engine + drawing unit tests (vitest)
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## How it's built

| Layer | Choice |
| --- | --- |
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 (custom architectural theme) |
| AI (MVP) | Self-contained rules engine, zero dependencies |

Key files:

- `src/interview/engine.ts` — the interview questions, branching logic, free-text
  matcher, and the `generatePackage()` function (deliverables, materials, schedule,
  cost breakdown). **This is the brain.** The `Answers` and `ProjectPackage` types
  are the contract the UI depends on.
- `src/lib/drawing.ts` — the draft plan drawing generator (SVG string, shared by
  the app and the export).
- `src/lib/ai.ts` — the integration seam. Calls the real backend when configured,
  falls back to the local engine on any error.
- `src/lib/store.ts` — localStorage project persistence.
- `src/lib/export.ts` — the printable HTML + JSON package export.
- `src/components/InterviewStudio.tsx` — the interactive chat + upload + results.
- `src/interview/engine.test.ts` — unit tests for the engine and drawings.
- `server/` — the optional Claude-backed API.

## Plugging in real AI (Claude)

The frontend ships deterministic so it always demos. The **live backend is already
written** in `server/` — a small Express app that proxies the Anthropic Messages API
(`claude-opus-4-8`) and never exposes the key to the browser. It does three jobs:

- `POST /api/interview` — Claude decides the next best question,
- `POST /api/package` — Claude emits a `ProjectPackage` JSON matching `engine.ts`,
- `POST /api/vision` — Claude interprets uploaded floor plans / photos.

Run it:

```bash
cd server
npm install
cp .env.example .env        # add your ANTHROPIC_API_KEY
npm run dev                 # http://localhost:8787  (GET /health to check)
```

Then point the frontend at it and restart `npm run dev`:

```bash
# buildwise/.env
VITE_CADVORA_API_URL=http://localhost:8787
```

That's the only change needed — `src/lib/ai.ts` picks it up automatically and the UI
is untouched, because it only depends on the return shapes. If the backend is
unreachable or errors, the app silently falls back to the local engine.

## Roadmap

1. **Phase 1 (this MVP)** — interview, concepts, material lists, cost bands, 3D preview.
2. **Phase 2** — code-aware electrical & plumbing draft plans.
3. **Phase 3** — contractor collaboration, permit-document generation, licensed review.
4. **Phase 4** — a complete AI construction operating system, concept to completion.

## Disclaimer

Cadvora output is illustrative and for planning only. All plans must be reviewed
and stamped by appropriately licensed professionals and pass local plan review before
any construction or permitting.

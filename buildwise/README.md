# BuildWise AI

> The AI architect & engineer for residential construction.
> **Upload your house. Tell us what you want. Receive professional construction plans in minutes.**

BuildWise interviews a homeowner the way a seasoned contractor would, reads their
floor plans and photos, and produces a **coordinated construction package** across
every discipline — electrical, plumbing, HVAC, structural, interior, exterior,
solar and smart home — with material lists, cost bands, a schedule, and a clear note
on what needs a licensed professional's stamp before permitting.

This repository is the **Phase 1 MVP**: the conversational interview and the
package generator, wrapped in a polished product site.

## Highlights

- **Conversational AI interview** — no 40-field form. A branching, contractor-style
  Q&A that adapts to the answers (gas vs. all-electric, EV, solar now/later, budget,
  how long you'll stay) and stops when it has enough.
- **Upload anything** — floor plans, photos, Zillow screenshots, sketches, PDFs, CAD.
  (The demo simulates vision; the seam for real vision is documented below.)
- **Live package generation** — deliverables per discipline, a material list with
  quantities, a cost band, a timeline, and a permit/review note — computed by a
  transparent construction rules engine.
- **Digital-twin teaser** — an interactive room where you toggle lights, electrical
  routing, plumbing and framing layers.
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

- `src/interview/engine.ts` — the interview questions, branching logic, and the
  `generatePackage()` function. **This is the brain.** The `Answers` and
  `ProjectPackage` types are the contract the UI depends on.
- `src/lib/ai.ts` — the integration seam. Swap the local engine for real Claude
  calls here without touching the UI.
- `src/components/InterviewStudio.tsx` — the interactive chat + upload + results.

## Plugging in real AI (Claude)

The MVP ships deterministic so it always demos. To go live:

1. Stand up a small server route that proxies to the Anthropic Messages API with
   `claude-opus-4-8` (or `claude-sonnet-5` for lower latency/cost). **Never call the
   API from the browser with a raw key.**
2. Give it two jobs — **vision** (interpret uploaded plans/photos into a structured
   room + fixture inventory) and **reasoning** (run the interview and emit a
   `ProjectPackage` JSON matching `engine.ts`).
3. Set `VITE_BUILDWISE_API_URL` (see `.env.example`) and flip `USE_REMOTE` in
   `src/lib/ai.ts`.

Because the UI only depends on the return shapes, nothing else changes.

## Roadmap

1. **Phase 1 (this MVP)** — interview, concepts, material lists, cost bands, 3D preview.
2. **Phase 2** — code-aware electrical & plumbing draft plans.
3. **Phase 3** — contractor collaboration, permit-document generation, licensed review.
4. **Phase 4** — a complete AI construction operating system, concept to completion.

## Disclaimer

BuildWise output is illustrative and for planning only. All plans must be reviewed
and stamped by appropriately licensed professionals and pass local plan review before
any construction or permitting.

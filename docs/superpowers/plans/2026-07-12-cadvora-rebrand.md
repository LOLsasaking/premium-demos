# Cadvora Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the functioning BuildWise application as Cadvora and rebuild its homepage around the supplied CAD workflow video without regressing the project studio, exports, or 3D viewer.

**Architecture:** Keep the existing React/Vite/Tailwind application and deterministic product engine. Replace public branding and marketing composition, add self-contained video-driven presentation components, and preserve the engine/API interfaces while migrating local storage compatibly.

**Tech Stack:** React 18, TypeScript 5.6, Vite 5, Tailwind CSS 3, Vitest 2, three.js.

## Global Constraints

- The primary CTA is **Generate a Diagram** and targets `#studio`.
- The visual system uses deep navy, cool slate, blueprint blue, and electric cyan with restrained glow.
- The supplied hero MP4 must autoplay muted, loop, expose pause/play, fall back to a poster, and respect reduced motion.
- Existing interview, plan generation, sheet editor, exports, saved projects, and 3D capabilities remain functional.
- Final construction documents require appropriate qualified-professional review; do not claim universal permit readiness or code compliance.
- No new billing, authentication, collaboration backend, or API contract is introduced.

---

### Task 1: Brand assets, identity, and safe persistence migration

**Files:**
- Create: `buildwise/public/cadvora-hero.mp4`
- Create: `buildwise/public/cadvora-hero-poster.webp`
- Create: `buildwise/public/cadvora-mark.svg`
- Modify: `buildwise/src/components/Logo.tsx`
- Modify: `buildwise/index.html`
- Modify: `buildwise/package.json`
- Modify: `buildwise/src/lib/store.ts`
- Modify: `buildwise/src/lib/waitlist.ts`
- Modify: `buildwise/src/vite-env.d.ts`
- Test: `buildwise/src/interview/engine.test.ts`

**Interfaces:**
- Produces: public asset paths `/cadvora-hero.mp4`, `/cadvora-hero-poster.webp`, `/cadvora-mark.svg`.
- Produces: `Logo({ size?: number, compact?: boolean })` rendering the Cadvora mark and optional wordmark.
- Preserves: reading legacy `buildwise.projects.v1` and `buildwise.waitlist.v1` data while writing `cadvora.projects.v1` and `cadvora.waitlist.v1`.

- [ ] Copy the source MP4 to `public/cadvora-hero.mp4`, render a WebP poster from the final 3D frame, and create a transparent SVG mark based on the supplied C-shaped gauge logo.
- [ ] Add a brand regression assertion that exported/generated user-facing strings contain `Cadvora` and do not contain `BuildWise`.
- [ ] Run `npm test -- --run` from `buildwise`; confirm the new assertion fails before implementation.
- [ ] Replace metadata, favicon, package identity, logo rendering, and environment type naming with Cadvora equivalents while accepting `VITE_BUILDWISE_API_URL` as a temporary fallback.
- [ ] Implement legacy localStorage reads followed by writes under the new Cadvora keys so existing saved projects are not lost.
- [ ] Run `npm test -- --run`; expected result is all tests passing.
- [ ] Commit with `git commit -m "feat: establish Cadvora brand identity"`.

### Task 2: Video-led hero and navigation

**Files:**
- Modify: `buildwise/src/components/Nav.tsx`
- Modify: `buildwise/src/components/Hero.tsx`
- Modify: `buildwise/src/index.css`
- Modify: `buildwise/tailwind.config.js`

**Interfaces:**
- `Hero` owns an `HTMLVideoElement` ref and a boolean playback state.
- Navigation anchors are `#product`, `#solutions`, `#examples`, `#how`, `#pricing`, and `#resources`; its primary action targets `#studio`.

- [ ] Replace the BuildWise navigation with the minimal Cadvora navigation, retaining the existing mobile-menu scroll lock, keyboard button, and sticky transparency behavior.
- [ ] Rebuild the hero as a responsive text/video split with the exact headline “Turn project requirements into coordinated technical diagrams.”, the supplied supporting copy, primary and demo CTAs, and the reassurance line.
- [ ] Add native video playback/error handling: muted autoplay loop, poster fallback, pause/play button, and reduced-motion initialization to paused.
- [ ] Add CAD grid, scan-line, viewport chrome, cyan route glow, focus-visible, and responsive video-frame styles without reducing contrast.
- [ ] Run `npm run build`; expected result is successful TypeScript and Vite output.
- [ ] Commit with `git commit -m "feat: add Cadvora video-led hero"`.

### Task 3: Product proof, interactive example, and workflow

**Files:**
- Create: `buildwise/src/components/CredibilityStrip.tsx`
- Create: `buildwise/src/components/ProjectExample.tsx`
- Modify: `buildwise/src/components/HowItWorks.tsx`
- Modify: `buildwise/src/components/Disciplines.tsx`
- Modify: `buildwise/src/components/DigitalTwin.tsx`
- Modify: `buildwise/src/App.tsx`

**Interfaces:**
- `ProjectExample` exposes keyboard-operable discipline options `'electrical' | 'plumbing' | 'construction' | 'all'` and view options `'2d' | '3d'` using `aria-pressed`.
- `DigitalTwin` remains lazy-loaded and provides the real three.js proof for the 3D view.

- [ ] Add the credibility strip naming supported audiences and outputs without fabricated logos or statistics.
- [ ] Build the interactive example with an architectural floor-plan canvas, layer buttons, 2D/3D switch, status legend, and visually distinct electrical/plumbing/construction routes.
- [ ] Change How It Works to four specific steps: Describe, Generate, Review, Share.
- [ ] Reframe disciplines as three large solution sections for electrical, plumbing, and construction, using existing engine terminology and authentic drawing details.
- [ ] Reframe the digital twin section as the 2D-to-3D coordinated model showcase while preserving lazy loading.
- [ ] Compose these sections in `App.tsx` ahead of the project studio.
- [ ] Run `npm test -- --run && npm run build`; expected result is all tests and the production build passing.
- [ ] Commit with `git commit -m "feat: add interactive Cadvora product proof"`.

### Task 4: Trust, examples, beta pricing, FAQ, and complete rebrand

**Files:**
- Create: `buildwise/src/components/TrustHandoff.tsx`
- Create: `buildwise/src/components/ExampleProjects.tsx`
- Create: `buildwise/src/components/Faq.tsx`
- Modify: `buildwise/src/components/Pricing.tsx`
- Modify: `buildwise/src/components/Waitlist.tsx`
- Modify: `buildwise/src/components/Footer.tsx`
- Modify: `buildwise/src/components/InterviewStudio.tsx`
- Modify: `buildwise/src/components/Marketplace.tsx`
- Modify: `buildwise/src/lib/drawing.ts`
- Modify: `buildwise/src/lib/dxf.ts`
- Modify: `buildwise/src/lib/export.ts`
- Modify: `buildwise/src/interview/engine.ts`
- Modify: `buildwise/public/privacy.html`
- Modify: `buildwise/public/terms.html`
- Modify: `buildwise/server/claude.js`
- Modify: `buildwise/server/index.js`
- Modify: `buildwise/server/package.json`
- Modify: `buildwise/README.md`

**Interfaces:**
- Existing export function signatures and interview data types do not change.
- Download filenames use the `cadvora-` prefix and generated-document metadata uses `Cadvora`.

- [ ] Add professional handoff content covering annotations, revisions, layers, notes, downloads, sharing, and the qualified-review disclaimer.
- [ ] Add the three specified example projects with accessible, inspectable summary content.
- [ ] Replace unsupported live prices with Starter, Professional, and Business beta-access tiers and keep all CTAs honest about availability.
- [ ] Add the eight brief-specified FAQ items using native `details`/`summary` controls.
- [ ] Rebrand all visible studio, marketplace, export, drawing-title-block, legal, server, and README references to Cadvora.
- [ ] Replace the engine's permit-ready statement with language that requires local qualified-professional and jurisdiction review.
- [ ] Run `rg -n "BuildWise|BUILDWISE|buildwise" buildwise --glob '!package-lock.json'`; expected remaining matches are only documented compatibility keys/environment fallbacks.
- [ ] Run `npm test -- --run && npm run build`; expected result is all tests and the production build passing.
- [ ] Commit with `git commit -m "feat: complete Cadvora product rebrand"`.

### Task 5: Browser verification and final polish

**Files:**
- Modify as required by findings: `buildwise/src/**/*.tsx`, `buildwise/src/index.css`

**Interfaces:**
- No new public interface; this task validates the complete user flow.

- [ ] Start the application with `npm run dev -- --host 127.0.0.1` and open the local URL in a real browser.
- [ ] Verify at desktop width: nav anchors, hero playback control, poster fallback, CTA-to-studio, project-example toggles, three.js loading, waitlist form, FAQ, and legal links.
- [ ] Verify at mobile width: menu open/close and scroll lock, readable hero crop, no horizontal overflow, usable toggles, and stacked CTAs.
- [ ] Verify keyboard focus order and reduced-motion behavior.
- [ ] Apply only evidence-backed corrections found during browser verification.
- [ ] Run `npm test -- --run && npm run build` one final time; expected result is all tests and production build passing.
- [ ] Inspect `git diff --check` and `git status --short`, then commit any verification fixes with `git commit -m "fix: polish Cadvora responsive experience"`.

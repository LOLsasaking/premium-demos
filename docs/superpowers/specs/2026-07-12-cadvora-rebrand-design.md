# Cadvora Product Rebrand and Homepage Design

## Objective

Rebrand the functioning BuildWise product as Cadvora and rebuild its public-facing experience around the supplied hero video. Preserve the existing interview, plan-generation, drawing-editing, export, saved-project, and 3D-viewer capabilities.

## Product Positioning

Cadvora turns project requirements into coordinated electrical, plumbing, and construction diagrams in 2D and 3D. It helps homeowners and building professionals move from a description or existing plan to editable technical outputs that can be reviewed and handed to qualified professionals.

The site must avoid unsupported claims such as “permit-ready,” “engineer-approved,” or universally “code-compliant.” It should explicitly state that final construction documents require appropriate professional review.

## Chosen Direction

Use a product-first homepage rather than a marketing-only or purely cinematic landing page. The primary CTA is **Generate a Diagram**, which opens the existing functioning project studio. **Join the Beta** remains a secondary conversion path.

The supplied ten-second video is the visual anchor. Its progression—prompt, generated 2D plan, active service layers, and a coordinated 3D cutaway—defines the page narrative and visual system.

## Visual System

- Deep navy CAD workspace background with a subtle square grid.
- Fine slate borders and compact technical labels.
- Electric cyan and blueprint blue for active paths, focus, and primary actions.
- White and cool gray typography with restrained glow.
- The supplied Cadvora mark replaces the BuildWise icon everywhere, including navigation, footer, favicon, and social metadata.
- Motion is deliberate and technical: controlled reveals, layer activation, and 2D-to-3D transitions. Reduced-motion preferences must be respected.

## Information Architecture

1. Sticky navigation: Product, Solutions, Examples, How It Works, Pricing, Resources; Sign In and Generate a Diagram actions.
2. Hero: outcome-led headline and supporting copy alongside the supplied autoplaying, muted, looping product video. Include a demo control and reassurance line.
3. Credibility strip: audiences and supported outputs, without fabricated customer logos or metrics.
4. Interactive project example: electrical, plumbing, construction, all-systems, 2D, and 3D controls backed by authentic product visuals.
5. How it works: Describe, Generate, Review, Share.
6. Solutions: larger electrical, plumbing, and construction sections with real drawing samples.
7. 2D-to-3D showcase: an accessible comparison/toggle tied to the existing generated-plan and three.js capabilities.
8. Professional handoff and trust: annotations, revisions, layers, notes, downloads, sharing, and the professional-review disclaimer.
9. Example projects: residential electrical renovation, kitchen/bath plumbing, and small commercial buildout.
10. Pricing/beta: simple Starter, Professional, and Business framing, with early-access conversion where checkout is unavailable.
11. FAQ.
12. Final CTA using a completed project package visual.

## Component and Architecture Strategy

Keep React, TypeScript, Vite, Tailwind, the existing deterministic rules engine, and the optional backend. Rework the public components into focused sections while leaving the underlying product contracts intact.

- Shared brand assets and logo component provide one source of truth.
- Navigation and footer use Cadvora names and revised anchors.
- The hero owns video playback and accessible pause/play behavior.
- Interactive examples reuse existing generated drawing and 3D viewer primitives where practical.
- The project studio remains the primary functional destination and continues to save projects locally.
- Existing exports, AI fallback, interview engine, and server API shapes remain compatible.

## Asset Handling

- Copy the supplied MP4 into the app's public assets with a stable, descriptive filename.
- Derive a lightweight poster frame from the video for fast first paint and reduced-data/fallback use.
- Produce clean logo assets from the supplied image: transparent full lockup where needed and a square icon for favicon/app surfaces. Avoid displaying the source image's gray background.
- Keep the original supplied assets unmodified outside the repository.

## Responsive and Accessibility Requirements

- Hero video remains legible at desktop, tablet, and mobile sizes without hiding the product's key UI.
- Navigation collapses into the existing keyboard-accessible mobile menu.
- Interactive toggles expose pressed/selected state and are keyboard operable.
- Video is muted by default, does not block content, includes a pause/play control, and respects reduced motion.
- Maintain visible focus states, semantic headings, useful alt/ARIA text, adequate contrast, and the existing skip link.

## Error and Fallback Behavior

- If video playback fails, display the poster image without layout shift.
- If the optional AI backend is unavailable, preserve the current deterministic local-engine fallback.
- If local project storage fails, keep the current session usable and surface a non-blocking message where appropriate.
- If WebGL is unavailable, show a static 3D project preview and retain the 2D workflow.

## Verification

- Run the existing unit suite and production build.
- Add focused tests for any newly extracted behavior rather than visual implementation details.
- Verify desktop and mobile layouts in a real browser.
- Verify navigation anchors, hero controls, interactive example controls, studio entry, plan generation, 2D/3D switching, and exports.
- Check for remaining BuildWise names in user-facing copy, metadata, storage labels where migration is safe, and generated documents.
- Confirm the final asset paths work in the production build and GitHub Pages base path.

## Scope Boundaries

This change does not add billing, authentication, real collaborative accounts, new code-compliance guarantees, or a new backend contract. Sign In may remain a clearly labeled future/beta action unless an existing authentication flow is present.

# Video-Faithful GLB Workspace Design

## Outcome

Match the supplied MP4's CAD workspace visual language and replace technical placeholder markers with reusable GLB model assets. The visible model and the 2D technical symbol remain two representations of the same stable object.

## Visual Specification

- Canvas: near-black navy `#07111D` with sparse slate grid lines.
- Panels: `#0B1624` and `#101C2D` with one-pixel `#1D3048` dividers.
- Architectural shell: white/cool gray with soft warm interior materials.
- Electrical systems: electric cyan `#22D3EE` with restrained bloom-like emissive treatment.
- Plumbing: coordinated cobalt `#3478FF` and cyan supply routes.
- Lighting: warm white `#FFE2A6` bulbs and fixture pools.
- Selection: cyan outline and compact object inspector.
- Camera: high three-quarter cutaway matching the MP4, with orbit, zoom, and deterministic reset.
- UI: top command bar, left tool rail, sheet/view tabs, right layers/export inspector, and bottom status bar.

## Asset Strategy

Create optimized binary glTF assets for the technical kit and store them under `public/models/technical/`. These are real local model files, not runtime geometry markers:

- A19 bulb and smart LED bulb;
- duplex receptacle and smart receptacle;
- grounded plug and cable tail;
- rocker switch and smart switch;
- junction box and electrical panel;
- straight pipe, elbow, tee, P-trap, shutoff valve, and floor drain;
- recessed can and pendant fixture.

The repository will include the deterministic asset-generation source, output manifest, dimensions, and license/provenance. Selected CC0 furniture and lighting assets may be added from Kenney and Poly Haven when they meet the web budget. The technical kit is authored for Cadvora and requires no external runtime download.

## Runtime Architecture

`technicalAssets.ts` owns a single `GLTFLoader`, URL-to-promise cache, cloning, scale normalization, material accent mapping, and fallback handling. `Plan3DViewer` requests assets by semantic `TechnicalAssetId` and places them at the same stable device coordinates produced by `layoutPower()` and `layoutLighting()`.

Invisible hit proxies preserve reliable selection and dragging even when a detailed model has small or complex geometry. The proxy and visible GLB share the same layer/id metadata. Edits continue to update `PlanEdits`, sheets, exports, and saved projects.

Pipes use GLB fittings at endpoints/junctions and generated tubes only for variable-length runs. This preserves real fittings while allowing arbitrary routing distances.

## Performance Budget

- Initial technical asset payload target: under 2 MB total compressed transfer.
- Load each unique GLB once and clone it for repeated instances.
- No texture larger than 1024 px; prefer material colors for small technical parts.
- Keep the existing Three.js lazy chunk and show current procedural objects as a fallback until GLBs resolve.
- A missing asset never blocks the workspace or 2D editor.

## Verification

- Validate every generated GLB with a loader smoke test and manifest test.
- Verify asset caching and semantic device-to-model mapping.
- Browser-test bulb, outlet, plug, switch, and pipe fittings in the generated workspace.
- Confirm selection and synchronized movement still work through hit proxies.
- Compare desktop screenshots with the supplied MP4 frames and verify mobile fallback.
- Run production tests/build, deploy to Vercel, verify READY, and scan runtime errors.

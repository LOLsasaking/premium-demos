# Video-Faithful GLB Workspace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Match the MP4 workspace palette and features while rendering real optimized GLB technical objects synchronized with the 2D plan.

**Architecture:** A deterministic Node asset pipeline exports authored Three.js groups to GLB. A cached runtime registry loads and clones them by semantic ID. `Plan3DViewer` keeps invisible stable-ID hit proxies and attaches the loaded assets to those proxies.

**Tech Stack:** React 18, TypeScript 5.6, Three.js GLTFLoader/GLTFExporter, Vite, Vitest, Vercel.

## Global Constraints

- Technical assets are local GLB files under 2 MB total compressed transfer.
- Assets load once, clone for instances, and fall back without blocking editing.
- Stable layer/id synchronization remains unchanged.
- The palette and camera match the supplied MP4.
- Every external asset has explicit redistribution rights recorded in the manifest.

---

### Task 1: Generate and validate the GLB technical kit

**Files:**
- Create: `buildwise/scripts/generate-technical-models.mjs`
- Create: `buildwise/public/models/technical/*.glb`
- Create: `buildwise/public/models/technical/manifest.json`
- Create: `buildwise/public/models/ASSET_LICENSES.md`
- Create: `buildwise/src/lib/technicalAssets.test.ts`

**Interfaces:**
- Manifest keys are `bulb-a19`, `bulb-smart`, `outlet-duplex`, `outlet-smart`, `plug-grounded`, `switch-rocker`, `switch-smart`, `junction-box`, `panel`, `pipe-straight`, `pipe-elbow`, `pipe-tee`, `pipe-ptrap`, `valve-shutoff`, `floor-drain`, `light-recessed`, and `light-pendant`.

- [ ] Write a failing manifest test asserting every required asset entry and emitted file.
- [ ] Run the focused test and confirm failure because the manifest is absent.
- [ ] Implement the deterministic GLTFExporter pipeline with detailed geometry, named meshes, PBR materials, and meter-scale metadata.
- [ ] Generate the GLBs and manifest, then run the focused test and production build.
- [ ] Confirm total GLB size stays under 2 MB.

### Task 2: Cached runtime asset registry

**Files:**
- Create: `buildwise/src/lib/technicalAssets.ts`
- Modify: `buildwise/src/lib/technicalAssets.test.ts`

**Interfaces:**
- `technicalAssetForDevice(layer, kind, label?): TechnicalAssetId` maps plan devices to models.
- `loadTechnicalAsset(id): Promise<THREE.Group>` loads each URL once and returns a clone.
- `preloadTechnicalAssets(ids): Promise<void>` warms likely project assets.

- [ ] Add failing mapping tests for smart bulbs, outlets, plugs, switches, panels, and fittings.
- [ ] Implement manifest-backed mapping, URL cache, cloning, normalization, and failure fallback.
- [ ] Run focused tests and the complete unit suite.

### Task 3: Video-faithful scene integration

**Files:**
- Modify: `buildwise/src/components/Plan3DViewer.tsx`
- Modify: `buildwise/src/components/ProjectWorkspace.tsx`
- Modify: `buildwise/src/index.css`

**Interfaces:**
- Detailed assets attach to stable-ID hit proxies; proxies remain the edit target.
- Layer toggles control both GLB models and associated routing.

- [ ] Replace visible device markers with async GLB instances while retaining invisible hit proxies and fallbacks.
- [ ] Add bulb/smart-bulb, outlet/plug/switch, panel, and pipe-fitting instances at semantic locations.
- [ ] Tune scene palette, camera, grid, panels, labels, layer states, and export inspector against MP4 frames.
- [ ] Verify GLB load errors remain non-fatal and the 2D/3D editor stays synchronized.

### Task 4: Verification and production deployment

**Files:**
- Modify only files implicated by verification findings.

**Interfaces:**
- Production URL remains `https://cadvora.vercel.app`.

- [ ] Run all tests, production build, asset-size checks, and `git diff --check`.
- [ ] Generate a project in-browser and verify technical assets, layers, hit proxies, synchronized movement, desktop, and mobile.
- [ ] Commit, deploy to Vercel production, inspect READY status, and scan error logs.

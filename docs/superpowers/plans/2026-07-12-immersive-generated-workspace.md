# Immersive Generated Workspace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Open a full-screen MP4-style workspace after generation and populate its synchronized 3D view with detailed house models derived from project geometry.

**Architecture:** `InterviewStudio` owns the transition into `ProjectWorkspace`. The workspace owns `PlanEdits` and projects one `PlanModel` into `SheetEditor` and `Plan3DViewer`. `modelKit.ts` provides reusable optimized Three.js furniture and fixture groups selected by a tested room-furnishing plan.

**Tech Stack:** React 18, TypeScript 5.6, Three.js, Tailwind CSS, Vitest, Vite.

## Global Constraints

- Interview completion opens the workspace automatically.
- Uploaded geometry is preferred; questionnaire-derived geometry is the fallback.
- 2D and 3D views share `PlanModel` and `PlanEdits`.
- Detailed models ship locally and require no runtime asset CDN.
- Professional review language remains visible.

---

### Task 1: Detailed model planning and kit

**Files:**
- Create: `buildwise/src/lib/modelKit.ts`
- Create: `buildwise/src/lib/modelKit.test.ts`
- Modify: `buildwise/src/components/Plan3DViewer.tsx`

**Interfaces:**
- Produces: `planRoomModels(model: PlanModel): ModelPlacement[]` where each placement has `kind`, `x`, `y`, `width`, `depth`, and `rotation`.
- Produces: `buildDetailedModel(kind: ModelKind, materials: ModelMaterials): THREE.Group`.

- [ ] Write failing tests asserting bedrooms receive beds, living rooms receive seating, kitchens receive cabinetry/appliances, bathrooms receive fixtures, and single-room kitchen projects receive a complete kitchen set.
- [ ] Run `npm test -- --run src/lib/modelKit.test.ts`; expect failures because the module is missing.
- [ ] Implement deterministic furnishing placement and reusable model builders with shared materials.
- [ ] Integrate placements into `Plan3DViewer` without changing editable-device IDs.
- [ ] Run the focused test and production build; expect both to pass.

### Task 2: Full-screen generated workspace

**Files:**
- Create: `buildwise/src/components/ProjectWorkspace.tsx`
- Modify: `buildwise/src/components/InterviewStudio.tsx`
- Modify: `buildwise/src/index.css`

**Interfaces:**
- `ProjectWorkspace({ pkg, answers, initialEdits, onEditsChange, onClose, onNew })` owns synchronized view state and export actions.
- `InterviewStudio` renders the workspace whenever `pkg !== null` and prevents background scrolling while it is open.

- [ ] Build the top command bar, left tool rail, central synchronized canvas, right system inspector, and bottom status bar.
- [ ] Move 2D/3D workspace composition and export controls into `ProjectWorkspace` while preserving `PlanEdits` persistence.
- [ ] Open the workspace immediately after package generation and when a saved project is selected.
- [ ] Restore page scrolling and interview state on close/new project.
- [ ] Run TypeScript and production build; expect success.

### Task 3: End-to-end verification and deploy

**Files:**
- Modify only files implicated by browser findings.

**Interfaces:**
- Production behavior at `https://cadvora.vercel.app`.

- [ ] Run all unit tests and a production build.
- [ ] Complete a browser interview and confirm the full-screen workspace opens.
- [ ] Verify detailed models, view switching, device synchronization, exports, and close/new behavior.
- [ ] Verify responsive fallback and no browser errors or horizontal overflow.
- [ ] Commit the implementation, deploy to Vercel production, inspect READY status, and scan production error logs.

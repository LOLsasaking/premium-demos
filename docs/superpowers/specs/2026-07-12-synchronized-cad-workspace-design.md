# Synchronized CAD Workspace Design

## Goal

Turn the generated-result experience into the CAD workspace shown in the supplied MP4. The 2D plan and 3D model are synchronized views of one editable project document.

## Chosen Architecture

Keep `PlanEdits` as the canonical device-edit state because it already drives 2D sheets, DXF/HTML exports, saved projects, and 3D regeneration. Extend the 3D viewer so every rendered electrical or lighting device retains its stable layer/id metadata. Selecting and dragging that mesh updates `PlanEdits`; React then regenerates both the 2D and 3D projections from the same state.

This avoids maintaining separate 2D and 3D models and prevents drift between representations.

## Workspace

- Replace the generated-result card's small sheet preview with a dark, full-width CAD shell.
- Use a compact top command bar, left tool rail, central viewport, right object inspector, bottom view tabs, and layer/status controls matching the video.
- Provide 2D, Split, and 3D views. Split is the clearest proof of synchronization.
- Use AutoCAD-style black/navy canvas, fine white construction geometry, cyan electrical paths, blue plumbing, and subtle cyan selection glow.

## 3D Editing

- Electrical and lighting meshes are selectable with pointer raycasting.
- Dragging occurs on the building's ground plane and snaps to a 3-inch grid.
- Orbiting is disabled during an object drag and restored afterward.
- The inspector shows object type, coordinates, circuit, nudge controls, delete, and reset.
- Keyboard-accessible nudge controls provide the same shared-state edit path as pointer dragging.

## Synchronization

- `PackageResult` owns `PlanEdits` and passes `edits` plus `onChange` into both editors.
- 2D changes immediately rebuild the 3D scene.
- 3D changes immediately regenerate the 2D sheet, exports, and saved-project state.
- Stable IDs remain the synchronization key; coordinates are stored as offsets from deterministic generated positions.

## Verification

- Unit-test the shared edit patch helper and snapping behavior.
- Verify a 3D edit changes `PlanEdits` and the corresponding 2D device coordinates.
- Verify the reverse direction using the existing 2D editor path.
- Browser-test 2D, Split, and 3D views, selection, nudge/drag, layers, and responsive layout.

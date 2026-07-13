# Synchronized CAD Workspace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the MP4-style generated CAD workspace with bidirectional 2D/3D editing.

**Architecture:** `PackageResult` owns one `PlanEdits` document. `SheetEditor` and `Plan3DViewer` both read and write it using stable device IDs.

**Tech Stack:** React, TypeScript, three.js, Vitest, Tailwind.

### Task 1: Shared edit operations

- Add tested `patchDeviceEdit` and 3-inch `snapPlanOffset` helpers in `src/lib/drawing.ts`.
- Refactor the 2D editor to use the shared helper.
- Verify the existing layout functions apply the patched coordinates.

### Task 2: Editable 3D scene

- Tag electrical and lighting meshes with stable `layer`, `deviceId`, base coordinates, and selectable metadata.
- Add raycast selection and ground-plane dragging to `Plan3DViewer`.
- Add an inspector with coordinate display, circuit editing, nudge, remove, and reset actions.
- Pass every edit through `onChange(PlanEdits)`.

### Task 3: Video-faithful generated workspace

- Recompose the drawing area in `PackageResult` as a CAD application shell.
- Add 2D, Split, and 3D modes with persistent layer controls and status bar.
- Keep exports, sheets, saved projects, and the remaining package detail content functional.

### Task 4: Verification

- Run the unit suite and production build.
- Browser-test selection and shared-state synchronization in both directions.
- Verify desktop and mobile layouts, console output, and repository cleanliness.

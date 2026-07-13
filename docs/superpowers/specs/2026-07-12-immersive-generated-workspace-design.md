# Immersive Generated Workspace Design

## Outcome

After Cadvora asks the final project question and generates the package, the marketing page transitions into a dedicated full-screen technical workspace modeled on the supplied MP4. The workspace uses the generated or uploaded building geometry to present editable 2D drawings and a detailed coordinated 3D model.

## Flow

1. The visitor uploads a floor plan or begins from the questionnaire.
2. Uploaded images contribute measured proportions and, when the vision backend is configured, detected rooms, openings, and fixtures.
3. Without an upload, the deterministic planning engine derives a coherent room or house program from project type, size, bedrooms, bathrooms, stories, garage, and system answers.
4. After generation, a full-screen workspace opens automatically and locks marketing-page scrolling.
5. Closing or starting a new project returns to the interview; saved projects reopen directly in the workspace.

## Workspace Layout

- Top command bar: Cadvora identity, project name, save status, undo-ready history affordance, export, close/new-project actions.
- Left rail: selection, plan, systems, measure, and annotation tool affordances.
- Central canvas: 2D, synchronized split, and 3D modes. Split is the default.
- Right inspector: active layers, project systems, selected-object properties, and package summary.
- Bottom status bar: scale, snap, synchronization, object/edit count, and professional-review state.

## Model Strategy

Architecture remains procedural so the technical plan and 3D structure cannot drift. A reusable Three.js model kit supplies detailed parametric objects rather than anonymous boxes:

- framed beds with mattresses and pillows;
- sofas, chairs, coffee and dining tables;
- base and wall cabinets with doors, worktops, and handles;
- refrigerators, ranges, sinks, dishwashers, and water heaters;
- vanities, toilets, tubs, and plumbing fixtures;
- doors, window frames, glazing, lighting fixtures, switches, and receptacles;
- visible electrical routes, water/supply paths, drainage paths, and framing.

Room type and appliance data select and place these models. Materials stay optimized and shared so an ordinary browser can render a complete house.

## Shared State

`PlanModel` remains the generated building source and `PlanEdits` remains the editable device source. Both 2D and 3D views read those structures. Every device uses a stable layer/id pair, so dragging, nudging, assigning a circuit, or removing it updates sheets, scene, saved project, DXF, HTML/PDF, and JSON outputs.

## Fallbacks

- If WebGL is unavailable, the full-screen workspace remains usable in 2D.
- If uploaded geometry cannot be interpreted, Cadvora uses measured proportions and the questionnaire program.
- Detailed models are local procedural assets, so generation does not depend on a third-party model CDN.
- Professional-review disclaimers remain visible in the workspace.

## Verification

- Unit-test room-to-model furnishing plans and shared edit behavior.
- Verify interview completion opens the workspace automatically.
- Verify saved projects reopen the workspace.
- Browser-test detailed model rendering, 2D/3D synchronization, view switching, layers, exports, close/new flow, mobile fallback, console output, and production deployment.

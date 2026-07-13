# Drop-in furniture models

Put a `.glb` here with one of the exact filenames below and it is picked up
automatically on the next page load — **no code change, no manifest edit,
no rebuild step beyond the normal deploy.** If the file isn't present, the
existing procedural placeholder (`modelKit.ts`) keeps rendering, so there's
no broken state either way.

Any GLB works regardless of its native scale, orientation, or pivot point —
`src/lib/furnitureAssets.ts` rescales and recenters it onto the plan
footprint and rests it on the floor automatically.

## License: CC0 only

This repo is public. Only drop in assets that are CC0 / public domain
(e.g. **Poly Haven**, **Kenney**, **Quaternius**). Do not commit models from
SketchFab, CGTrader, or TurboSquid unless the specific model's license
explicitly permits redistribution in a public repo — most don't.

## Filenames

| Kind             | Filename                    |
|------------------|------------------------------|
| Sofa / armchair  | `sofa.glb`                   |
| Coffee table     | `coffee-table.glb`           |
| Dining table     | `dining-table.glb`           |
| Dresser / base cabinet | `base-cabinet.glb`     |
| Kitchen sink base | `sink-base.glb`             |
| Range            | `range.glb`                  |
| Refrigerator     | `refrigerator.glb`           |
| Kitchen island   | `island.glb`                 |
| Bathroom vanity  | `vanity.glb`                 |
| Toilet           | `toilet.glb`                 |
| Tub              | `tub.glb`                    |
| Shower           | `shower.glb`                 |
| Garage storage   | `garage-storage.glb`         |

Beds are matched by size, most-specific first, falling back to a generic
`bed.glb`:

`bed-twin.glb` · `bed-full.glb` · `bed-queen.glb` · `bed-king.glb` · `bed-cal-king.glb` · `bed.glb`

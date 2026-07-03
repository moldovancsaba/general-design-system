# GDS design-sync notes

Repo-specific gotchas for `/design-sync`. Package shape, entry `packages/gds/dist/index.mjs`, global `window.GDS`, provider `GdsProvider`.

## Build / pipeline
- Entry is the umbrella `@sovereignsquad/gds` (re-exports theme + core + admin). 252 components (GdsVocabulary excluded — it's a data object, not a component).
- `cssEntry` must be a flattened stylesheet INSIDE `packages/gds/` (the converter bounds cssEntry to the package dir and refuses sibling/`../` paths). We pre-flatten the theme stylesheet (which `@import`s bare `@mantine/core/styles.css`) with esbuild:
  `.ds-sync/node_modules/.bin/esbuild packages/gds-theme/styles.css --bundle --loader:.css=css --external:'https://*' --outfile=packages/gds/.ds-resolved-styles.css`
  Then `cfg.cssEntry: ".ds-resolved-styles.css"`. **Re-run this esbuild flatten before any rebuild if the theme stylesheet changed**, else Mantine's structural CSS won't ship to designs. (`.ds-resolved-styles.css` is gitignored.)
- React/`@mantine` resolve from the repo-root `node_modules` → `--node-modules ./node_modules`.
- Preview compiler (`preview-rebuild.mjs`) is esbuild type-STRIPPING only (no type-check). Bad enum values don't fail the build — they crash at runtime and silently BLANK the whole card. The read-grade-iterate loop is essential; a blank card with no capture error usually = a bad prop value.

## Authoring API gotchas (apply to every wave)
- **Action-shaped props use `{ action: SemanticActionId, onClick?, ... }`, NOT `{ label }`.** Passing `{label}` sends `action: undefined` → internal SemanticButton crashes → BLANK card, no error. Affects `SemanticButton`, `ActionBar*`, `ContentOps*`, `SemanticNavLink`, `*Action` slots.
  - Valid SemanticActionIds (~85, from GdsVocabulary): save, add, edit, delete, cancel, confirm, close, submit, reset, export, import, refresh, login, back, help, settings, send, reply, home, profile, search, filter, sort, preview, upload, download, print, analytics, dashboard …
  - NOT valid: `create` (use `add`), `retry` (use `refresh`).
- **Mantine-derived Select/MultiSelect/Autocomplete (incl. `AdminSelect`) take a `data={[{value,label}]}` prop, NOT `<option>` children.** `<option>` children render a completely blank control. Use `placeholder` + `value={null}` for unselected/error states.
- **Media-first cards** (`AdminResourceCard`, `ProductCard`, listing/food/media cards) look poor without media. Supply `thumbnailSrc`/`mediaSrc` + `mediaAlt`; a static data-URI SVG gradient renders with no network.
- Thin Mantine passthroughs (`Badge`, `Box`, `Button`, `Center`, `Checkbox`, `Title`, …) have trimmed `.d.ts` showing only `children`/`className`/`style`, but standard Mantine props (`label`, `defaultChecked`, `order`, `variant`, `color`, `size`) work at runtime — use them.
- Helper/prop type shapes are often elided from the per-component `.d.ts`. Resolve them from the subpackage dist: `@sovereignsquad/gds-core/dist/GdsDesignHandoff-*.d.ts` and `@sovereignsquad/gds-admin/dist/server.d.ts`.
- Icons: import from `@tabler/icons-react` or use bundle `GdsIcon`/`GdsIcons`.

## Overlays / overrides
- Most overlays (`AdminModal`, `AdminDetailDrawer`, `ConfirmDialog`, `DetailProfileShell` drawer) render their open state cleanly WITHIN the card at default viewport — no override needed.
- `CommandPalette` → `cfg.overrides.CommandPalette: {cardMode:"single"}` (modal backdrop fills the cell; only the `opened` cell is meaningful). Needs `CommandRegistryProvider` to mount; shows "No matching commands" empty state with no registered commands (expected).
- Full shells (`AppShell`, `ArticleShell`, `DiscoveryShell`) compose full chrome inside the standard card without escaping.

## More authoring gotchas (wave 2)
- **Mantine portal overlays escape the capture card** — `GdsModal`, `GdsDrawer` (and `GdsSheet` if present) wrap Mantine `Modal`/`Drawer` which portal to `document.body` → blank card. Set `cfg.overrides.<Name>:{cardMode:"single"}`. NOTE: may still not fully recover under capture (portal renders outside the card root) — a known harness limitation; author the best static open-state composition regardless.
- **A loose Mantine element as the preview ROOT (`Title`/`Button`/raw `<div>`) paints BLANK in the harness even when sized/bordered.** Always make the cell root a self-contained GDS surface (`MetricCard`, `GdsSafeBox`, a card/panel). This is the usual cause of a blank provider/primitive cell.
- **`GdsProvider` is auto-applied — never re-wrap** (nesting it blanks the cell). For a GdsProvider preview, just render styled GDS children directly.
- **`GdsNotificationCenter` throws without `GdsNotificationProvider`** — wrap it in the local provider (not GdsProvider).
- **`GdsAccessGate` actions use a `{kind}` enum** (`sign-in|sign-up|subscribe|request-access|retry|back`), distinct from SemanticActionId.
- **Template actions use `GdsPageTemplateAction {id,label,kind}`**, not the SemanticAction `{action}` shape. Template slots also use `MetricCardProps`.
- **`ChoiceChip` takes `label`, not children.** **`GdsContainer`** size: use named tokens `narrow`/`page`/`wide` (the t-shirt `md`/`lg` collapse to content width).
- **`GdsDataTable`** uses the `createGdsTableAdapter(rows, columns)` factory. **`FormErrorSummary`** returns null unless wrapped in `GdsFormProvider` with a `FormSnapshot` containing blocking issues.
- Chart helper types (`GdsChartDatum`, configs, legend items) live in `gds-core/dist/GdsDesignHandoff-*.d.ts`. `GdsChart` with no renderer adapter is a text/registry/table fallback by design; `GdsBarChart`/`GdsLineChart` paint real SVG.

## Deliberately floor-carded (do not re-author without a harness fix)
- `GdsSheet` — same body-portal issue as GdsModal/GdsDrawer; floor-carded.
- `GdsModal`, `GdsDrawer` — wrap Mantine `Modal`/`Drawer` which portal to `document.body`; the open state renders OUTSIDE the capture card root and `cardMode:"single"` does not recover it (confirmed). No `withinPortal` prop is exposed to disable the portal. They ship fully functional in the bundle (correct in real designs); only the preview card can't show the open state, so they intentionally use the typographic floor card. Revisit only if the capture harness gains full-page (not card-root) screenshotting.

## Known render warns
- `PartnerNewsletterCapture` `[RENDER_THIN]` variants-identical: its modal surface portals/fixed-positions, which collapses measured output; confirmed benign via screenshot. Presented via cardMode:single.
- `CreatorThemeBoundary` rejects raw colors / out-of-scope selectors by its governed CSS policy, so an authored gradient theme is NOT painted — it renders governance diagnostic cards + unstyled children. This is genuine governed behavior; graded good.

## Re-sync risks
- `.ds-resolved-styles.css` is a build input regenerated by the esbuild flatten above — if the theme stylesheet changes, regenerate it or Mantine CSS desyncs from designs.
- Previews assume the 3.4.14 API surface (action vocabulary, `data`-prop selects). A major GDS bump could change action ids or prop shapes — re-grade if so.

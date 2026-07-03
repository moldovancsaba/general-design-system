# Overlay Adapter Seam

Overlays (menus, selects, popovers, hovercards, tooltips) are GDS's highest-risk,
most vendor-coupled primitive — the transparent-surface incident, portaled
elements escaping themed scopes, and engine prop churn all live here. The
**overlay adapter seam** isolates the overlay *engine* behind a GDS-owned
interface so it can be swapped (Mantine today, Base UI / Ark / hand-rolled
tomorrow) **without changing any consumer call site or the public component API**.

This is the deliberate, evidence-scoped step toward owning the riskiest primitive —
not a reimplementation. Stable primitives (layout, typography, buttons) are
intentionally **not** seamed.

## Contract

```ts
interface OverlayAdapter {
  readonly id: string;
  readonly config: GdsOverlayConfig;       // placement, withinPortal, trapFocus, transitionDurationMs
  surfaceProps(role: GdsOverlayRole): Record<string, unknown>;
}
```

All types are **GDS-owned** (`GdsOverlayPlacement`, `GdsOverlayRole`,
`GdsOverlayDismissReason`, `GdsOverlayConfig`) — the seam does not widen the
vendor type boundary (verified by `verify:public-types`).

`surfaceProps(role)` are the DOM props a GDS overlay component spreads onto its
surface element — including **`data-gds-overlay-surface`**, which the GDS
stylesheet paints opaque (issue #342). Routing overlays through the adapter is how
GDS components stop hard-wiring the engine.

## Usage

The default `mantineOverlayAdapter` preserves current behavior and is wired by
`GdsProvider`. Swap the engine with one prop — no consumer or component change:

```tsx
import { GdsProvider, type OverlayAdapter } from '@sovereignsquad/gds';

const customOverlayEngine: OverlayAdapter = {
  id: 'base-ui',
  config: { placement: 'bottom-start', withinPortal: true, trapFocus: true, transitionDurationMs: 120 },
  surfaceProps: (role) => ({ 'data-gds-overlay-surface': '', 'data-engine': 'base-ui', 'data-role': role }),
};

<GdsProvider overlayAdapter={customOverlayEngine}>…</GdsProvider>;
```

Inside a GDS overlay component:

```tsx
import { useOverlayAdapter } from '@sovereignsquad/gds';

const adapter = useOverlayAdapter();
// spread onto the dropdown/surface element:
<div {...adapter.surfaceProps('menu')} />;
```

Swappability is proven by `packages/gds-theme/src/overlay-adapter.test.tsx`: the
same probe component reads a different engine purely by changing the injected
adapter.

## Status

The seam, the default Mantine adapter, the `GdsProvider.overlayAdapter` prop, the
`useOverlayAdapter()` hook, and the GDS-owned surface hook are delivered. GDS
overlay components adopt `surfaceProps` incrementally; each adoption also lets the
corresponding `.mantine-*-dropdown` selector migrate to `[data-gds-overlay-surface]`
under the CSS-boundary ratchet (#347).

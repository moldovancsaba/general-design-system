# Component → Pattern-Registry Parity Gate (#368)

`verify:component-catalog-parity` is a blocking release gate that guarantees every
public UI component shipped by GDS is demonstrated in GDS's own pattern catalog.

## What it enforces

Every public **PascalCase UI component** exported from `@sovereignsquad/gds-core`
or `@sovereignsquad/gds-admin` (via each package's `index` / `client` / `server`
entrypoints) must be **either**:

1. **Registered** in the pattern registry (`apps/playground/src/pattern-registry.ts`)
   as a `sourceComponent`, **or**
2. **Exempted** in `boundary/component-catalog-exemptions.json` with a short reason.

If a component is neither, the gate fails CI and names the offender.

### Why registration matters

Export coverage alone (`verify:pattern-export-coverage`) only asserts that an
export has a rationale entry; it does not assert the component is **rendered** in
the catalog. Registry membership is what drives:

- catalog render across **every theme** and under **forced-colors**,
- **i18n** message routing, and
- **accessibility evidence**.

The 17 brand-completion lane components shipped export-covered but never rendered,
theme-verified, i18n-routed, or a11y-evidenced. This gate makes catalog
registration a hard, machine-checked requirement so that gap can never recur.

## Scope / classification

The gate scans **runtime** exports (`export function|const|class`) reachable from
the public entrypoints and keeps names matching `/^[A-Z]/` **and** `/[a-z]/`.
It drops, by classification (never require registration or exemption):

- **hooks** — `use*` (`/^use[A-Z]/`),
- **type-only exports** — never appear (only runtime declarations are scanned).

## How to resolve a failure

When the gate names a component, choose one:

### Register it (preferred for genuine UI patterns)

Add the component to `apps/playground/src/pattern-registry.ts`. Either create a new
registry row with `sourceComponent: 'YourComponent'`, or append it to an existing
row's `sourceComponent` when it belongs to an already-registered family. Multi-
component rows are written as slash/comma-separated tokens, e.g.
`sourceComponent: 'ChoiceChip / PillBar / SoftChipGroup / FilterChipGroup'`.
Make sure the catalog demo (`apps/playground/src/pattern-pages.tsx`) actually
renders it, so the render/theme/i18n/a11y evidence is real.

### Exempt it (only for genuinely non-catalog exports)

Add an entry to `boundary/component-catalog-exemptions.json` with a reason.
Exemptions are reviewed via diff. Legitimate exempt categories:

- **layout / style primitives** (`GdsBox`, `GdsStack`, StyleUtilities helpers …),
- **typography atoms** (`BodyText`, `SectionTitle` …),
- **providers / context** (`GdsFormProvider`, `GdsToastProvider` …),
- **i18n formatters** (`GdsFormattedDate`, `GdsRelativeTime` …),
- **templates / catalog helpers** (`Gds*Template`, `Gds*Catalog` …),
- **chart sub-parts / frames / variant wrappers** (`GdsChartAxis`, `GdsBarChart` …),
- **`Admin*` / `Partner*` sub-parts** of an already-registered composite pattern,
- **icon surfaces** (`GdsIcon`, `GdsIcons`),
- **evidence / utility surfaces** and client-runtime composites whose canonical
  pattern is registered under a different `sourceComponent`.

The exemptions file accepts either a `{ "exemptions": { "Name": "reason" } }` map
or an array of `{ "name", "reason" }` objects.

## Stale exemptions

If an exemption names a component that is no longer a public export, the gate
prints a **non-fatal** warning so the allowlist can be tightened. Remove the entry.

## Running it

```bash
npm run verify:component-catalog-parity   # standalone
npm run verify:release                     # runs it as the closing gate
```

Deterministic, sub-second static scan — no build, no network.

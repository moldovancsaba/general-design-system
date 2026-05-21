# Mantine Runtime and Theme Contract

Status: Normative
Version: 1.3.0
Last updated: 2026-05-21

This document defines the implementation contract required for a product to count as Mantine-only in practice, not just in intent.

## Goal

Make Mantine the only runtime UI platform for product applications by standardizing:

- root provider composition
- theme ownership
- component defaulting strategy
- notifications and modals setup
- wrapper boundaries
- styling boundaries
- folder and implementation responsibilities

## Required Package Baseline

Required when relevant to product UI:

- `@mantine/core`
- `@mantine/hooks`
- `@mantine/form`
- `@mantine/notifications`
- `@mantine/modals`
- `@tabler/icons-react`

Approved optional packages:

- `@mantine/dates`
- `@mantine/charts`
- `@mantine/dropzone`
- `@mantine/spotlight`
- `@mantine/tiptap`

Do not install parallel foundational UI systems for ordinary product UI.

## Required Root Composition

Every product must have one canonical root UI composition.

Minimum structure:

1. application framework root
2. `MantineProvider`
3. `ModalsProvider`
4. notifications root
5. product-level data/query/router providers
6. application shell/content

Rules:

- `MantineProvider` must sit above all product UI rendering.
- Notifications and modals must be registered once at the root.
- Do not create page-level or feature-level duplicate providers that redefine theme behavior.
- If a project supports color scheme switching, that switching still resolves back to one Mantine theme authority.

Reference implementation:

- [TEMPLATES/providers.tsx.template](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/TEMPLATES/providers.tsx.template)

## Required Theme Contract

Each project must export one theme file or theme module that acts as the only product token authority.

The theme must own:

- color palette
- semantic color decisions
- typography families
- font sizes and line heights
- spacing scale
- radius scale
- shadow scale
- breakpoint definitions
- focus ring behavior
- default component sizing/variant policy where practical

Recommended theme file responsibilities:

- export the raw theme object
- export any very thin semantic helpers derived from the theme
- export no unrelated business logic

Reference implementation:

- [TEMPLATES/theme.ts.template](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/TEMPLATES/theme.ts.template)

## Theme Defaults Strategy

Prefer setting repeated product behavior at the theme level before creating wrappers.

Use the theme for:

- default button radius/size/loader placement
- input radius/size/error treatment
- paper/card border and shadow defaults
- modal padding and title rhythm
- badge sizing and weight
- heading rhythm
- table density defaults where feasible

Do not use wrappers as the first answer to a problem that can be solved by a theme component default.

## Allowed Wrapper Policy

Thin wrappers are allowed.

Good wrapper responsibilities:

- set approved default props
- map domain labels or analytics hooks
- attach standard accessibility attributes
- collapse repeated boilerplate

Bad wrapper responsibilities:

- invent new interaction meaning
- fork Mantine behavior per feature
- become a large second primitive system
- hide too many underlying Mantine props without reason

Reference implementations:

- [TEMPLATES/AppButton.tsx.template](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/TEMPLATES/AppButton.tsx.template)
- [TEMPLATES/AppPageHeader.tsx.template](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/TEMPLATES/AppPageHeader.tsx.template)

## Styling API Order

When styling Mantine surfaces, use this order:

1. theme defaults
2. Mantine props
3. Mantine `classNames` or `styles`
4. narrow shared CSS utilities
5. documented exceptional CSS

Avoid large custom stylesheet islands for ordinary app UI.

## CSS Contract

Allowed CSS:

- app-level reset or document defaults
- print styles
- a few shared layout utilities
- third-party integration glue
- exceptional visualization styles

Prohibited CSS:

- shadow token systems outside the Mantine theme
- parallel spacing scales
- parallel radius scales
- large field styling frameworks
- component-local pseudo-design-systems in CSS modules

## Form Contract

Projects may use Mantine form utilities or a thin local adapter, but the rendered controls must still be Mantine-based.

Rules:

- field primitives must be Mantine-based
- validation feedback must stay close to the field
- submit/loading state must be standardized
- form layout rules come from shared component and UX contracts, not per-page invention

## Overlay Contract

Overlays must be standardized through Mantine.

Use:

- `Modal` for confirmation and focused tasks
- `Drawer` for contextual review, filters, and secondary editing
- Mantine notifications for transient cross-surface feedback

Do not preserve legacy dialog/toast systems as parallel runtime infrastructure once Mantine setup exists.

## Data Display Contract

Common product data display should rely on Mantine primitives first:

- `Paper` or `Card`
- `Table`
- `Tabs`
- `Badge`
- `Alert`
- `Pagination`
- `Loader`
- `Skeleton`

Complex charts, maps, and editors may use other libraries, but surrounding layout and state treatment remain Mantine-system governed.

## Folder Responsibility Contract

Recommended project structure:

- one theme module
- one root provider module
- optional thin app wrappers directory
- feature components built on Mantine primitives or those thin wrappers
- no active growth in a legacy primitive directory once migration begins

The exact folder names may vary by project. The responsibility boundaries may not.

Starter shell reference:

- [TEMPLATES/AppShell.tsx.template](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/TEMPLATES/AppShell.tsx.template)

## Required Validation Questions

- Is Mantine the only foundational UI runtime for this surface?
- Did styling come from the theme and Mantine APIs first?
- Is this wrapper still thin?
- Could a theme default remove this repetition?
- Did any new hard-coded design values enter feature code?
- Did this introduce a parallel overlay, field, or notification system?

## Mantine-Only Runtime Definition

A project is Mantine-only only when all of the following are true:

- one root Mantine provider governs the app
- one exported Mantine theme is the only token authority
- product UI primitives come from Mantine or thin approved wrappers
- notifications and modals are Mantine-based
- no legacy primitive library remains active for normal product UI
- exceptions are narrow, documented, and clearly outside the primitive foundation

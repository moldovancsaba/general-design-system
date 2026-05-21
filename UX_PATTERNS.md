# UX Patterns

Status: Normative
Version: 1.0.0
Last updated: 2026-05-21

## App Shells

Rules:

- Every authenticated product needs a stable shell with predictable navigation.
- Page title, current location, and primary action must be easy to identify.
- Secondary actions belong near the content they affect.
- Mobile shells must expose primary navigation without hiding important status or actions.

## Page Headers

Rules:

- Page headers answer: where am I, what is this for, what can I do next?
- Primary action appears in the header only when it applies to the whole page.
- Metadata should be compact and scannable.
- Avoid oversized marketing headers inside operational product surfaces.

## Dashboards

Rules:

- Dashboards prioritize status, next action, and exception visibility.
- Use cards or panels for grouped metrics, not decorative repetition.
- Charts must answer a product question and include labels or summaries that make interpretation clear.
- Empty dashboard modules must explain the missing data source.

## Learner Flows

Rules:

- A learner should always know current course, current lesson, progress, and next step.
- Primary learning actions must be visually obvious and consistent.
- Completion states should confirm achievement and guide the next meaningful action.
- Quiz and assessment errors should teach recovery, not only report failure.
- Course length copy must support 1 lesson through open-ended courses.

## Admin and Editor Flows

Rules:

- Admin screens must favor dense, predictable information over decorative layouts.
- Risky changes need preview, confirmation, or clear undo/recovery path.
- Editors must preserve draft data across recoverable failures.
- Bulk actions must show selected count, affected scope, and consequence.
- Operational filters and search must remain visible while reviewing results.

## Forms

Rules:

- Validate as early as practical without punishing typing.
- Prefer blur or submit validation for complex forms.
- Disable duplicate submits while a mutation is in flight.
- Surface server-side errors in user language near the relevant control or form summary.
- Preserve user-entered values on recoverable failures.
- Group related fields with clear headings when form length grows.

## Destructive Actions

Rules:

- Destructive actions must be visually distinct.
- Irreversible actions require confirmation.
- High-impact destructive actions must restate the target by name.
- Post-delete routing must be predictable.
- Confirmation copy must describe consequence, not ask vague "are you sure" questions only.

## Authentication UX

Rules:

- Login forms should keep the primary path obvious.
- Alternate auth methods must not visually overpower the canonical path unless intentionally prioritized.
- Re-auth or step-up flows must preserve the return destination.
- Security-sensitive failures should be explicit without leaking internals.
- Provider-branded buttons may follow provider requirements while still fitting the page rhythm.

## Navigation

Rules:

- Main navigation should be stable across sibling screens.
- Breadcrumbs are useful for deep admin hierarchies, not mandatory for shallow apps.
- Every page should answer: where am I, what can I do here, what happens next?
- Avoid route labels that expose implementation terms such as collection names or internal IDs.

## Permission and State Messaging

Rules:

- Distinguish unauthenticated, unauthorized, pending, revoked, empty, and error states.
- Do not reuse the same visual treatment for materially different system states.
- When access is blocked, explain the next valid action if one exists.
- Permission messaging must not disclose private data the user cannot access.

## Search, Filters, and Lists

Rules:

- Filters belong near the list they affect.
- Active filters must be visible and removable.
- Search empty state should say whether nothing exists or nothing matches the current query.
- Sorting, pagination, and filters should survive navigation where users expect to return.
- Saved filters are a product feature and need explicit naming and management.

## Responsive Behavior

Rules:

- Mobile support is mandatory for public flows and important admin paths.
- Tables need an explicit small-screen strategy.
- Modal and drawer widths must remain usable on small screens.
- Tap targets must remain comfortable on touch devices.
- Text must wrap or truncate intentionally; it must not overlap controls.

## Content Tone

Rules:

- Labels should be concrete and short.
- Helper text should explain decisions, not repeat labels.
- Error copy should say what went wrong and what the user can do next.
- Success copy should confirm completion without unnecessary enthusiasm.
- Avoid internal language in learner-facing UI.

## Loading, Empty, Error, Success

Rules:

- Design all four states for every async surface.
- Empty state is not an error state.
- Error state is not an empty state.
- Success should be shown at the smallest useful scope.
- Long operations need progress or status language, not only a spinner.

## Docs and Reference Surfaces

Rules:

- Docs pages may use richer editorial layout, but structure should still be consistent.
- Code samples should privilege correctness over marketing tone.
- Warnings should identify actual risk or compatibility constraints.
- Documentation UI must still follow accessibility, typography, and content rules.

# UX Patterns

Status: Normative
Version: 1.1.0
Last updated: 2026-05-21

This document defines canonical workflow behavior patterns that products should reuse instead of reinventing per page.

## App Shells

Rules:

- Every authenticated product needs a stable shell with predictable navigation.
- Page title, current location, and primary action must be easy to identify.
- Secondary actions belong near the content they affect.
- Mobile shells must expose primary navigation without hiding important destinations behind low-discoverability controls only.

## Page Headers

Rules:

- Page headers answer: where am I, what is this for, what can I do next?
- Primary actions appear in the header only when they apply to the whole page.
- Metadata should be compact and scannable.
- Avoid marketing-scale hero headers inside operational product surfaces.

## Dashboards

Rules:

- Dashboards prioritize status, next action, and exception visibility.
- Metrics must answer a product question, not simply occupy space.
- Charts need labels, summaries, or interpretation support.
- Empty dashboard modules must explain which data source is missing.
- Small-screen dashboards must surface operational priority first and broad analytics later.

## Forms

Rules:

- Validate as early as practical without punishing typing.
- Prefer blur or submit validation for complex forms.
- Disable duplicate submits while a mutation is in flight.
- Preserve user-entered values on recoverable failure.
- Server-side errors should map to controls or a clear form summary.
- Related fields should be grouped under short headings when forms become long.

## Assessment and Survey Flows

Rules:

- The user should always know current subject, current step, current progress, and next action.
- Primary scoring/input actions must be visually obvious and consistent.
- Guidance should support better decisions without turning the workflow into a training manual.
- Low-confidence or uncertain observations should be captured explicitly without blocking normal speed unnecessarily.
- Recovery from interruption should be defined for long or repeated assessment flows.

## Admin and Editor Flows

Rules:

- Admin screens must favor dense, predictable information over decorative layout.
- Risky changes need preview, confirmation, or clear undo/recovery.
- Editors must preserve draft data across recoverable failures.
- Bulk actions must show selected count, scope, and consequence.
- Search and filters should remain visible or easily recoverable while reviewing results.

## Search, Filters, and Lists

Rules:

- Filters belong near the data they affect.
- Active filters must be visible and removable.
- Search empty state must distinguish “nothing exists” from “nothing matches”.
- Sort, pagination, and filters should survive navigation where users expect to return.
- Saved filters are a product feature, not an accidental side effect.

## Detail Views

Rules:

- Detail pages should lead with the object identity and current high-value state.
- The first screen should answer what this item is, what matters now, and what the user can do next.
- Related tools should be grouped by decision value, not by backend model boundaries.
- Secondary or risky actions should not visually compete with the main review path.

## Destructive Actions

Rules:

- Destructive actions must be visually distinct.
- Irreversible actions require confirmation.
- High-impact destructive actions must restate the target by name.
- Post-delete or post-destructive routing must be predictable.
- Confirmation copy must describe consequence, not ask vague “are you sure?” copy only.

## Authentication UX

Rules:

- The primary sign-in path should remain obvious.
- Alternate auth methods must not visually overpower the canonical path unless intentionally prioritized.
- Step-up or re-auth flows must preserve the return destination.
- Security-sensitive failures should be explicit without leaking internals.
- Provider-branded buttons may follow provider policy while still fitting the page rhythm.

## Permission and State Messaging

Rules:

- Distinguish unauthenticated, unauthorized, pending, revoked, empty, and error states.
- Do not reuse the same visual treatment for materially different system states.
- When access is blocked, explain the next valid action if one exists.
- Permission messaging must not disclose protected data.

## Content Tone

Rules:

- Labels should be concrete and short.
- Helper text should explain decisions, not repeat labels.
- Error copy should say what went wrong and what the user can do next.
- Success copy should confirm completion without noise.
- Avoid internal implementation language in end-user UI.

## Loading, Empty, Error, Success

Rules:

- Design all four states for every async surface.
- Empty state is not an error state.
- Error state is not an empty state.
- Success should appear at the smallest useful scope.
- Long operations need progress or explicit status language, not only a spinner.

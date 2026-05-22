# Navigation and Responsive Rules

Status: Normative
Version: 1.3.3
Last updated: 2026-05-22

This document defines the canonical navigation and responsive behavior contract for product applications using this SSOT.

## Shell Rules

- Every authenticated application needs a stable shell.
- The shell must make current location, primary destinations, and the current page purpose obvious.
- Desktop and mobile may use different shell patterns, but the destination model must stay consistent.
- The shell must not hide critical workflow entry points behind low-discoverability controls only.

## Primary Navigation

- Primary navigation contains top-level destinations, not actions.
- Labels should be user concepts such as `Children`, `Records`, `Survey`, or `Settings`, not implementation terms.
- Current location must be visibly indicated.
- The number of top-level mobile destinations should stay intentionally small.
- Secondary controls such as theme, locale, profile, and logout do not belong in the primary mobile destination set.

## Mobile Navigation

- Mobile navigation must preserve access to the app’s primary destinations without forcing repeated drawer open/close cycles for ordinary work.
- For apps with a small stable set of top-level destinations, use bottom navigation or an equally discoverable primary mobile pattern.
- A drawer may be used for secondary destinations, preferences, or overflow.
- A floating burger alone is not an acceptable long-term mobile strategy for work-critical applications.
- Mobile shells must account for touch ergonomics and reachable primary actions.

## Desktop Navigation

- Desktop applications may use sidebars, top nav, or split navigation when those patterns improve scanability and speed.
- Desktop navigation should not become visually heavier than the content itself.
- Dense operational screens should keep navigation stable while making room for task surfaces.

## Page Headers

- Every page needs a clear title.
- If there is a page-level primary action, it belongs near the title.
- Headers should support orientation first, decoration second.
- On mobile, header actions must remain reachable and should not compete with navigation chrome.

## Dashboard Rules

- Dashboards must prioritize next action, urgent state, and important exceptions before broad analytics.
- Small screens should show operational priority first and deeper analytics later.
- A mobile dashboard must not be a fully dense desktop dashboard merely stacked vertically.
- Secondary charts and broad reporting sections may be collapsed or moved lower on small screens.

## Small-Screen Prioritization

On small screens, prioritize in this order:

1. next action
2. urgent exception
3. recent or active work
4. high-value summary
5. deeper analytics

If content density forces tradeoffs, lower-priority analytics move later or behind disclosure patterns.

## Lists and Registries

- Mobile registries and lists must optimize for scanability and selection.
- Each row or card should have one obvious primary action.
- Secondary actions should move into a menu or secondary layer when density gets high.
- Status badges must be prioritized so users are not forced to parse a badge wall.

## Tables on Small Screens

Every table must explicitly choose one of these strategies:

- horizontal scroll
- alternate list/card view
- priority columns with hidden details
- stacked row presentation

“Desktop table compressed onto mobile” is not an acceptable strategy.

## Drawers, Filters, and Secondary Panels

- Filters on small screens should usually live in a drawer or sheet rather than permanently consuming top-of-page space.
- Apply/save actions must remain reachable.
- Drawers should not become the primary navigation path for every common action.

## Touch Ergonomics

- Primary touch targets and their spacing must remain comfortable on mobile.
- Dense mobile toolbars require extra review.
- Repeated adjacent action icons must not become accidental-tap traps.

## Responsive Acceptance Questions

- Can a user reach primary destinations without hidden-only navigation?
- Can a user identify what to do next within a few seconds on small screens?
- Is the mobile version intentionally prioritized, not merely stacked?
- Are major actions reachable without excessive scrolling or precise tapping?
- Does the page preserve meaning and usability at narrow widths?

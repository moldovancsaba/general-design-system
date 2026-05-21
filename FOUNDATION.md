# Foundation

Status: Normative
Version: 1.1.0
Last updated: 2026-05-21

## Goal

Provide a rigid, followable, cross-project design system for product applications that need predictable behavior, maintainable implementation, accessible interaction, and low UI drift.

## Core Principles

1. One source of truth: design decisions live here, not inside individual product repos.
2. One UI platform: Mantine is the required product UI foundation.
3. One token source per product: the project theme is the only active token authority.
4. One pattern per concept: do not allow page-by-page reinvention of the same interaction.
5. Behavior is part of design: loading, empty, error, success, disabled, permission, and validation states are required.
6. Accessibility is a release criterion: focus, labels, semantics, contrast, and touch ergonomics are part of the contract.
7. Responsive design is explicit: mobile and small-screen behavior must be intentionally designed.
8. Product UIs are work surfaces: prioritize clarity, scanability, speed, and repeated-use ergonomics over ornamental layout.

## Scope

This SSOT governs:

- design principles
- visual-system rules
- UI primitive policy
- component behavior contracts
- navigation and responsive patterns
- common workflow UX patterns
- governance, migration, and exception rules

It does not replace:

- local brand identity choices implemented through a project theme
- project-specific business logic
- highly domain-specific components
- charting engines
- print or PDF rendering engines

## Required UI Foundation

Required baseline for product UI:

- `@mantine/core`
- `@mantine/hooks`
- `@mantine/form`
- `@mantine/notifications`
- `@mantine/modals`
- `@tabler/icons-react`

Approved optional Mantine packages by need:

- `@mantine/dates`
- `@mantine/charts`
- `@mantine/dropzone`
- `@mantine/spotlight`
- `@mantine/tiptap`

Non-Mantine packages are allowed only as non-primitive supporting integrations such as:

- charting integrations
- rich text / editor integrations
- provider-required branded controls
- printed/exported document tooling
- narrow exception surfaces documented locally

They may not define the product’s primitive UI system, token system, layout system, or interaction model.

## Theme Contract

Every product must expose one shared theme through its root provider.

The theme owns:

- semantic palette and raw palette definitions
- primary color
- typography families and scale
- font weights
- spacing scale
- radius scale
- shadow/elevation scale
- breakpoint definitions
- focus ring defaults
- component defaults
- disabled, loading, error, warning, and success visual defaults

Minimum practical theme outputs should cover:

- `primaryColor`
- `defaultRadius`
- heading defaults
- breakpoint set
- semantic surface/background intent
- component defaults for the most repeated primitives

Projects may expose semantic aliases only when those aliases resolve back to the active Mantine theme.

## Token Policy

Allowed:

- Mantine theme values
- CSS variables derived from the theme
- thin semantic aliases that resolve to the theme
- documented provider-brand constants required by external integrations

Prohibited:

- raw hex/rgb/hsl values in feature UI code
- repeated hard-coded spacing, radius, shadow, or font-size values
- local color systems that compete with the theme
- component-local token systems hidden in CSS modules
- inline design decisions repeated across pages
- any second design-token authority beside the Mantine theme

## Visual Language

### Color

- Primary color is for the highest-priority active affordances.
- Destructive color is for destructive actions, destructive confirmations, and critical errors only.
- Warning color communicates risk, time sensitivity, or required attention.
- Success color confirms completion or healthy state; it does not replace text.
- Neutral surfaces and borders should carry most structure.
- Color alone must not carry meaning.

### Typography

- Use the theme typography scale.
- App and admin interfaces prioritize compact, scannable hierarchy.
- Display-scale typography is reserved for true hero or marketing surfaces.
- Labels must be concrete and short.
- Body copy should optimize for task completion, not promotion.

### Spacing

- Use theme spacing tokens only.
- Internal spacing of repeated components must be stable.
- Dense screens may be compact, but not cramped enough to hurt scanning or touch accuracy.
- Viewport-scaled spacing and type are not appropriate for ordinary product surfaces.

### Radius

- Use theme radius tokens.
- Keep radius systems simple and consistent.
- Cards, panels, and field surfaces should not mix unrelated rounding schemes.

### Elevation

- Elevation clarifies stacking and focus.
- Ordinary cards and panels should rely primarily on border and surface contrast.
- Overlays may use stronger elevation.
- Decorative shadow layering is discouraged.

### Motion

- Motion must clarify state change, not delay work.
- Reduced-motion preferences must be respected.
- Long-running operations need explicit status language, not only indefinite animation.

## Layout Contract

Use canonical layout primitives:

- app shell
- page header
- section
- stack
- group
- grid
- table/list region
- side panel
- modal
- drawer

Page sections should generally be:

- full-width bands with constrained inner content
- or unframed vertical structure

Avoid building operational pages as stacks of decorative floating cards.

Cards are for:

- repeated item summaries
- framed tools
- side panels
- modal bodies
- summary metrics where framing improves scanning

## State Coverage Rule

Every async or mutable surface must define:

- loading state
- empty state
- error state
- success state where useful
- disabled state where possible actions are blocked
- permission state when access differs by role or context

Missing state design is a contract violation, not a polish issue.

## Accessibility Baseline

Every product must maintain:

- visible focus state for all interactive controls
- keyboard access for all actions
- semantic labels for fields and icon-only controls
- logical heading order
- AA contrast for ordinary text and important controls
- non-color communication for warnings, errors, and active state
- modal focus trap and focus return
- clear disabled-state explanation when the reason is not obvious
- touch-friendly targets and spacing on mobile surfaces
- no pointer-only critical workflow

## Responsive Baseline

- Public and user-critical flows must work on mobile.
- Operational/admin flows must define a small-screen strategy instead of inheriting desktop overflow.
- Tables must declare a responsive pattern: horizontal scroll, alternate list view, stacked rows, or priority columns.
- Navigation must expose primary destinations on small screens without relying on hidden affordances only.
- Modals and drawers must remain usable on small screens with reachable actions.

## Internationalization Baseline

- Components must tolerate longer translated labels.
- Buttons and compact controls need resilient wrapping or sizing behavior.
- Layout must not assume English-length copy.
- Icon-only actions require localized accessible labels.
- Copy must not be embedded in images when equivalent text can be rendered.

## Project Adapter Rule

Each product may define a local adapter for:

- theme/provider file paths
- wrapper component paths
- notifications/modals setup
- local validation commands
- documented exceptions
- migration backlog

The adapter may not redefine behavior contracts or UX rules established here, and it may not introduce an alternate UI primitive system.

## Approved Exceptions

Exceptions must be narrow and documented.

Examples:

- third-party OAuth/provider buttons
- embedded external widgets
- complex charts and visualization layers
- rich editorial or markdown renderers
- printed/exported documents
- email-client constrained rendering

Even exceptions must preserve accessibility, copy quality, and the closest practical Mantine-theme alignment.

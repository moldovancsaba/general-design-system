# Foundation

Status: Normative
Version: 1.0.0
Last updated: 2026-05-21

## Goal

Provide a rigid, followable, cross-project UI system for product applications. The system must make common interfaces predictable, accessible, brandable, and cheap to maintain.

## Core Principles

1. One source of truth: design decisions live here, not inside each product repo.
2. One UI foundation: Mantine is the target product UI platform.
3. One token source per project: the project theme owns tokens.
4. One concept, one pattern: repeated interaction patterns must not fragment by page.
5. Behavior is part of design: loading, validation, empty, error, disabled, and permission states are required.
6. Accessibility is mandatory: keyboard, focus, labels, contrast, and reduced-motion behavior must be covered.
7. Product UI is work-focused: prioritize clarity, density, scanability, and repeated-use ergonomics over decorative presentation.

## Approved UI Platform

Required baseline for product UI:

- `@mantine/core`
- `@mantine/hooks`
- `@mantine/form`
- `@mantine/notifications`
- `@mantine/modals`
- `@tabler/icons-react`

Approved optional packages by product need:

- `@mantine/dates`
- `@mantine/charts`
- `@mantine/spotlight`
- `@mantine/tiptap`

Non-Mantine components are allowed only when they are approved exceptions or thin integrations that still obey this system's UX and token contracts.

## Theme Contract

Every project must expose one shared theme through its app provider. The theme owns:

- color palette and semantic colors
- primary color
- typography and font weights
- spacing scale
- radius scale
- shadows and elevation
- breakpoints
- focus ring behavior
- component defaults
- disabled, loading, error, and success visual defaults

Do not maintain a second token system beside the project theme. Semantic aliases are allowed only when they resolve back to the project theme.

## Token Rules

Allowed:

- Mantine theme values
- CSS variables emitted from the theme
- wrapper-level semantic aliases that resolve to the theme
- narrowly documented brand/provider constants for third-party surfaces

Prohibited:

- raw hex/rgb/hsl values in feature UI code
- repeated hard-coded spacing, radius, shadow, or font-size values
- generic template palettes copied into page code
- component-local token systems that compete with the theme
- new design decisions hidden in CSS modules or inline styles

## Visual Language

### Color

- Primary color is reserved for primary actions and the most important active affordances.
- Destructive color is reserved for destructive actions, destructive confirmations, and critical errors.
- Success color confirms completion or positive status; it must not replace clear text.
- Warning color communicates risk, delay, or required attention.
- Neutral surfaces and borders should carry most layout structure.
- Do not use color alone to communicate state.

### Typography

- Use the project theme typography scale.
- Reserve large display text for true page or marketing heroes.
- App shells, admin tools, dashboards, cards, forms, and tables use compact, scannable headings.
- Labels must be concrete and short.
- Body text must prioritize task completion over promotional tone.

### Spacing

- Use theme spacing tokens.
- Repeated components must have stable internal spacing.
- Dense operational screens may be compact, but never cramped enough to harm scanning or touch interaction.
- Do not use viewport-scaled typography or spacing for normal product UI.

### Radius

- Use theme radius tokens.
- Cards and panels should generally stay at 8px radius or less unless a product-specific theme explicitly defines another scale.
- Do not mix unrelated corner-radius systems in one product.

### Elevation

- Elevation clarifies stacking, overlays, and focus, not decoration.
- Prefer borders and surface contrast for ordinary cards and panels.
- Use stronger shadows for overlays such as modals, popovers, menus, and drawers.

### Motion

- Motion must clarify state changes, not delay task completion.
- Respect reduced-motion preferences.
- Loading animations must not hide absence of progress for long-running tasks.

## Layout Contract

Use system primitives for structure:

- app shell
- page header
- section
- stack
- group
- grid
- split view
- table/list region
- side panel/drawer

Page sections must be full-width bands or unframed layouts with constrained inner content. Do not create pages as stacks of decorative floating cards. Cards are for repeated items, panels, modals, and genuinely framed tools.

## Wrapper Policy

Projects should expose thin internal wrappers where repeated defaults matter:

- `AppButton`
- `AppActionIcon`
- `AppTextInput`
- `AppPasswordInput`
- `AppSelect`
- `AppCombobox`
- `AppTextarea`
- `AppCheckbox`
- `AppRadio`
- `AppSwitch`
- `AppCard`
- `AppModal`
- `AppDrawer`
- `AppTable`
- `AppAlert`
- `AppEmptyState`
- `AppPageHeader`

Wrappers may set defaults, labels, sizes, variants, accessibility expectations, and analytics hooks. Wrappers must not become a second framework or hide Mantine in a way that prevents normal composition.

## Accessibility Baseline

Every product must maintain:

- visible focus state for all interactive elements
- keyboard access for all actions
- semantic labels for fields and icon-only buttons
- AA contrast for normal text and important UI controls
- non-color communication for errors, warnings, success, and active state
- logical heading order
- modal focus trapping and focus return
- clear disabled-state explanation when the reason is not obvious
- no pointer-only workflows

## Responsive Baseline

- Public and learner-facing flows must work on mobile.
- Admin flows must define a small-screen strategy instead of relying on accidental overflow.
- Tables must have an explicit responsive pattern: horizontal scroll, stacked rows, priority columns, or alternate list view.
- Tap targets should be comfortable on touch devices.
- Modals and drawers must fit small screens with usable actions.

## Internationalization Baseline

- Components must tolerate longer translated labels.
- Buttons and compact controls need stable dimensions or wrapping behavior.
- Do not rely on text length in one language to define layout.
- Icon-only actions require localized accessible labels.
- Avoid copy embedded in images.

## Approved Exceptions

Exceptions must be narrow and documented. Examples:

- rich editorial or markdown-rendered content
- provider-brand-compliant OAuth buttons
- embedded third-party widgets
- game canvas or high-custom visualization layers
- printed/exported documents
- email clients with constrained CSS support

Even exceptions must preserve accessibility, copy quality, and the closest practical theme alignment.

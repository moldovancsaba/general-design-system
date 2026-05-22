# Color Modes and Readability

Status: Normative
Version: 1.3.3
Last updated: 2026-05-22

This document defines the required contract for dark mode, light mode, contrast, and human-first readability across all products that adopt this design system.

## Goal

Readable product UI is mandatory. Visual mood, brand expression, screenshots, and decorative polish never outrank whether a human can read, scan, and act without strain.

## Core Rules

1. One active mode per product surface: a page shell must be clearly dark or clearly light.
2. Text must be readable before the surface is considered designed.
3. Theme defaults must make normal Mantine `Text`, `Title`, `Card`, `Paper`, inputs, overlays, tabs, badges, and controls readable without page-level color overrides.
4. Light islands inside dark shells are prohibited unless the surface is an intentional document, print, preview, editor canvas, or external-provider exception.
5. Dark islands inside light shells follow the same exception rule.
6. Color is never accepted because it is on brand if it fails contrast, hierarchy, focus, or legibility.
7. Disabled, muted, secondary, placeholder, and helper text must remain legible enough to understand the state.
8. UX wins over UI: when a visual effect makes content harder to read, remove the effect.

## Contrast Requirements

Minimum contrast targets:

- ordinary text: WCAG AA, at least 4.5:1 against its immediate background
- large text and icons carrying labels: at least 3:1
- interactive controls, outlines, focus indicators, and selected states: at least 3:1
- warning, success, error, and info messages: message text must meet ordinary text contrast, not only the container color
- disabled text: may be visually reduced, but the user must still be able to identify the label and understand that the action is unavailable

These are minimums. Dense learning, admin, financial, legal, medical, or workflow-heavy screens should prefer higher contrast because users read for longer.

## Dark Mode Contract

Dark mode must use a complete dark token stack:

- page background: darkest semantic background
- header/nav background: dark surface distinct from the page background
- card/panel background: dark surface with visible border or tonal separation
- nested panel background: a nearby dark surface, not white or near-white
- primary heading text: near-white
- body text: high-contrast light neutral
- muted text: lighter than decorative borders and clearly readable
- borders: visible enough to define groups, never stronger than content
- inputs: dark field background, visible border, light entered text, readable placeholder
- dropdowns/menus/modals/drawers: dark surfaces with readable text by default
- badges: readable text on both filled and light variants
- progress and status colors: readable labels plus non-color information where needed

Prohibited in dark mode product surfaces:

- black headings or black body copy on dark cards
- near-white cards inside dark workflows unless explicitly documented as an exception
- `bg="white"`, `bg="gray.0"`, `c="black"`, or equivalent hard-coded light-mode props in normal dark-shell UI
- Tailwind or custom CSS color classes that recreate a second color system
- inline `style` color/background values for ordinary product UI
- screenshots accepted as complete when content is visibly low contrast

## Light Mode Contract

Light mode must use a complete light token stack:

- page background: light neutral background
- card/panel background: white or light neutral surface with clear boundary
- primary heading text: dark neutral
- body text: dark neutral
- muted text: medium-dark neutral that remains readable
- borders: visible but not dominant
- inputs and overlays: light surfaces with dark text

Prohibited in light mode product surfaces:

- white or gray text on light cards unless it meets contrast for the exact background
- dark-only component defaults leaking into light cards
- dark-mode badges, tabs, overlays, or menus that appear accidental inside an otherwise light surface

## Mixed-Mode Exceptions

Mixed mode is allowed only for narrow, named exceptions:

- document previews
- print/PDF previews
- rich text editor canvases
- external payment or identity provider widgets
- image/video/media canvases where the media defines its own color context
- generated certificate or share-card artwork

Exception requirements:

- the exception must be visually framed and scoped
- the exception must not inherit unreadable text from the parent mode
- the surrounding workflow controls must remain in the active shell mode
- the local product documentation must name the exception and why it exists

## Mantine Implementation Requirements

Every adopting project must make color-mode readability a root runtime concern.

The Mantine theme must define readable defaults for:

- `Text`
- `Title`
- `Anchor`
- `Button`
- `ActionIcon`
- `Card`
- `Paper`
- `TextInput`
- `PasswordInput`
- `Textarea`
- `Select`
- `MultiSelect`
- `Modal`
- `Drawer`
- `Tabs`
- `Badge`
- `Code`
- `Alert`

Rules:

- theme defaults come before page-level overrides
- repeated readability fixes belong in the theme, not in feature files
- feature code may use semantic Mantine props, but may not hard-code a competing mode
- if a component requires a light exception, it must set both background and foreground through approved semantic tokens

## Review Checklist

Before release, check:

- Can every heading and body line be read without zooming or guessing?
- Are cards, panels, and nested panels in the same active mode?
- Are disabled and unavailable states understandable?
- Do search, select, menu, modal, and drawer surfaces match the active mode?
- Are focus states visible on dark and light backgrounds?
- Are screenshots reviewed for readability, not just layout?
- Did any feature file introduce raw colors, `bg="white"`, `bg="gray.0"`, `c="black"`, or custom CSS color classes in product UI?

Failure of any item is a design-system violation.

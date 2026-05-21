# Mantine Platform Policy

Status: Normative
Version: 1.1.0
Last updated: 2026-05-21

This document defines how Mantine should be used as the strict product UI platform across projects.

## Objective

Make Mantine the only foundational UI system for product applications, while allowing only thin project adapters and domain-specific composition built on top of Mantine.

## What Mantine Owns

Mantine should own the primitive layer for:

- layout
- forms
- overlays
- navigation primitives
- tables
- typography primitives
- feedback surfaces
- color-mode and theme integration
- responsive breakpoint behavior

Preferred primitives include:

- `AppShell`
- `Box`
- `Paper`
- `Stack`
- `Group`
- `Flex`
- `Grid`
- `SimpleGrid`
- `Button`
- `ActionIcon`
- `TextInput`
- `PasswordInput`
- `Textarea`
- `Select`
- `MultiSelect`
- `Checkbox`
- `Radio`
- `Switch`
- `Tabs`
- `Menu`
- `Modal`
- `Drawer`
- `Table`
- `Alert`
- `Badge`
- `Loader`

## What Mantine Does Not Replace

Mantine is not expected to replace:

- charting engines
- PDF generation
- domain-specific business components
- rich visualization logic
- external provider-branded controls required by policy

Those layers must still obey this system’s behavior, spacing, labeling, accessibility, and token rules. They are not alternate UI systems.

## Strict Usage Rules

### 1. Mantine only for product primitives

If the surface is product UI, use Mantine. Do not build a parallel primitive. Do not treat custom HTML/CSS as a peer option.

### 2. Thin wrappers only

Wrappers may:

- set defaults
- standardize variants and sizes
- attach analytics hooks
- enforce accessible labels
- bind to local i18n conventions

Wrappers may not:

- hide Mantine behavior unpredictably
- create a second component framework
- fork interaction meaning by page or product area
- introduce non-Mantine primitives behind wrapper names

### 3. Styling API before custom CSS

Prefer, in order:

1. theme defaults
2. Mantine props
3. Mantine styles/classNames APIs
4. narrow shared utility CSS
5. documented exception CSS

Do not jump straight to large custom CSS islands for ordinary product UI. Custom CSS is support code, not a substitute component system.

### 4. Theme-driven values only

Spacing, colors, radii, shadows, and typography must come from the theme or theme-derived variables.

### 5. Breakpoints through Mantine first

Responsive behavior should primarily use Mantine breakpoints, responsive props, layout primitives, and shell patterns before introducing custom media-query logic.

## Approved Project Layer

Projects may expose local adapters such as:

- `AppButton`
- `AppActionIcon`
- `AppTextInput`
- `AppSelect`
- `AppModal`
- `AppDrawer`
- `AppPageHeader`

These should be:

- compositional
- shallow
- documented
- replaceable without changing UX meaning
- clearly recognizable as Mantine implementation contracts

## Styling Boundaries

Allowed custom CSS:

- reset and document defaults
- print styles
- a few shared utility classes
- third-party integration glue
- exceptional visualization-specific styling

Prohibited custom CSS patterns:

- alternate spacing systems
- alternate color systems
- page-by-page primitive recreation
- deeply nested bespoke form styling
- layout architecture duplicated outside Mantine
- wrapper CSS that effectively replaces Mantine component behavior

## Project Compliance Test

A project is Mantine-platform compliant when:

- Mantine is the only foundational UI library
- the theme is the only active token authority
- repeated product primitives are Mantine or thin Mantine wrappers
- responsive behavior is intentionally defined through the system
- custom CSS is narrow and documented
- exceptions are explicit rather than accidental

## Common Failure Modes

- using Mantine for some pages and ad hoc layout systems for others
- creating wrappers so thick they become a second framework
- hard-coding colors and spacing in feature code
- mixing one-off CSS layout hacks with Mantine shell patterns
- leaving mobile behavior as “whatever happens when desktop shrinks”
- allowing raw non-Mantine product primitives to enter new code

## Required Review Questions

- Could this have been solved with Mantine directly?
- Should this be a theme default instead of a local override?
- Is this wrapper still thin?
- Did a new token or spacing rule get invented in feature code?
- Does this responsive behavior match the canonical system?

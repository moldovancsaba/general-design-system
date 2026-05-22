# Implementation Tables

Status: Normative
Version: 1.3.3
Last updated: 2026-05-22

These tables make the shared system implementable by defining default size, variant, and breakpoint guidance.

## Button Variant Mapping

| Semantic role | Mantine recommendation | Notes |
|---|---|---|
| Primary | `filled` | reserved for the main action in scope |
| Secondary | `light` or `default` | use one project-wide convention and keep it stable |
| Subtle | `subtle` | for utility and lower-emphasis actions |
| Danger | `filled` or `light` with destructive color | do not rely on color alone; copy must remain explicit |

## Preferred Control Sizes

| Primitive | Preferred sizes | Default recommendation |
|---|---|---|
| Button | `sm`, `md`, `lg` | `md` |
| ActionIcon | `sm`, `md`, `lg` | `md` |
| Text inputs | `sm`, `md`, `lg` | `md` |
| Select / MultiSelect | `sm`, `md`, `lg` | `md` |
| Badge | `sm`, `md` | `sm` |
| Modal close/action controls | `md`, `lg` | `md` |

Do not introduce `xs` for ordinary product interactions unless a documented exception exists.

## Radius Guidance

| Surface | Recommended radius |
|---|---|
| Buttons | theme default |
| Inputs | theme default |
| Cards / panels | theme default |
| Modals / drawers | theme default |
| Badge / chips | theme default or smaller project token if documented |

Do not hardcode radius values in feature code.

## Page Width and Section Rhythm

| Surface type | Recommendation |
|---|---|
| Main operational pages | constrained content width with stable horizontal padding |
| Dashboard sections | vertical stack with consistent section spacing |
| Detail pages | identity first, then prioritized sections |
| Forms | grouped sections with stable field/action rhythm |

## Breakpoint Intent Table

Use the project Mantine theme breakpoints, but apply these intent rules consistently:

| Range | Intent |
|---|---|
| Mobile | one-column, action-prioritized, progressive disclosure |
| Tablet | two-column only where scanability improves |
| Desktop | full shell and denser comparative layouts |

Each project must map these intents to exact theme breakpoints in its local adapter.

## Shell Switch Rules

| Concern | Mobile | Tablet/Desktop |
|---|---|---|
| Primary navigation | bottom nav or equally discoverable primary pattern | sidebar or stable top-level nav |
| Secondary nav / preferences | drawer or overflow | sidebar section or top-right utility cluster |
| Header actions | one primary plus overflow | fuller action row where space allows |
| Dashboard analytics | operational priorities first | broader analytics can coexist earlier |

## Drawer and Modal Defaults

| Surface | Mobile | Desktop |
|---|---|---|
| Confirmation modal | near-full width with reachable actions | content-fit width, centered |
| Filter drawer | full-height sheet/drawer | side drawer or persistent filter region if justified |
| Secondary edit drawer | full-height or large sheet | side panel/drawer |

## Table Responsive Strategy Rules

| Data shape | Preferred small-screen strategy |
|---|---|
| few columns, high comparison need | horizontal scroll |
| many columns, object-centric review | alternate list/card view |
| dense admin table | priority columns plus hidden details |
| action-heavy row | card/list variant with one primary action and overflow |

## Mobile Action Density Rules

| Context | Rule |
|---|---|
| list cards | one visible primary action, secondary actions in overflow |
| dense toolbars | avoid adjacent icon-only clusters without spacing review |
| page header | one page-level primary action when practical |
| destructive actions | never visually compete with the main mobile action path |

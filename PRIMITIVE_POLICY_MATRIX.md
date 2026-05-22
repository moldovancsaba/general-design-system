# Primitive Policy Matrix

Status: Normative
Version: 1.3.3
Last updated: 2026-05-22

This matrix defines whether common controls should be used directly from Mantine, wrapped thinly, or treated as exception-only.

## Decision Model

- `Direct`: import from Mantine directly in normal product code.
- `Thin wrapper recommended`: a local wrapper is recommended when repeated defaults or analytics hooks matter.
- `Thin wrapper required`: use a local wrapper to keep behavior consistent across the product.
- `Exception only`: not part of the ordinary primitive layer; use only with documented need.

## Matrix

| Surface | Mantine base | Policy | Why |
|---|---|---|---|
| Button | `Button` | Thin wrapper recommended | repeated variants, loader placement, analytics, and destructive defaults often need standardization |
| Icon button | `ActionIcon` | Thin wrapper recommended | accessible labels and stable sizing benefit from reuse |
| Text input | `TextInput` | Direct or thin wrapper | direct use is fine unless the project needs repeated validation/help/default rules |
| Password input | `PasswordInput` | Direct or thin wrapper | same as text input, with possible policy defaults |
| Select | `Select` | Direct or thin wrapper | wrapper only when option shape, analytics, or common defaults repeat heavily |
| Multi-select | `MultiSelect` | Direct | usually better direct unless a product has a strong shared data-entry pattern |
| Combobox | `Combobox` | Thin wrapper recommended | custom search behavior often repeats and should not drift |
| Textarea | `Textarea` | Direct | direct use is usually sufficient |
| Checkbox | `Checkbox` | Direct | low behavioral complexity |
| Radio | `Radio` | Direct | low behavioral complexity |
| Switch | `Switch` | Direct | low behavioral complexity |
| Alert | `Alert` | Direct or thin wrapper | wrapper only if status titles/copy patterns repeat heavily |
| Badge | `Badge` | Direct | keep simple; avoid over-abstraction |
| Modal | `Modal` | Thin wrapper recommended | destructive and confirmation patterns often need standard action layout |
| Drawer | `Drawer` | Thin wrapper recommended | filter and secondary-edit flows often repeat structurally |
| Menu | `Menu` | Direct | direct use keeps command surfaces compositional |
| Tabs | `Tabs` | Direct | direct unless the product has a single repeated tabs container pattern |
| Table | `Table` | Thin wrapper recommended | density, empty states, and responsive policy often need standardization |
| Pagination | `Pagination` | Direct | low behavioral complexity |
| Page header | Mantine layout primitives | Thin wrapper required | page identity, title rhythm, and action placement should not drift |
| App shell | `AppShell` | Thin wrapper required | shell, navigation, and responsive behavior are product-defining |
| Section card / panel | `Paper` or `Card` | Thin wrapper recommended | framing, header/action alignment, and spacing often repeat |
| Empty state | Mantine layout primitives | Thin wrapper recommended | messaging and action structure should stay consistent |
| Notifications | Mantine notifications | Thin wrapper optional | helper utilities are fine, but runtime stays Mantine-rooted |
| Modals manager | Mantine modals | Thin wrapper optional | helper utilities are fine, but runtime stays Mantine-rooted |

## Default Policy

If a project has no strong reason to wrap a primitive, use Mantine directly.

Wrap only when one or more of the following is true:

- the same defaults repeat across many screens
- the same accessibility attributes repeat
- the same analytics hooks repeat
- the same action framing repeats
- the same domain semantics repeat without changing the underlying control meaning

Do not wrap when the wrapper would:

- hide too many base props
- invent new interaction meaning
- create a second primitive system
- exist only to rename Mantine without adding stable value

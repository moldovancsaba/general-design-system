# Components & Patterns

Status: Active SSOT
Version: 2.0.0
Last updated: 2026-05-22

This document defines the canonical behavior for UI components, workflows, and responsive layouts. Adopting projects may not alter interaction meanings or bypass these required UX patterns.

## 1. Application Shell & Navigation

- **Stable Shell**: Every authenticated product needs a stable shell that makes current location and primary destinations obvious.
- **Primary Navigation**: Must contain top-level destinations (e.g., `Records`, `Settings`), not actions. Maintain visible indicators for the active route.
- **Mobile Navigation**: Must preserve access to primary destinations without forcing users to open a drawer for routine work (prefer bottom nav or visible top tabs). Secondary nav and preferences belong in a drawer or overflow menu.
- **Page Headers**: Must answer: *Where am I? What is this for? What can I do next?* Page-level primary actions belong here. Avoid massive marketing-style headers in operational UI.

## 2. Common Workflows & Patterns

- **Dashboards**: Prioritize next actions, urgent states, and important exceptions over broad analytics. On mobile, operational priorities load first; charts move lower.
- **Forms**: Validate early but don't punish typing (prefer blur/submit validation for complex forms). Group related fields. Submit buttons must show a loading state to prevent double submission.
- **Admin & Editor Flows**: Favor dense, predictable information. Bulk actions must show selected counts and consequences. Drafts should survive recoverable failures.
- **Search, Filters, & Lists**: Place filters near the data they affect. Active filters must be visible and removable. Preserving filters during navigation is a feature, not a bug.
- **Destructive Actions**: Must be visually distinct (e.g., danger color) and require confirmation for irreversible impacts. High-impact deletions must restate the target by name.

## 3. Core Component Contracts

| Component | Policy / Behavior | Preferred Size |
|---|---|---|
| **Buttons** | `primary` (main action), `secondary` (lower-emphasis), `subtle` (utility), `danger` (destructive). Do not place multiple primaries side by side. | `md` |
| **Icon Buttons** | Must have accessible labels. Keep sizes stable in clusters. | `md` |
| **Inputs (Text/Search/Password)** | Visible labels required. Field-level errors must appear nearby. Show/hide required for passwords. Debounce remote search. | `md` |
| **Selects / Combobox** | Use `Select` for small sets, `Combobox` (searchable) for long lists. Use `MultiSelect` only when truly needed. | `md` |
| **Checkboxes/Radios** | Checkbox = independent opt-in. Radio = mutually exclusive. Switch = immediate on/off action. | `md` |

## 4. Feedback & Messaging

- **Alerts**: Scoped, meaningful state messaging. Must explain what the user can do next. Not for permanent page decoration.
- **Loaders & Skeletons**: Use skeletons when the layout shape is known. Use loaders for actions. Long operations need text status, not just a spinner.
- **Notifications**: Transient, cross-surface feedback. Do not use as the *only* place a critical error appears.
- **Badges**: Compact state indication. Color must not be the only signal (use distinct text). Prefer `sm` size.
- **Modals**: Used for confirmation, focused edits, or blocking decisions. Trap focus inside. Do not stack modals. Mobile: near-full width. Desktop: centered, content-fit.
- **Drawers**: Used for filters or secondary panels. Must define clear mobile vs desktop width behavior.

## 5. Responsive Behavior & Touch Ergonomics

- **Small-Screen Priority**: 1. Next action -> 2. Urgent exception -> 3. Recent work -> 4. Analytics.
- **Table Responsive Strategies**: "Desktop table compressed onto mobile" is unacceptable. Must choose: horizontal scroll, list/card view, priority columns, or stacked rows.
- **Mobile Action Density**: List cards should have *one* visible primary action (others in overflow). Avoid adjacent icon-only clusters to prevent accidental taps. Touch targets must remain comfortable.

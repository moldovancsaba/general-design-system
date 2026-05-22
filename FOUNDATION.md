# Foundation

Status: Active SSOT
Version: 2.0.0
Last updated: 2026-05-22

## 1. Core Principles

1. **One Source of Truth**: Design decisions live in this repository, not inside individual product codebases.
2. **One UI Platform**: Mantine is the required, exclusive product UI foundation.
3. **One Token Source**: The product theme is the absolute authority on design tokens.
4. **Behavior is Design**: Loading, empty, error, success, disabled, and validation states must be explicitly designed.
5. **Accessibility as a Release Gate**: Focus, contrast, semantic labels, and touch ergonomics are strictly required.
6. **Readability Outranks Aesthetics**: Color modes, contrast, and typography must serve human reading speed and comprehension above visual polish.
7. **Responsive Intent**: Mobile and small-screen behavior must be designed intentionally, not left to default browser wrapping.

## 2. Mantine Platform & Runtime Contract

Mantine is the only approved foundational UI system for product applications.

### Root Composition & Theme Ownership
Every product must have one canonical root UI composition utilizing `MantineProvider`, `ModalsProvider`, and Mantine's notification system. 
- The project must export **one** theme module that acts as the single token authority.
- The theme must dictate color palettes, typography scales, spacing, radii, breakpoints, and component defaults.
- Do not build parallel provider systems or duplicate theme behavior. 

### Styling API Order
When styling Mantine surfaces, enforce this exact order of preference:
1. **Theme defaults**: Fix it for the whole app if it repeats.
2. **Mantine props**: E.g., `c="dimmed"`, `mt="md"`.
3. **Mantine APIs**: `classNames` or `styles`.
4. **Shared Utility CSS**: Narrow, documented global layout classes.
5. **Exception CSS**: Scoped, documented exceptions.

**Prohibited**: 
- Large custom CSS/Tailwind islands that rebuild core layout or component styling.
- Raw CSS hex/rgb values or hard-coded spacing values (e.g., `16px`) in feature code. 

## 3. Visual Language & Token Policy

- **Typography**: App interfaces must prioritize compact, scannable hierarchy. Labels must be concrete and short. 
- **Spacing & Radius**: Use theme tokens strictly. Internal component spacing must be stable to ensure predictable touch targets and layouts.
- **Elevation**: Rely on border and surface contrast for structure. Overlays may use elevation. Decorative shadow layering is prohibited.
- **Accessibility Baseline**: Maintain visible focus states for all controls, semantic labeling, logical heading order, and AA contrast minimums. Focus traps are required on modals.

## 4. Color Modes & Readability

Readable UI is mandatory. Visual mood never outranks whether a human can read and act without strain.

- **One Active Mode**: A page shell must be clearly dark or light. Mixed-mode islands (light cards on dark shells) are prohibited unless explicitly documented as a preview/editor exception.
- **Contrast Requirements**: 
  - Ordinary text: WCAG AA (at least 4.5:1 against background).
  - Large text / Icons: At least 3:1.
  - Interactive states / Outlines: At least 3:1.
- **Mantine Implementation**: The Mantine theme must define readable color-mode defaults for `Text`, `Title`, `Card`, `Paper`, inputs, and overlays so that developers do not need page-level color overrides.

## 5. Primitive & Wrapper Policy

Projects should prefer using Mantine primitives directly. **Thin wrappers** are required or recommended only to enforce consistency for product-defining surfaces.

- **App Shell & Page Header**: Thin wrapper **required**. Shell, navigation, and title rhythm are product-defining.
- **Buttons & Forms**: Thin wrapper **recommended** if the project requires standardized variants, analytics hooks, or consistent validation layouts.
- **Modals, Drawers, Tables**: Thin wrapper **recommended** to standardize padding, action layouts, and responsive behaviors.
- **Most Other Controls** (Tabs, Badges, Checkboxes, Menus): Use **Directly**. 

*Wrappers must never hide underlying behavior unpredictably, invent new interaction meanings, or form a secondary UI framework.*

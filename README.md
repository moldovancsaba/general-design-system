# General Design System

Status: Active SSOT
Version: 1.3.3
Last updated: 2026-05-22

`/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM` is the cross-project single source of truth for design, UI, and UX.

## How to Use This Design System

This repository serves as the central hub for all UI, UX, and design patterns across projects.

### Getting Started

1. **Familiarize Yourself with the Foundation**: Start by reading the [FOUNDATION.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/FOUNDATION.md) to understand the core principles, accessibility baselines, and token rules.
2. **Review the Component Contracts**: Before building a new UI component, check [COMPONENT_CONTRACTS.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/COMPONENT_CONTRACTS.md) to see if a canonical pattern already exists.
3. **Adopt in Your Project**: Use the [PROJECT_ADOPTION.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/PROJECT_ADOPTION.md) template to adapt the design system into your local project. You must add the Required Local Project Statement to your project's documentation.
4. **Follow the Migration Playbook**: If you are migrating an existing project to this design system, follow the [MIGRATION_PLAYBOOK.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/MIGRATION_PLAYBOOK.md) for a phased refactoring approach.

### What You Can Find Here

- **Core Principles & Tokens**: (`FOUNDATION.md`, `COLOR_MODES_READABILITY.md`) - The fundamental rules that guide UI decisions, color modes, contrast, and readable surfaces.
- **Mantine Rules**: (`MANTINE_PLATFORM.md`, `MANTINE_RUNTIME.md`) - Strict guidelines on how to use Mantine, which is our only approved foundational UI system.
- **Component Contracts & Patterns**: (`COMPONENT_CONTRACTS.md`, `UX_PATTERNS.md`) - Required behaviors for standard UI elements (buttons, inputs, modals, forms, dashboards, etc.).
- **Responsive Guidelines**: (`NAVIGATION_RESPONSIVE.md`, `IMPLEMENTATION_TABLES.md`) - Rules for canonical shell, navigation, mobile breakpoints, and responsive implementations.
- **Operational Files**: (`CONTRIBUTING.md`, `CHANGELOG.md`) - Shared rules for contributing to the design system and its versioned history.
- **Templates**: (`TEMPLATES/`) - Starter templates for your project's theme, providers, shell, and thin wrappers.

### Where to Find Things

- `/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/` (This directory): The root containing all the SSOT markdown files.
- `/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/TEMPLATES/`: Starter files to copy into your project.
- `/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/PROJECTS/`: Product-specific migration plans and adoption strategies.

---

Product repositories may document:

- local theme/provider paths
- wrapper component paths
- migration state
- validation commands
- narrow approved exceptions

Product repositories may not redefine:

- component behavior
- interaction patterns
- token policy
- responsive strategy
- accessibility baseline
- UX meaning of canonical controls

If a project-local UI document conflicts with this directory, this directory wins.

## Target Operating Model

- Mantine is the only approved foundational UI system for product applications.
- Each project owns exactly one Mantine theme and one Mantine provider setup.
- Project wrappers are allowed only as thin Mantine wrappers.
- Repeated product behavior is standardized here first, then implemented locally.
- Cross-project drift is treated as migration debt, not as a new standard.
- No parallel primitive library, token system, or styling framework is allowed for product UI.

## Reading Order

1. [FOUNDATION.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/FOUNDATION.md)
   Principles, token rules, theme contract, accessibility baseline, and implementation boundaries.
2. [MANTINE_PLATFORM.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/MANTINE_PLATFORM.md)
   Strict Mantine-only platform rules, wrapper policy, styling boundaries, and approved exceptions.
3. [MANTINE_RUNTIME.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/MANTINE_RUNTIME.md)
   Root provider contract, theme/runtime ownership, wrapper boundaries, and Mantine-only implementation rules.
4. [COLOR_MODES_READABILITY.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/COLOR_MODES_READABILITY.md)
   Required dark/light mode ownership, contrast, readability, mixed-mode exceptions, and Mantine implementation rules.
5. [COMPONENT_CONTRACTS.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/COMPONENT_CONTRACTS.md)
   Required behavior for buttons, inputs, cards, lists, tables, modals, drawers, alerts, and navigation.
6. [NAVIGATION_RESPONSIVE.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/NAVIGATION_RESPONSIVE.md)
   Canonical shell, navigation, mobile, dashboard, and small-screen rules.
7. [UX_PATTERNS.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/UX_PATTERNS.md)
   Form flows, admin flows, dashboards, assessment/survey flows, destructive behavior, and state messaging.
8. [PRIMITIVE_POLICY_MATRIX.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/PRIMITIVE_POLICY_MATRIX.md)
   Direct-vs-wrapper policy for common Mantine primitives and project-owned abstractions.
9. [IMPLEMENTATION_TABLES.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/IMPLEMENTATION_TABLES.md)
   Canonical variants, sizes, breakpoints, shell switches, and responsive implementation tables.
10. [ENFORCEMENT.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/ENFORCEMENT.md)
   Lint, import-boundary, style-drift, and review-enforcement guidance.
11. [GOVERNANCE.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/GOVERNANCE.md)
   Adoption, review, exceptions, migration order, versioning, and definition of done.
12. [PROJECT_ADOPTION.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/PROJECT_ADOPTION.md)
   Required per-project adapter contract and documentation template.
13. [IMPLEMENTATION_READINESS.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/IMPLEMENTATION_READINESS.md)
   Pre-implementation decision checklist to prevent drift, bridge layers, and ambiguous Mantine migrations.

## Supporting Operational Files

- [MIGRATION_PLAYBOOK.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/MIGRATION_PLAYBOOK.md)
  Standard phase model for true-refactor Mantine migrations.
- [IMPLEMENTATION_READINESS.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/IMPLEMENTATION_READINESS.md)
  Mandatory decisions and readiness checklist before the first implementation PR.
- [TEMPLATES/README.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/TEMPLATES/README.md)
  Starter templates for theme, providers, shell, page header, and thin wrappers.
- [CONTRIBUTING.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/CONTRIBUTING.md)
  Shared-repository working rules and suggested commit scopes.
- [CHANGELOG.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/CHANGELOG.md)
  Versioned policy history for this SSOT.
- [PROJECTS/](</Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/PROJECTS>)
  Product-specific migration and adoption plans that consume this SSOT.

## Repository Rules

This directory is intended to be managed as its own git repository.

Required repository behavior:

- every normative change is committed here, not only in consuming product repos
- projects should reference the SSOT path and aligned version/date in local docs
- breaking behavior changes should be treated as major contract changes
- additive patterns should be documented here before they spread to multiple products

## Non-Negotiable Rules

- One interaction concept gets one canonical pattern.
- One product gets one active theme and token source.
- New product UI must use Mantine primitives or thin approved wrappers around them.
- No new product UI may bypass Mantine with raw custom primitives, ad hoc HTML/CSS controls, or alternate component frameworks.
- Raw colors and repeated hard-coded spacing in feature code are prohibited.
- Dark/light mode readability is mandatory; mixed-mode surfaces require documented exceptions.
- Loading, empty, error, success, disabled, and permission states are part of every component contract.
- Mobile and responsive behavior must be designed intentionally, not inherited accidentally from desktop.
- Accessibility is part of design acceptance, not a cleanup pass.
- Internationalization resilience is mandatory for shared patterns.

## Required Local Project Statement

Every adopting project must contain language equivalent to:

`/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM` is the single source of truth for design, UI, and UX. Project-local design documents are implementation adapters only.

Use [PROJECT_ADOPTION.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/PROJECT_ADOPTION.md) as the required project-local template.

# General Design System

Status: Active SSOT
Version: 1.3.0
Last updated: 2026-05-21

`/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM` is the cross-project single source of truth for design, UI, and UX.

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
4. [COMPONENT_CONTRACTS.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/COMPONENT_CONTRACTS.md)
   Required behavior for buttons, inputs, cards, lists, tables, modals, drawers, alerts, and navigation.
5. [NAVIGATION_RESPONSIVE.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/NAVIGATION_RESPONSIVE.md)
   Canonical shell, navigation, mobile, dashboard, and small-screen rules.
6. [UX_PATTERNS.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/UX_PATTERNS.md)
   Form flows, admin flows, dashboards, assessment/survey flows, destructive behavior, and state messaging.
7. [PRIMITIVE_POLICY_MATRIX.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/PRIMITIVE_POLICY_MATRIX.md)
   Direct-vs-wrapper policy for common Mantine primitives and project-owned abstractions.
8. [IMPLEMENTATION_TABLES.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/IMPLEMENTATION_TABLES.md)
   Canonical variants, sizes, breakpoints, shell switches, and responsive implementation tables.
9. [ENFORCEMENT.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/ENFORCEMENT.md)
   Lint, import-boundary, style-drift, and review-enforcement guidance.
10. [GOVERNANCE.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/GOVERNANCE.md)
   Adoption, review, exceptions, migration order, versioning, and definition of done.
11. [PROJECT_ADOPTION.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/PROJECT_ADOPTION.md)
   Required per-project adapter contract and documentation template.
12. [IMPLEMENTATION_READINESS.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/IMPLEMENTATION_READINESS.md)
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
- Loading, empty, error, success, disabled, and permission states are part of every component contract.
- Mobile and responsive behavior must be designed intentionally, not inherited accidentally from desktop.
- Accessibility is part of design acceptance, not a cleanup pass.
- Internationalization resilience is mandatory for shared patterns.

## Required Local Project Statement

Every adopting project must contain language equivalent to:

`/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM` is the single source of truth for design, UI, and UX. Project-local design documents are implementation adapters only.

Use [PROJECT_ADOPTION.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/PROJECT_ADOPTION.md) as the required project-local template.

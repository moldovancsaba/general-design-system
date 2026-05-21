# General Design System

Status: Active SSOT
Version: 1.0.0
Last updated: 2026-05-21

This directory is the cross-project single source of truth for design, UI, and UX. Product repositories must reference this folder when documenting visual language, component behavior, interaction patterns, accessibility, and design-system governance.

This directory must be maintained as its own git repository because multiple projects may read from it and write to it.

## Authority

If a project-local UI document conflicts with this directory, this directory wins. Project-local files may document implementation details, migration state, or approved exceptions, but they must not redefine design decisions, component contracts, or UX rules.

## Target Platform

The target implementation platform is Mantine:

- Mantine provides the default product UI foundation.
- A project theme is the only approved token source.
- Project wrappers may enforce defaults, but they must stay thin.
- Parallel design systems, ad hoc CSS palettes, and page-specific component behavior are migration debt.

Projects that have not migrated yet must explicitly describe their current adapter and migration state, then move toward this contract.

## Reading Order

1. [FOUNDATION.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/FOUNDATION.md)
   Principles, theme contract, tokens, accessibility, responsive rules, and implementation boundaries.
2. [COMPONENT_CONTRACTS.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/COMPONENT_CONTRACTS.md)
   Required behavior for buttons, inputs, cards, modals, tables, navigation, feedback, and state surfaces.
3. [UX_PATTERNS.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/UX_PATTERNS.md)
   Form flows, learner flows, dashboards, admin tools, destructive actions, empty states, and content tone.
4. [GOVERNANCE.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/GOVERNANCE.md)
   Adoption, exceptions, review rules, migration order, versioning, and definition of done.
5. [PROJECT_ADOPTION.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/PROJECT_ADOPTION.md)
   Required per-project documentation contract and adoption checklist.
6. [MIGRATION_PLAYBOOK.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/MIGRATION_PLAYBOOK.md)
   True-refactor migration plan for moving legacy applications to pure Mantine.
7. [CONTRIBUTING.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/CONTRIBUTING.md)
   Shared repository change rules and commit guidance.
8. [PROJECTS/SSO_MANTINE_REFACTOR.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/PROJECTS/SSO_MANTINE_REFACTOR.md)
   Concrete rollout plan for `/Users/moldovancsaba/Projects/sso`.

## Non-Negotiable Rules

- One interaction concept gets one canonical pattern.
- New product UI must use the approved project adapter for this system.
- Raw colors, repeated hard-coded spacing, and local shadow/radius systems are prohibited in feature code.
- Loading, empty, success, error, disabled, and permission states are part of every component contract.
- Accessibility is a design requirement, not a post-build cleanup task.
- Internationalization and responsive behavior must be designed with the component, not patched later.

## Project Documentation Requirement

Every adopting project must include a local design-system note that states:

- this directory is the design/UI/UX SSOT
- the project's current implementation adapter
- known exceptions and migration debt
- the validation commands used to enforce drift rules

Use [PROJECT_ADOPTION.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/PROJECT_ADOPTION.md) as the required template.

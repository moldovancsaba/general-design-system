# Messmass Mantine Refactor

Status: Planned
Version: 1.0.0
Last updated: 2026-05-23
Project: `/Users/moldovancsaba/Projects/messmass`

## Objective

Refactor Messmass into a strict Mantine-only product UI that follows the shared SSOT without preserving the existing local custom admin/reporting design system as a competing authority.

This is not a light visual refresh. The target is a real foundation replacement where Mantine becomes the only approved product UI primitive system, theme authority, and pattern runtime for admin, reporting, analytics, and editor workflows.

## Current Risk

Messmass currently has the highest authority conflict among the active product repositories.

Observed problems:

- Mantine is mandatory in the shared SSOT, but Messmass does not currently show Mantine as the active package-level UI foundation.
- Messmass has a substantial local custom system for admin, reporting, analytics, and editor surfaces.
- local documentation still contains stale hybrid-authority language that treats the local wrapper/token system as authoritative until a future Mantine migration is complete.

Known conflicting local file:

- `/Users/moldovancsaba/Projects/messmass/docs/coding-standards.md`

That conflict must be treated as a product-governance bug, not a documentation nuance.

## Non-Goals

- preserving the current local token/wrapper system as a long-lived product authority
- introducing Mantine only in isolated new pages while old shared surfaces continue to define the grammar
- replacing report/chart engines only because the UI foundation changes
- treating analytics/reporting builder improvements as permission to delay the Mantine runtime decision

## Target End State

- one root Mantine provider for product UI
- one Messmass Mantine theme as the only active token authority
- Mantine notifications and modals wired centrally
- shared admin, analytics, reporting, and editor surfaces built from Mantine primitives or thin Mantine wrappers
- current local CSS and page-local layout inventions either deleted or reduced to narrow exceptions
- project-local docs reduced to adapter, migration, validation, and exception notes only

## Pattern Service Priorities

Messmass has unusually high leverage in these contracts:

1. **AdminShell**: authenticated admin shell, navigation, account controls, and responsive workspace navigation
2. **PageHeader**: title, purpose, primary action, secondary actions, and breadcrumbs where required
3. **MetricCard**: repeated analytics/reporting KPIs
4. **DataToolbar**: search, filters, sort, period selectors, reset, create
5. **ResponsiveDataView**: admin tables, evidence panels, queues, and mobile fallbacks
6. **StateBlock**: loading, empty, error, permission, disabled, success
7. **EditorFormPrimitives**: report variant forms, partner/org editors, builder selection and settings flows

Acceptance requirements:

- no page-local shell reinvention after Mantine root runtime lands
- analytics and reporting surfaces use shared Mantine-backed cards, headers, state blocks, and toolbars
- one-primary-action mobile behavior is preserved in list/card workflows
- chart engines may remain where justified, but chart surroundings must be Mantine-governed

## Recommended Sequence

### Phase 0: Governance And Authority Fix

Tasks:

- update Messmass-local docs to remove stale hybrid-authority language
- freeze new UI work that bypasses Mantine once the migration begins
- define exact root provider/theme paths before surface migration starts

Exit criteria:

- local docs no longer conflict with the shared SSOT
- Mantine-only authority is explicit

### Phase 1: Root Mantine Runtime

Tasks:

- install the required Mantine package baseline
- define one Messmass theme module
- add root provider composition
- wire notifications and modals centrally

Exit criteria:

- all product UI renders under Mantine root runtime
- theme ownership is explicit and singular

### Phase 2: Shared Admin And Workspace Surfaces

Primary surfaces:

- admin shell
- workspace navigation
- page header
- shared state blocks

Reason:

- these surfaces currently spread visual and interaction decisions across the product

Exit criteria:

- shared admin/workspace primitives exist and are reused

### Phase 3: Reporting And Analytics Shared Primitives

Primary surfaces:

- reporting workspaces
- analytics home
- sponsorship/activation analytics
- shared toolbars, KPI cards, and evidence panels

Exit criteria:

- repeated analytics/reporting composition is contract-driven, not page-local

### Phase 4: Editor And Variant Workflows

Primary surfaces:

- organization reports
- partner reports
- report builder selection and settings
- organization/partner editors

Exit criteria:

- forms, filters, dialogs, and settings panels use Mantine primitives consistently

### Phase 5: Legacy CSS And Wrapper Deletion

Tasks:

- delete or narrow old custom CSS that still acts as product authority
- remove obsolete local wrapper assumptions from docs and code

Exit criteria:

- remaining non-Mantine UI exceptions are narrow and documented

## Required Local Adapter

Messmass must document:

- theme path
- provider path
- wrapper policy
- exact local paths for AdminShell, PageHeader, MetricCard, DataToolbar, ResponsiveDataView, StateBlock, and EditorFormPrimitives
- validation commands
- approved exceptions
- migration backlog

## Required Validation

At minimum:

- lint/static checks against non-Mantine product primitives
- checks against raw product design values in feature code
- visual/readability review for high-traffic admin/reporting surfaces
- contract inventory for the required local pattern families

## Strategic Note

Messmass has a large amount of already-built workflow logic. That is valuable. The migration should preserve the workflow intelligence while replacing the UI foundation beneath it. The main risk is not missing features. The main risk is allowing the current local system to keep functioning as an undeclared competing design system.

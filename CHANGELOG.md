# Changelog

All notable policy changes to the General Design System are recorded here.

## 1.3.2 - 2026-05-21

- Updated the Amanoba migration plan from planned to in-progress.
- Recorded completed Amanoba Phase 0/1 runtime work, active Mantine guardrails, and the current course-surface migration snapshot.
- Added remaining Amanoba high-priority gaps for lesson runtime, quiz runtime, final exam, auth, dashboard, saved lessons, practice hub, admin/editor forms, and deletion-phase legacy dependencies.

## 1.3.1 - 2026-05-21

- Updated the SSO migration plan to mark admin-shell migration and legacy theme-stack removal as completed.
- Clarified the SSO path toward the remaining docs/editorial migration and final deletion pass.

## 1.3.0 - 2026-05-21

- Added a primitive policy matrix for direct-versus-wrapper decisions.
- Added implementation tables for variants, sizes, breakpoints, shell switches, and responsive behavior.
- Added enforcement guidance for lint rules, import boundaries, and drift checks.
- Added reusable starter templates for providers, theme, shell, page header, and button wrappers.
- Updated runtime, readiness, and README guidance to point directly to the new implementation assets.

## 1.2.3 - 2026-05-21

- Promoted implementation-readiness checks into the required reading order.

## 1.2.2 - 2026-05-21

- Added root provider/theme implementation notes to the required project-adoption contract.

## 1.2.1 - 2026-05-21

- Added component contracts for date/time inputs, file uploads, loaders/skeletons, tooltips, breadcrumbs, and pagination.
- Expanded migration deliverables with provider/theme implementation notes plus validation and deletion checklist expectations.

## 1.2.0 - 2026-05-21

- Tightened the SSOT from “Mantine preferred/first” language to an explicit Mantine-only product primitive policy.
- Clarified that no new product UI may bypass Mantine with ad hoc primitives or alternate component frameworks.
- Updated migration, governance, adoption, and KIDEX adapter language to reflect the stricter policy.
- Added `MANTINE_RUNTIME.md` to define provider, theme, notifications, modals, wrapper, CSS, form, overlay, and data-display runtime requirements.

## 1.1.0 - 2026-05-21

- Expanded the SSOT into a stricter multi-project policy repository.
- Added Mantine platform policy and navigation/responsive rules to the required reading order.
- Tightened component, foundation, UX, governance, and project-adoption contracts for cross-project enforcement.
- Clarified that product repositories may document only adapters, exceptions, migration state, and validation commands.
- Added repository hygiene rules for shared Git usage across consuming projects.
- Added implementation-readiness requirements so projects document root provider, theme ownership, primitive policy, legacy boundaries, responsive strategy, and drift controls before the first Mantine PR.
- Expanded the SSO project plan with local-adapter requirements, phase exit criteria, validation commands, and initial implementation sequence.

## 1.0.0 - 2026-05-21

- Established `/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM` as the cross-project design, UI, and UX SSOT.
- Added normative foundation rules for theme ownership, tokens, layout, accessibility, responsiveness, and internationalization.
- Added strict component contracts for buttons, icon buttons, inputs, forms, cards, modals, drawers, tables, navigation, alerts, notifications, empty states, loaders, errors, and pagination.
- Added UX rules for app shells, dashboards, learner flows, admin/editor flows, destructive actions, authentication, search, filters, responsive behavior, and content tone.
- Added governance rules for adoption, project adapters, exceptions, review, migration order, and definition of done.
- Added the project adoption contract that each project must reference in its local documentation.
- Added a true-refactor Mantine migration playbook for legacy projects.
- Added project-specific migration planning under `PROJECTS/`, including the initial SSO refactor plan.
- Added contributing guidance for operating this directory as a shared standalone git repository.

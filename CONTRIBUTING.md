# Contributing

Status: Active
Version: 2.0.0
Last updated: 2026-05-22

This repository is shared design-system infrastructure.

## Allowed Change Types

- Shared foundation rules (`FOUNDATION.md`)
- Component and UX contracts (`COMPONENTS_AND_PATTERNS.md`)
- Governance, migration, or enforcement processes (`GOVERNANCE_AND_ADOPTION.md`)
- Project-specific migration plans under `PROJECTS/`

## Rules

1. Keep normative files cross-project. Do not document project-local hacks here.
2. Put rollout details for a specific product under `PROJECTS/`.
3. If a rule is not ready for cross-project use, keep it in the project until it is.
4. Prefer durable, reviewable language over brainstorming notes.
5. Do not weaken the Mantine-only platform rule without an explicit major-version policy change.

## Recommended Commit Scopes

- `foundation` (Changes to tokens, accessibility, Mantine baseline)
- `components` (Changes to component behaviors, responsive layouts)
- `governance` (Changes to adoption rules, review processes)
- `project-plan` (Changes under the `PROJECTS/` directory)

Examples:

- `foundation: tighten mantine-only token policy`
- `components: clarify destructive modal behavior`
- `governance: update PR checklist requirements`
- `project-plan: add sso mantine refactor plan`

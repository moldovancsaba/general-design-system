# Contributing

Status: Active
Version: 1.0.0
Last updated: 2026-05-21

This repository is shared design-system infrastructure.

## Allowed Change Types

- shared foundation rules
- component contracts
- UX patterns
- governance/process rules
- migration playbook changes
- project-specific migration plans under `PROJECTS/`

## Rules

1. Keep normative files cross-project.
2. Put rollout details for a specific product under `PROJECTS/`.
3. Do not add project-local hacks to shared contracts.
4. If a rule is not ready for cross-project use, keep it in the project until it is.
5. Prefer durable, reviewable language over brainstorming notes.
6. Do not weaken the Mantine-only platform rule without an explicit major-version policy change.

## Recommended Commit Scopes

- `foundation`
- `contracts`
- `ux`
- `governance`
- `migration`
- `project-plan`

Examples:

- `foundation: tighten mantine-only token policy`
- `contracts: clarify destructive modal behavior`
- `migration: add pure-mantine playbook`
- `project-plan: add sso mantine refactor plan`

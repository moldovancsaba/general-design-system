# Enforcement

Status: Normative
Version: 1.3.0
Last updated: 2026-05-21

This document defines how projects should enforce the Mantine-only policy and prevent design-system drift.

## Minimum Enforcement Layers

Every adopting project should implement as many of the following as practical:

1. import-boundary lint rules
2. forbidden-value lint rules
3. grep/static checks for legacy primitives
4. PR checklist usage
5. adapter and migration-plan review

## Import Boundary Rules

Projects should forbid:

- imports from legacy primitive directories
- imports from alternate component frameworks for ordinary product UI
- imports that reintroduce old theme/token authorities

Example enforcement targets:

- old `components/ui` primitive directories
- old toast/dialog/sheet systems
- old theme providers

## Forbidden Value Rules

Projects should block or flag:

- hard-coded raw colors in feature UI
- hard-coded radius values
- unapproved size tokens
- ad hoc inline style values that bypass theme decisions repeatedly

## CSS Drift Rules

Projects should flag or review carefully:

- new large CSS modules for ordinary product UI
- new utility systems that compete with Mantine
- new token declarations outside the Mantine theme
- wrapper CSS that recreates primitive behavior outside Mantine

## Review Questions

- Is this surface using Mantine primitives or thin wrappers only?
- Did this change add an alternate primitive source?
- Could the theme solve this instead of a local override?
- Did responsive behavior follow the shared contract?
- Did any hard-coded design value enter feature code?

## Suggested Checks

At minimum, each project should document checks for:

- lint
- tests
- build
- typecheck
- restricted imports
- legacy-pattern grep or equivalent static scan

## Suggested Prohibited Pattern List

Each project should maintain a local list of prohibited patterns during migration, for example:

- no new imports from legacy primitive folders
- no new raw color literals in feature UI
- no new product overlays outside Mantine modal/drawer infrastructure
- no new page-level primitive CSS systems

## Shared Expectation

Enforcement does not need to be identical across all repos, but every repo must enforce the same underlying policy: Mantine is the only product primitive system.

# Governance

Status: Normative
Version: 1.0.0
Last updated: 2026-05-21

## Adoption Rule

New projects must start from this system immediately.

Existing projects must:

- point local docs to this directory as the design/UI/UX SSOT
- stop adding new parallel UI patterns
- document current adapter and migration debt
- migrate high-traffic and high-change screens first
- delete legacy styling systems once replaced

## Shared Repository Rule

This directory must be managed as a standalone git repository.

Implications:

- shared UI policy changes should be reviewable independently from any one product repository
- project-specific migration notes may live under `PROJECTS/`
- projects reference this repository as SSOT, but do not own its history

## Project Adapter Rule

Each product may have a local adapter for implementation details. The adapter may define:

- theme file location
- provider setup
- wrapper component paths
- validation commands
- known exceptions
- migration backlog

The adapter may not redefine component behavior, accessibility rules, UX patterns, or token policy.

## Review Rule

Any UI-affecting change must be reviewed against:

- this SSOT
- project adapter compliance
- component contract compliance
- accessibility impact
- responsive behavior
- state coverage: loading, empty, error, success, disabled, permission
- cross-project reuse value

## Exception Rule

Exceptions require a written note in the adopting project.

The note must include:

- reason
- scope
- owning file or component
- user impact
- migration or removal condition

Exceptions must stay narrow. Do not promote a one-off exception into a reusable primitive unless it proves broadly useful and is added here first.

## Versioning

Treat this directory as versioned policy.

Change types:

- patch: wording fixes, clarifications, examples
- minor: additive contracts or new approved patterns
- major: breaking contract changes, removed patterns, changed default behavior

Projects should record the SSOT version or date they align to when doing major UI migrations.

## Required Project Checklist

Every adopting project must have:

- local docs pointing here as design/UI/UX SSOT
- one shared theme/provider path
- approved component wrappers or direct primitive policy
- configured notifications and modals
- documented responsive strategy for major surfaces
- documented accessibility baseline
- validation commands for UI drift
- known exceptions and migration backlog

## PR Checklist

- Does this introduce a new UI pattern that already exists?
- Does this use the approved project adapter?
- Could theme defaults solve this instead of local overrides?
- Are loading, empty, success, error, disabled, and permission states covered?
- Does the component work with keyboard and screen reader labels?
- Does mobile behavior remain usable?
- Is destructive behavior explicit enough?
- Are text labels localizable and resilient to longer strings?
- Did any hard-coded design value enter feature code?

## Migration Order

Recommended order for legacy projects:

1. local docs point to this SSOT
2. provider and theme
3. buttons, action icons, inputs, alerts, modals
4. forms and auth flows
5. cards, tables, filters, navigation
6. learner-critical or revenue-critical flows
7. admin/editor high-change screens
8. docs and secondary surfaces
9. deletion of old CSS/token systems

## Definition of Done

A project can claim compliance when:

- this directory is documented as the design/UI/UX SSOT
- Mantine is the primary and enforced UI foundation
- tokens come from the shared project theme
- repeated primitives are wrapped or consistently standardized
- legacy styling systems are no longer treated as source of truth
- accessibility and responsive behavior are validated in normal review
- project-local exceptions are explicit and time-bound

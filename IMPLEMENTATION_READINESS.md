# Implementation Readiness

Status: Normative
Version: 1.3.0
Last updated: 2026-05-21

Use this document before starting a new product UI implementation or a Mantine migration.

## Goal

Remove the ambiguity that usually causes drift, bridge layers, or refactor churn after implementation starts.

## Mandatory Decisions Before First Implementation PR

Every project must document:

1. Theme ownership

- exact theme file path
- exact root provider path
- whether the project defaults to direct Mantine primitives or thin wrappers

2. Notifications and modals

- notification setup path
- modal setup path
- whether destructive confirmations use a shared helper

3. Primitive policy

- which common controls require wrappers, if any
- which controls are allowed directly from Mantine

4. Legacy boundary

- which files are legacy
- what new work is prohibited there
- which exceptions remain temporarily allowed

5. Responsive strategy

- table behavior on small screens
- shell/navigation behavior on small screens
- modal/drawer behavior on small screens

6. Validation and drift control

- lint commands
- test commands
- any static checks that prevent new styling drift

7. Specialized feature decisions

- provider-brand button strategy
- docs/editorial surface strategy
- old theme-editor rewrite or removal decision if applicable

8. Reference implementation choices

- which shared templates or starter recipes will be adopted directly
- which templates are intentionally not used and why

## Required Local Outputs

Before implementation begins, the project must have:

- a local adapter document based on `PROJECT_ADOPTION.md`
- a project migration plan under `PROJECTS/`
- phase 1 acceptance criteria
- a list of prohibited new patterns during migration
- a chosen template/recipe starting point from `TEMPLATES/`

## First PR Shape

The first implementation PR should usually include:

- Mantine dependencies
- root provider wiring
- initial theme file
- notifications/modals setup
- one migrated high-value surface or one shared primitive conversion
- repo guidance that freezes the old system

It should not:

- attempt full-app migration in one pass
- keep the old token system and the new theme both acting as active truth
- introduce unclear wrapper abstractions

## Ready-To-Start Condition

Implementation is considered ready to start only when:

- the local adapter is written
- the migration plan exists
- phase 1 scope is chosen
- prohibited legacy patterns are documented
- the style-editor decision is acknowledged if such a feature exists

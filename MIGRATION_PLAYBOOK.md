# Migration Playbook

Status: Normative
Version: 1.0.0
Last updated: 2026-05-21

## Goal

Migrate legacy applications to a pure Mantine system by true refactor, not by bridges, connectors, mirrored token layers, or indefinite dual-system operation.

## Pure Mantine Definition

A project counts as pure Mantine only when:

- one `MantineProvider` governs the app
- one Mantine theme is the only active token source
- product UI is built from Mantine primitives or thin approved wrappers
- old token systems are deleted, not mirrored
- legacy page-level product UI CSS is deleted except for approved narrow exceptions
- notifications, modals, forms, layout primitives, and feedback states are standardized through Mantine

## Forbidden Target States

- keeping two active token systems in production
- mirroring a legacy theme provider into Mantine as a permanent solution
- preserving old semantic variables as a parallel source of truth
- adding a large custom wrapper framework that behaves like a second UI library
- allowing new screens to choose freely between old CSS and Mantine

## Standard Phases

### Phase 0: Freeze

- mark local design docs as adapter or migration-only
- ban new product UI in the old system
- inventory exceptions and legacy files

### Phase 1: Root Platform

- install Mantine packages
- add `MantineProvider`
- configure notifications and modals centrally
- create one shared theme file
- define component defaults at theme level first

Exit criteria:

- the app root is Mantine-driven
- no new work depends on legacy theme infrastructure

### Phase 2: Core Primitives

- buttons
- action icons
- text inputs
- password inputs
- alerts
- modals and drawers
- cards and paper surfaces

Exit criteria:

- all new forms and actions use canonical Mantine primitives

### Phase 3: Auth And High-Traffic Flows

- login
- registration
- password reset
- verification
- consent
- re-auth and step-up flows

Exit criteria:

- highest-traffic user journeys no longer depend on the old UI system

### Phase 4: Admin And CRUD Surfaces

- dashboards
- tables
- filters
- edit forms
- destructive action flows
- detail pages

Exit criteria:

- high-change operational screens are Mantine-only

### Phase 5: Secondary Surfaces

- docs pages
- settings
- editors
- low-traffic pages

Exit criteria:

- only approved exceptions remain

### Phase 6: Deletion

- delete legacy theme providers
- delete dead CSS modules
- delete old token systems
- delete tooling that edits obsolete design models

Exit criteria:

- there is no parallel design system left alive

## Review Questions

- Does this change reduce or expand the legacy surface?
- What old files can be deleted now?
- Is the new behavior theme-driven or local-override-heavy?
- Did this introduce any new parallel pattern?

## Required Deliverables Per Project

- a project adoption note based on `PROJECT_ADOPTION.md`
- a project-specific migration plan under `PROJECTS/`
- a deletion checklist
- a validation checklist

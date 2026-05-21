# Project Adoption Contract

Status: Normative
Version: 1.0.0
Last updated: 2026-05-21

Every project that uses this design system must include a local document or section with the following contract.

## Required Statement

Use this exact meaning in project docs:

`/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM` is the single source of truth for design, UI, and UX. Project-local files describe only implementation adapter details, migration state, validation commands, and approved exceptions.

## Required Fields

Each project must document:

- SSOT path: `/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM`
- adopted SSOT version or date
- current UI foundation
- target UI foundation
- theme/provider file paths
- wrapper component paths
- validation commands
- known exceptions
- migration backlog
- owner or review path for design-system changes

## Adapter Template

```md
# Design System Adapter

Design/UI/UX SSOT: `/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM`
Aligned SSOT version/date: `<version or date>`
Status: `<compliant | migrating | legacy>`

## Local Adapter

- Theme/provider:
- Wrapper components:
- Notifications/modals setup:
- Styling bridge or legacy layer:
- UI validation commands:

## Current Exceptions

| Scope | Reason | User impact | Removal condition |
|-------|--------|-------------|-------------------|
|       |        |             |                   |

## Migration Backlog

1. 
2. 
3. 
```

## Documentation Placement

Recommended project-local locations:

- primary developer guide
- architecture overview
- coding standards
- design-system status document
- handover or current operational snapshot

## Compliance Rule

A project is not compliant if it describes its own design system as the authority while this shared folder exists. Local implementation files are adapters only.

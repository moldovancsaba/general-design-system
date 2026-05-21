# Project Adoption Contract

Status: Normative
Version: 1.1.0
Last updated: 2026-05-21

Every project that uses this design system must include a local adapter document or section with the following contract.

## Required Statement

Use this exact meaning in project docs:

`/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM` is the single source of truth for design, UI, and UX. Project-local files describe only implementation adapter details, migration state, validation commands, and approved exceptions.

## Required Local Fields

Each project must document:

- SSOT path: `/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM`
- adopted SSOT version or date
- local status: `compliant`, `migrating`, or `legacy`
- current UI foundation
- target UI foundation
- Mantine-only primitive policy status
- theme/provider file paths
- root provider/theme implementation note or pointer
- wrapper component paths or direct primitive policy
- notifications/modals setup path
- validation commands
- known exceptions
- migration backlog
- owner or review path for design-system changes

## Required Adapter Template

```md
# Design System Adapter

Design/UI/UX SSOT: `/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM`
Aligned SSOT version/date: `<version or date>`
Local status: `<compliant | migrating | legacy>`

## Local Adapter

- Current UI foundation:
- Target UI foundation:
- Mantine-only primitive policy:
- Theme/provider:
- Root provider/theme implementation note:
- Wrapper components or primitive policy:
- Notifications/modals setup:
- Styling bridge or legacy layer:
- UI validation commands:

## Known Exceptions

| Scope | Reason | User impact | Removal condition |
|-------|--------|-------------|-------------------|
|       |        |             |                   |

## Migration Backlog

1.
2.
3.
```

## Documentation Placement

Recommended local placements:

- primary developer guide
- architecture overview
- coding standards
- design-system status document
- handover or operational snapshot

## Compliance Rule

A project is not compliant if it describes its own design system as the authority while this shared folder exists. Local implementation files are adapters only.

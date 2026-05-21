# ClassScout Mantine-Only Refactor

Status: Planned
Version: 1.0.0
Last updated: 2026-05-21
Project: `/Users/Shared/Projects/classscout`

## Objective

Refactor ClassScout to a Mantine-only UI platform.

This is a true refactor, not a visual refresh and not a hybrid steady state. The target architecture removes shadcn/Radix primitives as the foundational UI layer and makes Mantine the only product UI system.

## SSOT Rule

`/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM` is the single source of truth for design, UI, and UX.

ClassScout-local documentation may describe:

- current migration status
- local file paths
- validation commands
- approved exceptions
- implementation sequencing

ClassScout-local documentation may not redefine component behavior, token policy, interaction meaning, responsive rules, or accessibility expectations that are already defined in this repository.

## Non-Goals

- preserving the current shadcn primitive layer as a long-lived compatibility layer
- preserving Tailwind token ownership as the design authority
- preserving `src/components/ui` as an active primitive system for new product work
- leaving Radix overlays, toasts, tabs, sheets, and dialogs as permanent runtime dependencies for product UI

## Current UI Foundation

- primitive/component foundation: local `shadcn/ui` components in `/Users/Shared/Projects/classscout/src/components/ui`
- interaction primitives: Radix-based wrappers inside those `ui` components
- styling foundation: Tailwind utility classes plus theme variables in `/Users/Shared/Projects/classscout/src/app/globals.css`
- theme config: `/Users/Shared/Projects/classscout/tailwind.config.ts`
- root app providers: `/Users/Shared/Projects/classscout/src/app/providers.tsx`
- app shell and consumer surfaces:
  - `/Users/Shared/Projects/classscout/src/components/scout/*`
  - `/Users/Shared/Projects/classscout/src/components/scout/views/*`
  - `/Users/Shared/Projects/classscout/src/components/scout/panels/*`
  - `/Users/Shared/Projects/classscout/src/components/admin/AdminDashboard.tsx`
  - `/Users/Shared/Projects/classscout/src/app/admin/**/*`

## Target End State

- one Mantine root provider for the application
- one exported ClassScout Mantine theme as the only token authority for product UI
- Mantine notifications and modal management configured centrally
- ClassScout wrappers, if any, remain thin and compositional
- shell, cards, filters, forms, dialogs, drawers, tabs, tables, alerts, and badges all render from Mantine primitives or thin Mantine wrappers
- custom CSS reduced to narrow global defaults, exceptional integration glue, and documented edge cases
- `src/components/ui` no longer serves as the live primitive foundation for product UI

## Legacy Inventory To Retire

- `/Users/Shared/Projects/classscout/components.json`
- `/Users/Shared/Projects/classscout/src/components/ui/*`
- `/Users/Shared/Projects/classscout/src/app/globals.css` as the primary design-token authority
- `/Users/Shared/Projects/classscout/tailwind.config.ts` as the primary UI token authority
- Radix-based overlay and field primitives currently consumed from `src/components/ui`
- shadcn toast / tooltip / sheet / dialog infrastructure in `/Users/Shared/Projects/classscout/src/app/providers.tsx`

Tailwind may remain only if the project intentionally keeps it for narrow layout or utility use. It may not remain the design-system authority.

## Known Product Areas

### Public app

- home and editorial surfaces
- discover/filter/search flows
- provider cards and profile panels
- meetup cards and profile panels
- saved and calculator views
- account and preference flows
- mobile navigation and shell behavior

### Admin app

- admin login
- provider CRUD
- meetup CRUD
- site-content editing
- locations editing
- image upload workflows

### API docs and system surfaces

- `/Users/Shared/Projects/classscout/src/app/api/page.tsx`

## Migration Phases

### Phase 0: Freeze and Documentation

- local docs must point to the shared SSOT
- no new product UI should be added on top of `src/components/ui`
- no new local design rules should be invented in ClassScout docs

### Phase 1: Root Mantine Platform

Create:

- one ClassScout Mantine provider
- one exported Mantine theme
- central notifications setup
- central modal/drawer policy wiring

Replace:

- current root UI provider concerns in `/Users/Shared/Projects/classscout/src/app/providers.tsx`

### Phase 2: Shell and Navigation

Refactor:

- `/Users/Shared/Projects/classscout/src/components/scout/ClassScoutShell.tsx`
- `/Users/Shared/Projects/classscout/src/components/scout/Sidebar.tsx`
- `/Users/Shared/Projects/classscout/src/components/scout/BoroughBar.tsx`
- `/Users/Shared/Projects/classscout/src/components/scout/NeighborhoodChips.tsx`
- `/Users/Shared/Projects/classscout/src/components/scout/Filters.tsx`

Goal:

- move layout, nav, mobile shell, filter affordances, and header actions to Mantine primitives and responsive rules

### Phase 3: Public Content Surfaces

Refactor:

- provider cards
- meetup cards
- trust strip
- home/discover/saved/calculator/account views
- share dialogs and profile panels

Goal:

- cards, badges, forms, buttons, drawers, and overlays become Mantine-native

### Phase 4: Admin Surfaces

Refactor:

- `/Users/Shared/Projects/classscout/src/components/admin/AdminDashboard.tsx`
- `/Users/Shared/Projects/classscout/src/app/admin/**/*`

Goal:

- tabs, forms, inputs, textareas, save flows, alerts, and table/list management become Mantine-native

### Phase 5: Primitive Deletion

- delete unused shadcn wrappers
- delete obsolete Radix dependencies used only for product UI primitives
- reduce or rewrite legacy global CSS that exists only to support the removed primitive system
- remove outdated local documentation that still describes the old stack as authoritative

## Enforcement Rules

- no new product UI files should import from `/Users/Shared/Projects/classscout/src/components/ui`
- no new product UI should add fresh Radix primitive usage for behavior Mantine already covers
- no new design tokens should be declared outside the Mantine theme without a documented exception
- no local document in ClassScout may describe itself as the design authority while the shared SSOT exists

## Allowed Exceptions

The following may remain outside Mantine if they are thin and justified:

- charting libraries
- map integrations
- domain-specific media components such as CDN image wrappers
- third-party embeds with their own runtime constraints

Even when these remain, layout, labeling, spacing, loading, errors, and shell integration still follow the shared design-system contracts.

## Done Criteria

ClassScout is done with this refactor only when:

- Mantine is the only foundational UI library for product UI
- the active theme is Mantine-based and is the only token authority
- public and admin surfaces no longer depend on `src/components/ui` as their primitive base
- local docs consistently point to `/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM` as the SSOT
- remaining exceptions are explicit, narrow, and documented

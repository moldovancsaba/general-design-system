# KIDEX Mantine Refactor

Status: Planned
Version: 1.0.0
Last updated: 2026-05-21
Project: `/Users/Shared/Projects/kidex`

## Objective

Refactor KIDEX into a strict Mantine-first product UI that follows the shared SSOT without maintaining a competing local design authority.

The immediate high-value target is the conductor mobile workflow:

- faster child lookup
- faster survey start/resume
- clearer dashboard priority on small screens
- more reliable touch ergonomics
- more predictable page structure across child, record, and dashboard surfaces

## Current State

KIDEX already uses Mantine heavily, but it is not yet strict or complete:

- Mantine is the dominant primitive layer
- local theme/provider already exists
- dashboard shell and major pages still contain product-specific layout drift
- analytics, export, and some workflow surfaces still rely on local composition and utility CSS
- mobile navigation is drawer-first rather than mobile-first

## Non-Goals

- replacing charting or PDF tooling in this migration
- introducing a second wrapper framework on top of Mantine
- preserving page-local drift as a permanent “exception”
- keeping KIDEX local docs as a competing design authority

## High-Risk UX Debt

### 1. Mobile shell

- current mobile navigation relies too heavily on a drawer/burger model
- top-level conductor destinations are not exposed with enough stability
- primary action access is slower than it should be

### 2. Dashboard density

- mobile dashboard prioritization is too broad and analytics-heavy
- next action, overdue follow-up, and start/resume survey should lead

### 3. Child registry density

- card surfaces expose too many simultaneous badges and actions
- primary vs secondary actions need clearer separation

### 4. Page-level consistency

- action placement, spacing rhythm, and responsive behavior still drift by page

## Target End State

- one Mantine-first shell model across authenticated KIDEX routes
- mobile-first navigation for conductor-critical destinations
- shared page header and action placement behavior
- explicit small-screen rules for dashboard, children, records, and survey surfaces
- app-local design doc reduced to adapter only
- remaining exceptions documented and narrow

## Proposed Sequence

### Phase 0: Governance Freeze

- local docs already point to the shared SSOT
- no new competing design patterns should be added in KIDEX

### Phase 1: Mobile Shell And Navigation

Primary files:

- `/Users/Shared/Projects/kidex/components/layout/DashboardShell.tsx`
- `/Users/Shared/Projects/kidex/components/ui/PageHeader.tsx`
- `/Users/Shared/Projects/kidex/theme/mantine-theme.ts`

Goals:

- replace floating-burger-first mobile navigation with a mobile-first primary navigation model
- expose stable top-level destinations for conductors
- move secondary controls into lower-priority navigation surfaces

### Phase 2: Dashboard Responsive Refactor

Primary files:

- `/Users/Shared/Projects/kidex/components/dashboard/MainDashboard.tsx`

Goals:

- prioritize overdue follow-up, due soon, resume/start survey, recent children, and watchlist on mobile
- progressively disclose lower-priority analytics
- normalize section rhythm and panel structure

### Phase 3: Child Registry Responsive Refactor

Primary files:

- `/Users/Shared/Projects/kidex/app/[locale]/dashboard/children/page.tsx`

Goals:

- reduce card action competition
- move secondary actions into menus
- compress status density into clearer hierarchy
- convert filters to a more mobile-appropriate pattern

### Phase 4: Records And Child Detail Normalization

Primary files:

- `/Users/Shared/Projects/kidex/app/[locale]/dashboard/records/[id]/page.tsx`
- `/Users/Shared/Projects/kidex/app/[locale]/dashboard/children/[id]/page.tsx`

Goals:

- standardize page header, action row, section framing, and mobile reading order
- align the interpretation stack with shared card/panel patterns

### Phase 5: Survey Workflow Acceleration

Primary files:

- `/Users/Shared/Projects/kidex/components/forms/KidexAssessmentApp.tsx`
- `/Users/Shared/Projects/kidex/app/[locale]/dashboard/assessment/*`

Goals:

- improve start/resume survey affordances
- reduce setup friction
- keep guidance high-value and low-noise
- improve interruption recovery and progress clarity

### Phase 6: CSS And Exception Reduction

Primary files:

- `/Users/Shared/Projects/kidex/app/globals.css`
- page-level local styling bridges

Goals:

- narrow global CSS to reset, print, and truly shared utilities
- document any remaining exception surfaces explicitly

## Acceptance Criteria

- design/UI/UX SSOT remains the shared repository, not KIDEX local docs
- mobile conductor workflow exposes primary destinations without drawer dependence alone
- dashboard small-screen priority is operational first, analytics second
- child registry mobile surface has one obvious primary action per card
- new UI surfaces are Mantine or thin Mantine wrappers
- remaining non-Mantine exceptions are documented, narrow, and justified

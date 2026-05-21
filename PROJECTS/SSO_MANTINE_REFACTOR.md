# SSO Mantine Refactor

Status: In progress
Version: 1.0.0
Last updated: 2026-05-21
Project: `/Users/moldovancsaba/Projects/sso`

## Objective

Refactor SSO to a pure Mantine system with no long-lived bridge between the current local CSS/theme system and the future Mantine theme.

## Non-Goals

- preserving `styles/globals.css` as a permanent token source
- preserving `components/ThemeProvider.js` as a permanent runtime theme layer
- preserving product UI CSS modules as the default path for new work

## Legacy Inventory

- `/Users/moldovancsaba/Projects/sso/styles/globals.css`
- `/Users/moldovancsaba/Projects/sso/components/ThemeProvider.js`
- `/Users/moldovancsaba/Projects/sso/styles/login.module.css`
- `/Users/moldovancsaba/Projects/sso/styles/docs.module.css`
- `/Users/moldovancsaba/Projects/sso/styles/docs-layout.module.css`
- `/Users/moldovancsaba/Projects/sso/styles/home.module.css`
- `/Users/moldovancsaba/Projects/sso/pages/admin/style-editor.js`

## Target End State

- one Mantine root provider in `_app`
- one exported Mantine theme file
- Mantine notifications and modals configured centrally
- auth and admin surfaces rendered from Mantine primitives
- docs surfaces moved to Mantine layout and typography where practical
- old token/theme infrastructure deleted

## Required Local Adapter

SSO must maintain a local adapter note in:

- `/Users/moldovancsaba/Projects/sso/docs/DESIGN_SYSTEM.md`

That adapter must describe:

- local status: `migrating`
- current foundation
- target foundation
- theme/provider path
- wrapper or direct primitive policy
- validation commands
- known exceptions
- migration backlog

## Phases

### Phase 0: Freeze

- local docs point to shared SSOT
- no new product UI is added in the legacy system

### Phase 1: Root Mantine Platform

Status:

- completed

Files:

- `/Users/moldovancsaba/Projects/sso/pages/_app.js`
- new theme/provider files in `/Users/moldovancsaba/Projects/sso`

Tasks:

- install Mantine packages
- add `MantineProvider`
- register notifications and modals
- move root layout concerns onto Mantine-friendly structure
- define the single theme file path
- define direct primitive versus thin-wrapper policy

Exit criteria:

- `_app` is Mantine-rooted
- one theme file exists and is the only approved token authority for new UI
- notifications and modals are centralized
- the legacy freeze is documented locally

Implemented in:

- `/Users/moldovancsaba/Projects/sso/pages/_app.js`
- `/Users/moldovancsaba/Projects/sso/pages/_document.js`
- `/Users/moldovancsaba/Projects/sso/lib/ui/mantineTheme.js`
- `/Users/moldovancsaba/Projects/sso/components/AppFooter.js`

### Phase 2: Auth Surfaces

Status:

- completed

Files:

- `/Users/moldovancsaba/Projects/sso/pages/login.js`
- `/Users/moldovancsaba/Projects/sso/pages/admin/index.js`
- `/Users/moldovancsaba/Projects/sso/pages/admin/callback.js`
- `/Users/moldovancsaba/Projects/sso/pages/oauth/consent.js`

Tasks:

- migrate forms, alerts, cards, and loading states
- keep provider-brand buttons compliant inside Mantine layout

Exit criteria:

- login and admin-entry flows no longer depend on legacy auth-page styling
- redirect, re-auth, and provider-login behavior remains correct

Implemented in:

- `/Users/moldovancsaba/Projects/sso/components/AuthSurface.js`
- `/Users/moldovancsaba/Projects/sso/pages/login.js`
- `/Users/moldovancsaba/Projects/sso/pages/admin/index.js`
- `/Users/moldovancsaba/Projects/sso/pages/admin/callback.js`
- `/Users/moldovancsaba/Projects/sso/pages/oauth/consent.js`

### Phase 3: Admin Shell And CRUD

Files:

- `/Users/moldovancsaba/Projects/sso/pages/admin/dashboard.js`
- `/Users/moldovancsaba/Projects/sso/pages/admin/users.js`
- `/Users/moldovancsaba/Projects/sso/pages/admin/oauth-clients.js`
- `/Users/moldovancsaba/Projects/sso/pages/admin/activity.js`

Tasks:

- migrate layout, tables, filters, forms, modals, and destructive flows

Exit criteria:

- the main admin shell and CRUD flows use Mantine primitives only
- legacy admin page CSS no longer drives layout decisions

### Phase 4: Style Editor Decision

Files:

- `/Users/moldovancsaba/Projects/sso/pages/admin/style-editor.js`
- `/Users/moldovancsaba/Projects/sso/components/ThemeProvider.js`
- `/Users/moldovancsaba/Projects/sso/pages/api/admin/themes/*`

Decision:

- rewrite around a Mantine-native theme model
- or remove/disable until such a model exists

The old style editor cannot remain unchanged in a pure Mantine target.

Required decision before Phase 4 implementation:

- rewrite to Mantine-native theme management
- or remove/disable until Mantine-native theme management is designed

### Phase 5: Docs Surfaces

- migrate `/Users/moldovancsaba/Projects/sso/pages/docs/*`

Exit criteria:

- docs layout and state callouts are Mantine-driven
- any remaining editorial CSS is narrow and intentional

### Phase 6: Deletion

- delete legacy theme provider
- delete obsolete CSS modules
- delete obsolete local design-system docs

Exit criteria:

- `/Users/moldovancsaba/Projects/sso/components/ThemeProvider.js` is gone
- obsolete token ownership in `styles/globals.css` is gone
- no product UI path depends on legacy design infrastructure

## Initial Implementation Sequence

1. admin shell and CRUD screens
2. style editor rewrite/removal decision
3. docs surfaces
4. deletion pass

## Validation Commands

- `npm run lint`
- `npm run check:docs`
- targeted tests for auth and admin flows affected by UI work

## Enforcement Needed

- ban new product UI CSS modules
- ban new raw HTML inputs/buttons in product UI
- ban new token definitions outside the Mantine theme

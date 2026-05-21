# SSO Mantine Refactor

Status: Planned
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

## Phases

### Phase 0: Freeze

- local docs point to shared SSOT
- no new product UI is added in the legacy system

### Phase 1: Root Mantine Platform

Files:

- `/Users/moldovancsaba/Projects/sso/pages/_app.js`
- new theme/provider files in `/Users/moldovancsaba/Projects/sso`

Tasks:

- install Mantine packages
- add `MantineProvider`
- register notifications and modals
- move root layout concerns onto Mantine-friendly structure

### Phase 2: Auth Surfaces

Files:

- `/Users/moldovancsaba/Projects/sso/pages/login.js`
- `/Users/moldovancsaba/Projects/sso/pages/admin/index.js`
- `/Users/moldovancsaba/Projects/sso/pages/admin/callback.js`
- `/Users/moldovancsaba/Projects/sso/pages/oauth/consent.js`

Tasks:

- migrate forms, alerts, cards, and loading states
- keep provider-brand buttons compliant inside Mantine layout

### Phase 3: Admin Shell And CRUD

Files:

- `/Users/moldovancsaba/Projects/sso/pages/admin/dashboard.js`
- `/Users/moldovancsaba/Projects/sso/pages/admin/users.js`
- `/Users/moldovancsaba/Projects/sso/pages/admin/oauth-clients.js`
- `/Users/moldovancsaba/Projects/sso/pages/admin/activity.js`

Tasks:

- migrate layout, tables, filters, forms, modals, and destructive flows

### Phase 4: Style Editor Decision

Files:

- `/Users/moldovancsaba/Projects/sso/pages/admin/style-editor.js`
- `/Users/moldovancsaba/Projects/sso/components/ThemeProvider.js`
- `/Users/moldovancsaba/Projects/sso/pages/api/admin/themes/*`

Decision:

- rewrite around a Mantine-native theme model
- or remove/disable until such a model exists

The old style editor cannot remain unchanged in a pure Mantine target.

### Phase 5: Docs Surfaces

- migrate `/Users/moldovancsaba/Projects/sso/pages/docs/*`

### Phase 6: Deletion

- delete legacy theme provider
- delete obsolete CSS modules
- delete obsolete local design-system docs

## Enforcement Needed

- ban new product UI CSS modules
- ban new raw HTML inputs/buttons in product UI
- ban new token definitions outside the Mantine theme

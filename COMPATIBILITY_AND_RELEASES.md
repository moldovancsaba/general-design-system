# Compatibility & Releases

Status: Active SSOT
Version: 2.4.0
Last updated: 2026-05-25

This document defines the supported package/runtime contract for `@gds/theme`, `@gds/core`, and `@gds/admin`.

## Supported matrix

Machine-readable source of truth: [COMPATIBILITY_MATRIX.json](./COMPATIBILITY_MATRIX.json)

| Surface | Status | Notes |
|---|---|---|
| Mantine `7.9.x` | Supported | Current build and test target |
| React `18.x` | Supported | The actively validated consumer line |
| React `19.x` | Experimental | Allowed by peers; not yet validated as a first-class consumer line in this repo |
| Next.js App Router package consumption | Supported | Use the documented server/client split and canonical provider template |
| Vite consumer runtime | Supported | Playground-backed and package-smoke-validated |

## Install contract

Canonical install path:

1. consume `@gds/theme`, `@gds/core`, and `@gds/admin` as installable packages
2. keep Mantine, React, and React DOM aligned to the compatibility matrix
3. avoid sibling-repo `file:` links for production CI/Vercel flows unless explicitly documented as temporary local development strategy

## Export contract

Every package now exposes:

- root export: backwards-compatible mixed surface
- `./client`: client-safe entrypoint for interactive hooks/components
- `./server`: server-safe entrypoint for theme data and non-hook structural components

Root exports remain backwards-compatible, but production consumers should prefer the explicit `server` and `client` entrypoints so import intent remains obvious during reviews and release verification.

## Accent surface contract

Use semantic accent surfaces instead of raw `bg="*.0"` panel styling for public, auth, operator, and docs surfaces that need emphasized grouping.

Canonical contract:

- use `AccentPanel` from `@gds/core/server` or `@gds/core/client`
- choose a supported tone: `gray`, `violet`, `green`, `red`, `amber`, `blue`
- rely on GDS-managed light/dark background and border behavior
- avoid page-local `light-dark(...)` copies for repeated accent surfaces

Do not:

- use raw `bg="violet.0"` or similar shade-based panel backgrounds on product pages
- combine dimmed text with ad hoc accent backgrounds outside the GDS surface contract
- introduce decorative shadows to separate accent surfaces from the page

Recommended usage:

- use `@gds/theme/server` for `gdsTheme` and `extendGdsTheme`
- use `@gds/theme/server` `withGdsMotion` only when a product explicitly opts into shared motion defaults
- use `@gds/core/server` or `@gds/admin/server` when a server-rendered layout only needs structural primitives
- use `@gds/*/client` for hook-driven or clearly interactive surfaces

## Next.js App Router consumer path

Recommended production split for App Router consumers:

### Server files

Use server-safe entrypoints in layouts, metadata builders, and non-interactive composition:

```ts
import { gdsTheme, extendGdsTheme } from '@gds/theme/server';
import { AccentPanel, PageHeader, AuthShell } from '@gds/core/server';
import { WorkspaceHeader } from '@gds/admin/server';
```

### Client files

Use client entrypoints for providers and interactive components:

```tsx
'use client';

import { GdsProvider } from '@gds/theme/client';
import { SemanticButton, ThemeToggle } from '@gds/core/client';
import { AppShell, ResponsiveDataView } from '@gds/admin/client';
```

### Recommended root split

```tsx
// app/layout.tsx
import { GdsColorSchemeScript } from '@gds/theme/server';
import Providers from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <GdsColorSchemeScript />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

```tsx
// app/providers.tsx
'use client';

import { GdsProvider } from '@gds/theme/client';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <GdsProvider>{children}</GdsProvider>;
}
```

This is the intended stable consumer path for products that want direct package adoption without rebuilding GDS internals locally.

See also:

- [TEMPLATES/next-app-router](./TEMPLATES/next-app-router)
- [TEMPLATES/vite](./TEMPLATES/vite)

## Canonical Vite consumer path

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { GdsProvider } from '@gds/theme/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GdsProvider>
      <App />
    </GdsProvider>
  </React.StrictMode>,
);
```

## Release verification contract

`npm run verify:release` now performs:

1. workspace build
2. version and peer-range alignment against `VERSION` and `COMPATIBILITY_MATRIX.json`
3. artifact and export-map verification for every published package
4. clean smoke-consumer install/import validation from packed tarballs
5. workspace lint and tests

The command must fail on:

- version drift
- internal peer drift
- missing `dist` artifacts
- broken `exports` targets
- smoke-consumer import/render failure

## Versioning policy

- `VERSION` is the release-line authority for this repository
- publishable package versions must match `VERSION`
- normative changes must land in `CHANGELOG.md`
- package metadata, docs, and project plans may not drift across release lines

## Upgrade policy

For each minor release:

- update `CHANGELOG.md`
- update package versions
- document consumer-facing behavior changes
- note any new required local adapter or migration action

For each major release:

- document breaking contract changes explicitly
- define the deprecation window or migration expectation for active adopters

## Consumer expectations

Adopting products are expected to:

- pin to a known GDS release line
- record the consumed version in their local adapter doc
- rerun build, lint, and test/compliance checks when upgrading
- review shell, theme, and state-surface changes for regressions before promoting to production
- adopt the canonical root template instead of rebuilding provider composition locally

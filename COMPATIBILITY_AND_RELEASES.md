# Compatibility & Releases

Status: Active SSOT
Version: 2.3.0
Last updated: 2026-05-24

This document defines the supported package/runtime contract for `@gds/theme`, `@gds/core`, and `@gds/admin`.

## Supported matrix

| Surface | Supported now | Notes |
|---|---|---|
| Mantine | `^7.9.0` | Current build and test target |
| React | `^18.2.0`, `^19.0.0` | React 19 compatibility is declared at the peer layer; package behavior is still validated primarily on React 18 in this repo |
| Next.js | App Router and Pages Router consumers | Use server-safe/client-safe subpath imports where applicable |
| Vite | Supported | Playground and static/Multi-Page App consumers remain valid |

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

Recommended usage:

- use `@gds/theme/server` for `gdsTheme` and `extendGdsTheme`
- use `@gds/core/server` or `@gds/admin/server` when a server-rendered layout only needs structural primitives
- use `@gds/*/client` for hook-driven or clearly interactive surfaces

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

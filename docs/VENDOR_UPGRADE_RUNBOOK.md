# Vendor Engine Upgrade Runbook

The GDS UI engine (`@mantine/*`) is governed by [`vendor-governance.json`](../vendor-governance.json).
An upgrade is a **deliberate, reversible internal migration behind GDS's stable
public contract** — consumers are unaffected because the boundary is sealed
(`npm run verify:boundary`). This runbook is the only sanctioned way to change the
adopted engine version.

## Principles

- The engine is a **peer** (single resolved instance). Consumers never list it.
- The **public contract does not change** during an engine upgrade. All breakage is
  absorbed in adapter/seam/internal files (see `boundary/*-allowlist.json`,
  `docs/PUBLIC_TYPE_BOUNDARY.md`, the overlay adapter).
- Every upgrade must keep the boundary suite, the full `verify:release` chain, and
  **all accessibility verifiers** green. An upgrade that regresses a11y is rejected.

## Flow

1. **Branch.** `git checkout -b chore/engine-upgrade-<version>`.
2. **Smoke the candidate first.** The CI matrix (`vendor-governance.json.ciMatrix`)
   already runs the candidate leg (e.g. `mantine-9`) on every PR. Confirm it is green
   on `main` before adopting.
3. **Set the new range** in `vendor-governance.json` (`pinnedRange`, bump `candidate`
   to the next major, set `lastReviewed`, set `rollbackRef` to the pre-upgrade SHA),
   and update the matching peer ranges in every `packages/*/package.json`.
4. **Reconcile gates:**
   ```bash
   npm run verify:vendor-pin     # manifest ↔ package peer ranges agree
   npm run verify:install-surface # no cross-package skew
   npm run build && npm run verify:boundary
   ```
5. **Resolve breakage in adapters/internals only** — never in public types, public
   CSS, or consumer code. If a public surface must change, that is a separate,
   reviewed contract change (regenerate the relevant `boundary/*-allowlist.json`).
6. **Full gate:** `npm run verify:release` (both matrix legs), including all
   accessibility verifiers.
7. **Release** behind the unchanged public contract.

## Rollback

Revert the manifest + package peer-range commits to `vendor-governance.json.rollbackRef`.
Because the public contract never changed, no consumer action is required.

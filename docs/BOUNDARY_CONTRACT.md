# GDS Boundary Contract

GDS owns its public contract end-to-end. The vendor UI engine (`@mantine/*`,
`@tabler/icons-react`) is an implementation detail. The **boundary contract
suite** asserts that ownership in GDS's own CI, so a vendor upgrade or accidental
leak fails here — never silently in a consumer app.

## Run it

```bash
npm run build        # the type gate reads dist/*.d.ts
npm run verify:boundary
```

`verify:boundary` (`scripts/verify-boundary.mjs`, wired into `verify:release`)
composes three gates and reports a single verdict:

| Gate | Script | Asserts | Baseline |
|------|--------|---------|----------|
| Public type surface | `verify:public-types` | no `@mantine/*` types in public `.d.ts` beyond the allowlist | `boundary/public-type-allowlist.json` |
| Single install surface | `verify:install-surface` | engine peers consistent + single-instance-safe; `GdsIcons` reachable | — (structural) |
| Public CSS selector surface | `verify:css-boundary` | no `.mantine-*` selectors in the public stylesheet beyond the allowlist | `boundary/public-css-allowlist.json` |

Two further invariants are enforced elsewhere in `verify:release` and are part of
the same boundary contract:

- **Opaque overlay surfaces** (#342) — exercised by the runtime theme verifiers
  (`verify:forced-colors-runtime`, `verify:theme-trust-runtime`).
- **Internal export contract** — `check-export-contract`.

## The allowlist discipline

Each baseline is the documented, reviewed vendor surface. The gates fail on
**additions** and report **removals**. This makes the boundary a one-way ratchet:
the vendor surface can only shrink **deliberately** (regenerate the baseline in a
reviewable commit), never grow by accident. Shrinking the baselines — wrapping a
primitive behind a GDS type (#343/#349), migrating a selector to a `data-gds-*`
hook (#345) — is the mechanical definition of "rely on the vendor less and less."

## Updating a baseline (intentional changes only)

```bash
npm run build
node scripts/verify-public-types-boundary.mjs --write   # type surface
node scripts/verify-css-boundary.mjs --write             # CSS surface
git add boundary/                                        # review the diff
```

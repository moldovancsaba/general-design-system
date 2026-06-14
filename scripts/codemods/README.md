# GDS Codemods

Reference codemods live here. They are intentionally narrow, AST-classified, idempotent, and only patch patterns that are mechanically safe. Unsupported cases are reported as manual follow-ups with governed exception stubs instead of being partially rewritten.

## Transforms

Current transforms:

| Transform | Automatic patch behavior | Manual follow-up behavior |
|---|---|---|
| `discovery-shell` | Rewrites simple `AppShell` header/sidebar usage to `DiscoveryShell`. | Reports unsupported shell shapes. |
| `listing-card` | Rewrites `PublicProductCard` to `ListingCard`. | None for supported aliases. |
| `action-bar` | Rewrites simple `CtaButtonGroup` plus `SemanticButton action="..."` props to `ActionBar`. | Reports custom action groups. |
| `mantine-imports` | Rewrites safe `TextInput`, `Textarea`, `Checkbox`, and `Select` imports/usages to `AdminTextInput`, `AdminTextarea`, `AdminCheckbox`, and `AdminSelect`. | Reports Mantine `Button`, `ActionIcon`, `Alert`, and `Table` usages with GDS replacement guidance. |
| `tabler-icons` | Rewrites known one-to-one Tabler icons to `GdsIcons.*`. | Reports icons that require semantic product review. |
| `raw-controls` | Rewrites labelled self-closing `input`, checkbox `input`, `textarea`, and `select` controls to GDS admin fields while preserving ARIA and validation attributes. | Reports unlabelled, non-self-closing, or structurally ambiguous controls. |
| `inline-styles` | Dry-run classification only. | Emits token/component-prop migration guidance and exception stubs for inline style authority. |
| `alerts-confirms` | Rewrites simple Mantine `Alert` surfaces to `InlineAlert`. | Reports blocking `alert()` and `confirm()` calls for `GdsToastProvider` / `GdsConfirmProvider` migration. |
| `tables` | Removes simple Mantine `Table` import authority and adds `AdminDataTable` import for follow-up mapping. | Reports raw tables requiring caption, row-header, mobile, sorting, loading, empty, and error state review. |

## Runtime Flow

```text
scan files
  -> parse TS/TSX/JS/JSX with the TypeScript AST
  -> classify matching imports/tags/calls
  -> apply only safe textual patches
  -> emit GdsCodemodResult
  -> create exception stubs for manual follow-ups
  -> rerun idempotently after manual fixes
```

## CLI

Dry run is the default:

```bash
node scripts/codemods/run-codemod.mjs mantine-imports ./src
```

Write changes:

```bash
node scripts/codemods/run-codemod.mjs raw-controls ./src --write
```

Attach owner and expiry metadata to generated exception stubs:

```bash
node scripts/codemods/run-codemod.mjs inline-styles ./src --owner=@checkout-team --remove-by=2026-10-01
```

## Report Contract

The CLI emits `GdsCodemodResult` JSON:

```ts
interface GdsCodemodPlan {
  contract: 'GdsCodemodPlan';
  transform: string;
  mode: 'dry-run' | 'patch';
  runtimeStates: Array<'dry-run' | 'patched' | 'skipped' | 'manual-follow-up' | 'failed-transform'>;
  owner: string;
  removeBy: string;
  rollback: string;
}

interface GdsCodemodResult {
  contract: 'GdsCodemodResult';
  plan: GdsCodemodPlan;
  summary: {
    filesScanned: number;
    transformed: number;
    skipped: number;
    manualFollowUps: number;
    failedTransforms: number;
    exceptionsCreated: number;
  };
  changedFiles: string[];
  skippedFiles: Array<{ file: string; reason: string }>;
  manualFollowUps: GdsMigrationFinding[];
  exceptionStubs: GdsExceptionStub[];
}
```

`GdsExceptionStub` entries include owner, reason, scope, replacement, expiry, accessibility, testing, observability, and rollback fields so teams can paste them into `gds-adoption.json` only when a reviewed temporary exception is justified.

## Accessibility Requirements

- raw control patches preserve `aria-*`, `required`, disabled/read-only, checked/value, and validation semantics
- alert/confirm migrations must use `InlineAlert`, `GdsToastProvider`, `useGdsToasts`, `GdsConfirmProvider`, or `useGdsConfirm`
- table follow-ups must define caption, header semantics, keyboard behavior, mobile behavior, empty/loading/error states, and screen-reader expectations
- icon follow-ups must choose semantic `GdsIcons` names by meaning, not by visual similarity alone
- inline style follow-ups must move color, spacing, radius, elevation, and layout authority to GDS tokens or governed component props

## Verification

```bash
node scripts/verify-codemods.mjs
```

The verifier exercises supported dry-run/write paths, idempotency, unsupported syntax reporting, accessibility attribute preservation, CLI report shape, and exception-stub metadata.

## Rollback / Recovery

Dry-run mode does not modify files. Patch mode writes only to the selected target files; review `git diff` and revert the patch if verification fails. Failed transforms are not retried automatically. Fix the reported manual follow-ups and rerun the same transform; supported transforms are idempotent.

# GDS Accessibility CI Package

`@doneisbetter/gds-a11y` is the reusable consumer test layer for GDS accessibility gates. It is intentionally lightweight: Playwright and axe are optional peer dependencies, so product repositories opt into browser-test weight only in CI.

## Install

```bash
npm install -D @doneisbetter/gds-a11y @playwright/test axe-core
```

## Public Helpers

- `createGdsA11yTest(page, config)` opens a route, runs axe, optional keyboard order assertions, and the GDS contrast gate, then returns one deterministic report.
- `runGdsAxeScan(page, config)` maps axe violations into GDS findings with severity, route, selector, status, help URL, and suggested GDS replacement.
- `expectGdsTabOrder(page, selectors, config)` verifies that expected keyboard stops are focusable in order.
- `expectGdsFocusTrap(page, containerSelector, config)` verifies that modal, drawer, command, or overlay focus remains inside the governed container.
- `runGdsContrastGate(page, config)` checks visible governed controls and contrast-owned surfaces for transparent or missing foreground/background pairs.
- `createGdsA11yReport(config)` creates a deterministic JSON report with pass, warning, failure, suppressed, and incomplete states.
- `formatGdsA11yReport(report)` emits a readable CI summary.
- `applyGdsA11ySuppressions(findings, suppressions)` applies suppression metadata and refuses to hide expired suppressions.

## Playwright Example

```ts
import { test, expect } from '@playwright/test';
import { createGdsA11yTest, formatGdsA11yReport } from '@doneisbetter/gds-a11y';
import axeSource from 'axe-core/axe.min.js?raw';

test('GDS route accessibility', async ({ page }) => {
  await page.addScriptTag({ content: axeSource });

  const report = await createGdsA11yTest(page, {
    route: '/settings',
    severityThreshold: 'serious',
    expectedTabOrder: [
      '[data-gds-shell-nav]',
      '[data-gds-primary-action]',
    ],
    suppressions: [
      {
        id: 'color-contrast',
        selector: '.vendor-map iframe',
        reason: 'Third-party map internals are vendor-owned.',
        owner: 'Maps team',
        expiresAt: '2026-09-01',
        replacementPath: 'Use MapPanel fallback text and remove this suppression after provider update.',
      },
    ],
  });

  console.info(formatGdsA11yReport(report));
  expect(report.status).not.toBe('failure');
});
```

## CI States

- `pass`: no active findings.
- `warning`: warnings or incomplete checks exist below the configured failure threshold.
- `failure`: at least one active finding meets the severity threshold.
- `suppressed`: every finding is covered by non-expired suppression metadata; this is the suppressed with expiry state.
- `incomplete`: a route or scan could not provide complete evidence.

## Suppression Policy

Suppression is allowed only with explicit metadata:

- `reason`
- `owner`
- `expiresAt`
- `replacementPath`
- optional `route`
- optional `selector`

Expired suppressions return as active findings. A suppression must never be used to hide a missing GDS primitive, unlabeled control, broken keyboard path, invisible focus trap, or avoidable contrast failure.

## Operational Behavior

Browser startup and route loading are owned by the consumer Playwright test. GDS helpers keep their output deterministic and privacy-safe:

- no screenshots are captured
- no page HTML is logged
- findings include only route, selector, severity, state, and remediation text
- app-owned auth and data setup stay in the consumer fixture

## Rollback

The package is additive. Consumers can pin the previous package version or remove the CI helper call without changing runtime UI. Runtime accessibility requirements still remain governed by `@doneisbetter/gds-core` and `@doneisbetter/gds-theme`.

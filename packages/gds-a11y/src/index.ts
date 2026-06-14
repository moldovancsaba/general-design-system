export type GdsA11ySeverity = 'minor' | 'moderate' | 'serious' | 'critical';
export type GdsA11yStatus = 'pass' | 'warning' | 'failure' | 'suppressed' | 'incomplete';

export interface GdsA11ySuppression {
  id: string;
  selector?: string;
  route?: string;
  reason: string;
  owner: string;
  expiresAt: string;
  replacementPath: string;
}

export interface GdsA11yFinding {
  id: string;
  route: string;
  selector?: string;
  component?: string;
  severity: GdsA11ySeverity;
  status: Exclude<GdsA11yStatus, 'pass'>;
  message: string;
  helpUrl?: string;
  suggestedGdsReplacement?: string;
  suppression?: GdsA11ySuppression;
}

export interface GdsKeyboardPath {
  route: string;
  expectedSelectors: string[];
  actualSelectors: string[];
  status: GdsA11yStatus;
  findings: GdsA11yFinding[];
}

export interface GdsContrastGate {
  route: string;
  minimumRatio: number;
  status: GdsA11yStatus;
  findings: GdsA11yFinding[];
}

export interface GdsA11yReport {
  route: string;
  status: GdsA11yStatus;
  generatedAt: string;
  findings: GdsA11yFinding[];
  keyboard?: GdsKeyboardPath;
  contrast?: GdsContrastGate;
  metadata: {
    timeoutMs: number;
    retries: number;
    suppressedCount: number;
  };
}

export interface GdsA11yTestConfig {
  route: string;
  timeoutMs?: number;
  retries?: number;
  severityThreshold?: GdsA11ySeverity;
  suppressions?: GdsA11ySuppression[];
  expectedTabOrder?: string[];
  contrastMinimumRatio?: number;
}

export interface GdsPlaywrightLikePage {
  url?: () => string;
  goto?: (url: string, options?: Record<string, unknown>) => Promise<unknown>;
  waitForLoadState?: (state?: string, options?: Record<string, unknown>) => Promise<unknown>;
  keyboard?: {
    press: (key: string) => Promise<unknown>;
  };
  locator?: (selector: string) => {
    first: () => {
      isVisible?: () => Promise<boolean>;
    };
  };
  evaluate: <T>(fn: (...args: unknown[]) => T | Promise<T>, ...args: unknown[]) => Promise<T>;
  addScriptTag?: (options: { path?: string; content?: string; url?: string }) => Promise<unknown>;
}

const severityRank: Record<GdsA11ySeverity, number> = {
  minor: 1,
  moderate: 2,
  serious: 3,
  critical: 4,
};

function routeOf(page: GdsPlaywrightLikePage, fallback: string) {
  return page.url?.() || fallback;
}

function isExpired(date: string, now = new Date()) {
  const expiresAt = new Date(`${date}T23:59:59Z`);
  return Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() < now.getTime();
}

function appliesSuppression(finding: GdsA11yFinding, suppression: GdsA11ySuppression) {
  if (suppression.id !== finding.id) return false;
  if (suppression.route && suppression.route !== finding.route) return false;
  if (suppression.selector && suppression.selector !== finding.selector) return false;
  return true;
}

export function applyGdsA11ySuppressions(
  findings: GdsA11yFinding[],
  suppressions: GdsA11ySuppression[] = [],
  now = new Date(),
) {
  return findings.map((finding) => {
    const suppression = suppressions.find((item) => appliesSuppression(finding, item));
    if (!suppression) return finding;
    if (isExpired(suppression.expiresAt, now)) {
      return {
        ...finding,
        message: `${finding.message} Suppression expired on ${suppression.expiresAt}.`,
      };
    }

    return {
      ...finding,
      status: 'suppressed' as const,
      suppression,
    };
  });
}

export function createGdsA11yReport({
  route,
  timeoutMs = 15000,
  retries = 1,
  findings = [],
  keyboard,
  contrast,
}: GdsA11yTestConfig & {
  findings?: GdsA11yFinding[];
  keyboard?: GdsKeyboardPath;
  contrast?: GdsContrastGate;
}): GdsA11yReport {
  const activeFindings = findings.filter((finding) => finding.status !== 'suppressed');
  const status: GdsA11yStatus = activeFindings.some((finding) => finding.status === 'failure')
    ? 'failure'
    : activeFindings.some((finding) => finding.status === 'warning' || finding.status === 'incomplete')
      ? 'warning'
      : findings.some((finding) => finding.status === 'suppressed')
        ? 'suppressed'
        : 'pass';

  return {
    route,
    status,
    generatedAt: new Date().toISOString(),
    findings,
    keyboard,
    contrast,
    metadata: {
      timeoutMs,
      retries,
      suppressedCount: findings.filter((finding) => finding.status === 'suppressed').length,
    },
  };
}

export async function runGdsAxeScan(
  page: GdsPlaywrightLikePage,
  config: GdsA11yTestConfig,
): Promise<GdsA11yFinding[]> {
  const route = routeOf(page, config.route);
  const threshold = severityRank[config.severityThreshold ?? 'serious'];
  const axeResult = await page.evaluate(() => {
    const maybeAxe = (globalThis as typeof globalThis & {
      axe?: {
        run: () => Promise<{
          violations?: Array<{
            id: string;
            impact?: GdsA11ySeverity;
            help?: string;
            helpUrl?: string;
            nodes?: Array<{ target?: string[]; html?: string }>;
          }>;
        }>;
      };
    }).axe;
    if (!maybeAxe) return { violations: [] };
    return maybeAxe.run();
  });

  const findings = (axeResult.violations ?? []).flatMap((violation) => {
    const severity = violation.impact ?? 'moderate';
    const status = severityRank[severity] >= threshold ? 'failure' : 'warning';
    return (violation.nodes?.length ? violation.nodes : [{ target: ['document'] }]).map((node) => ({
      id: violation.id,
      route,
      selector: node.target?.join(' ') ?? 'document',
      severity,
      status,
      message: violation.help ?? violation.id,
      helpUrl: violation.helpUrl,
      suggestedGdsReplacement: 'Use the nearest published GDS primitive before adding route-local markup.',
    } satisfies GdsA11yFinding));
  });

  return applyGdsA11ySuppressions(findings, config.suppressions);
}

export async function expectGdsTabOrder(
  page: GdsPlaywrightLikePage,
  expectedSelectors: string[],
  config: Pick<GdsA11yTestConfig, 'route'>,
): Promise<GdsKeyboardPath> {
  const route = routeOf(page, config.route);
  const actualSelectors = await page.evaluate((rawExpected) => {
    const expected = rawExpected as string[];
    const activeSelectors: string[] = [];
    for (let index = 0; index < expected.length; index += 1) {
      const element = document.querySelector(expected[index]);
      if (element instanceof HTMLElement) {
        element.focus();
        const active = document.activeElement;
        const matched = expected.find((selector) => active?.matches?.(selector));
        activeSelectors.push(matched ?? active?.tagName.toLowerCase() ?? 'none');
      } else {
        activeSelectors.push('missing');
      }
    }
    return activeSelectors;
  }, expectedSelectors);

  const findings = expectedSelectors.flatMap((selector, index) => {
    if (actualSelectors[index] === selector) return [];
    return [{
      id: 'gds-tab-order',
      route,
      selector,
      severity: 'serious' as const,
      status: 'failure' as const,
      message: `Expected tab stop ${index + 1} to match ${selector}, received ${actualSelectors[index] ?? 'none'}.`,
      suggestedGdsReplacement: 'Use GDS shell, action, form, table, and overlay primitives with documented focus order.',
    }];
  });

  return {
    route,
    expectedSelectors,
    actualSelectors,
    status: findings.length ? 'failure' : 'pass',
    findings,
  };
}

export async function expectGdsFocusTrap(
  page: GdsPlaywrightLikePage,
  containerSelector: string,
  config: Pick<GdsA11yTestConfig, 'route'>,
) {
  const route = routeOf(page, config.route);
  const result = await page.evaluate((selector) => {
    const container = document.querySelector(selector as string);
    if (!(container instanceof HTMLElement)) return { found: false, escaped: true, active: 'none' };
    const focusable = [...container.querySelectorAll<HTMLElement>('button,input,select,textarea,a[href],[tabindex]:not([tabindex="-1"])')]
      .filter((element) => !element.hasAttribute('disabled'));
    focusable[0]?.focus();
    const active = document.activeElement;
    return {
      found: true,
      escaped: Boolean(active && !container.contains(active)),
      active: active?.tagName.toLowerCase() ?? 'none',
    };
  }, containerSelector);

  const findings: GdsA11yFinding[] = !result.found || result.escaped
    ? [{
        id: 'gds-focus-trap',
        route,
        selector: containerSelector,
        severity: 'critical',
        status: 'failure',
        message: result.found ? 'Focus escaped the governed focus-trap container.' : 'Focus-trap container was not found.',
        suggestedGdsReplacement: 'Use the GDS modal, drawer, command, or overlay manager contract instead of local overlays.',
      }]
    : [];

  return {
    route,
    containerSelector,
    status: findings.length ? 'failure' as const : 'pass' as const,
    findings,
  };
}

export async function runGdsContrastGate(
  page: GdsPlaywrightLikePage,
  config: GdsA11yTestConfig,
): Promise<GdsContrastGate> {
  const route = routeOf(page, config.route);
  const minimumRatio = config.contrastMinimumRatio ?? 4.5;
  const findings = await page.evaluate((minimum) => {
    const failures: GdsA11yFinding[] = [];
    const visible = (element: Element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
    };
    const isTransparent = (value: string) => !value || value === 'transparent' || value === 'rgba(0, 0, 0, 0)';

    for (const element of [...document.querySelectorAll('.mantine-Button-root,.mantine-Input-input,.mantine-Card-root,[data-gds-owned-contrast]')].filter(visible)) {
      const style = getComputedStyle(element);
      if (isTransparent(style.color) || isTransparent(style.backgroundColor)) {
        failures.push({
          id: 'gds-contrast-gate',
          route: location.pathname,
          selector: element.tagName.toLowerCase(),
          severity: 'serious',
          status: 'failure',
          message: `Element has transparent foreground/background below the ${minimum}:1 contrast gate.`,
          suggestedGdsReplacement: 'Use GDS owned contrast surfaces, theme tokens, and published controls.',
        });
      }
    }
    return failures;
  }, minimumRatio);

  return {
    route,
    minimumRatio,
    status: findings.length ? 'failure' : 'pass',
    findings,
  };
}

export async function createGdsA11yTest(
  page: GdsPlaywrightLikePage,
  config: GdsA11yTestConfig,
): Promise<GdsA11yReport> {
  if (page.goto) {
    await page.goto(config.route, { waitUntil: 'domcontentloaded', timeout: config.timeoutMs ?? 15000 });
    await page.waitForLoadState?.('networkidle', { timeout: config.timeoutMs ?? 15000 }).catch(() => undefined);
  }

  const axeFindings = await runGdsAxeScan(page, config);
  const keyboard = config.expectedTabOrder?.length
    ? await expectGdsTabOrder(page, config.expectedTabOrder, config)
    : undefined;
  const contrast = await runGdsContrastGate(page, config);
  const findings = [...axeFindings, ...(keyboard?.findings ?? []), ...contrast.findings];

  return createGdsA11yReport({
    ...config,
    findings,
    keyboard,
    contrast,
  });
}

export function formatGdsA11yReport(report: GdsA11yReport) {
  const lines = [
    `GDS accessibility report: ${report.status}`,
    `Route: ${report.route}`,
    `Findings: ${report.findings.length}`,
    `Suppressed: ${report.metadata.suppressedCount}`,
  ];

  for (const finding of report.findings) {
    lines.push(`- [${finding.status}/${finding.severity}] ${finding.id}${finding.selector ? ` ${finding.selector}` : ''}: ${finding.message}`);
  }

  return lines.join('\n');
}

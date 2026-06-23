import { mergeThemeOverrides, type MantineColorsTuple, type MantineTheme, type MantineThemeOverride } from '@mantine/core';
import { createPublicBrandTheme } from './theme';
import {
  validateGdsTokenGraph,
  type GdsTokenGraph,
  type GdsTokenNode,
  type GdsTokenValidationFinding,
} from './token-operations';

/**
 * Governed brand-theme entry point (gap B2 / issue #316).
 *
 * Consumers pass five brand color ramps and two font families and receive a
 * fully tokened Mantine theme, a brand-named semantic CSS-variable map, and a
 * validated token graph. Components read the emitted `--gds-*` variables instead
 * of hardcoding hex, keeping brand application inside GDS token governance.
 */

export interface BrandColorRamps {
  /** Primary brand color (e.g. navy). Drives `brand.primary` / `bg.inverse`. */
  navy: string;
  /** Accent brand color (e.g. terracotta). Drives `brand.accent` / `price`. */
  terracotta: string;
  /** Positive/validation accent (e.g. sage). Drives `state.success`. */
  sage: string;
  /** Page background (e.g. cream). Drives `bg.page`. */
  cream: string;
  /** Secondary text / inactive (e.g. slate). Drives `text.secondary`. */
  slate: string;
}

export interface BrandFonts {
  /** Display font applied to headings (e.g. 'Bogart'). */
  display: string;
  /** Body font applied to body copy (e.g. 'Garet'). */
  body: string;
}

export interface CreateBrandThemeOptions {
  brandColors: BrandColorRamps;
  fonts: BrandFonts;
  /** Flatten surfaces (no shadows). Preserved from `createPublicBrandTheme`. */
  flatSurfaces?: boolean;
  /** Discouraged escape hatch; governed roles always win over collisions. */
  overrides?: MantineThemeOverride;
}

export type BrandSemanticRole =
  | 'brand.primary'
  | 'brand.accent'
  | 'bg.page'
  | 'bg.surface'
  | 'bg.inverse'
  | 'text.primary'
  | 'text.secondary'
  | 'text.onInverse'
  | 'price'
  | 'state.success'
  | 'state.warning'
  | 'state.danger'
  | 'state.info';

export interface BrandThemeResult {
  mantineTheme: MantineTheme;
  /** Brand-named semantic variables, light and dark, for injection at `:root`. */
  cssVariables: Record<string, string>;
  /** Validated token graph (themeId `brand`) for snapshotting and diffing. */
  tokenGraph: GdsTokenGraph;
}

export class GdsBrandThemeError extends Error {
  readonly findings: GdsTokenValidationFinding[];
  constructor(message: string, findings: GdsTokenValidationFinding[] = []) {
    super(message);
    this.name = 'GdsBrandThemeError';
    this.findings = findings;
  }
}

const HEX_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const REQUIRED_RAMPS: (keyof BrandColorRamps)[] = ['navy', 'terracotta', 'sage', 'cream', 'slate'];

function expandHex(hex: string): [number, number, number] {
  let value = hex.replace('#', '').trim();
  if (value.length === 3) {
    value = value
      .split('')
      .map((char) => char + char)
      .join('');
  }
  const int = parseInt(value, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

function relativeLuminance(hex: string): number {
  const channels = expandHex(hex).map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/** WCAG contrast ratio between two opaque hex colors. */
export function brandContrastRatio(foreground: string, background: string): number {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return Math.round(((lighter + 0.05) / (darker + 0.05)) * 100) / 100;
}

interface SemanticPair {
  light: string;
  dark: string;
}

/**
 * Deterministically derive the full brand semantic role set (light + dark) from
 * the five brand ramps. Dark values are anchored to navy so the palette holds
 * together in dark mode.
 */
export function deriveBrandSemanticTokens(colors: BrandColorRamps): Record<BrandSemanticRole, SemanticPair> {
  const { navy, terracotta, sage, cream, slate } = colors;
  const white = '#ffffff';
  const darkSurface = '#13243d';
  const darkPage = '#0b1a30';

  return {
    'brand.primary': { light: navy, dark: cream },
    'brand.accent': { light: terracotta, dark: terracotta },
    'bg.page': { light: cream, dark: darkPage },
    'bg.surface': { light: white, dark: darkSurface },
    'bg.inverse': { light: navy, dark: navy },
    'text.primary': { light: navy, dark: cream },
    'text.secondary': { light: slate, dark: '#aeb6c2' },
    'text.onInverse': { light: cream, dark: cream },
    price: { light: terracotta, dark: '#e0a892' },
    'state.success': { light: sage, dark: sage },
    'state.warning': { light: '#b9770f', dark: '#e0a23c' },
    'state.danger': { light: '#b3261e', dark: '#f2786f' },
    'state.info': { light: navy, dark: '#9db4d6' },
  };
}

function cssVarName(role: BrandSemanticRole, mode: 'light' | 'dark'): string {
  const base = `--gds-${role.replace('.', '-')}`;
  return mode === 'light' ? base : `${base}-dark`;
}

function emitCssVariables(tokens: Record<BrandSemanticRole, SemanticPair>): Record<string, string> {
  const vars: Record<string, string> = {};
  (Object.keys(tokens) as BrandSemanticRole[]).forEach((role) => {
    vars[cssVarName(role, 'light')] = tokens[role].light;
    vars[cssVarName(role, 'dark')] = tokens[role].dark;
  });
  return vars;
}

function buildTokenGraph(colors: BrandColorRamps, tokens: Record<BrandSemanticRole, SemanticPair>): GdsTokenGraph {
  const themeId = 'brand';
  const node = (
    id: string,
    role: GdsTokenNode['role'],
    value: string,
    mode: GdsTokenNode['mode'],
  ): GdsTokenNode => ({ id: `${themeId}.${id}`, themeId, role, value, category: 'color', mode });

  const nodes: GdsTokenNode[] = [
    node('primary', 'primary', colors.navy, 'shared'),
    node('accent', 'accent', colors.terracotta, 'shared'),
    node('canvas-light', 'canvas-light', tokens['bg.page'].light, 'light'),
    node('canvas-dark', 'canvas-dark', tokens['bg.page'].dark, 'dark'),
    node('shell-light', 'shell-light', tokens['bg.inverse'].light, 'light'),
    node('shell-dark', 'shell-dark', tokens['bg.inverse'].dark, 'dark'),
    node('surface-light', 'surface-light', tokens['bg.surface'].light, 'light'),
    node('surface-dark', 'surface-dark', tokens['bg.surface'].dark, 'dark'),
    node('border-light', 'border-light', tokens['text.secondary'].light, 'light'),
    node('border-dark', 'border-dark', tokens['text.secondary'].dark, 'dark'),
    node('text-light', 'text-light', tokens['text.primary'].light, 'light'),
    node('text-dark', 'text-dark', tokens['text.primary'].dark, 'dark'),
    node('muted-light', 'muted-light', tokens['text.secondary'].light, 'light'),
    node('muted-dark', 'muted-dark', tokens['text.secondary'].dark, 'dark'),
  ];

  return {
    generatedAt: new Date(0).toISOString(),
    themeCount: 1,
    tokenCount: nodes.length,
    themes: [themeId],
    nodes,
  };
}

function validateBrandInput(opts: CreateBrandThemeOptions): GdsTokenValidationFinding[] {
  const findings: GdsTokenValidationFinding[] = [];
  const colors = opts.brandColors;
  if (!colors) {
    findings.push({ severity: 'error', rule: 'token.invalid-color', tokenId: 'brandColors', message: 'brandColors is required.' });
    return findings;
  }
  for (const key of REQUIRED_RAMPS) {
    const value = colors[key];
    if (!value) {
      findings.push({ severity: 'error', rule: 'token.invalid-color', tokenId: `brandColors.${key}`, message: `Missing brand ramp "${key}".` });
    } else if (!HEX_PATTERN.test(value.trim())) {
      findings.push({ severity: 'error', rule: 'token.invalid-color', tokenId: `brandColors.${key}`, message: `Brand ramp "${key}" must be a 3- or 6-digit hex color, received "${value}".` });
    }
  }
  if (!opts.fonts?.display) {
    findings.push({ severity: 'error', rule: 'token.unknown-role', tokenId: 'fonts.display', message: 'fonts.display is required.' });
  }
  if (!opts.fonts?.body) {
    findings.push({ severity: 'error', rule: 'token.unknown-role', tokenId: 'fonts.body', message: 'fonts.body is required.' });
  }
  return findings;
}

interface ContrastRequirement {
  foreground: string;
  background: string;
  min: number;
  label: string;
}

function assertContrast(tokens: Record<BrandSemanticRole, SemanticPair>): GdsTokenValidationFinding[] {
  const requirements: ContrastRequirement[] = [
    { foreground: tokens['text.primary'].light, background: tokens['bg.page'].light, min: 4.5, label: 'text.primary on bg.page' },
    { foreground: tokens['text.primary'].light, background: tokens['bg.surface'].light, min: 4.5, label: 'text.primary on bg.surface' },
    { foreground: tokens['text.onInverse'].light, background: tokens['bg.inverse'].light, min: 4.5, label: 'text.onInverse on bg.inverse' },
    { foreground: tokens['text.secondary'].light, background: tokens['bg.page'].light, min: 4.5, label: 'text.secondary on bg.page' },
  ];
  const findings: GdsTokenValidationFinding[] = [];
  for (const req of requirements) {
    const ratio = brandContrastRatio(req.foreground, req.background);
    if (ratio < req.min) {
      findings.push({
        severity: 'error',
        rule: 'token.invalid-color',
        tokenId: req.label,
        message: `${req.label} contrast is ${ratio}:1; expected at least ${req.min}:1.`,
      });
    }
  }
  return findings;
}

export function createBrandTheme(opts: CreateBrandThemeOptions): BrandThemeResult {
  const inputFindings = validateBrandInput(opts);
  if (inputFindings.length > 0) {
    throw new GdsBrandThemeError('Invalid brand theme input.', inputFindings);
  }

  const tokens = deriveBrandSemanticTokens(opts.brandColors);

  const contrastFindings = assertContrast(tokens);
  if (contrastFindings.length > 0) {
    throw new GdsBrandThemeError('Brand theme failed WCAG AA contrast requirements.', contrastFindings);
  }

  const tokenGraph = buildTokenGraph(opts.brandColors, tokens);
  const graphReport = validateGdsTokenGraph(tokenGraph);
  if (!graphReport.ok) {
    throw new GdsBrandThemeError('Brand token graph failed validation.', graphReport.findings);
  }

  const cssVariables = emitCssVariables(tokens);

  const brandOverrides: MantineThemeOverride = {
    fontFamily: `${opts.fonts.body}, system-ui, sans-serif`,
    headings: { fontFamily: `${opts.fonts.display}, Georgia, serif` },
    primaryColor: 'brand',
    colors: {
      brand: [
        tokens['bg.page'].light,
        '#e9d9cd',
        '#dcc0ac',
        '#cfa68b',
        opts.brandColors.terracotta,
        opts.brandColors.terracotta,
        '#b56e57',
        opts.brandColors.navy,
        opts.brandColors.navy,
        '#06182f',
      ] as unknown as MantineColorsTuple,
    },
  };

  const mantineTheme = createPublicBrandTheme({
    flatSurfaces: opts.flatSurfaces,
    overrides: mergeThemeOverrides(brandOverrides, opts.overrides ?? {}),
  });

  return { mantineTheme, cssVariables, tokenGraph };
}

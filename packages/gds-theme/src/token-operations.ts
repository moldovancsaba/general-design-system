import type { GdsThemePresetId } from './theme-presets';
import { getGdsVibeThemes, type GdsVibeTheme } from './vibe-themes';

export type GdsTokenSeverity = 'error' | 'warning';
export type GdsTokenDiffChangeType = 'added' | 'removed' | 'changed';

export interface GdsTokenNode {
  id: string;
  themeId: GdsThemePresetId;
  role:
    | 'primary'
    | 'accent'
    | 'glow'
    | 'canvas-light'
    | 'canvas-dark'
    | 'shell-light'
    | 'shell-dark'
    | 'surface-light'
    | 'surface-dark'
    | 'border-light'
    | 'border-dark'
    | 'text-light'
    | 'text-dark'
    | 'muted-light'
    | 'muted-dark'
    | 'gradient'
    | 'hero';
  value: string;
  category: 'color' | 'effect';
  mode: 'light' | 'dark' | 'shared';
}

export interface GdsTokenGraph {
  generatedAt: string;
  themeCount: number;
  tokenCount: number;
  themes: GdsThemePresetId[];
  nodes: GdsTokenNode[];
}

export interface GdsTokenValidationFinding {
  severity: GdsTokenSeverity;
  rule:
    | 'token.invalid-color'
    | 'token.missing-dark-pair'
    | 'token.missing-light-pair'
    | 'token.duplicate-id'
    | 'token.unknown-role';
  tokenId: string;
  message: string;
}

export interface GdsTokenValidationReport {
  graph: GdsTokenGraph;
  findings: GdsTokenValidationFinding[];
  errorCount: number;
  warningCount: number;
  ok: boolean;
}

export interface GdsTokenDiffEntry {
  type: GdsTokenDiffChangeType;
  tokenId: string;
  before?: string;
  after?: string;
}

export interface GdsTokenDiffReport {
  comparedAt: string;
  beforeTokenCount: number;
  afterTokenCount: number;
  changedCount: number;
  entries: GdsTokenDiffEntry[];
}

export interface GdsThemeCompatibilitySurface {
  surface: 'page' | 'shell' | 'card' | 'border' | 'primary-action' | 'muted-copy';
  mode: 'light' | 'dark';
  foreground: string;
  background: string;
  status: 'compatible' | 'needs-review';
}

export interface GdsThemeCompatibilityResult {
  themeId: GdsThemePresetId;
  surfaces: GdsThemeCompatibilitySurface[];
}

export interface GdsThemeCompatibilityReport {
  checkedAt: string;
  themeCount: number;
  compatibleThemeCount: number;
  themes: GdsThemeCompatibilityResult[];
}

type GdsCompatibilitySurfaceBase = Omit<GdsThemeCompatibilitySurface, 'status'>;

const COLOR_ROLES = new Set([
  'primary',
  'accent',
  'glow',
  'canvas-light',
  'canvas-dark',
  'shell-light',
  'shell-dark',
  'surface-light',
  'surface-dark',
  'border-light',
  'border-dark',
  'text-light',
  'text-dark',
  'muted-light',
  'muted-dark',
]);
const MODE_PAIRED_BASE_ROLES = new Set(['canvas', 'shell', 'surface', 'border', 'text', 'muted']);

const COLOR_PATTERN = /^(#(?:[0-9a-fA-F]{3,8})|rgba?\([^)]*\)|hsla?\([^)]*\))$/;

function createThemeNodes(theme: GdsVibeTheme): GdsTokenNode[] {
  return [
    { id: `${theme.id}.primary`, themeId: theme.id, role: 'primary', value: theme.primary, category: 'color', mode: 'shared' },
    { id: `${theme.id}.accent`, themeId: theme.id, role: 'accent', value: theme.accent, category: 'color', mode: 'shared' },
    { id: `${theme.id}.glow`, themeId: theme.id, role: 'glow', value: theme.glow, category: 'color', mode: 'shared' },
    { id: `${theme.id}.canvas-light`, themeId: theme.id, role: 'canvas-light', value: theme.canvasLight, category: 'color', mode: 'light' },
    { id: `${theme.id}.canvas-dark`, themeId: theme.id, role: 'canvas-dark', value: theme.canvasDark, category: 'color', mode: 'dark' },
    { id: `${theme.id}.shell-light`, themeId: theme.id, role: 'shell-light', value: theme.shellLight, category: 'color', mode: 'light' },
    { id: `${theme.id}.shell-dark`, themeId: theme.id, role: 'shell-dark', value: theme.shellDark, category: 'color', mode: 'dark' },
    { id: `${theme.id}.surface-light`, themeId: theme.id, role: 'surface-light', value: theme.surfaceLight, category: 'color', mode: 'light' },
    { id: `${theme.id}.surface-dark`, themeId: theme.id, role: 'surface-dark', value: theme.surfaceDark, category: 'color', mode: 'dark' },
    { id: `${theme.id}.border-light`, themeId: theme.id, role: 'border-light', value: theme.borderLight, category: 'color', mode: 'light' },
    { id: `${theme.id}.border-dark`, themeId: theme.id, role: 'border-dark', value: theme.borderDark, category: 'color', mode: 'dark' },
    { id: `${theme.id}.text-light`, themeId: theme.id, role: 'text-light', value: theme.textLight, category: 'color', mode: 'light' },
    { id: `${theme.id}.text-dark`, themeId: theme.id, role: 'text-dark', value: theme.textDark, category: 'color', mode: 'dark' },
    { id: `${theme.id}.muted-light`, themeId: theme.id, role: 'muted-light', value: theme.mutedLight, category: 'color', mode: 'light' },
    { id: `${theme.id}.muted-dark`, themeId: theme.id, role: 'muted-dark', value: theme.mutedDark, category: 'color', mode: 'dark' },
    { id: `${theme.id}.gradient`, themeId: theme.id, role: 'gradient', value: theme.gradient, category: 'effect', mode: 'shared' },
    { id: `${theme.id}.hero`, themeId: theme.id, role: 'hero', value: theme.hero, category: 'effect', mode: 'shared' },
  ];
}

export function createGdsTokenGraph(): GdsTokenGraph {
  const themes = getGdsVibeThemes();
  const nodes = themes.flatMap(createThemeNodes);

  return {
    generatedAt: new Date().toISOString(),
    themeCount: themes.length,
    tokenCount: nodes.length,
    themes: themes.map((theme) => theme.id),
    nodes,
  };
}

export function validateGdsTokenGraph(graph: GdsTokenGraph = createGdsTokenGraph()): GdsTokenValidationReport {
  const findings: GdsTokenValidationFinding[] = [];
  const seen = new Set<string>();
  const rolePairs = new Map<string, Set<string>>();

  for (const node of graph.nodes) {
    if (seen.has(node.id)) {
      findings.push({
        severity: 'error',
        rule: 'token.duplicate-id',
        tokenId: node.id,
        message: `Token id "${node.id}" is duplicated in the graph.`,
      });
    }
    seen.add(node.id);

    if (!COLOR_ROLES.has(node.role) && node.category === 'color') {
      findings.push({
        severity: 'warning',
        rule: 'token.unknown-role',
        tokenId: node.id,
        message: `Token "${node.id}" uses a non-standard color role.`,
      });
    }

    if (node.category === 'color' && !COLOR_PATTERN.test(node.value.trim())) {
      findings.push({
        severity: 'error',
        rule: 'token.invalid-color',
        tokenId: node.id,
        message: `Token "${node.id}" must resolve to a static CSS color, but received "${node.value}".`,
      });
    }

    const pairKey = `${node.themeId}:${node.role.replace(/-(light|dark)$/, '')}`;
    const pairSet = rolePairs.get(pairKey) ?? new Set<string>();
    pairSet.add(node.mode);
    rolePairs.set(pairKey, pairSet);
  }

  for (const [pairKey, pairSet] of rolePairs) {
    const [, baseRole] = pairKey.split(':');
    if (!MODE_PAIRED_BASE_ROLES.has(baseRole)) {
      continue;
    }
    if (!pairSet.has('light')) {
      findings.push({
        severity: 'error',
        rule: 'token.missing-light-pair',
        tokenId: pairKey,
        message: `Token pair "${pairKey}" is missing its light-mode value.`,
      });
    }
    if (!pairSet.has('dark')) {
      findings.push({
        severity: 'error',
        rule: 'token.missing-dark-pair',
        tokenId: pairKey,
        message: `Token pair "${pairKey}" is missing its dark-mode value.`,
      });
    }
  }

  const errorCount = findings.filter((finding) => finding.severity === 'error').length;
  const warningCount = findings.length - errorCount;

  return {
    graph,
    findings,
    errorCount,
    warningCount,
    ok: errorCount === 0,
  };
}

function createNodeMap(graph: GdsTokenGraph) {
  return new Map(graph.nodes.map((node) => [node.id, node.value]));
}

export function createGdsTokenDiff(before: GdsTokenGraph, after: GdsTokenGraph = createGdsTokenGraph()): GdsTokenDiffReport {
  const beforeMap = createNodeMap(before);
  const afterMap = createNodeMap(after);
  const tokenIds = new Set([...beforeMap.keys(), ...afterMap.keys()]);
  const entries: GdsTokenDiffEntry[] = [];

  for (const tokenId of [...tokenIds].sort()) {
    const beforeValue = beforeMap.get(tokenId);
    const afterValue = afterMap.get(tokenId);

    if (beforeValue == null && afterValue != null) {
      entries.push({ type: 'added', tokenId, after: afterValue });
      continue;
    }
    if (beforeValue != null && afterValue == null) {
      entries.push({ type: 'removed', tokenId, before: beforeValue });
      continue;
    }
    if (beforeValue !== afterValue) {
      entries.push({ type: 'changed', tokenId, before: beforeValue, after: afterValue });
    }
  }

  return {
    comparedAt: new Date().toISOString(),
    beforeTokenCount: before.tokenCount,
    afterTokenCount: after.tokenCount,
    changedCount: entries.length,
    entries,
  };
}

export function createGdsThemeCompatibilityReport(graph: GdsTokenGraph = createGdsTokenGraph()): GdsThemeCompatibilityReport {
  const themeMap = new Map<GdsThemePresetId, GdsTokenNode[]>();
  for (const node of graph.nodes) {
    const nodes = themeMap.get(node.themeId) ?? [];
    nodes.push(node);
    themeMap.set(node.themeId, nodes);
  }

  const themes: GdsThemeCompatibilityResult[] = [...themeMap.entries()].map(([themeId, nodes]) => {
    const get = (role: GdsTokenNode['role']) => nodes.find((node) => node.role === role)?.value ?? 'missing';
    const surfaceDefinitions: GdsCompatibilitySurfaceBase[] = [
      { surface: 'page', mode: 'light', foreground: get('text-light'), background: get('canvas-light') },
      { surface: 'page', mode: 'dark', foreground: get('text-dark'), background: get('canvas-dark') },
      { surface: 'shell', mode: 'light', foreground: get('text-light'), background: get('shell-light') },
      { surface: 'shell', mode: 'dark', foreground: get('text-dark'), background: get('shell-dark') },
      { surface: 'card', mode: 'light', foreground: get('text-light'), background: get('surface-light') },
      { surface: 'card', mode: 'dark', foreground: get('text-dark'), background: get('surface-dark') },
      { surface: 'border', mode: 'light', foreground: get('border-light'), background: get('surface-light') },
      { surface: 'border', mode: 'dark', foreground: get('border-dark'), background: get('surface-dark') },
      { surface: 'primary-action', mode: 'light', foreground: get('canvas-light'), background: get('primary') },
      { surface: 'primary-action', mode: 'dark', foreground: get('canvas-dark'), background: get('primary') },
      { surface: 'muted-copy', mode: 'light', foreground: get('muted-light'), background: get('surface-light') },
      { surface: 'muted-copy', mode: 'dark', foreground: get('muted-dark'), background: get('surface-dark') },
    ];

    const surfaces: GdsThemeCompatibilitySurface[] = surfaceDefinitions.map((surface) => ({
      ...surface,
      status: [surface.foreground, surface.background].includes('missing') ? 'needs-review' : 'compatible',
    }));

    return { themeId, surfaces };
  });

  return {
    checkedAt: new Date().toISOString(),
    themeCount: themes.length,
    compatibleThemeCount: themes.filter((theme) => theme.surfaces.every((surface) => surface.status === 'compatible')).length,
    themes,
  };
}

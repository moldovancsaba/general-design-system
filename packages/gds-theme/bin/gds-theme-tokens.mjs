#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import {
  createGdsTokenDiff,
  createGdsTokenGraph,
  createGdsThemeCompatibilityReport,
  validateGdsTokenGraph,
} from '../dist/index.mjs';

const [, , command, ...rest] = process.argv;

function getArg(name, fallback) {
  const index = rest.findIndex((arg) => arg === name);
  return index === -1 ? fallback : (rest[index + 1] ?? fallback);
}

function render(value, format) {
  if (format === 'json') {
    return JSON.stringify(value, null, 2);
  }

  if (command === 'validate') {
    const report = value;
    if (!report.findings.length) {
      return `GDS token validation passed: ${report.graph.tokenCount} tokens across ${report.graph.themeCount} themes.`;
    }
    return [
      `GDS token validation found ${report.findings.length} issue(s):`,
      ...report.findings.map((finding) => `- [${finding.severity}] ${finding.rule} (${finding.tokenId}): ${finding.message}`),
    ].join('\n');
  }

  if (command === 'compatibility') {
    const report = value;
    return [
      `GDS theme compatibility report: ${report.compatibleThemeCount}/${report.themeCount} themes fully compatible.`,
      ...report.themes.map((theme) => `- ${theme.themeId}: ${theme.surfaces.filter((surface) => surface.status === 'compatible').length}/${theme.surfaces.length} surfaces compatible`),
    ].join('\n');
  }

  if (command === 'diff') {
    const report = value;
    return [
      `GDS token diff: ${report.changedCount} changed token(s).`,
      ...report.entries.map((entry) => `- ${entry.type} ${entry.tokenId}${entry.before ? ` | before=${entry.before}` : ''}${entry.after ? ` | after=${entry.after}` : ''}`),
    ].join('\n');
  }

  return JSON.stringify(value, null, 2);
}

if (!['graph', 'validate', 'compatibility', 'diff'].includes(command)) {
  console.error('Usage: gds-theme-tokens <graph|validate|compatibility|diff> [--format text|json] [--compare path-to-graph.json]');
  process.exit(1);
}

const format = getArg('--format', 'text');

if (command === 'graph') {
  console.log(render(createGdsTokenGraph(), 'json'));
  process.exit(0);
}

if (command === 'validate') {
  const report = validateGdsTokenGraph();
  console.log(render(report, format));
  process.exit(report.ok ? 0 : 1);
}

if (command === 'compatibility') {
  console.log(render(createGdsThemeCompatibilityReport(), format));
  process.exit(0);
}

const comparePath = getArg('--compare');
if (!comparePath) {
  console.error('Usage: gds-theme-tokens diff --compare path-to-graph.json [--format text|json]');
  process.exit(1);
}

const before = JSON.parse(readFileSync(comparePath, 'utf8'));
const report = createGdsTokenDiff(before, createGdsTokenGraph());
console.log(render(report, format));

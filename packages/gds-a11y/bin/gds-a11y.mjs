#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { createGdsA11yReport, formatGdsA11yReport } from '../dist/index.mjs';

const [, , command, filePath] = process.argv;

if (command === 'format-report' && filePath) {
  const report = JSON.parse(readFileSync(filePath, 'utf8'));
  console.log(formatGdsA11yReport(report));
  process.exit(report.status === 'failure' ? 1 : 0);
}

if (command === 'empty-report') {
  console.log(JSON.stringify(createGdsA11yReport({ route: 'about:blank' }), null, 2));
  process.exit(0);
}

console.log(`gds-a11y

Commands:
  gds-a11y empty-report
  gds-a11y format-report ./gds-a11y-report.json
`);

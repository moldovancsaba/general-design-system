import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const failures = [];

const packageJsonPath = resolve(root, 'packages/gds-a11y/package.json');
const sourcePath = resolve(root, 'packages/gds-a11y/src/index.ts');
const docsPath = resolve(root, 'A11Y_CI_PACKAGE.md');
const apiReferencePath = resolve(root, 'API_REFERENCE.md');

const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
const source = readFileSync(sourcePath, 'utf8');
const docs = readFileSync(docsPath, 'utf8');
const apiReference = readFileSync(apiReferencePath, 'utf8');

const requiredExports = [
  'createGdsA11yTest',
  'runGdsAxeScan',
  'expectGdsTabOrder',
  'expectGdsFocusTrap',
  'runGdsContrastGate',
  'createGdsA11yReport',
  'formatGdsA11yReport',
  'applyGdsA11ySuppressions',
];

if (pkg.name !== '@sovereignsquad/gds-a11y') {
  failures.push('gds-a11y package name is incorrect.');
}

if (!pkg.peerDependencies?.['@playwright/test'] || !pkg.peerDependencies?.['axe-core']) {
  failures.push('gds-a11y must declare @playwright/test and axe-core as peer dependencies.');
}

if (!pkg.peerDependenciesMeta?.['@playwright/test']?.optional || !pkg.peerDependenciesMeta?.['axe-core']?.optional) {
  failures.push('gds-a11y peer dependencies must be optional so consumers opt into CI weight.');
}

for (const exportName of requiredExports) {
  if (!source.includes(`function ${exportName}`)) {
    failures.push(`Missing package export implementation: ${exportName}`);
  }
  if (!docs.includes(exportName)) {
    failures.push(`A11Y_CI_PACKAGE.md does not document ${exportName}.`);
  }
  if (!apiReference.includes(exportName)) {
    failures.push(`API_REFERENCE.md does not document ${exportName}.`);
  }
}

for (const required of [
  'suppressed with expiry',
  'keyboard',
  'focus trap',
  'contrast',
  'axe',
  'Playwright',
]) {
  if (!docs.toLowerCase().includes(required.toLowerCase())) {
    failures.push(`A11Y_CI_PACKAGE.md is missing required topic: ${required}`);
  }
}

for (const outputFile of [
  'packages/gds-a11y/dist/index.js',
  'packages/gds-a11y/dist/index.mjs',
  'packages/gds-a11y/dist/index.d.ts',
]) {
  if (!existsSync(resolve(root, outputFile))) {
    failures.push(`Missing built artifact: ${outputFile}`);
  }
}

if (failures.length) {
  console.error('GDS a11y package verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`GDS a11y package verification passed with ${requiredExports.length} public helpers.`);

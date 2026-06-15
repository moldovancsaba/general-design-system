import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();

const files = {
  component: 'packages/gds-core/src/GdsAccessGate.tsx',
  runtime: 'packages/gds-core/src/GdsAccessGateRuntime.ts',
  tests: 'packages/gds-core/src/core.test.tsx',
  index: 'packages/gds-core/src/index.ts',
  client: 'packages/gds-core/src/client.ts',
  server: 'packages/gds-core/src/server.ts',
  docs: 'docs/ACCESS_GATE.md',
  readme: 'README.md',
  registry: 'apps/playground/src/pattern-registry.ts',
  pages: 'apps/playground/src/pattern-pages.tsx',
  coverage: 'apps/playground/src/pattern-export-coverage.ts',
};

const sources = Object.fromEntries(
  Object.entries(files).map(([key, path]) => [key, readFileSync(resolve(root, path), 'utf8')]),
);

const failures = [];

function requireIncludes(sourceKey, snippet, message = `${files[sourceKey]} must include ${snippet}`) {
  if (!sources[sourceKey].includes(snippet)) {
    failures.push(message);
  }
}

for (const sourceKey of ['index', 'client']) {
  requireIncludes(sourceKey, "export * from './GdsAccessGate';");
}
requireIncludes('server', "export * from './GdsAccessGateRuntime';");

for (const exportName of [
  'GdsAccessGate',
  'getGdsAccessGateStates',
  'getGdsAccessGateReasons',
  'getGdsAccessGateActionPriority',
  'sortGdsAccessGateActions',
  'validateGdsAccessGateContract',
  'redactGdsAccessGateMetadata',
  'createGdsAccessGateEvent',
  'resolveGdsAccessState',
  'createGdsAccessAdapter',
  'resolveGdsAccessAdapterState',
]) {
  requireIncludes('coverage', `exportName: '${exportName}'`, `Pattern export coverage is missing ${exportName}.`);
}

for (const snippet of [
  'protectedContentPolicy',
  'never-render-while-locked',
  'data-gds-access-state',
]) {
  requireIncludes('component', snippet);
}

for (const snippet of [
  'redactGdsAccessGateMetadata',
  'network-timeout',
  'AbortController',
  'validateGdsAccessGateContract',
]) {
  requireIncludes('runtime', snippet);
}

for (const snippet of [
  'never evaluates protected content while the access gate is locked',
  'Protected member-only article body',
  'resolveGdsAccessAdapterState',
  'redactGdsAccessGateMetadata',
  "reason: 'network-timeout'",
]) {
  requireIncludes('tests', snippet);
}

for (const snippet of [
  'GdsAccessGate',
  'protectedContentPolicy="never-render-while-locked"',
  'never-render-while-locked',
  'metadata-only',
  '3500 ms timeout',
  'Rollback And Recovery',
  'Accessibility',
  'https://sovereignsquad.github.io/general-design-system/patterns/access#access-gates',
]) {
  requireIncludes('docs', snippet);
}

for (const snippet of [
  'Access Gate and Paywall Runtime',
  'GdsAccessGate',
  'verify:access-gate',
]) {
  requireIncludes('readme', snippet);
}

requireIncludes('registry', "id: 'access-gates'");
requireIncludes('registry', "sourceComponent: 'GdsAccessGate / resolveGdsAccessState'");
requireIncludes('pages', "case 'access-gates':");
requireIncludes('pages', '<GdsAccessGate');

if (failures.length > 0) {
  console.error('Access gate contract verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Access gate contract verification passed.');

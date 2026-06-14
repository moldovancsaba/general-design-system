import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const root = process.cwd();
const sourceRoots = [
  resolve(root, 'packages/gds-core/src'),
  resolve(root, 'apps/playground/src'),
];
const helperFile = resolve(root, 'packages/gds-core/src/OwnedContrastSurface.tsx');
const explorerFile = resolve(root, 'packages/gds-core/src/ReferenceThemeExplorer.tsx');

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (/\.(ts|tsx)$/.test(entry)) {
      files.push(fullPath);
    }
  }
  return files;
}

const failures = [];
const helperSource = readFileSync(helperFile, 'utf8');
const explorerSource = readFileSync(explorerFile, 'utf8');

for (const proof of [
  'createGdsOwnedContrastTokens',
  'getGdsOwnedContrastProps',
  'data-gds-owned-contrast',
  'data-gds-local-contrast',
]) {
  if (!helperSource.includes(proof)) {
    failures.push(`OwnedContrastSurface.tsx must preserve helper proof: ${proof}`);
  }
}

for (const proof of [
  'getGdsOwnedContrastProps',
  'createGdsOwnedContrastTokens',
  "role: 'theme-lab-controls'",
  "role: 'vibe-gallery-card'",
  "role: 'vibe-contract'",
]) {
  if (!explorerSource.includes(proof)) {
    failures.push(`ReferenceThemeExplorer.tsx must consume the owned-contrast contract: ${proof}`);
  }
}

for (const sourceRoot of sourceRoots) {
  for (const file of walk(sourceRoot)) {
    if (file === helperFile || /\.test\.tsx?$/.test(file)) {
      continue;
    }

    const source = readFileSync(file, 'utf8');
    if (source.includes('data-gds-local-contrast=') || source.includes('data-gds-owned-contrast=')) {
      failures.push(`${relative(root, file)} may not declare owned/local contrast markers directly. Use getGdsOwnedContrastProps().`);
    }
  }
}

if (failures.length) {
  console.error('Owned contrast compliance verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Owned contrast compliance verification passed.');

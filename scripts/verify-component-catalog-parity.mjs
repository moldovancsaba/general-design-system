/**
 * Component → pattern-registry parity gate (issue #368).
 *
 * FAILS CI if a public PascalCase UI component exported from
 * `@sovereignsquad/gds-core` or `@sovereignsquad/gds-admin` is neither
 * registered in the pattern registry (as a `sourceComponent`) nor recorded
 * in the committed exemption allowlist (`boundary/component-catalog-exemptions.json`).
 *
 * This is the structural guarantee that every consumer-facing UI component is
 * demonstrated in GDS's own catalog — registration is what drives catalog render,
 * per-theme/forced-colors verification, i18n routing, and a11y evidence. Export
 * coverage alone is not enough: the 17 lane components shipped export-covered but
 * never rendered/evidenced. This gate closes that gap.
 *
 * Non-catalog exports (layout primitives, typography, providers/context,
 * formatters, templates/catalog helpers, Admin/Partner sub-parts, icons,
 * evidence/utility surfaces) are exempted with a reason in the allowlist, which
 * is reviewed via diff. Hooks (`use*`) and type-only exports are dropped by
 * classification and never require registration or exemption.
 *
 * Deterministic, fast, no network. Mirrors the helper patterns in
 * verify-pattern-export-coverage.mjs and the failure idiom in
 * verify-pattern-catalog-coverage.mjs.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const root = process.cwd();
const registryPath = resolve(root, 'apps/playground/src/pattern-registry.ts');
const exemptionsPath = resolve(root, 'boundary/component-catalog-exemptions.json');

// --- Reused helper: directory traversal (from verify-pattern-export-coverage.mjs) ---
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

// --- Reused helper: public runtime exports of a single source file ---
// (from verify-pattern-export-coverage.mjs collectPublicRuntimeExports, applied per-file)
function collectRuntimeExports(file) {
  const names = new Set();
  const source = readFileSync(file, 'utf8');
  for (const match of source.matchAll(/export\s+(?:function|const|class)\s+([A-Za-z0-9_]+)/g)) {
    names.add(match[1]);
  }
  return names;
}

// Resolve a module specifier reachable from a package entrypoint to a concrete
// source file, so we only scan what is genuinely re-exported through the public
// index/client/server barrels — not internal-only or `.test` files.
function resolveModule(fromFile, spec) {
  const base = resolve(dirname(fromFile), spec);
  const candidates = [
    `${base}.tsx`,
    `${base}.ts`,
    join(base, 'index.tsx'),
    join(base, 'index.ts'),
  ];
  return candidates.find((candidate) => existsSync(candidate));
}

// Follow `export * from './X'` / `export { ... } from './X'` re-exports from the
// package's public entrypoints (index/client/server) and collect every public
// runtime export name they expose. Returns the union across the given entrypoints.
function collectPublicComponentExports(entrypoints) {
  const names = new Set();
  const visited = new Set();

  function visitFile(file) {
    if (!file || visited.has(file)) return;
    visited.add(file);

    // Direct runtime exports declared in this file.
    for (const name of collectRuntimeExports(file)) {
      names.add(name);
    }

    // Follow re-export barrels.
    const source = readFileSync(file, 'utf8');
    for (const match of source.matchAll(/export\s+(?:\*|\{[^}]*\})\s+from\s+['"]([^'"]+)['"]/g)) {
      const spec = match[1];
      if (!spec.startsWith('.')) continue; // external re-exports are not GDS components
      const resolved = resolveModule(file, spec);
      if (resolved) visitFile(resolved);
    }
  }

  for (const entrypoint of entrypoints) {
    if (existsSync(entrypoint)) visitFile(entrypoint);
  }

  return names;
}

// A "UI component" name: PascalCase (starts uppercase, has a lowercase letter),
// excluding hooks (use*). Type-only exports never appear here because we only
// scan runtime `export function|const|class` declarations.
function isComponentName(name) {
  return /^[A-Z]/.test(name) && /[a-z]/.test(name) && !/^use[A-Z]/.test(name);
}

// --- Collect public component exports from both packages ---
const packageEntrypoints = {
  '@sovereignsquad/gds-core': [
    resolve(root, 'packages/gds-core/src/index.ts'),
    resolve(root, 'packages/gds-core/src/client.ts'),
    resolve(root, 'packages/gds-core/src/server.ts'),
  ],
  '@sovereignsquad/gds-admin': [
    resolve(root, 'packages/gds-admin/src/index.ts'),
    resolve(root, 'packages/gds-admin/src/client.ts'),
    resolve(root, 'packages/gds-admin/src/server.ts'),
  ],
};

const exportedComponents = new Set();
for (const entrypoints of Object.values(packageEntrypoints)) {
  for (const name of collectPublicComponentExports(entrypoints)) {
    if (isComponentName(name)) exportedComponents.add(name);
  }
}

// --- Collect sourceComponent names referenced by the pattern registry ---
// (mirrors the sourceComponent parsing in verify-pattern-export-coverage.mjs)
const registrySource = readFileSync(registryPath, 'utf8');
const registeredComponents = new Set();
for (const match of registrySource.matchAll(/sourceComponent:\s*'([^']+)'/g)) {
  // Multi-component rows read like 'DiscoveryShell / AppShell' or 'A, B'.
  for (const token of match[1].split(/[\/,\s]+/)) {
    const name = token.trim();
    if (name) registeredComponents.add(name);
  }
}

// --- Read the reviewed exemption allowlist ---
// Shape: either a { componentName: reason } map, or an array of { name, reason }.
function readExemptions() {
  if (!existsSync(exemptionsPath)) {
    console.error(`Missing ${exemptionsPath}. Seed it with { "exemptions": { "ComponentName": "reason" } }.`);
    process.exit(1);
  }
  const raw = JSON.parse(readFileSync(exemptionsPath, 'utf8'));
  const map = new Map();
  const source = Array.isArray(raw) ? raw : raw.exemptions ?? raw;
  if (Array.isArray(source)) {
    for (const entry of source) map.set(entry.name, entry.reason);
  } else {
    for (const [name, reason] of Object.entries(source)) map.set(name, reason);
  }
  return map;
}

const exemptions = readExemptions();

// --- Set-difference membership check ---
const unregistered = [...exportedComponents]
  .filter((name) => !registeredComponents.has(name) && !exemptions.has(name))
  .sort();

const staleExemptions = [...exemptions.keys()]
  .filter((name) => !exportedComponents.has(name))
  .sort();

// --- Report ---
if (staleExemptions.length) {
  console.warn('Component-catalog parity: stale exemption(s) — no longer a public export, remove from the allowlist:');
  for (const name of staleExemptions) {
    console.warn(`- ${name}`);
  }
}

if (unregistered.length) {
  console.error('Component-catalog parity verification failed.');
  console.error('The following public UI component(s) are neither registered in the pattern catalog nor exempted:');
  for (const name of unregistered) {
    console.error(`- ${name}`);
  }
  console.error('\nResolve each by ONE of:');
  console.error('  1. Register it in apps/playground/src/pattern-registry.ts as a `sourceComponent` (renders it in the catalog,');
  console.error('     which drives per-theme/forced-colors verification, i18n routing, and a11y evidence). Preferred for UI patterns.');
  console.error('  2. Add it to boundary/component-catalog-exemptions.json with a short reason (for genuinely non-catalog exports:');
  console.error('     layout primitives, typography, providers/context, formatters, templates, Admin*/Partner* sub-parts, icons, utilities).');
  process.exit(1);
}

console.log(
  `Component-catalog parity verification passed (${exportedComponents.size} public UI components; ` +
    `${exportedComponents.size - exemptions.size} registered, ${[...exemptions.keys()].filter((n) => exportedComponents.has(n)).length} exempted).`,
);

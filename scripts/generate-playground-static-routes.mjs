import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distRoot = join(repoRoot, 'apps', 'playground', 'dist');
const indexPath = join(distRoot, 'index.html');

const staticRoutes = [
  '/patterns',
  '/patterns/foundations',
  '/patterns/public',
  '/patterns/operations',
  '/patterns/data',
  '/patterns/access',
  '/patterns/feedback',
  '/coverage',
  '/api',
  '/maturity',
  '/use-cases',
  '/install',
  '/governance',
  '/themes',
  '/live-demos',
  '/live-demos/surfaces',
  '/live-demos/layouts',
  '/live-demos/semantics',
  '/live-demos/food',
  '/live-demos/playback',
  '/live-demos/analytics',
  '/request-feature',
];

if (!existsSync(indexPath)) {
  throw new Error(`Missing playground build shell at ${indexPath}`);
}

for (const route of staticRoutes) {
  const routeDir = join(distRoot, route.replace(/^\//, ''));
  mkdirSync(routeDir, { recursive: true });
  copyFileSync(indexPath, join(routeDir, 'index.html'));
}

copyFileSync(indexPath, join(distRoot, '404.html'));

console.log(`Generated ${staticRoutes.length} static playground route shells.`);

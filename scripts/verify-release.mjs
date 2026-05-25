import { mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const version = readFileSync(resolve(root, 'VERSION'), 'utf8').trim();
const compatibility = JSON.parse(readFileSync(resolve(root, 'COMPATIBILITY_MATRIX.json'), 'utf8'));

const packageDescriptors = [
  {
    name: '@gds/theme',
    manifestPath: 'packages/gds-theme/package.json',
    expectedPeers: ['react', 'react-dom', '@mantine/core', '@mantine/hooks', '@mantine/modals', '@mantine/notifications'],
  },
  {
    name: '@gds/core',
    manifestPath: 'packages/gds-core/package.json',
    expectedPeers: ['react', 'react-dom', '@mantine/core', '@mantine/hooks', '@tabler/icons-react'],
  },
  {
    name: '@gds/admin',
    manifestPath: 'packages/gds-admin/package.json',
    expectedPeers: ['react', 'react-dom', '@mantine/core', '@mantine/hooks', '@tabler/icons-react'],
  },
];

function readJson(path) {
  return JSON.parse(readFileSync(resolve(root, path), 'utf8'));
}

function listDistEntries(pkgDir) {
  return [
    'dist/index.js',
    'dist/index.mjs',
    'dist/index.d.ts',
    'dist/client.js',
    'dist/client.mjs',
    'dist/client.d.ts',
    'dist/server.js',
    'dist/server.mjs',
    'dist/server.d.ts',
  ].map((entry) => resolve(root, pkgDir, entry));
}

function verifyVersionAlignment() {
  const mismatches = [];

  if (compatibility.gdsVersion !== version) {
    mismatches.push(`COMPATIBILITY_MATRIX.json has gdsVersion ${compatibility.gdsVersion}, expected ${version}`);
  }

  for (const descriptor of packageDescriptors) {
    const manifest = readJson(descriptor.manifestPath);

    if (manifest.version !== version) {
      mismatches.push(`${descriptor.manifestPath} has version ${manifest.version}, expected ${version}`);
    }

    for (const [name, range] of Object.entries(manifest.peerDependencies ?? {})) {
      if (name.startsWith('@gds/')) {
        if (range !== `^${version}`) {
          mismatches.push(`${descriptor.manifestPath} has internal peer ${name}=${range}, expected ^${version}`);
        }
        continue;
      }

      const expectedRange = compatibility.peerRanges[name];
      if (expectedRange && range !== expectedRange) {
        mismatches.push(`${descriptor.manifestPath} peer ${name}=${range}, expected ${expectedRange}`);
      }
    }

    for (const expectedPeer of descriptor.expectedPeers) {
      if (!manifest.peerDependencies?.[expectedPeer]) {
        mismatches.push(`${descriptor.manifestPath} is missing expected peer dependency ${expectedPeer}`);
      }
    }
  }

  return mismatches;
}

function verifyBuiltArtifacts() {
  const mismatches = [];

  for (const descriptor of packageDescriptors) {
    const manifest = readJson(descriptor.manifestPath);
    const pkgDir = dirname(descriptor.manifestPath);

    for (const distEntry of listDistEntries(pkgDir)) {
      if (!existsSync(distEntry)) {
        mismatches.push(`Missing build artifact: ${distEntry.replace(`${root}/`, '')}`);
      }
    }

    for (const [subpath, exportMap] of Object.entries(manifest.exports ?? {})) {
      for (const target of Object.values(exportMap)) {
        const exportTarget = resolve(root, pkgDir, String(target));
        if (!existsSync(exportTarget)) {
          mismatches.push(`Export ${manifest.name}${subpath} points to missing file ${String(target)}`);
        }
      }
    }
  }

  return mismatches;
}

function createReleaseManifest() {
  return {
    version,
    generatedAt: new Date().toISOString(),
    supportedLines: compatibility.supportedLines,
    packages: packageDescriptors.map((descriptor) => {
      const manifest = readJson(descriptor.manifestPath);
      const pkgDir = dirname(descriptor.manifestPath);
      return {
        name: manifest.name,
        version: manifest.version,
        distVerified: listDistEntries(pkgDir).every((entry) => existsSync(entry)),
        exportsVerified: Object.values(manifest.exports ?? {}).every((exportMap) =>
          Object.values(exportMap).every((target) => existsSync(resolve(root, pkgDir, String(target)))),
        ),
        peerDependencies: manifest.peerDependencies ?? {},
      };
    }),
  };
}

function runSmokeInstall() {
  const workspace = mkdtempSync(join(tmpdir(), 'gds-release-smoke-'));
  const tarballsDir = join(workspace, 'tarballs');
  const consumerDir = join(workspace, 'consumer');

  try {
    execFileSync('mkdir', ['-p', tarballsDir, consumerDir], { cwd: root });

    const tarballs = packageDescriptors.map((descriptor) => {
      const packageDir = resolve(root, dirname(descriptor.manifestPath));
      const packed = execFileSync('npm', ['pack', '--pack-destination', tarballsDir, packageDir], {
        cwd: root,
        encoding: 'utf8',
      }).trim();

      return join(tarballsDir, packed.split('\n').pop());
    });

    const consumerPackage = {
      name: 'gds-smoke-consumer',
      private: true,
      type: 'module',
      dependencies: {
        react: compatibility.peerRanges.react,
        'react-dom': compatibility.peerRanges['react-dom'],
        '@mantine/core': compatibility.peerRanges['@mantine/core'],
        '@mantine/hooks': compatibility.peerRanges['@mantine/hooks'],
        '@mantine/modals': compatibility.peerRanges['@mantine/modals'],
        '@mantine/notifications': compatibility.peerRanges['@mantine/notifications'],
        '@tabler/icons-react': compatibility.peerRanges['@tabler/icons-react'],
        '@gds/theme': tarballs[0],
        '@gds/core': tarballs[1],
        '@gds/admin': tarballs[2],
      },
    };

    writeFileSync(join(consumerDir, 'package.json'), JSON.stringify(consumerPackage, null, 2));
    writeFileSync(
      join(consumerDir, 'smoke.mjs'),
      `import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { GdsProvider, GdsColorSchemeScript } from '@gds/theme/client';
import { gdsTheme } from '@gds/theme/server';
import { AccentPanel, PageHeader, FormField, getSemanticActionLabel } from '@gds/core/server';
import { SemanticButton } from '@gds/core/client';
import { WorkspaceHeader } from '@gds/admin/server';
import { AppShell } from '@gds/admin/client';

if (!gdsTheme || !GdsColorSchemeScript || !AccentPanel || !PageHeader || !FormField || !WorkspaceHeader || !AppShell || !SemanticButton) {
  throw new Error('One or more expected exports are missing from packed packages');
}

const html = renderToString(
  createElement(
    GdsProvider,
    null,
    createElement(PageHeader, { title: getSemanticActionLabel('save', 'hu') }),
    createElement(AccentPanel, { title: 'Accent surface' }, 'Release-safe surface'),
  ),
);

if (!html.includes('Mentés') || !html.includes('Release-safe surface')) {
  throw new Error('Smoke consumer render did not produce expected output');
}
`,
    );

    execFileSync('npm', ['install', '--package-lock=false', '--no-fund', '--no-audit'], {
      cwd: consumerDir,
      stdio: 'pipe',
    });
    execFileSync('node', ['smoke.mjs'], { cwd: consumerDir, stdio: 'pipe' });
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
}

function main() {
  const mismatches = [...verifyVersionAlignment(), ...verifyBuiltArtifacts()];
  const releaseManifest = createReleaseManifest();

  if (mismatches.length) {
    console.error('Release verification failed:');
    for (const mismatch of mismatches) {
      console.error(`- ${mismatch}`);
    }
    process.exit(1);
  }

  runSmokeInstall();
  console.log(JSON.stringify(releaseManifest, null, 2));
}

main();

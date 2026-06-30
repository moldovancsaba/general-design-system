import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const root = process.cwd();
const version = process.env.GDS_PUBLISHED_SMOKE_VERSION ?? readFileSync(resolve(root, 'VERSION'), 'utf8').trim();
const registry = process.env.GDS_NPM_REGISTRY ?? 'https://registry.npmjs.org';
const workspaceRoot = mkdtempSync(join(tmpdir(), 'gds-published-smoke-'));

function run(command, args, cwd = workspaceRoot) {
  execFileSync(command, args, {
    cwd,
    stdio: 'inherit',
    env: {
      ...process.env,
      npm_config_registry: registry,
    },
  });
}

try {
  writeFileSync(
    join(workspaceRoot, 'package.json'),
    JSON.stringify(
      {
        name: 'gds-published-consumer-smoke',
        private: true,
        type: 'module',
        scripts: {
          build: 'tsc --noEmit',
          smoke: 'node runtime-smoke.mjs',
        },
        dependencies: {
          '@doneisbetter/gds': version,
          '@doneisbetter/gds-theme': version,
          '@doneisbetter/gds-core': version,
          '@doneisbetter/gds-admin': version,
          '@doneisbetter/gds-a11y': version,
          '@doneisbetter/gds-eslint-config': version,
          '@doneisbetter/gds-compliance': version,
          '@mantine/core': '8.3.6',
          '@mantine/hooks': '8.3.6',
          '@mantine/modals': '8.3.6',
          '@mantine/notifications': '8.3.6',
          '@tabler/icons-react': '3.35.0',
          '@types/node': '24.10.1',
          '@types/react': '19.2.2',
          '@types/react-dom': '19.2.2',
          react: '19.2.0',
          'react-dom': '19.2.0',
          typescript: '6.0.2',
        },
      },
      null,
      2,
    ),
  );

  writeFileSync(
    join(workspaceRoot, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          module: 'ESNext',
          jsx: 'react-jsx',
          moduleResolution: 'Bundler',
          strict: true,
          skipLibCheck: true,
          noEmit: true,
          types: ['node'],
        },
        include: ['index.tsx'],
      },
      null,
      2,
    ),
  );

  writeFileSync(
    join(workspaceRoot, 'index.tsx'),
    `import React from 'react';
import { GdsProvider, ReferenceThemeExplorer, GdsDataTable, createGdsTableAdapter, GdsSchemaForm, jsonSchemaToGdsFormSchema } from '@doneisbetter/gds/client';
import { getGdsThemePresets, resolveGdsVibeTheme } from '@doneisbetter/gds-theme';
import { AccessSummary } from '@doneisbetter/gds-core';
import { AppShell } from '@doneisbetter/gds-admin';
import type { GdsTableColumn, GdsSchemaUploadAdapter } from '@doneisbetter/gds-core/client';

const rows = [{ id: '1', name: 'Published package' }];
const columns: GdsTableColumn<(typeof rows)[number]>[] = [{ key: 'name', label: 'Name', interactive: true }];
const schema = jsonSchemaToGdsFormSchema({
  type: 'object',
  properties: { attachment: { type: 'string', format: 'binary', title: 'Attachment' } },
});
const uploadAdapter: GdsSchemaUploadAdapter = {
  upload: async ({ files }) => files.map((file) => ({ id: file.name, name: file.name })),
};

const app = (
  <GdsProvider>
    <AppShell primaryNavigation={<a href="/">Home</a>}>
      <ReferenceThemeExplorer initialSelection={{ preset: 'athlete-gold', colorScheme: 'dark', theme: {} }} />
      <AccessSummary state="allowed" title="Access" roles={['operator']} />
      <GdsDataTable
        caption="Published smoke table"
        columns={columns}
        rowId={(row) => row.id}
        adapter={createGdsTableAdapter(rows, columns)}
      />
      {schema.schema ? <GdsSchemaForm schema={schema.schema} onSubmit={() => undefined} uploadAdapter={uploadAdapter} /> : null}
    </AppShell>
  </GdsProvider>
);

const athleteGold = resolveGdsVibeTheme('athlete-gold');
const presets = getGdsThemePresets();

console.log(Boolean(app), athleteGold.label, presets.some((preset) => preset.id === 'athlete-gold'));
`,
  );

  writeFileSync(
    join(workspaceRoot, 'runtime-smoke.mjs'),
    `const [
  gds,
  theme,
  core,
  admin,
  a11y,
  compliance,
  eslintConfig,
] = await Promise.all([
  import('@doneisbetter/gds'),
  import('@doneisbetter/gds-theme'),
  import('@doneisbetter/gds-core'),
  import('@doneisbetter/gds-admin'),
  import('@doneisbetter/gds-a11y'),
  import('@doneisbetter/gds-compliance'),
  import('@doneisbetter/gds-eslint-config'),
]);

if (!gds.GdsProvider || !theme.resolveGdsVibeTheme || !core.GdsDataTable || !admin.AppShell) {
  throw new Error('Runtime exports missing from published packages.');
}

if (!a11y.createGdsA11yReport || typeof compliance !== 'object' || !Array.isArray(eslintConfig.default ?? eslintConfig)) {
  throw new Error('Tooling exports missing from published packages.');
}

if (theme.resolveGdsVibeTheme('athlete-gold').label !== 'Athlete Gold') {
  throw new Error('Athlete Gold vibe theme is not available from npm.');
}

console.log('Published package runtime imports passed.');
`,
  );

  run('npm', ['install', '--ignore-scripts']);
  run('npm', ['run', 'build']);
  run('npm', ['run', 'smoke']);

  console.log(`Published consumer smoke passed for GDS ${version} from ${registry}.`);
} finally {
  rmSync(workspaceRoot, { recursive: true, force: true });
}

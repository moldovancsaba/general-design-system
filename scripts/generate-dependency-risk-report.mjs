import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = process.cwd();
const version = readFileSync(resolve(root, 'VERSION'), 'utf8').trim();
const workspacePackageJsons = [
  'package.json',
  ...readdirSync(resolve(root, 'packages')).map((name) => `packages/${name}/package.json`),
  ...readdirSync(resolve(root, 'apps')).map((name) => `apps/${name}/package.json`),
].filter((path) => !path.includes('.next'));

function readJson(path) {
  return JSON.parse(readFileSync(resolve(root, path), 'utf8'));
}

function entriesFrom(manifest, field, workspace) {
  return Object.entries(manifest[field] ?? {}).map(([name, range]) => ({
    workspace,
    name,
    range,
    category: field,
    thirdParty: !name.startsWith('@doneisbetter/'),
  }));
}

function runAudit(args) {
  try {
    return JSON.parse(execFileSync('npm', ['audit', '--json', ...args], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }));
  } catch (error) {
    const stdout = String(error.stdout ?? '');
    if (!stdout.trim()) throw error;
    return JSON.parse(stdout);
  }
}

function collectExceptions() {
  const manifests = [
    'apps/playground/gds-adoption.json',
    'apps/reference-vite/gds-adoption.json',
    'apps/reference-next/gds-adoption.json',
    'TEMPLATES/gds-adoption.json.template',
  ];
  return manifests.flatMap((path) => {
    const manifest = readJson(path);
    return (manifest.approvedExceptions ?? [])
      .filter((exception) => exception.dependency || exception.category === 'dependency-boundary')
      .map((exception) => ({
        manifest: path,
        surface: exception.surface,
        category: exception.category,
        dependency: exception.dependency ?? null,
        owner: exception.owner,
        reviewDate: exception.reviewDate,
        status: exception.status,
      }));
  });
}

const dependencies = workspacePackageJsons.flatMap((path) => {
  const manifest = readJson(path);
  const workspace = manifest.name ?? path;
  return [
    ...entriesFrom(manifest, 'dependencies', workspace),
    ...entriesFrom(manifest, 'peerDependencies', workspace),
    ...entriesFrom(manifest, 'devDependencies', workspace),
    ...entriesFrom(manifest, 'optionalDependencies', workspace),
  ];
});

const productionAudit = runAudit(['--omit=dev']);
const fullAudit = runAudit([]);
const exceptions = collectExceptions();
const report = {
  version,
  generatedAt: new Date().toISOString(),
  summary: {
    thirdPartyRuntimeDependencies: dependencies.filter((entry) => entry.thirdParty && entry.category === 'dependencies').length,
    thirdPartyPeerDependencies: dependencies.filter((entry) => entry.thirdParty && entry.category === 'peerDependencies').length,
    thirdPartyDevDependencies: dependencies.filter((entry) => entry.thirdParty && entry.category === 'devDependencies').length,
    optionalNativeBindings: dependencies.filter((entry) => entry.category === 'optionalDependencies').length,
    activeDependencyExceptions: exceptions.filter((entry) => ['temporary', 'approved', 'active'].includes(entry.status)).length,
    expiredDependencyExceptions: exceptions.filter((entry) => entry.status === 'expired').length,
    productionVulnerabilities: Number(productionAudit.metadata?.vulnerabilities?.total ?? 0),
    totalVulnerabilities: Number(fullAudit.metadata?.vulnerabilities?.total ?? 0),
  },
  dependencies,
  exceptions,
  requiredCompatibilityCommands: [
    'npm run verify:mantine',
    'npm run audit:dependencies',
    'npm run verify:release',
  ],
};

if (report.summary.productionVulnerabilities > 0) {
  console.error(`Dependency risk report failed: ${report.summary.productionVulnerabilities} production vulnerabilities.`);
  process.exit(1);
}

if (report.summary.expiredDependencyExceptions > 0) {
  console.error(`Dependency risk report failed: ${report.summary.expiredDependencyExceptions} expired dependency exceptions.`);
  process.exit(1);
}

writeFileSync(resolve(root, 'dependency-risk-report.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(`Dependency risk report passed for ${version}: ${report.summary.thirdPartyPeerDependencies} peer dependency declarations, ${report.summary.activeDependencyExceptions} active dependency exception(s), ${report.summary.productionVulnerabilities} production vulnerabilities.`);

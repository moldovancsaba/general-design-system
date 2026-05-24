import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const version = readFileSync(resolve(root, 'VERSION'), 'utf8').trim();

const packagePaths = [
  'packages/gds-theme/package.json',
  'packages/gds-core/package.json',
  'packages/gds-admin/package.json',
];

const projectPlans = [
  'PROJECTS/IMPACT_MANTINE_REFACTOR.md',
  'PROJECTS/CAMERA_ADOPTION_PLAN.md',
  'PROJECTS/PESTIEST_MANTINE_REFACTOR.md',
];

const mismatches = [];

for (const packagePath of packagePaths) {
  const pkg = JSON.parse(readFileSync(resolve(root, packagePath), 'utf8'));
  if (pkg.version !== version) {
    mismatches.push(`${packagePath} has version ${pkg.version}, expected ${version}`);
  }
}

for (const projectPlan of projectPlans) {
  if (!existsSync(resolve(root, projectPlan))) {
    mismatches.push(`Missing required project plan: ${projectPlan}`);
  }
}

if (mismatches.length) {
  console.error('Release alignment check failed:');
  for (const mismatch of mismatches) {
    console.error(`- ${mismatch}`);
  }
  process.exit(1);
}

console.log(`Release alignment check passed for ${version}.`);

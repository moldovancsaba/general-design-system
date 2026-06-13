import { createGdsThemeAccessibilityReport } from '../packages/gds-theme/dist/index.mjs';

const report = createGdsThemeAccessibilityReport();

if (report.findings.length) {
  console.error('GDS theme accessibility findings:');
  for (const finding of report.findings) {
    console.error(
      `- [${finding.severity}] ${finding.themeId} ${finding.mode} ${finding.role}: ${finding.ratio}:1 ` +
        `(${finding.foreground} on ${finding.background}); expected ${finding.minimumRatio}:1. ${finding.message}`,
    );
  }
}

if (report.blockingCount > 0) {
  console.error(`GDS theme accessibility verification failed with ${report.blockingCount} blocking finding(s).`);
  process.exit(1);
}

console.log(
  `GDS theme accessibility verification passed: ${report.checks.length} contrast checks, ` +
    `${report.themeCount} themes, ${report.forcedColorRoles.length} forced-color roles.`,
);

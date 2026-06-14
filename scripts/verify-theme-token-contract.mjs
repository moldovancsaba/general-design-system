import {
  createGdsThemeCompatibilityReport,
  validateGdsTokenGraph,
} from '../packages/gds-theme/dist/index.mjs';

const validation = validateGdsTokenGraph();
if (!validation.ok) {
  console.error('GDS token graph validation failed:');
  for (const finding of validation.findings) {
    console.error(`- [${finding.severity}] ${finding.rule} (${finding.tokenId}): ${finding.message}`);
  }
  process.exit(1);
}

const compatibility = createGdsThemeCompatibilityReport(validation.graph);
if (compatibility.compatibleThemeCount !== compatibility.themeCount) {
  console.error(
    `GDS theme compatibility verification failed: ${compatibility.compatibleThemeCount}/${compatibility.themeCount} themes are fully compatible.`,
  );
  process.exit(1);
}

console.log(
  `GDS theme token verification passed: ${validation.graph.tokenCount} tokens across ${validation.graph.themeCount} themes; ` +
  `${compatibility.compatibleThemeCount} compatibility lanes verified.`,
);

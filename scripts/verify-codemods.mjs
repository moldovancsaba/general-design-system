import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const root = process.cwd();
const fixture = mkdtempSync(join(tmpdir(), 'gds-codemods-'));

function runCodemod(transform, file, options = []) {
  const output = execFileSync('node', ['scripts/codemods/run-codemod.mjs', transform, file, ...options], {
    cwd: root,
    encoding: 'utf8',
  });
  return JSON.parse(output);
}

function expect(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

try {
  const actionFile = join(fixture, 'Actions.tsx');
  writeFileSync(actionFile, `
import { CtaButtonGroup } from '@sovereignsquad/gds-core';
import { SemanticButton } from '@sovereignsquad/gds-core';

export function Actions() {
  return <CtaButtonGroup primary={<SemanticButton action="save" />} secondary={<SemanticButton action="cancel" />} tertiary={<SemanticButton action="help" />} />;
}
`);

  const actionReport = runCodemod('action-bar', actionFile, ['--write']);
  const actionResult = readFileSync(actionFile, 'utf8');
  expect(actionReport.contract === 'GdsCodemodResult', 'action-bar report did not expose the result contract.');
  expect(actionReport.summary.transformed === 1 && actionResult.includes('<ActionBar primary={{ action:'), 'action-bar codemod did not rewrite the supported fixture.');
  const actionIdempotentReport = runCodemod('action-bar', actionFile, ['--write']);
  expect(actionIdempotentReport.summary.transformed === 0, 'action-bar codemod is not idempotent.');

  const listingFile = join(fixture, 'Listing.tsx');
  writeFileSync(listingFile, `
import { PublicProductCard } from '@sovereignsquad/gds-core';
export function Listing() { return <PublicProductCard title="Venue" />; }
`);

  const listingReport = runCodemod('listing-card', listingFile, ['--write']);
  const listingResult = readFileSync(listingFile, 'utf8');
  expect(listingReport.summary.transformed === 1 && listingResult.includes('ListingCard'), 'listing-card codemod did not rewrite the supported fixture.');

  const mantineFile = join(fixture, 'MantineControls.tsx');
  writeFileSync(mantineFile, `
import { Button, Checkbox, Select, TextInput, Textarea } from '@mantine/core';

export function Form() {
  return <>
    <TextInput name="title" label="Title" value={title} onChange={setTitle} aria-describedby="title-help" />
    <Textarea name="summary" label="Summary" value={summary} onChange={setSummary} />
    <Checkbox name="published" label="Published" checked={published} onChange={setPublished} />
    <Select name="status" label="Status" value={status} onChange={setStatus} data={[]} />
    <Button>Save</Button>
  </>;
}
`);

  const mantineReport = runCodemod('mantine-imports', mantineFile, ['--write', '--owner=@design-system', '--remove-by=2026-10-01']);
  const mantineResult = readFileSync(mantineFile, 'utf8');
  expect(mantineReport.summary.transformed === 1, 'mantine-imports did not transform safe controls.');
  expect(mantineResult.includes('AdminTextInput') && mantineResult.includes('aria-describedby="title-help"'), 'mantine-imports did not preserve accessible attributes.');
  expect(mantineReport.summary.manualFollowUps === 1 && mantineReport.exceptionStubs[0].owner === '@design-system', 'mantine-imports did not report manual Button follow-up with exception metadata.');

  const iconFile = join(fixture, 'Icons.tsx');
  writeFileSync(iconFile, `
import { IconCheck, IconDeviceFloppy, IconUnknown } from '@tabler/icons-react';
export function Icons() { return <><IconCheck aria-hidden /><IconDeviceFloppy /><IconUnknown /></>; }
`);
  const iconReport = runCodemod('tabler-icons', iconFile, ['--write']);
  const iconResult = readFileSync(iconFile, 'utf8');
  expect(iconReport.summary.transformed === 1 && iconResult.includes('<GdsIcons.Check') && iconResult.includes('<GdsIcons.Save'), 'tabler-icons did not rewrite supported icons.');
  expect(iconReport.summary.manualFollowUps === 1, 'tabler-icons did not classify unsupported icon migration.');

  const rawFile = join(fixture, 'RawControls.tsx');
  writeFileSync(rawFile, `
export function Raw() {
  return <>
    <input name="email" aria-label="Email" value={email} onChange={setEmail} aria-invalid={hasError} />
    <input type="checkbox" name="enabled" aria-label="Enabled" checked={enabled} onChange={setEnabled} />
  </>;
}
`);
  const rawReport = runCodemod('raw-controls', rawFile, ['--write']);
  const rawResult = readFileSync(rawFile, 'utf8');
  expect(rawReport.summary.transformed === 1 && rawResult.includes('AdminTextInput') && rawResult.includes('AdminCheckbox'), 'raw-controls did not transform labelled controls.');
  expect(rawResult.includes('aria-invalid={hasError}'), 'raw-controls did not preserve validation semantics.');

  const alertFile = join(fixture, 'Alerts.tsx');
  writeFileSync(alertFile, `
import { Alert } from '@mantine/core';
export function AlertExample() {
  alert('Saved');
  return <Alert title="Saved">Record saved</Alert>;
}
`);
  const alertReport = runCodemod('alerts-confirms', alertFile, ['--write']);
  const alertResult = readFileSync(alertFile, 'utf8');
  expect(alertReport.summary.transformed === 1 && alertResult.includes('InlineAlert'), 'alerts-confirms did not transform safe Alert surface.');
  expect(alertReport.summary.manualFollowUps === 1 && alertReport.exceptionStubs[0].replacement.includes('useGdsToasts'), 'alerts-confirms did not classify blocking alert.');

  const debtFile = join(fixture, 'Debt.tsx');
  writeFileSync(debtFile, `
export function Debt() {
  return <section style={{ color: '#111' }}><table><tbody><tr><td>Cell</td></tr></tbody></table></section>;
}
`);
  const inlineReport = runCodemod('inline-styles', debtFile);
  const tableReport = runCodemod('tables', debtFile);
  expect(inlineReport.plan.mode === 'dry-run' && inlineReport.summary.manualFollowUps === 1, 'inline-styles did not default to dry-run manual follow-up.');
  expect(tableReport.summary.manualFollowUps === 1 && tableReport.exceptionStubs[0].accessibility.includes('keyboard'), 'tables did not report raw table accessibility migration requirements.');

  console.log('Codemod verification passed.');
} finally {
  rmSync(fixture, { recursive: true, force: true });
}

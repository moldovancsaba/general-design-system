import { FeatureBand } from '@sovereignsquad/gds';

const features = [
  {
    id: 'governed',
    title: 'Governed by default',
    description: 'Every primitive ships with tonal, spacing, and accessibility contracts already enforced.',
    meta: '252 components',
  },
  {
    id: 'i18n',
    title: 'Localization-safe',
    description: 'Text expansion, plural rules, and locale formatting are handled in the runtime.',
    meta: '7 locales',
  },
  {
    id: 'handoff',
    title: 'Design handoff built in',
    description: 'Component and token mappings sync straight into the design tool.',
    meta: 'Live sync',
  },
];

export const Default = () => <FeatureBand columns={3} items={features} />;

export const Bordered = () => <FeatureBand columns={3} bordered items={features} />;

export const Process = () => (
  <FeatureBand
    variant="process"
    columns={3}
    items={[
      { id: 's1', stepLabel: 'Step 1', title: 'Install', description: 'Add the package and build the flattened stylesheet.' },
      { id: 's2', stepLabel: 'Step 2', title: 'Wrap', description: 'Mount GdsProvider at the application root.' },
      { id: 's3', stepLabel: 'Step 3', title: 'Compose', description: 'Build screens from governed primitives only.' },
    ]}
  />
);

export const Loading = () => <FeatureBand columns={3} loading items={[]} />;

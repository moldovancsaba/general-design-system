import { StatsStrip } from '@sovereignsquad/gds';

export const Default = () => (
  <StatsStrip
    stats={[
      { label: 'Routes', value: 128, diff: 12 },
      { label: 'Exports', value: 92, diff: 4 },
      { label: 'Mismatches', value: 3, diff: -8 },
    ]}
  />
);

export const Revenue = () => (
  <StatsStrip
    stats={[
      { label: 'Revenue', value: '$128k', diff: 6 },
      { label: 'Refunds', value: '$3.1k', diff: -2 },
      { label: 'Net', value: '$124.9k', diff: 5 },
      { label: 'Orders', value: 2071, diff: 0 },
    ]}
  />
);

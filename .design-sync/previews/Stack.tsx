import { Stack, GdsSafeBox, MetricCard } from '@sovereignsquad/gds';

export const Default = () => (
  <GdsSafeBox style={{ padding: 24 }}>
    <Stack gap="md">
      <MetricCard label="Active users" value="8,420" />
      <MetricCard label="Sessions" value="21,907" />
      <MetricCard label="Conversion" value="4.6%" />
    </Stack>
  </GdsSafeBox>
);

export const TightAlignment = () => (
  <GdsSafeBox style={{ padding: 24 }}>
    <Stack gap="xs" align="stretch">
      <MetricCard label="Revenue" value="$128k" />
      <MetricCard label="Net" value="$124.9k" />
    </Stack>
  </GdsSafeBox>
);

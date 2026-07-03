import { SimpleGrid, MetricCard } from '@sovereignsquad/gds';

export const TwoColumns = () => (
  <SimpleGrid cols={2} spacing="md">
    <MetricCard label="Active users" value="8,420" />
    <MetricCard label="Sessions" value="21,907" />
    <MetricCard label="Conversion" value="4.6%" />
    <MetricCard label="Avg. order" value="$62.10" />
  </SimpleGrid>
);

export const ThreeColumns = () => (
  <SimpleGrid cols={3} spacing="sm">
    <MetricCard label="Revenue" value="$128k" />
    <MetricCard label="Refunds" value="$3.1k" />
    <MetricCard label="Net" value="$124.9k" />
  </SimpleGrid>
);

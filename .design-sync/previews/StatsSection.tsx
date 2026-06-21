import { StatsSection, MetricCard, SimpleGrid } from '@doneisbetter/gds';

export const Default = () => (
  <StatsSection title="This month">
    <SimpleGrid cols={3} spacing="md">
      <MetricCard label="Revenue" value="$128k" />
      <MetricCard label="Active users" value="8,420" />
      <MetricCard label="Conversion" value="4.6%" />
    </SimpleGrid>
  </StatsSection>
);

export const BelowThreshold = () => (
  <StatsSection
    title="Adoption threshold example"
    belowThreshold
    thresholdMessage="This report remains hidden until there is enough live traffic to produce stable numbers."
  />
);

export const Loading = () => (
  <StatsSection title="Operational metrics" loading />
);

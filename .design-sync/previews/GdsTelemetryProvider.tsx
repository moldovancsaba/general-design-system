import { GdsTelemetryProvider, MetricCard } from '@sovereignsquad/gds';

export const Default = () => (
  <GdsTelemetryProvider sampleRate={1}>
    <MetricCard
      label="Events captured"
      value="1,204"
      description="Children of GdsTelemetryProvider emit governed analytics events to the configured sink."
      trend={{ label: '100% sampled', tone: 'neutral' }}
    />
  </GdsTelemetryProvider>
);

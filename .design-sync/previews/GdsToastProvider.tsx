import { GdsToastProvider, MetricCard } from '@sovereignsquad/gds';

export const Default = () => (
  <GdsToastProvider>
    <MetricCard
      label="Toasts dispatched today"
      value="38"
      description="Children of GdsToastProvider can queue and dismiss transient toast notifications."
      trend={{ label: '+12 vs yesterday', tone: 'positive' }}
    />
  </GdsToastProvider>
);

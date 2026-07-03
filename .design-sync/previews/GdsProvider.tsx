import { MetricCard, Button, Badge } from '@sovereignsquad/gds';

// GdsProvider is the root provider and is already auto-applied by the harness,
// so these cells render styled GDS surfaces directly to show the theme applies.
export const ThemedSurface = () => (
  <MetricCard
    label="Active adopters"
    value="18 apps"
    description="Theme tokens from GdsProvider style this surface automatically."
  />
);

export const Controls = () => (
  <MetricCard
    label="Catalog coverage"
    value="100%"
    description="GdsProvider supplies the color scheme and typography tokens."
    trend={{ tone: 'positive', label: '+2%' }}
  />
);

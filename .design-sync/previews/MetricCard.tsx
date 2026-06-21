import { MetricCard } from '@doneisbetter/gds';

export const Default = () => (
  <MetricCard
    label="Active adopters"
    value="18 apps"
    description="Teams consuming the shared package this quarter."
  />
);

export const WithTrend = () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <MetricCard
      label="Catalog coverage"
      value="100%"
      description="Documented patterns with a live runtime representation."
      trend={{ tone: 'positive', label: '+2%' }}
    />
    <MetricCard
      label="Open exceptions"
      value="3"
      description="Dependency-boundary exceptions awaiting review."
      trend={{ tone: 'negative', label: '+1' }}
    />
  </div>
);

export const WithFooter = () => (
  <MetricCard
    label="Critical incidents"
    value="0"
    description="No urgent accessibility regressions in the last release."
    trend={{ tone: 'neutral', label: 'stable' }}
    footer={<span style={{ fontSize: 12, opacity: 0.7 }}>Updated 2 hours ago</span>}
  />
);

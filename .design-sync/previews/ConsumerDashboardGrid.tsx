import { ConsumerDashboardGrid, MetricCard, ProgressCard } from '@doneisbetter/gds';

export const ThreeColumn = () => (
  <ConsumerDashboardGrid columns={3}>
    <MetricCard label="Catalog coverage" value="253 entries" description="Pattern inventory shown on the public site." />
    <ProgressCard label="Reference-site conversion" value="Strict consumer" progress={100} progressLabel="Current state" />
    <MetricCard label="npm line" value="3.4.14" description="Public package and docs release line." />
  </ConsumerDashboardGrid>
);

export const TwoColumn = () => (
  <ConsumerDashboardGrid columns={2}>
    <MetricCard label="Active sessions" value="1,284" description="Last 24 hours across the workspace." />
    <ProgressCard label="Onboarding" value="3 of 5 steps" progress={60} progressLabel="Setup progress" />
  </ConsumerDashboardGrid>
);

export const SingleColumn = () => (
  <ConsumerDashboardGrid columns={1}>
    <MetricCard label="Next action" value="Publish docs" description="Prioritize the next action first." />
  </ConsumerDashboardGrid>
);

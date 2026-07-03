import { InfoCard } from '@sovereignsquad/gds';

export const Revenue = () => (
  <InfoCard
    title="Monthly recurring revenue"
    value="$48,200"
    description="Up 8.4% from last month across 312 active subscriptions."
    color="green"
  />
);

export const Users = () => (
  <InfoCard
    title="Active users"
    value="12,847"
    description="Weekly active users in the last 7 days."
    color="blue"
  />
);

export const Incidents = () => (
  <InfoCard
    title="Open incidents"
    value={3}
    description="Two high-severity incidents are awaiting acknowledgement."
    color="red"
  />
);

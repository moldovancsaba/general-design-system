import { GdsBarChart } from '@sovereignsquad/gds';

export const Primary = () => (
  <GdsBarChart
    title="Tickets resolved per agent"
    summary="Dana resolved 84 tickets this week, the highest on the team; Priya resolved 41, the lowest."
    seriesTone="primary"
    data={[
      { label: 'Dana', value: 84 },
      { label: 'Marcus', value: 72 },
      { label: 'Lena', value: 63 },
      { label: 'Owen', value: 55 },
      { label: 'Priya', value: 41 },
    ]}
    state="ready"
  />
);

export const Success = () => (
  <GdsBarChart
    title="Signups by plan"
    summary="The Pro plan led signups with 320, followed by Team at 210 and Free at 540."
    seriesTone="success"
    data={[
      { label: 'Free', value: 540 },
      { label: 'Pro', value: 320 },
      { label: 'Team', value: 210 },
      { label: 'Enterprise', value: 96 },
    ]}
    state="ready"
  />
);

export const Warning = () => (
  <GdsBarChart
    title="Error rate by service"
    summary="The checkout service shows the highest error rate at 4.2 percent, well above the 1 percent target."
    seriesTone="warning"
    data={[
      { label: 'Checkout', value: 4.2 },
      { label: 'Search', value: 2.1 },
      { label: 'Auth', value: 0.9 },
      { label: 'Catalog', value: 0.4 },
    ]}
    state="ready"
  />
);

export const Empty = () => (
  <GdsBarChart
    title="Revenue by region"
    summary="No revenue data is available for the selected period."
    data={[]}
    state="empty"
  />
);

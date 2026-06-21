import { GdsLineChart } from '@doneisbetter/gds';

const revenue = [
  { label: 'Jan', value: 42000 },
  { label: 'Feb', value: 48500 },
  { label: 'Mar', value: 51200 },
  { label: 'Apr', value: 49800 },
  { label: 'May', value: 57300 },
  { label: 'Jun', value: 63100 },
];

export const Default = () => (
  <GdsLineChart
    title="Monthly recurring revenue"
    summary="MRR grew 50% over the first half of the year, with steady acceleration after March."
    data={revenue}
  />
);

export const SuccessTone = () => (
  <GdsLineChart
    title="Active subscriptions"
    summary="Subscriptions climbed each month following the spring pricing change."
    seriesTone="success"
    data={[
      { label: 'Week 1', value: 1200 },
      { label: 'Week 2', value: 1450 },
      { label: 'Week 3', value: 1610 },
      { label: 'Week 4', value: 1890 },
      { label: 'Week 5', value: 2240 },
    ]}
  />
);

export const Empty = () => (
  <GdsLineChart
    title="Conversion rate"
    summary="No data is available for the selected reporting period."
    state="empty"
    data={[]}
  />
);

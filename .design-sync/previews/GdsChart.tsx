import { GdsChart } from '@doneisbetter/gds';

export const Bar = () => (
  <GdsChart
    type="bar"
    title="Weekly active users"
    summary="Active users grew from 1,240 on Monday to 2,980 on Sunday, a 140 percent increase across the week."
    data={[
      { label: 'Mon', value: 1240 },
      { label: 'Tue', value: 1680 },
      { label: 'Wed', value: 1910 },
      { label: 'Thu', value: 2240 },
      { label: 'Fri', value: 2610 },
      { label: 'Sat', value: 2840 },
      { label: 'Sun', value: 2980 },
    ]}
    legend={[{ label: 'Active users', token: 'var(--mantine-color-violet-6)' }]}
    state="ready"
  />
);

export const Donut = () => (
  <GdsChart
    type="donut"
    title="Orders by channel"
    summary="Online accounts for 58 percent of orders, marketplace 27 percent, and in-store 15 percent."
    data={[
      { label: 'Online', value: 58 },
      { label: 'Marketplace', value: 27 },
      { label: 'In-store', value: 15 },
    ]}
    config={{ showPercentages: true }}
    legend={[
      { label: 'Online', token: 'var(--mantine-color-violet-6)' },
      { label: 'Marketplace', token: 'var(--mantine-color-teal-6)' },
      { label: 'In-store', token: 'var(--mantine-color-orange-6)' },
    ]}
    state="ready"
  />
);

export const Line = () => (
  <GdsChart
    type="line"
    title="Monthly recurring revenue"
    summary="MRR climbed steadily from 42K in January to 71K in June."
    data={[
      { label: 'Jan', value: 42000 },
      { label: 'Feb', value: 48000 },
      { label: 'Mar', value: 53500 },
      { label: 'Apr', value: 59000 },
      { label: 'May', value: 65500 },
      { label: 'Jun', value: 71000 },
    ]}
    legend={[{ label: 'MRR', token: 'var(--mantine-color-blue-6)' }]}
    state="ready"
  />
);

export const Empty = () => (
  <GdsChart
    type="bar"
    title="Conversion by source"
    summary="No conversions have been recorded for the selected date range."
    data={[]}
    state="empty"
  />
);

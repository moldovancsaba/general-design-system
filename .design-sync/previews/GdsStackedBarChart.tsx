import { GdsStackedBarChart } from '@doneisbetter/gds';

export const Revenue = () => (
  <GdsStackedBarChart
    title="Revenue by channel"
    summary="Direct and partner channels together drove most of Q3 revenue, with email steady across all three months."
    seriesTone="primary"
    data={[
      { label: 'Jul', value: 120, group: 'Direct' },
      { label: 'Jul', value: 80, group: 'Partner' },
      { label: 'Jul', value: 40, group: 'Email' },
      { label: 'Aug', value: 150, group: 'Direct' },
      { label: 'Aug', value: 95, group: 'Partner' },
      { label: 'Aug', value: 45, group: 'Email' },
      { label: 'Sep', value: 175, group: 'Direct' },
      { label: 'Sep', value: 110, group: 'Partner' },
      { label: 'Sep', value: 50, group: 'Email' },
    ]}
    state="ready"
  />
);

export const Traffic = () => (
  <GdsStackedBarChart
    title="Sessions by device"
    summary="Mobile overtook desktop sessions every week of the sprint, while tablet stayed flat."
    seriesTone="info"
    data={[
      { label: 'W1', value: 320, group: 'Mobile' },
      { label: 'W1', value: 280, group: 'Desktop' },
      { label: 'W1', value: 60, group: 'Tablet' },
      { label: 'W2', value: 360, group: 'Mobile' },
      { label: 'W2', value: 270, group: 'Desktop' },
      { label: 'W2', value: 64, group: 'Tablet' },
      { label: 'W3', value: 410, group: 'Mobile' },
      { label: 'W3', value: 265, group: 'Desktop' },
      { label: 'W3', value: 58, group: 'Tablet' },
    ]}
    state="ready"
  />
);

export const Empty = () => (
  <GdsStackedBarChart
    title="Spend by category"
    summary="No spend has been recorded for the selected period."
    data={[]}
    state="empty"
  />
);

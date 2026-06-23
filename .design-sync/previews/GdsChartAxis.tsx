import { GdsChartAxis } from '@doneisbetter/gds';

export const YAxis = () => (
  <GdsChartAxis
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 140,
      paddingRight: 8,
      borderRight: '1px solid var(--mantine-color-gray-3)',
      fontSize: 12,
      color: 'var(--mantine-color-gray-6)',
      textAlign: 'right',
      width: 48,
    }}
  >
    <span>3,000</span>
    <span>2,000</span>
    <span>1,000</span>
    <span>0</span>
  </GdsChartAxis>
);

export const XAxis = () => (
  <GdsChartAxis
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: 8,
      borderTop: '1px solid var(--mantine-color-gray-3)',
      fontSize: 12,
      color: 'var(--mantine-color-gray-6)',
      width: 280,
    }}
  >
    <span>Mon</span>
    <span>Tue</span>
    <span>Wed</span>
    <span>Thu</span>
    <span>Fri</span>
  </GdsChartAxis>
);

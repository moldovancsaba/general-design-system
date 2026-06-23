import { GdsResponsiveChartFrame } from '@doneisbetter/gds';

const bars = [
  { label: 'Jan', value: 60 },
  { label: 'Feb', value: 80 },
  { label: 'Mar', value: 45 },
  { label: 'Apr', value: 95 },
  { label: 'May', value: 70 },
];

export const Default = () => (
  <GdsResponsiveChartFrame
    title="Monthly bookings"
    summary="Bookings rose 58% from January to April before a slight May dip."
    labelledBy="chart-title"
    describedBy="chart-summary"
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 12,
        height: 120,
        padding: 8,
      }}
    >
      {bars.map((b) => (
        <div key={b.label} style={{ textAlign: 'center', flex: 1 }}>
          <div
            style={{
              height: b.value,
              background: '#4f46e5',
              borderRadius: '4px 4px 0 0',
            }}
          />
          <small>{b.label}</small>
        </div>
      ))}
    </div>
  </GdsResponsiveChartFrame>
);

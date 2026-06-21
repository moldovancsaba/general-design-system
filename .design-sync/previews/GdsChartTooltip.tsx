import { GdsChartTooltip } from '@doneisbetter/gds';

export const Default = () => (
  <GdsChartTooltip style={{ padding: 12, maxWidth: 220 }}>
    <div style={{ fontSize: 12, color: 'var(--mantine-color-gray-6)', marginBottom: 4 }}>
      Wednesday, Jun 18
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--mantine-color-violet-6)' }} />
      <span style={{ fontSize: 14, fontWeight: 600 }}>Active users</span>
    </div>
    <div style={{ fontSize: 20, fontWeight: 700, marginTop: 2 }}>1,910</div>
  </GdsChartTooltip>
);

export const Comparison = () => (
  <GdsChartTooltip style={{ padding: 12, maxWidth: 240 }}>
    <div style={{ fontSize: 12, color: 'var(--mantine-color-gray-6)', marginBottom: 6 }}>Q2 revenue</div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 2 }}>
      <span>This year</span>
      <strong>$71,000</strong>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--mantine-color-gray-6)' }}>
      <span>Last year</span>
      <span>$54,200</span>
    </div>
  </GdsChartTooltip>
);

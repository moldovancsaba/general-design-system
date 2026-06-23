import { ChartTokenPanel } from '@doneisbetter/gds';

export const Ready = () => (
  <ChartTokenPanel
    title="Orders by channel"
    description="Chart wrappers provide text summaries, tokenized legends, and a table fallback."
    summary="Online orders account for 62 percent of visible orders; in-store orders account for 38 percent."
    state="ready"
    legend={[
      { label: 'Online', token: 'var(--mantine-color-violet-6)' },
      { label: 'In-store', token: 'var(--mantine-color-teal-6)' },
    ]}
    tableFallback={
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '6px 8px' }}>Channel</th>
            <th style={{ textAlign: 'left', padding: '6px 8px' }}>Share</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: '6px 8px' }}>Online</td><td style={{ padding: '6px 8px' }}>62%</td></tr>
          <tr><td style={{ padding: '6px 8px' }}>In-store</td><td style={{ padding: '6px 8px' }}>38%</td></tr>
        </tbody>
      </table>
    }
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 16,
        height: 120,
        padding: '12px 4px',
      }}
    >
      <div style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100%', height: '62%', background: 'var(--mantine-color-violet-6)', borderRadius: 6 }} />
      </div>
      <div style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100%', height: '38%', background: 'var(--mantine-color-teal-6)', borderRadius: 6 }} />
      </div>
    </div>
  </ChartTokenPanel>
);

export const PermissionLimited = () => (
  <ChartTokenPanel
    title="Revenue by tenant"
    description="Aggregates are hidden until viewer permissions are confirmed."
    summary="Detailed revenue breakdown is limited by your current access level."
    state="permission-limited"
    legend={[
      { label: 'Enterprise', token: 'var(--mantine-color-violet-6)' },
      { label: 'Team', token: 'var(--mantine-color-blue-6)' },
    ]}
  />
);

export const Loading = () => (
  <ChartTokenPanel
    title="Sessions over time"
    description="Chart data is synchronizing from the reporting service."
    summary="Loading the latest session counts."
    state="loading"
  />
);

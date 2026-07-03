import { SemanticChartFrame, SimpleDataTable } from '@sovereignsquad/gds';

export const Default = () => (
  <SemanticChartFrame
    title="Orders by channel"
    summary="Online orders account for 62 percent of visible orders; in-store accounts for 38 percent."
    labelledBy="orders-channel-title"
    describedBy="orders-channel-summary"
  >
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 140, padding: '8px 4px' }}>
      <div style={{ flex: 1, height: '62%', background: 'var(--mantine-color-blue-6)', borderRadius: 4 }} />
      <div style={{ flex: 1, height: '38%', background: 'var(--mantine-color-teal-6)', borderRadius: 4 }} />
    </div>
  </SemanticChartFrame>
);

export const WithTableFallback = () => (
  <SemanticChartFrame
    title="Evidence coverage"
    summary="Eighteen of twenty reporting sources reported this period."
    labelledBy="evidence-title"
    describedBy="evidence-summary"
  >
    <SimpleDataTable
      columns={[
        { key: 'channel', header: 'Channel' },
        { key: 'share', header: 'Share' },
      ]}
      rows={[
        { channel: 'Online', share: '62%' },
        { channel: 'In-store', share: '38%' },
      ]}
    />
  </SemanticChartFrame>
);

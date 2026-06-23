import { GdsAnalyticsTemplate, GdsBarChart } from '@doneisbetter/gds';

type Row = { channel: string; sessions: string; conversion: string };

const columns = [
  { key: 'channel', label: 'Channel' },
  { key: 'sessions', label: 'Sessions' },
  { key: 'conversion', label: 'Conversion' },
] as const;

const rows: Row[] = [
  { channel: 'Organic search', sessions: '18,420', conversion: '3.1%' },
  { channel: 'Paid social', sessions: '9,310', conversion: '2.4%' },
  { channel: 'Email', sessions: '6,880', conversion: '5.7%' },
  { channel: 'Referral', sessions: '3,140', conversion: '4.0%' },
];

export const Ready = () => (
  <GdsAnalyticsTemplate
    eyebrow="Marketing"
    title="Acquisition analytics"
    description="Traffic and conversion performance across acquisition channels."
    state="ready"
    actions={[{ id: 'export', label: 'Export CSV', kind: 'secondary' }]}
    metrics={[
      { label: 'Sessions', value: '37,750', trend: { label: '+9% MoM', tone: 'positive' } },
      { label: 'Conversion', value: '3.6%', trend: { label: '+0.3pt MoM', tone: 'positive' } },
      { label: 'Revenue', value: '$84.2K', trend: { label: '+14% MoM', tone: 'positive' } },
    ]}
    chart={
      <GdsBarChart
        title="Sessions by channel"
        summary="Organic search drove the most sessions at 18,420, followed by paid social at 9,310."
        seriesTone="primary"
        data={[
          { label: 'Organic', value: 18420 },
          { label: 'Paid social', value: 9310 },
          { label: 'Email', value: 6880 },
          { label: 'Referral', value: 3140 },
        ]}
        state="ready"
      />
    }
    columns={columns as any}
    rows={rows}
    insight={
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
        Email converts at 5.7 percent, the highest of any channel despite lower volume. Shifting budget toward
        lifecycle email could improve overall ROI.
      </p>
    }
  />
);

export const Loading = () => (
  <GdsAnalyticsTemplate
    eyebrow="Marketing"
    title="Acquisition analytics"
    description="Traffic and conversion performance across acquisition channels."
    state="loading"
    statusLabel="Crunching the numbers…"
  />
);

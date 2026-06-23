import {
  ReportingSection,
  MetricCard,
  SimpleDataTable,
  SemanticButton,
  SemanticChartFrame,
} from '@doneisbetter/gds';

export const Default = () => (
  <ReportingSection
    title="Operational evidence report"
    description="A governed reporting section keeps metrics, chart summaries, and fallback tables in one predictable flow."
    state="ready"
    metrics={(
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
        <MetricCard label="Orders" value="1,240" description="Visible aggregate." trend={{ label: '+8%', tone: 'positive' }} />
        <MetricCard label="Coverage" value="18 / 20" description="Reporting sources." />
      </div>
    )}
    chart={(
      <SemanticChartFrame
        title="Orders by channel"
        summary="Online orders account for 62 percent; in-store for 38 percent."
        labelledBy="rs-chart-title"
        describedBy="rs-chart-summary"
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 100 }}>
          <div style={{ flex: 1, height: '62%', background: 'var(--mantine-color-blue-6)', borderRadius: 4 }} />
          <div style={{ flex: 1, height: '38%', background: 'var(--mantine-color-teal-6)', borderRadius: 4 }} />
        </div>
      </SemanticChartFrame>
    )}
    table={(
      <SimpleDataTable
        columns={[{ key: 'channel', header: 'Channel' }, { key: 'share', header: 'Share' }]}
        rows={[{ channel: 'Online', share: '62%' }, { channel: 'In-store', share: '38%' }]}
      />
    )}
    action={<SemanticButton action="export" variant="light" size="xs" />}
  />
);

export const Partial = () => (
  <ReportingSection
    title="Operational evidence report"
    description="Two locations are missing from this period."
    state="partial"
    stateMessage="The visible aggregate remains usable but must be disclosed."
    metrics={(
      <MetricCard label="Orders" value="980" description="Partial aggregate." trend={{ label: '−4%', tone: 'negative' }} />
    )}
  />
);

export const ErrorState = () => (
  <ReportingSection
    title="Operational evidence report"
    description="The report could not be loaded."
    state="error"
    stateMessage="The reporting service returned an error. Retry once connectivity is restored."
    retryAction={<SemanticButton action="refresh" variant="light" size="xs" />}
  />
);

import { EvidencePanel, SemanticButton } from '@doneisbetter/gds';

export const Current = () => (
  <EvidencePanel
    state="current"
    title="Quarterly adoption summary"
    description="42 teams now consume the governed primitives, up 11 from last quarter."
    source="Source: GDS telemetry"
    freshness="Updated 4 minutes ago"
    confidence="High confidence"
    evidenceCount={18}
  >
    <p>Adoption is measured from build-time imports across registered consumers.</p>
  </EvidencePanel>
);

export const States = () => (
  <div style={{ display: 'grid', gap: 16 }}>
    <EvidencePanel
      state="stale"
      title="Cross-boundary import scan"
      description="Last successful scan completed before the 3.4 migration window."
      source="Source: dependency graph"
      freshness="Updated 9 days ago"
      confidence="Medium confidence"
      evidenceCount={5}
    />
    <EvidencePanel
      state="permission-limited"
      title="Private consumer metrics"
      description="Some accounts restrict telemetry sharing."
      permissionNote="You can see aggregate counts but not per-team detail."
    />
    <EvidencePanel
      state="error"
      title="Coverage report"
      description="The reporting service did not respond."
      retryAction={<SemanticButton action="refresh" size="sm" />}
    />
  </div>
);

export const Empty = () => (
  <EvidencePanel
    state="empty"
    title="No evidence collected"
    description="This surface has no recorded usage yet."
  />
);

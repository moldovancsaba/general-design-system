import { ConsumerSection, ConsumerDashboardGrid, MetricCard, SemanticButton } from '@doneisbetter/gds';

export const Default = () => (
  <ConsumerSection
    title="Workspace activity"
    description="Recent usage across the shared catalog."
    action={<SemanticButton action="settings">Manage</SemanticButton>}
  >
    <ConsumerDashboardGrid columns={2}>
      <MetricCard label="Views" value="8,412" description="Last 7 days." />
      <MetricCard label="Installs" value="312" description="Last 7 days." />
    </ConsumerDashboardGrid>
  </ConsumerSection>
);

export const Supporting = () => (
  <ConsumerSection
    title="Recommended next steps"
    description="Lower-emphasis guidance rendered in the supporting tone."
    tone="supporting"
  >
    <p style={{ margin: 0 }}>Connect a data source to unlock dashboard metrics for your team.</p>
  </ConsumerSection>
);

export const Warning = () => (
  <ConsumerSection
    title="Billing attention required"
    description="Surfaced with the warning tone to draw attention."
    tone="warning"
    action={<SemanticButton action="edit">Update payment</SemanticButton>}
  >
    <p style={{ margin: 0 }}>Your card on file expires this month. Update it to avoid an interruption.</p>
  </ConsumerSection>
);

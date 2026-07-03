import { DiscoveryShell, PageHeader, SemanticNavLink, ConsumerSection, ConsumerDashboardGrid, MetricCard } from '@sovereignsquad/gds';

export const Default = () => (
  <DiscoveryShell
    header={<PageHeader title="Discovery" description="Browse the shared catalog." />}
    sidebar={(
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SemanticNavLink action="dashboard" href="#" active>Dashboard</SemanticNavLink>
        <SemanticNavLink action="list" href="#">Catalog</SemanticNavLink>
        <SemanticNavLink action="analytics" href="#">Insights</SemanticNavLink>
        <SemanticNavLink action="settings" href="#">Settings</SemanticNavLink>
      </nav>
    )}
    footer={<div style={{ fontSize: 13, opacity: 0.7 }}>General Design System · v3.4.14</div>}
  >
    <ConsumerSection title="Overview" description="Workspace activity across the catalog.">
      <ConsumerDashboardGrid columns={3}>
        <MetricCard label="Components" value="253" description="Published entries." />
        <MetricCard label="Patterns" value="48" description="Composed flows." />
        <MetricCard label="Installs" value="312" description="Last 7 days." />
      </ConsumerDashboardGrid>
    </ConsumerSection>
  </DiscoveryShell>
);

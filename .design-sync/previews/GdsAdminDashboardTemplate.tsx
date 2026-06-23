import { GdsAdminDashboardTemplate } from '@doneisbetter/gds';

export const Ready = () => (
  <GdsAdminDashboardTemplate
    eyebrow="Operations"
    title="Workspace overview"
    description="Key health metrics and recent activity across your organization."
    state="ready"
    actions={[
      { id: 'export', label: 'Export', kind: 'secondary' },
      { id: 'invite', label: 'Invite member', kind: 'primary' },
    ]}
    metrics={[
      { label: 'Active users', value: '2,980', trend: { label: '+12% vs last week', tone: 'positive' } },
      { label: 'Open tickets', value: '34', trend: { label: '-8% vs last week', tone: 'positive' } },
      { label: 'Storage used', value: '412 GB', description: 'of 1 TB included' },
      { label: 'Error rate', value: '0.6%', trend: { label: '+0.2% vs last week', tone: 'negative' } },
    ]}
    sections={[
      {
        id: 'activity',
        title: 'Recent activity',
        description: 'The latest changes across projects.',
        content: (
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.8 }}>
            <li>Dana invited 3 members to Marketing</li>
            <li>Billing plan upgraded to Team</li>
            <li>API key rotated for production</li>
          </ul>
        ),
      },
      {
        id: 'tasks',
        title: 'Pending approvals',
        content: (
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.8 }}>
            <li>Access request from m.lee@acme.co</li>
            <li>Budget increase for Q3 campaign</li>
          </ul>
        ),
      },
    ]}
  />
);

export const Loading = () => (
  <GdsAdminDashboardTemplate
    eyebrow="Operations"
    title="Workspace overview"
    description="Key health metrics and recent activity across your organization."
    state="loading"
    statusLabel="Loading dashboard…"
  />
);

export const Empty = () => (
  <GdsAdminDashboardTemplate
    eyebrow="Operations"
    title="Workspace overview"
    description="No activity has been recorded for this workspace yet."
    state="empty"
  />
);

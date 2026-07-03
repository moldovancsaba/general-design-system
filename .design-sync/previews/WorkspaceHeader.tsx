import { WorkspaceHeader, Button } from '@sovereignsquad/gds';
import { IconPlus, IconSettings } from '@tabler/icons-react';

export const Default = () => (
  <WorkspaceHeader
    eyebrow="Projects"
    title="Marketing Site Redesign"
    description="Track milestones, owners, and launch readiness in one place."
    breadcrumbs={['Acme Inc.', 'Workspaces', 'Marketing']}
    primaryAction={
      <Button leftSection={<IconPlus size={16} />}>New task</Button>
    }
    secondaryActions={
      <Button variant="default" leftSection={<IconSettings size={16} />}>
        Settings
      </Button>
    }
  />
);

export const Minimal = () => (
  <WorkspaceHeader
    title="Billing"
    description="Manage your plan, payment method, and invoices."
  />
);

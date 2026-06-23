import { GdsIcon } from '@doneisbetter/gds';

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>{children}</div>
);

export const Default = () => (
  <Row>
    <GdsIcon name="dashboard" label="Dashboard" />
    <GdsIcon name="search" label="Search" />
    <GdsIcon name="settings" label="Settings" />
    <GdsIcon name="users" label="Users" />
    <GdsIcon name="analytics" label="Analytics" />
  </Row>
);

export const Sizes = () => (
  <Row>
    <GdsIcon name="info" size={16} label="Info small" />
    <GdsIcon name="info" size={24} label="Info medium" />
    <GdsIcon name="info" size={32} label="Info large" />
    <GdsIcon name="info" size={48} label="Info extra large" />
  </Row>
);

export const Tones = () => (
  <Row>
    <GdsIcon name="success" tone="success" label="Success" />
    <GdsIcon name="warning" tone="warning" label="Warning" />
    <GdsIcon name="error" tone="danger" label="Error" />
    <GdsIcon name="info" tone="info" label="Info" />
    <GdsIcon name="settings" tone="primary" label="Primary" />
  </Row>
);

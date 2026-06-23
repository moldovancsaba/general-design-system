import { GdsIcons } from '@doneisbetter/gds';

const Cell = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 72 }}>
    {children}
    <span style={{ fontSize: 12, color: 'var(--mantine-color-dimmed, #868e96)' }}>{label}</span>
  </div>
);

export const Default = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
    <Cell label="Dashboard"><GdsIcons.Dashboard /></Cell>
    <Cell label="Settings"><GdsIcons.Settings /></Cell>
    <Cell label="Users"><GdsIcons.Users /></Cell>
    <Cell label="Analytics"><GdsIcons.Analytics /></Cell>
    <Cell label="Home"><GdsIcons.Home /></Cell>
    <Cell label="Inbox"><GdsIcons.Inbox /></Cell>
  </div>
);

export const ActionIcons = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
    <Cell label="Add"><GdsIcons.Add /></Cell>
    <Cell label="Edit"><GdsIcons.Edit /></Cell>
    <Cell label="Delete"><GdsIcons.Delete /></Cell>
    <Cell label="Save"><GdsIcons.Save /></Cell>
    <Cell label="Search"><GdsIcons.Search /></Cell>
    <Cell label="Download"><GdsIcons.Download /></Cell>
  </div>
);

export const StatusIcons = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
    <Cell label="Success"><GdsIcons.Success /></Cell>
    <Cell label="Warning"><GdsIcons.Warning /></Cell>
    <Cell label="Danger"><GdsIcons.Danger /></Cell>
    <Cell label="Info"><GdsIcons.Info /></Cell>
    <Cell label="Trophy"><GdsIcons.Trophy /></Cell>
  </div>
);

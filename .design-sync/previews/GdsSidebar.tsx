import { GdsSidebar } from '@doneisbetter/gds';

const Nav = () => (
  <div
    style={{
      background: 'var(--mantine-color-gray-1, #f1f3f5)',
      border: '1px solid var(--mantine-color-gray-3, #dee2e6)',
      borderRadius: 6,
      padding: 16,
      minHeight: 160,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontWeight: 600,
    }}
  >
    <span>Dashboard</span>
    <span>Projects</span>
    <span>Reports</span>
    <span>Settings</span>
  </div>
);

const Main = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      background: 'var(--mantine-color-blue-0, #e7f5ff)',
      border: '1px solid var(--mantine-color-blue-3, #74c0fc)',
      borderRadius: 6,
      padding: 20,
      fontWeight: 600,
      minHeight: 160,
    }}
  >
    {children}
  </div>
);

export const StartSide = () => (
  <GdsSidebar side="start" sidebarWidth="sm" gap="md">
    <Nav />
    <Main>Workspace overview</Main>
  </GdsSidebar>
);

export const EndSide = () => (
  <GdsSidebar side="end" sidebarWidth="sm" gap="md">
    <Main>Document body</Main>
    <Nav />
  </GdsSidebar>
);

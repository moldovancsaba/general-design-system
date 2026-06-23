import { GdsGrid } from '@doneisbetter/gds';

const Cell = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      background: 'var(--mantine-color-blue-1, #d0ebff)',
      border: '1px solid var(--mantine-color-blue-3, #74c0fc)',
      borderRadius: 6,
      padding: 16,
      textAlign: 'center',
      fontWeight: 600,
    }}
  >
    {children}
  </div>
);

export const Default = () => (
  <GdsGrid columns={3} gap="md">
    <Cell>One</Cell>
    <Cell>Two</Cell>
    <Cell>Three</Cell>
    <Cell>Four</Cell>
    <Cell>Five</Cell>
    <Cell>Six</Cell>
  </GdsGrid>
);

export const TwoColumns = () => (
  <GdsGrid columns={2} gap="lg">
    <Cell>Revenue</Cell>
    <Cell>Active users</Cell>
    <Cell>Conversion</Cell>
    <Cell>Churn</Cell>
  </GdsGrid>
);

export const TightGap = () => (
  <GdsGrid columns={4} gap="xs">
    <Cell>A</Cell>
    <Cell>B</Cell>
    <Cell>C</Cell>
    <Cell>D</Cell>
  </GdsGrid>
);

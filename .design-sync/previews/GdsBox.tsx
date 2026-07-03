import { GdsBox } from '@sovereignsquad/gds';

const Block = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: '12px 16px',
      background: 'var(--mantine-color-violet-0)',
      border: '1px solid var(--mantine-color-violet-3)',
      borderRadius: 6,
      fontSize: 13,
      color: 'var(--mantine-color-violet-9)',
    }}
  >
    {children}
  </div>
);

export const FlexRowGap = () => (
  <GdsBox display="flex" gap="md" padding="md" style={{ border: '1px dashed var(--mantine-color-gray-4)', borderRadius: 8 }}>
    <Block>One</Block>
    <Block>Two</Block>
    <Block>Three</Block>
  </GdsBox>
);

export const FlexColumnGap = () => (
  <GdsBox display="flex" gap="sm" padding="md" style={{ flexDirection: 'column', border: '1px dashed var(--mantine-color-gray-4)', borderRadius: 8 }}>
    <Block>Profile</Block>
    <Block>Billing</Block>
    <Block>Notifications</Block>
  </GdsBox>
);

export const Grid = () => (
  <GdsBox display="grid" gap="md" padding="md" style={{ gridTemplateColumns: 'repeat(3, 1fr)', border: '1px dashed var(--mantine-color-gray-4)', borderRadius: 8 }}>
    <Block>A</Block>
    <Block>B</Block>
    <Block>C</Block>
    <Block>D</Block>
    <Block>E</Block>
    <Block>F</Block>
  </GdsBox>
);

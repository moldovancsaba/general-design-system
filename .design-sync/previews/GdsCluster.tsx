import { GdsCluster } from '@doneisbetter/gds';

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      padding: '6px 12px',
      background: 'var(--mantine-color-teal-0)',
      border: '1px solid var(--mantine-color-teal-3)',
      borderRadius: 999,
      fontSize: 13,
      color: 'var(--mantine-color-teal-9)',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

export const Tags = () => (
  <GdsCluster gap="sm" padding="md" style={{ border: '1px dashed var(--mantine-color-gray-4)', borderRadius: 8 }}>
    <Chip>Design</Chip>
    <Chip>Engineering</Chip>
    <Chip>Accessibility</Chip>
    <Chip>Tokens</Chip>
    <Chip>Documentation</Chip>
  </GdsCluster>
);

export const Wraps = () => (
  <GdsCluster gap="xs" wrap="wrap" padding="md" style={{ maxWidth: 280, border: '1px dashed var(--mantine-color-gray-4)', borderRadius: 8 }}>
    <Chip>React</Chip>
    <Chip>TypeScript</Chip>
    <Chip>Mantine</Chip>
    <Chip>Storybook</Chip>
    <Chip>Vitest</Chip>
    <Chip>Playwright</Chip>
  </GdsCluster>
);

export const SpaceBetween = () => (
  <GdsCluster justify="between" padding="md" style={{ border: '1px dashed var(--mantine-color-gray-4)', borderRadius: 8 }}>
    <Chip>Draft</Chip>
    <Chip>Saved 2m ago</Chip>
  </GdsCluster>
);

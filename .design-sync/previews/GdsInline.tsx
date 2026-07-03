import { GdsInline } from '@sovereignsquad/gds';

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      background: 'var(--mantine-color-grape-1, #eebefa)',
      border: '1px solid var(--mantine-color-grape-3, #da77f2)',
      borderRadius: 16,
      padding: '4px 12px',
      fontWeight: 600,
      fontSize: 14,
    }}
  >
    {children}
  </span>
);

export const Default = () => (
  <GdsInline gap="sm">
    <Chip>Design</Chip>
    <Chip>Engineering</Chip>
    <Chip>Product</Chip>
    <Chip>Research</Chip>
  </GdsInline>
);

export const Wrapping = () => (
  <GdsInline gap="xs" wrap="wrap" style={{ maxWidth: 240 }}>
    <Chip>Accessibility</Chip>
    <Chip>Internationalization</Chip>
    <Chip>Theming</Chip>
    <Chip>Tokens</Chip>
    <Chip>Governance</Chip>
  </GdsInline>
);

export const Aligned = () => (
  <GdsInline gap="lg" align="center">
    <Chip>Status</Chip>
    <strong style={{ fontSize: 18 }}>Shipped to production</strong>
  </GdsInline>
);

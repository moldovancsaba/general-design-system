import { Box } from '@doneisbetter/gds';

export const Default = () => (
  <Box
    style={{
      padding: 24,
      borderRadius: 12,
      background: 'var(--mantine-color-violet-0)',
      border: '1px solid var(--mantine-color-violet-2)',
      color: 'var(--mantine-color-violet-9)',
      fontWeight: 600,
    }}
  >
    Box is the styling primitive every other layout component builds on.
  </Box>
);

export const AsCard = () => (
  <Box
    style={{
      padding: 20,
      borderRadius: 12,
      background: 'var(--mantine-color-body)',
      border: '1px solid var(--mantine-color-gray-3)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      maxWidth: 320,
    }}
  >
    <div style={{ fontWeight: 700, marginBottom: 6 }}>Catalog coverage</div>
    <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--mantine-color-violet-6)' }}>
      100%
    </div>
    <div style={{ fontSize: 13, opacity: 0.7 }}>Documented patterns with a live runtime.</div>
  </Box>
);

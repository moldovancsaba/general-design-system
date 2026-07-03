import { Center, Badge } from '@sovereignsquad/gds';

export const Default = () => (
  <Center
    style={{
      height: 160,
      borderRadius: 12,
      border: '1px dashed var(--mantine-color-gray-4)',
      background: 'var(--mantine-color-gray-0)',
    }}
  >
    <div style={{ textAlign: 'center' }}>
      <Badge>Centered</Badge>
      <div style={{ marginTop: 10, fontWeight: 600 }}>Content is centered both axes</div>
    </div>
  </Center>
);

export const WithIconStack = () => (
  <Center style={{ height: 140 }}>
    <div style={{ textAlign: 'center', maxWidth: 280 }}>
      <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--mantine-color-violet-6)' }}>
        GDS
      </div>
      <div style={{ fontSize: 13, opacity: 0.7 }}>
        Center is the canonical primitive for empty states and loaders.
      </div>
    </div>
  </Center>
);

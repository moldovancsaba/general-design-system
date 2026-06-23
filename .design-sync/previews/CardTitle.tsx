import { CardTitle, BodyText } from '@doneisbetter/gds';

export const Default = () => (
  <div
    style={{
      padding: 20,
      borderRadius: 12,
      border: '1px solid var(--mantine-color-gray-3)',
      maxWidth: 360,
    }}
  >
    <CardTitle order={3}>Catalog coverage</CardTitle>
    <BodyText>
      Documented patterns with a live runtime representation across the shared package.
    </BodyText>
  </div>
);

export const Orders = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <CardTitle order={2}>Section heading</CardTitle>
    <CardTitle order={3}>Card heading</CardTitle>
    <CardTitle order={4}>Subsection heading</CardTitle>
  </div>
);

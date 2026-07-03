import { LabelTag } from '@sovereignsquad/gds';

export const Tones = () => (
  <div
    style={{
      background: 'var(--mantine-color-body, #fff)',
      border: '1px solid var(--mantine-color-gray-3, #dee2e6)',
      borderRadius: 8,
      padding: 20,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
    }}
  >
    <LabelTag tone="neutral" label="Draft" />
    <LabelTag tone="info" label="In review" />
    <LabelTag tone="success" label="Published" />
    <LabelTag tone="warning" label="Needs attention" />
  </div>
);

export const Inline = () => (
  <div
    style={{
      background: 'var(--mantine-color-body, #fff)',
      border: '1px solid var(--mantine-color-gray-3, #dee2e6)',
      borderRadius: 8,
      padding: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    }}
  >
    <LabelTag tone="success" label="Active" />
    <LabelTag tone="warning" label="Trial ends in 3 days" />
  </div>
);

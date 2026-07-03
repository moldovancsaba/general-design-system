import { LabelText, BodyText } from '@sovereignsquad/gds';

const Field = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <LabelText>{label}</LabelText>
    <BodyText>{value}</BodyText>
  </div>
);

export const Default = () => (
  <div
    style={{
      background: 'var(--mantine-color-body, #fff)',
      border: '1px solid var(--mantine-color-gray-3, #dee2e6)',
      borderRadius: 8,
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}
  >
    <Field label="Full name" value="Jordan Avery" />
    <Field label="Email address" value="jordan@acme.com" />
    <Field label="Role" value="Workspace administrator" />
  </div>
);

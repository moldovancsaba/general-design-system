import { FormField } from '@sovereignsquad/gds';

export const Default = () => (
  <FormField label="Email address" description="We use this for account recovery only.">
    <input type="email" defaultValue="moldovan@example.com" style={{ width: '100%', padding: 8 }} />
  </FormField>
);

export const WithError = () => (
  <FormField label="Display name" error="Display name is required.">
    <input style={{ width: '100%', padding: 8, borderColor: 'var(--mantine-color-red-6)' }} />
  </FormField>
);

export const Stacked = () => (
  <div style={{ display: 'grid', gap: 16 }}>
    <FormField label="First name">
      <input defaultValue="Csaba" style={{ width: '100%', padding: 8 }} />
    </FormField>
    <FormField label="Workspace" description="Lowercase letters and dashes only.">
      <input defaultValue="design-system" style={{ width: '100%', padding: 8 }} />
    </FormField>
  </div>
);

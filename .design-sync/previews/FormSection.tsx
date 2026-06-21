import { FormSection, FormField } from '@doneisbetter/gds';

export const Default = () => (
  <FormSection
    title="Profile"
    description="Basic information shown on your public page."
  >
    <div style={{ display: 'grid', gap: 16 }}>
      <FormField label="Full name">
        <input defaultValue="Csaba Moldovan" style={{ width: '100%', padding: 8 }} />
      </FormField>
      <FormField label="Headline" description="A short one-line bio.">
        <input defaultValue="Design systems engineer" style={{ width: '100%', padding: 8 }} />
      </FormField>
    </div>
  </FormSection>
);

export const WithDivider = () => (
  <div style={{ display: 'grid', gap: 8 }}>
    <FormSection title="Account" description="Sign-in and security." withDivider>
      <FormField label="Email">
        <input defaultValue="moldovan@example.com" style={{ width: '100%', padding: 8 }} />
      </FormField>
    </FormSection>
    <FormSection title="Notifications" description="How we reach you." withDivider>
      <FormField label="Frequency">
        <input defaultValue="Weekly digest" style={{ width: '100%', padding: 8 }} />
      </FormField>
    </FormSection>
  </div>
);

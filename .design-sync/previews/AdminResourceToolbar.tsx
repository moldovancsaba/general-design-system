import { AdminResourceToolbar, AdminSelect } from '@sovereignsquad/gds';

export const Default = () => (
  <AdminResourceToolbar
    title="Partner directory"
    description="Manage published and pending partner listings."
    actionBar={{
      primary: { action: 'add' },
      secondary: [{ action: 'export' }],
    }}
    filters={
      <AdminSelect
        name="region"
        label="Region"
        value="eu"
        data={[
          { value: 'eu', label: 'EU-Central' },
          { value: 'us', label: 'US-West' },
          { value: 'apac', label: 'APAC' },
        ]}
      />
    }
  />
);

export const Minimal = () => (
  <AdminResourceToolbar
    title="Submissions"
    actionBar={{ primary: { action: 'add' } }}
  />
);

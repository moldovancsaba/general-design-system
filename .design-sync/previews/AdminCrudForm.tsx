import { AdminCrudForm, AdminFormSection, AdminCheckbox } from '@doneisbetter/gds';

export const Default = () => (
  <AdminCrudForm
    title="Edit workspace"
    description="Update the workspace profile and access settings."
    status={{ state: 'dirty', title: 'Unsaved changes' }}
    actions={{
      dirty: true,
      submitAction: { action: 'save' },
      cancelAction: { action: 'cancel' },
    }}
  >
    <AdminFormSection title="Notifications" description="Choose which events reach your inbox.">
      <AdminCheckbox name="releases" label="New stable releases" checked />
      <AdminCheckbox name="prereleases" label="Prerelease builds" checked={false} />
    </AdminFormSection>
    <AdminFormSection title="Access" description="Control collaboration." withDivider>
      <AdminCheckbox name="invite" label="Allow members to invite others" checked />
    </AdminFormSection>
  </AdminCrudForm>
);

export const CreateMode = () => (
  <AdminCrudForm
    title="New API key"
    description="Generate a scoped key for service-to-service access."
    actions={{
      submitAction: { action: 'add' },
      cancelAction: { action: 'cancel' },
    }}
  >
    <AdminFormSection title="Scopes" description="Grant only the access this key needs.">
      <AdminCheckbox name="read" label="Read catalog" checked />
      <AdminCheckbox name="write" label="Write catalog" checked={false} />
    </AdminFormSection>
  </AdminCrudForm>
);

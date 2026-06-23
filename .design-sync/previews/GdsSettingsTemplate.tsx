import { GdsSettingsTemplate, Checkbox, AdminTextInput } from '@doneisbetter/gds';

export const Ready = () => (
  <GdsSettingsTemplate
    eyebrow="Account"
    title="Settings"
    description="Manage your workspace preferences and notifications."
    actions={[{ id: 'save', label: 'Save changes', kind: 'primary' }]}
    groups={[
      {
        id: 'general',
        title: 'General',
        description: 'Basic workspace information.',
        fields: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AdminTextInput label="Workspace name" defaultValue="Partner operations" />
            <AdminTextInput label="Support email" defaultValue="ops@example.com" />
          </div>
        ),
      },
      {
        id: 'notifications',
        title: 'Notifications',
        description: 'Choose what you get emailed about.',
        fields: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Checkbox label="Weekly summary" defaultChecked />
            <Checkbox label="New listing submitted" defaultChecked />
            <Checkbox label="Listing approved" />
          </div>
        ),
      },
    ]}
  />
);

export const Loading = () => (
  <GdsSettingsTemplate
    eyebrow="Account"
    title="Settings"
    description="Manage your workspace preferences and notifications."
    state="loading"
  />
);

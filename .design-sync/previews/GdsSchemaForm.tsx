import { GdsSchemaForm } from '@doneisbetter/gds';

export const Profile = () => (
  <GdsSchemaForm
    submitLabel="Save profile"
    schema={{
      id: 'profile',
      title: 'Profile',
      description: 'Update your account details.',
      fields: [
        { name: 'fullName', type: 'text', label: 'Full name', i18nKey: 'profile.fullName', required: true },
        { name: 'email', type: 'email', label: 'Email', i18nKey: 'profile.email', required: true },
        {
          name: 'role',
          type: 'select',
          label: 'Role',
          i18nKey: 'profile.role',
          options: [
            { label: 'Viewer', value: 'viewer' },
            { label: 'Editor', value: 'editor' },
            { label: 'Admin', value: 'admin' },
          ],
        },
        { name: 'bio', type: 'textarea', label: 'Bio', i18nKey: 'profile.bio' },
        { name: 'newsletter', type: 'boolean', label: 'Subscribe to product updates', i18nKey: 'profile.newsletter' },
      ],
    }}
  />
);

export const Contact = () => (
  <GdsSchemaForm
    submitLabel="Send message"
    schema={{
      id: 'contact',
      title: 'Contact us',
      fields: [
        { name: 'name', type: 'text', label: 'Name', i18nKey: 'contact.name', required: true },
        { name: 'website', type: 'url', label: 'Website', i18nKey: 'contact.website' },
        { name: 'message', type: 'textarea', label: 'Message', i18nKey: 'contact.message', required: true },
      ],
    }}
  />
);

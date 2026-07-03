import { AdminFormSection, AdminCheckbox } from '@sovereignsquad/gds';

export const Default = () => (
  <AdminFormSection
    title="Notifications"
    description="Choose which release events reach your inbox."
  >
    <AdminCheckbox name="releases" label="New stable releases" checked />
    <AdminCheckbox name="prereleases" label="Prerelease builds" checked={false} />
  </AdminFormSection>
);

export const WithDivider = () => (
  <AdminFormSection
    title="Access"
    description="Control who can edit this workspace."
    withDivider
  >
    <AdminCheckbox name="invite" label="Allow members to invite others" checked />
    <AdminCheckbox name="public" label="Make workspace publicly visible" checked={false} />
  </AdminFormSection>
);

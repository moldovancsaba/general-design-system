import { AdminFormStatus } from '@sovereignsquad/gds';

export const Success = () => (
  <AdminFormStatus
    state="success"
    title="Changes saved"
    description="Your workspace settings were updated 2 seconds ago."
  />
);

export const ErrorState = () => (
  <AdminFormStatus
    state="error"
    title="Couldn't save changes"
    description="The workspace name is already taken. Try a different name."
  />
);

export const Loading = () => (
  <AdminFormStatus state="loading" title="Saving changes…" />
);

export const Dirty = () => (
  <AdminFormStatus
    state="dirty"
    title="Unsaved changes"
    description="You have edits that haven't been saved yet."
  />
);

export const Readonly = () => (
  <AdminFormStatus
    state="readonly"
    title="View only"
    description="You don't have permission to edit this resource."
  />
);

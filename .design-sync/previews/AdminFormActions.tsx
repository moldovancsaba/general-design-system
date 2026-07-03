import { AdminFormActions } from '@sovereignsquad/gds';

export const Default = () => (
  <AdminFormActions
    submitAction={{ action: 'save' }}
    cancelAction={{ action: 'cancel' }}
  />
);

export const Dirty = () => (
  <AdminFormActions
    dirty
    submitAction={{ action: 'save' }}
    cancelAction={{ action: 'cancel' }}
    status="You have unsaved changes."
  />
);

export const Submitting = () => (
  <AdminFormActions
    submitting
    submitAction={{ action: 'save' }}
    cancelAction={{ action: 'cancel' }}
  />
);

export const WithDelete = () => (
  <AdminFormActions
    dirty
    submitAction={{ action: 'save' }}
    cancelAction={{ action: 'cancel' }}
    deleteAction={{ action: 'delete' }}
  />
);

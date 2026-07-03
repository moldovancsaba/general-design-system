import { AdminModal } from '@sovereignsquad/gds';

export const Ready = () => (
  <AdminModal
    opened
    title="Edit partner profile"
    description="Update the public listing details for this partner."
    state="ready"
    actions={{
      primary: { action: 'save' },
      secondary: [{ action: 'cancel' }],
    }}
  >
    <p style={{ margin: 0 }}>
      Changes are published immediately to the partner directory once saved.
    </p>
  </AdminModal>
);

export const Loading = () => (
  <AdminModal
    opened
    title="Loading record"
    description="Fetching the latest partner details."
    state="loading"
  />
);

export const ErrorState = () => (
  <AdminModal
    opened
    title="Could not load record"
    description="The partner record failed to load. Retry to continue."
    state="error"
    actions={{ primary: { action: 'refresh' } }}
  />
);

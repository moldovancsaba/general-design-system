import { AdminDetailDrawer } from '@sovereignsquad/gds';

export const Opened = () => (
  <AdminDetailDrawer
    opened
    title="Ada Lovelace"
    description="Maintainer · platform-ui"
    metadata="Joined March 2024 · 1,284 commits"
    actions={{ primary: { action: 'edit' }, secondary: [{ action: 'delete' }] }}
  >
    <p>Owns the access gate runtime and the shared card contracts.</p>
    <p>Last active 2 hours ago across the docs and playground surfaces.</p>
  </AdminDetailDrawer>
);

export const LoadingState = () => (
  <AdminDetailDrawer
    opened
    title="Loading member…"
    state="loading"
  />
);

export const EmptyState = () => (
  <AdminDetailDrawer
    opened
    title="No selection"
    state="empty"
    description="Select a row to see member details."
  />
);

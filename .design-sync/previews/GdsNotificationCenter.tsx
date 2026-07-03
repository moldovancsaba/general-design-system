import { GdsNotificationProvider, GdsNotificationCenter } from '@sovereignsquad/gds';

// GdsNotificationCenter reads from GdsNotificationProvider context (throws
// without it), so each cell mounts the provider around the center surface.
export const Empty = () => (
  <GdsNotificationProvider>
    <GdsNotificationCenter
      title="Notifications"
      emptyMessage="You're all caught up — no new notifications."
    />
  </GdsNotificationProvider>
);

export const Activity = () => (
  <GdsNotificationProvider>
    <GdsNotificationCenter
      title="Activity"
      emptyMessage="Nothing needs your attention right now."
    />
  </GdsNotificationProvider>
);

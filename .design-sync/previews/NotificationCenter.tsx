import { NotificationCenter, GdsNotificationProvider } from '@sovereignsquad/gds';

export const Default = () => (
  <GdsNotificationProvider>
    <NotificationCenter
      title="Notifications"
      emptyMessage="You're all caught up — no new notifications."
    />
  </GdsNotificationProvider>
);

import { NotificationCenter, GdsNotificationProvider } from '@doneisbetter/gds';

export const Default = () => (
  <GdsNotificationProvider>
    <NotificationCenter
      title="Notifications"
      emptyMessage="You're all caught up — no new notifications."
    />
  </GdsNotificationProvider>
);

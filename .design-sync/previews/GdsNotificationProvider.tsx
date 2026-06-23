import {
  GdsNotificationProvider,
  GdsNotificationCenter,
  MetricCard,
} from '@doneisbetter/gds';

export const Children = () => (
  <GdsNotificationProvider>
    <MetricCard
      label="Delivered today"
      value="24 notifications"
      description="Children of GdsNotificationProvider can publish and read notifications."
    />
  </GdsNotificationProvider>
);

export const WithCenter = () => (
  <GdsNotificationProvider>
    <GdsNotificationCenter
      title="Notifications"
      emptyMessage="No notifications yet."
    />
  </GdsNotificationProvider>
);

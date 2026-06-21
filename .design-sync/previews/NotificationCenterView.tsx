import { NotificationCenterView } from '@doneisbetter/gds';

export const Populated = () => (
  <NotificationCenterView
    title="Notifications"
    notifications={[
      {
        id: 'n1',
        title: 'Deployment succeeded',
        message: 'Build #482 is live in production.',
        severity: 'success',
      },
      {
        id: 'n2',
        title: 'Storage almost full',
        message: 'You are using 92% of your plan quota.',
        severity: 'warning',
      },
      {
        id: 'n3',
        title: 'New comment on “Q3 roadmap”',
        message: 'Lin Wu mentioned you in a thread.',
        severity: 'info',
      },
    ]}
  />
);

export const Empty = () => (
  <NotificationCenterView
    title="Notifications"
    notifications={[]}
    emptyMessage="No notifications yet."
  />
);

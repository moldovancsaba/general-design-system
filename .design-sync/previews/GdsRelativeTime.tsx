import { GdsRelativeTime } from '@doneisbetter/gds';

export const HoursAgo = () => (
  <p style={{ margin: 0 }}>
    Last synced <GdsRelativeTime value={-2} unit="hour" />.
  </p>
);

export const DaysAgo = () => (
  <p style={{ margin: 0 }}>
    Listing published <GdsRelativeTime value={-3} unit="day" style="long" />.
  </p>
);

export const InMinutes = () => (
  <p style={{ margin: 0 }}>
    Maintenance window starts <GdsRelativeTime value={30} unit="minute" />.
  </p>
);

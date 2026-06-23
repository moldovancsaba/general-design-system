import { BannerNotice } from '@doneisbetter/gds';

export const Warning = () => (
  <BannerNotice
    eyebrow="Service status"
    severity="warning"
    title="One partner connector is degraded"
    message="Background sync is delayed. Critical failures are still shown inline as well."
  />
);

export const Severities = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <BannerNotice
      severity="success"
      title="All connectors are healthy"
      message="Background sync completed across every tenant."
    />
    <BannerNotice
      severity="info"
      title="Publishing queue active"
      message="New items will appear once validation completes."
    />
    <BannerNotice
      severity="error"
      title="Sync failed for two sources"
      message="We could not reach the upstream provider."
      action={<button type="button">Retry now</button>}
    />
  </div>
);

export const Neutral = () => (
  <BannerNotice
    eyebrow="Heads up"
    severity="neutral"
    title="Scheduled maintenance this weekend"
    message="Read-only access remains available throughout the window."
  />
);

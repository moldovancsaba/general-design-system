import { PlaceholderPanel } from '@sovereignsquad/gds';

export const Placeholder = () => (
  <PlaceholderPanel
    mode="placeholder"
    badge="Coming soon"
    title="Team analytics"
    description="Usage and adoption charts will appear here once your workspace has collected a full week of activity."
  />
);

export const Live = () => (
  <PlaceholderPanel
    mode="live"
    badge="Live"
    title="Team analytics"
    description="Showing activity for the current billing period."
    footer={<span>Updated 4 minutes ago</span>}
  >
    <div>Active members: 128 · Daily sessions: 1,402</div>
  </PlaceholderPanel>
);

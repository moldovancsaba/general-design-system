import { PlaybackSurface, PlaybackControls } from '@sovereignsquad/gds';

const media =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='270'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%230f172a'/%3E%3Cstop offset='1' stop-color='%237c3aed'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='480' height='270' fill='url(%23g)'/%3E%3Ccircle cx='240' cy='135' r='40' fill='white' fill-opacity='0.9'/%3E%3Cpolygon points='228,115 228,155 262,135' fill='%230f172a'/%3E%3C/svg%3E";

const mediaNode = (
  <img src={media} alt="Product walkthrough" style={{ width: '100%', display: 'block' }} />
);

export const Ready = () => (
  <PlaybackSurface
    title="Product walkthrough"
    state="ready"
    mode="embedded"
    media={mediaNode}
    statusMessage="Accessible playback surface with bounded media and clear next actions."
    controls={<PlaybackControls state="ready" canGoNext canGoPrevious />}
  />
);

export const Playing = () => (
  <PlaybackSurface
    title="Onboarding tour"
    state="playing"
    mode="kiosk"
    media={mediaNode}
    statusMessage="Now playing — chapter 2 of 5"
    controls={<PlaybackControls state="playing" canGoNext canGoPrevious />}
  />
);

export const Empty = () => (
  <PlaybackSurface
    title="Saved clips"
    state="empty"
    mode="embedded"
    emptyState={<div>No clips yet. Recorded sessions will appear here.</div>}
  />
);

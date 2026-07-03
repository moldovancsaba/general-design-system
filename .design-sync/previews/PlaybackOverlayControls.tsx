import { PlaybackSurface, PlaybackOverlayControls } from '@sovereignsquad/gds';

const media =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='240'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23020617'/%3E%3Cstop offset='1' stop-color='%23475569'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='480' height='240' fill='url(%23g)'/%3E%3Ccircle cx='240' cy='120' r='34' fill='white' fill-opacity='0.85'/%3E%3Cpolygon points='230,103 230,137 258,120' fill='%23020617'/%3E%3C/svg%3E";

const mediaNode = (
  <img src={media} alt="Playback" style={{ width: '100%', display: 'block' }} />
);

export const Playing = () => (
  <PlaybackSurface
    title="Fullscreen playback"
    state="playing"
    mode="fullscreen"
    media={mediaNode}
    overlays={<PlaybackOverlayControls state="playing" fullscreen canGoNext canGoPrevious />}
  />
);

export const Paused = () => (
  <PlaybackSurface
    title="Fullscreen playback"
    state="ready"
    mode="fullscreen"
    media={mediaNode}
    overlays={<PlaybackOverlayControls state="paused" fullscreen canGoNext canGoPrevious />}
  />
);

import { PlaybackSurface, PlaybackControls } from '@doneisbetter/gds';

const media =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='200'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%230f172a'/%3E%3Cstop offset='1' stop-color='%232563eb'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='480' height='200' fill='url(%23g)'/%3E%3C/svg%3E";

const mediaNode = (
  <img src={media} alt="Playback" style={{ width: '100%', display: 'block' }} />
);

export const Playing = () => (
  <PlaybackSurface
    title="Now playing"
    state="playing"
    mode="embedded"
    media={mediaNode}
    controls={<PlaybackControls state="playing" canGoNext canGoPrevious />}
  />
);

export const Paused = () => (
  <PlaybackSurface
    title="Paused"
    state="ready"
    mode="embedded"
    media={mediaNode}
    controls={<PlaybackControls state="paused" canGoNext canGoPrevious={false} />}
  />
);

export const Loading = () => (
  <PlaybackSurface
    title="Buffering"
    state="loading"
    mode="embedded"
    media={mediaNode}
    controls={<PlaybackControls state="loading" />}
  />
);

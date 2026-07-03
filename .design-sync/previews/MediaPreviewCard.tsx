import { MediaPreviewCard } from '@sovereignsquad/gds';

const IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%2314b8a6'/%3E%3Cstop offset='1' stop-color='%233b82f6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g)'/%3E%3Ctext x='50%25' y='52%25' fill='white' font-family='sans-serif' font-size='24' text-anchor='middle'%3Eonboarding.mp4%3C/text%3E%3C/svg%3E";

export const Ready = () => (
  <MediaPreviewCard
    title="Onboarding walkthrough"
    src={IMG}
    alt="Onboarding walkthrough thumbnail"
    aspectRatio="4:3"
    state="ready"
    caption="Captured from the latest product tour recording."
    metadata={[
      { label: 'Type', value: 'Video · MP4' },
      { label: 'Duration', value: '2:14' },
      { label: 'Size', value: '18.4 MB' },
    ]}
  />
);

export const Missing = () => (
  <MediaPreviewCard
    title="Archived asset"
    alt="Missing asset"
    aspectRatio="4:3"
    state="missing"
    caption="Source file could not be located in storage."
    status="Unavailable"
  />
);

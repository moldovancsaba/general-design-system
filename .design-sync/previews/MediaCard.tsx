import { MediaCard, StatusBadge } from '@sovereignsquad/gds';

const IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='260'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%238b5cf6'/%3E%3Cstop offset='1' stop-color='%23ec4899'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='260' fill='url(%23g)'/%3E%3Ctext x='50%25' y='52%25' fill='white' font-family='sans-serif' font-size='26' text-anchor='middle'%3EFeature reel%3C/text%3E%3C/svg%3E";

const Image = () => (
  <img src={IMG} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
);

export const Default = () => (
  <MediaCard
    title="Spring campaign highlight reel"
    description="A 90-second cut featuring the new product line and customer stories."
    status="Published"
    image={<Image />}
    actions={[{ label: 'Play' }, { label: 'Share' }]}
  />
);

export const WithOverlay = () => (
  <MediaCard
    title="Behind the scenes: studio shoot"
    description="Raw footage from the photo session, pending review before publish."
    image={<Image />}
    overlay={<StatusBadge status="warning">Draft</StatusBadge>}
    actions={[{ label: 'Review' }]}
  />
);

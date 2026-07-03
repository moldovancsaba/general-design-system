import { ProductCard, Badge } from '@sovereignsquad/gds';

const media =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='360' height='200'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%232563eb'/%3E%3Cstop offset='1' stop-color='%2338bdf8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='360' height='200' fill='url(%23g)'/%3E%3Ctext x='180' y='110' font-family='sans-serif' font-size='20' fill='white' text-anchor='middle'%3EAnalytics Pro%3C/text%3E%3C/svg%3E";

const mediaNode = (
  <img src={media} alt="Analytics Pro" style={{ width: '100%', display: 'block' }} />
);

export const MediaTop = () => (
  <ProductCard
    variant="media-top"
    size="md"
    density="comfortable"
    title="Analytics Pro"
    description="Real-time dashboards, cohort analysis, and exportable reports for growing teams."
    media={mediaNode}
    status={<Badge color="green">Available</Badge>}
    metadata={[
      { label: 'Plan', value: 'Team' },
      { label: 'Seats', value: '5 included' },
    ]}
    primaryAction={<button>Add to plan</button>}
  />
);

export const MediaLeft = () => (
  <ProductCard
    variant="media-left"
    size="md"
    density="compact"
    title="Storage Add-on"
    description="Expand workspace storage with pooled, region-pinned capacity."
    media={mediaNode}
    status={<Badge color="blue">New</Badge>}
    metadata={[{ label: 'Capacity', value: '500 GB' }]}
    primaryAction={<button>Enable</button>}
  />
);

export const Compact = () => (
  <ProductCard
    variant="default"
    size="sm"
    density="compact"
    title="Email Notifications"
    description="Per-event email delivery with digest scheduling."
    status={<Badge color="gray">Included</Badge>}
    metadata={[{ label: 'Status', value: 'Active' }]}
  />
);

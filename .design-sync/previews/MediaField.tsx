import { MediaField } from '@sovereignsquad/gds';

const IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%230ea5e9'/%3E%3Cstop offset='1' stop-color='%2322c55e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='200' fill='url(%23g)'/%3E%3Ctext x='50%25' y='53%25' fill='white' font-family='sans-serif' font-size='22' text-anchor='middle'%3Ecover.jpg%3C/text%3E%3C/svg%3E";

export const Selected = () => (
  <MediaField
    label="Cover image"
    description="Shown at the top of the public listing page."
    state="selected"
    value="cover.jpg"
    preview={<img src={IMG} alt="Cover preview" style={{ width: 200, borderRadius: 8 }} />}
    acceptedTypes="JPG, PNG, WebP"
    maxSize="Up to 5 MB"
    helpText="Recommended 1200×630 for best results."
  />
);

export const Empty = () => (
  <MediaField
    label="Profile photo"
    description="Square image used across the directory."
    state="empty"
    acceptedTypes="JPG or PNG"
    maxSize="Up to 2 MB"
    helpText="Drag a file here or choose one to upload."
  />
);

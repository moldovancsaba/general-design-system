import { AdminResourceCard } from '@doneisbetter/gds';

const bakeryThumb =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%237c3aed'/%3E%3Cstop offset='1' stop-color='%23c084fc'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='200' fill='url(%23g)'/%3E%3Ctext x='160' y='108' font-family='sans-serif' font-size='20' fill='white' text-anchor='middle'%3ERiverside Bakery%3C/text%3E%3C/svg%3E";

const coworkThumb =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200'%3E%3Cdefs%3E%3ClinearGradient id='g2' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%232563eb'/%3E%3Cstop offset='1' stop-color='%2338bdf8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='200' fill='url(%23g2)'/%3E%3Ctext x='160' y='108' font-family='sans-serif' font-size='18' fill='white' text-anchor='middle'%3ENorthside Coworking%3C/text%3E%3C/svg%3E";

export const Default = () => (
  <AdminResourceCard
    record={{
      id: 'p-104',
      title: 'Riverside Bakery',
      description: 'Artisan bakery and cafe in the Old Town district.',
      thumbnailSrc: bakeryThumb,
      mediaSrc: bakeryThumb,
      mediaAlt: 'Riverside Bakery storefront',
      status: 'Published',
      metadata: [
        { label: 'Region', value: 'EU-Central' },
        { label: 'Updated', value: '2 days ago' },
      ],
    }}
    actions={[
      { id: 'edit', label: 'Edit', kind: 'primary' },
      { id: 'archive', label: 'Archive', kind: 'danger' },
    ]}
  />
);

export const Pending = () => (
  <AdminResourceCard
    record={{
      id: 'p-217',
      title: 'Northside Coworking',
      description: 'Flexible workspace with meeting rooms and event space.',
      thumbnailSrc: coworkThumb,
      mediaSrc: coworkThumb,
      mediaAlt: 'Northside Coworking lounge',
      status: 'Pending review',
      metadata: [
        { label: 'Region', value: 'US-West' },
        { label: 'Submitted', value: 'Today' },
      ],
    }}
    actions={[{ id: 'review', label: 'Review', kind: 'primary' }]}
  />
);

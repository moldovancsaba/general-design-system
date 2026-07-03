import { AdminResourceGrid } from '@sovereignsquad/gds';

const thumb = (label: string, c1: string, c2: string) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='${c1}'/%3E%3Cstop offset='1' stop-color='${c2}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='200' fill='url(%23g)'/%3E%3Ctext x='160' y='108' font-family='sans-serif' font-size='18' fill='white' text-anchor='middle'%3E${label}%3C/text%3E%3C/svg%3E`;

const records = [
  {
    id: 'p-104',
    title: 'Riverside Bakery',
    description: 'Artisan bakery and cafe in the Old Town district.',
    thumbnailSrc: thumb('Bakery', '%237c3aed', '%23c084fc'),
    mediaSrc: thumb('Bakery', '%237c3aed', '%23c084fc'),
    mediaAlt: 'Riverside Bakery',
    status: 'Published',
    metadata: [{ label: 'Region', value: 'EU-Central' }],
  },
  {
    id: 'p-217',
    title: 'Northside Coworking',
    description: 'Flexible workspace with meeting rooms and event space.',
    thumbnailSrc: thumb('Coworking', '%232563eb', '%2338bdf8'),
    mediaSrc: thumb('Coworking', '%232563eb', '%2338bdf8'),
    mediaAlt: 'Northside Coworking',
    status: 'Pending review',
    metadata: [{ label: 'Region', value: 'US-West' }],
  },
  {
    id: 'p-330',
    title: 'Harbor Fitness Club',
    description: 'Full-service gym with pool and group classes.',
    thumbnailSrc: thumb('Fitness', '%2316a34a', '%234ade80'),
    mediaSrc: thumb('Fitness', '%2316a34a', '%234ade80'),
    mediaAlt: 'Harbor Fitness Club',
    status: 'Published',
    metadata: [{ label: 'Region', value: 'APAC' }],
  },
];

export const Default = () => (
  <AdminResourceGrid
    records={records}
    actions={[
      { id: 'edit', label: 'Edit', kind: 'primary' },
      { id: 'archive', label: 'Archive', kind: 'danger' },
    ]}
  />
);

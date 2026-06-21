import { GdsResourceManagerTemplate } from '@doneisbetter/gds';

const rows = [
  { id: '1', name: 'Coastal Retreat', region: 'West', status: 'Published' },
  { id: '2', name: 'Mountain Lodge', region: 'North', status: 'Draft' },
  { id: '3', name: 'City Loft', region: 'Central', status: 'Published' },
  { id: '4', name: 'Desert Villa', region: 'South', status: 'In review' },
];

const columns = [
  { key: 'name', header: 'Listing' },
  { key: 'region', header: 'Region' },
  { key: 'status', header: 'Status' },
];

export const Ready = () => (
  <GdsResourceManagerTemplate
    eyebrow="Partner operations"
    title="Listings"
    description="Manage every partner listing across all regions."
    rows={rows}
    columns={columns}
    getRowKey={(row) => row.id as string}
    actions={[{ id: 'add', label: 'New listing', kind: 'primary' }]}
  />
);

export const Empty = () => (
  <GdsResourceManagerTemplate
    eyebrow="Partner operations"
    title="Listings"
    description="Manage every partner listing across all regions."
    state="empty"
    rows={[]}
    columns={columns}
  />
);

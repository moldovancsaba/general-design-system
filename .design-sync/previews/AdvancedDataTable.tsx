import { AdvancedDataTable } from '@doneisbetter/gds';

const rows = [
  { id: 'p-104', name: 'Riverside Bakery', region: 'EU-Central', status: 'Published', visits: 1820 },
  { id: 'p-217', name: 'Northside Coworking', region: 'US-West', status: 'Pending', visits: 640 },
  { id: 'p-330', name: 'Harbor Fitness Club', region: 'APAC', status: 'Published', visits: 2475 },
  { id: 'p-412', name: 'Old Town Cinema', region: 'EU-Central', status: 'Archived', visits: 310 },
];

const columns = [
  { key: 'name', label: 'Partner', sortable: true },
  { key: 'region', label: 'Region', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'visits', label: 'Monthly visits', sortable: true, render: (r: typeof rows[number]) => r.visits.toLocaleString() },
];

export const Default = () => (
  <AdvancedDataTable
    rows={rows}
    columns={columns}
    rowId={(r) => r.id}
    sortBy="visits"
    sortDirection="desc"
  />
);

export const Compact = () => (
  <AdvancedDataTable
    rows={rows}
    columns={columns}
    rowId={(r) => r.id}
    density="compact"
  />
);

export const Loading = () => (
  <AdvancedDataTable rows={[]} columns={columns} rowId={(r) => r.id} loading />
);

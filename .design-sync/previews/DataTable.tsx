import { DataTable, CountBadge } from '@doneisbetter/gds';

type Entry = { id: string; name: string; family: string; status: string; usage: number };

const rows: Entry[] = [
  { id: 'metric-card', name: 'MetricCard', family: 'Data display', status: 'Published', usage: 142 },
  { id: 'page-header', name: 'PageHeader', family: 'Layout', status: 'Published', usage: 98 },
  { id: 'confirm-dialog', name: 'ConfirmDialog', family: 'Overlays', status: 'Published', usage: 54 },
  { id: 'discovery-shell', name: 'DiscoveryShell', family: 'App shells', status: 'Draft', usage: 12 },
];

const columns = [
  { key: 'name', label: 'Component' },
  { key: 'family', label: 'Family' },
  { key: 'status', label: 'Status' },
  { key: 'usage', label: 'Usage', render: (item: Entry) => <CountBadge value={item.usage} /> },
];

export const Default = () => (
  <DataTable data={rows} columns={columns} getRowKey={(item) => item.id} />
);

export const Loading = () => (
  <DataTable data={[]} columns={columns} loading getRowKey={(item) => item.id} />
);

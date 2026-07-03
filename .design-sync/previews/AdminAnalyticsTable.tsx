import { AdminAnalyticsTable } from '@sovereignsquad/gds';

const rows = [
  { id: 'docs', surface: 'Docs site', views: 48210, delta: 12.4, errors: 0 },
  { id: 'play', surface: 'Playground', views: 19833, delta: -3.1, errors: 2 },
  { id: 'catalog', surface: 'Catalog', views: 8120, delta: 5.7, errors: 0 },
];

const columns = [
  { key: 'surface', header: 'Surface', accessor: (r: any) => r.surface, rowHeader: true },
  { key: 'views', header: 'Views', accessor: (r: any) => r.views.toLocaleString(), numeric: true, align: 'end' as const, sortable: true },
  {
    key: 'delta',
    header: 'WoW',
    accessor: (r: any) => `${r.delta > 0 ? '+' : ''}${r.delta}%`,
    numeric: true,
    align: 'end' as const,
    metricTone: 'positive' as const,
  },
  {
    key: 'errors',
    header: 'Errors',
    accessor: (r: any) => r.errors,
    numeric: true,
    align: 'end' as const,
    metricTone: 'negative' as const,
  },
];

export const Default = () => (
  <AdminAnalyticsTable
    caption="Traffic by surface (last 7 days)"
    rows={rows}
    columns={columns}
    sort={{ key: 'views', direction: 'desc' }}
    getRowKey={(r: any) => r.id}
  />
);

export const Refreshing = () => (
  <AdminAnalyticsTable
    caption="Traffic by surface (last 7 days)"
    rows={rows}
    columns={columns}
    state="refreshing"
    getRowKey={(r: any) => r.id}
  />
);

export const Empty = () => (
  <AdminAnalyticsTable
    caption="Traffic by surface (last 7 days)"
    rows={[]}
    columns={columns}
    state="empty"
    empty="No traffic recorded for this period."
    getRowKey={(r: any) => r.id}
  />
);

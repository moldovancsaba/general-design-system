import { SimpleDataTable, StatusBadge } from '@doneisbetter/gds';

const rows = [
  { id: '1', name: 'Onboarding flow', owner: 'A. Rivera', status: 'Live', updated: 'Jun 18' },
  { id: '2', name: 'Billing portal', owner: 'M. Chen', status: 'In review', updated: 'Jun 17' },
  { id: '3', name: 'Notifications', owner: 'P. Okafor', status: 'Draft', updated: 'Jun 14' },
];

export const Default = () => (
  <SimpleDataTable
    columns={[
      { key: 'name', header: 'Pattern' },
      { key: 'owner', header: 'Owner' },
      { key: 'status', header: 'Status' },
      { key: 'updated', header: 'Updated' },
    ]}
    rows={rows}
    getRowKey={(row) => row.id}
  />
);

export const WithRenderedCells = () => (
  <SimpleDataTable
    columns={[
      { key: 'name', header: 'Pattern' },
      { key: 'owner', header: 'Owner' },
      {
        key: 'status',
        header: 'Status',
        render: (row) => (
          <StatusBadge status={row.status === 'Live' ? 'success' : row.status === 'In review' ? 'warning' : 'neutral'}>
            {row.status}
          </StatusBadge>
        ),
      },
    ]}
    rows={rows}
    getRowKey={(row) => row.id}
  />
);

export const Empty = () => (
  <SimpleDataTable
    columns={[
      { key: 'name', header: 'Pattern' },
      { key: 'owner', header: 'Owner' },
      { key: 'status', header: 'Status' },
    ]}
    rows={[]}
    emptyTitle="No patterns yet"
    emptyDescription="Patterns you publish will appear in this table."
  />
);

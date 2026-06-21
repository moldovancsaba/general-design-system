import { AdminDataTable } from '@doneisbetter/gds';

const rows = [
  { id: 'usr_01', name: 'Ada Lovelace', role: 'Maintainer', commits: 1284 },
  { id: 'usr_02', name: 'Grace Hopper', role: 'Reviewer', commits: 942 },
  { id: 'usr_03', name: 'Alan Turing', role: 'Contributor', commits: 318 },
];

const columns = [
  { key: 'name', header: 'Name', accessor: (r: any) => r.name, rowHeader: true, sortable: true },
  { key: 'role', header: 'Role', accessor: (r: any) => r.role },
  { key: 'commits', header: 'Commits', accessor: (r: any) => r.commits, numeric: true, align: 'end' as const, sortable: true },
];

export const Default = () => (
  <AdminDataTable
    caption="Workspace members"
    rows={rows}
    columns={columns}
    sort={{ key: 'commits', direction: 'desc' }}
    getRowKey={(r: any) => r.id}
  />
);

export const Loading = () => (
  <AdminDataTable
    caption="Workspace members"
    rows={[]}
    columns={columns}
    state="loading"
    getRowKey={(r: any) => r.id}
  />
);

export const Empty = () => (
  <AdminDataTable
    caption="Workspace members"
    rows={[]}
    columns={columns}
    state="empty"
    empty="No members yet. Invite someone to get started."
    getRowKey={(r: any) => r.id}
  />
);

export const ErrorState = () => (
  <AdminDataTable
    caption="Workspace members"
    rows={[]}
    columns={columns}
    state="error"
    error="Couldn't load members. Try refreshing."
    getRowKey={(r: any) => r.id}
  />
);

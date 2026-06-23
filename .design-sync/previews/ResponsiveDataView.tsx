import { ResponsiveDataView, SectionPanel, BodyText, SectionTitle } from '@doneisbetter/gds';

const rows = [
  { id: 'r1', name: 'Budapest – District V', orders: '1,240', status: 'Open' },
  { id: 'r2', name: 'Vienna – Innere Stadt', orders: '980', status: 'Open' },
  { id: 'r3', name: 'Prague – Old Town', orders: '742', status: 'Limited' },
];

const columns = [
  { key: 'name', label: 'Restaurant', render: (r: (typeof rows)[number]) => r.name },
  { key: 'orders', label: 'Orders', render: (r: (typeof rows)[number]) => r.orders },
  { key: 'status', label: 'Status', render: (r: (typeof rows)[number]) => r.status },
];

const renderCard = (r: (typeof rows)[number]) => (
  <SectionPanel>
    <SectionTitle order={4}>{r.name}</SectionTitle>
    <BodyText>{r.orders} orders · {r.status}</BodyText>
  </SectionPanel>
);

export const Default = () => (
  <ResponsiveDataView
    data={rows}
    columns={columns}
    renderCard={renderCard}
    getRowKey={(r) => r.id}
    activeFilters={[{ label: 'Status: Open' }, { label: 'Region: Central EU' }]}
  />
);

export const Empty = () => (
  <ResponsiveDataView
    data={[]}
    columns={columns}
    renderCard={renderCard}
    emptyTitle="No restaurants match"
    emptyDescription="Adjust the active filters to widen the result set."
  />
);

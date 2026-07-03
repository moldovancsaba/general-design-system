import { GdsDataTable, createGdsTableAdapter } from '@sovereignsquad/gds';

type Invoice = {
  id: string;
  customer: string;
  amount: string;
  status: string;
  issued: string;
};

const columns = [
  { key: 'id', label: 'Invoice', sortable: true },
  { key: 'customer', label: 'Customer', sortable: true, filterable: true },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status', filterable: true },
  { key: 'issued', label: 'Issued', sortable: true },
] as const;

const rows: Invoice[] = [
  { id: 'INV-1042', customer: 'Acme Co', amount: '$2,400.00', status: 'Paid', issued: '2026-05-02' },
  { id: 'INV-1043', customer: 'Globex', amount: '$980.00', status: 'Pending', issued: '2026-05-08' },
  { id: 'INV-1044', customer: 'Initech', amount: '$5,120.00', status: 'Paid', issued: '2026-05-11' },
  { id: 'INV-1045', customer: 'Umbrella LLC', amount: '$340.00', status: 'Overdue', issued: '2026-04-19' },
  { id: 'INV-1046', customer: 'Soylent', amount: '$1,760.00', status: 'Pending', issued: '2026-05-21' },
];

const adapter = createGdsTableAdapter<Invoice>(rows, columns as any);

export const Default = () => (
  <GdsDataTable<Invoice>
    caption="Recent invoices"
    summary="Showing 5 of 5 invoices for the current billing period."
    columns={columns as any}
    adapter={adapter}
    rowId={(row) => row.id}
    exportLabel="Export"
  />
);

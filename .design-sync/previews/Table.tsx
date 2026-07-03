import { Table } from '@sovereignsquad/gds';

export const Default = () => (
  <Table>
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Invoice</Table.Th>
        <Table.Th>Customer</Table.Th>
        <Table.Th>Status</Table.Th>
        <Table.Th>Amount</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>
      <Table.Tr>
        <Table.Td>INV-1042</Table.Td>
        <Table.Td>Riverside Bakery</Table.Td>
        <Table.Td>Paid</Table.Td>
        <Table.Td>$1,240.00</Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Td>INV-1043</Table.Td>
        <Table.Td>Atlas Logistics</Table.Td>
        <Table.Td>Pending</Table.Td>
        <Table.Td>$3,980.50</Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Td>INV-1044</Table.Td>
        <Table.Td>Northwind Co.</Table.Td>
        <Table.Td>Overdue</Table.Td>
        <Table.Td>$620.00</Table.Td>
      </Table.Tr>
    </Table.Tbody>
  </Table>
);

export const Striped = () => (
  <Table striped withTableBorder withColumnBorders highlightOnHover>
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Service</Table.Th>
        <Table.Th>Region</Table.Th>
        <Table.Th>Uptime</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>
      <Table.Tr>
        <Table.Td>API Gateway</Table.Td>
        <Table.Td>us-east-1</Table.Td>
        <Table.Td>99.98%</Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Td>Auth Service</Table.Td>
        <Table.Td>eu-west-1</Table.Td>
        <Table.Td>99.95%</Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Td>Media CDN</Table.Td>
        <Table.Td>global</Table.Td>
        <Table.Td>100.00%</Table.Td>
      </Table.Tr>
    </Table.Tbody>
    <Table.Caption>Last 30 days, measured at 1-minute intervals.</Table.Caption>
  </Table>
);

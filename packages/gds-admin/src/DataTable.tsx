import React from 'react';
import { Table, Paper, Text, LoadingOverlay } from '@mantine/core';

export interface DataTableColumn<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;
}

/**
 * Standardized Data Table
 */
export function DataTable<T extends Record<string, any>>({ data, columns, loading = false }: DataTableProps<T>) {
  if (!data.length && !loading) {
    return (
      <Paper p="xl" withBorder ta="center">
        <Text c="dimmed">No data available.</Text>
      </Paper>
    );
  }

  return (
    <Paper withBorder pos="relative" style={{ overflow: 'hidden' }}>
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            {columns.map((col) => (
              <Table.Th key={col.key}>{col.label}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((item, rowIndex) => (
            <Table.Tr key={item.id || rowIndex}>
              {columns.map((col) => (
                <Table.Td key={col.key}>
                  {col.render ? col.render(item) : item[col.key]}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}

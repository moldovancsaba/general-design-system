import type { ReactNode } from 'react';
import { Badge, Group, Stack } from '@mantine/core';

export interface DataToolbarFilterChip {
  label: string;
  onRemove?: () => void;
}

export interface DataToolbarProps {
  searchSlot?: ReactNode;
  filterSlot?: ReactNode;
  sortSlot?: ReactNode;
  resetAction?: ReactNode;
  createAction?: ReactNode;
  activeFilters?: DataToolbarFilterChip[];
}

export function DataToolbar({
  searchSlot,
  filterSlot,
  sortSlot,
  resetAction,
  createAction,
  activeFilters = [],
}: DataToolbarProps) {
  return (
    <Stack gap="sm">
      <Group justify="space-between" align="flex-start" gap="sm">
        <Group flex={1} align="flex-start" gap="sm">
          {searchSlot}
          {filterSlot}
          {sortSlot}
        </Group>
        <Group gap="sm">
          {resetAction}
          {createAction}
        </Group>
      </Group>

      {activeFilters.length ? (
        <Group gap="xs">
          {activeFilters.map((filter) => (
            <Badge
              key={filter.label}
              variant="light"
              rightSection={filter.onRemove ? '×' : undefined}
              style={filter.onRemove ? { cursor: 'pointer' } : undefined}
              onClick={filter.onRemove}
            >
              {filter.label}
            </Badge>
          ))}
        </Group>
      ) : null}
    </Stack>
  );
}

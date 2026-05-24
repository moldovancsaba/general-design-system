import React from 'react';
import { Drawer, Group, Stack } from '@mantine/core';

export interface FilterDrawerProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

export function FilterDrawer({
  opened,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
}: FilterDrawerProps) {
  return (
    <Drawer opened={opened} onClose={onClose} title={title} position="right" size="md">
      <Stack gap="md">
        {children}
        {(primaryAction || secondaryAction) ? (
          <Group justify="space-between" mt="md">
            {secondaryAction ?? <span />}
            {primaryAction}
          </Group>
        ) : null}
      </Stack>
    </Drawer>
  );
}

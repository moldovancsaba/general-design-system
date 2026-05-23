import React from 'react';
import { Stack, Text, Title, Box } from '@mantine/core';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

/**
 * Standardized EmptyState component.
 */
export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Stack align="center" justify="center" gap="md" py="xl" ta="center">
      {icon && <Box c="dimmed">{icon}</Box>}
      <Title order={3}>{title}</Title>
      <Text c="dimmed" maw={400}>
        {description}
      </Text>
      {action && <Box mt="md">{action}</Box>}
    </Stack>
  );
}

import type { ReactNode } from 'react';
import { Breadcrumbs, Group, Title, Text, Box, Stack } from '@mantine/core';

export interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  breadcrumbs?: ReactNode[];
  primaryAction?: ReactNode;
  secondaryActions?: ReactNode;
}

export function PageHeader({ title, description, eyebrow, breadcrumbs, primaryAction, secondaryActions }: PageHeaderProps) {
  return (
    <Stack gap="sm" mb="xl">
      {breadcrumbs?.length ? <Breadcrumbs>{breadcrumbs}</Breadcrumbs> : null}
      <Group justify="space-between" align="flex-start" gap="md">
        <Box>
          {eyebrow ? (
            <Text c="dimmed" size="sm" fw={700} tt="uppercase" mb={4}>
              {eyebrow}
            </Text>
          ) : null}
          <Title order={1}>{title}</Title>
          {description && (
            <Text c="dimmed" mt="xs" size="lg">
              {description}
            </Text>
          )}
        </Box>
        {(secondaryActions || primaryAction) && (
          <Group>
            {secondaryActions}
            {primaryAction}
          </Group>
        )}
      </Group>
    </Stack>
  );
}

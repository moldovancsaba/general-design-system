import type { ReactNode } from 'react';
import { Breadcrumbs, Group, Stack, Text, Title } from '@mantine/core';

export interface WorkspaceHeaderProps {
  breadcrumbs?: ReactNode[];
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction?: ReactNode;
  secondaryActions?: ReactNode;
}

export function WorkspaceHeader({
  breadcrumbs,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryActions,
}: WorkspaceHeaderProps) {
  return (
    <Stack gap="sm" mb="xl">
      {breadcrumbs?.length ? <Breadcrumbs>{breadcrumbs}</Breadcrumbs> : null}
      {eyebrow ? (
        <Text size="sm" fw={700} c="dimmed" tt="uppercase">
          {eyebrow}
        </Text>
      ) : null}
      <Group justify="space-between" align="flex-start" gap="md">
        <Stack gap={6}>
          <Title order={1}>{title}</Title>
          {description ? (
            <Text c="dimmed" maw={640}>
              {description}
            </Text>
          ) : null}
        </Stack>
        <Group gap="sm">
          {secondaryActions}
          {primaryAction}
        </Group>
      </Group>
    </Stack>
  );
}

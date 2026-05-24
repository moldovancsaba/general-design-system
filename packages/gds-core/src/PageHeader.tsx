import React from 'react';
import { Box, Group, Stack, Text, Title } from '@mantine/core';

export interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, eyebrow, actions }: PageHeaderProps) {
  return (
    <Group justify="space-between" align="flex-start" gap="lg" wrap="wrap">
      <Stack gap="xs">
        {eyebrow && (
          <Text size="xs" fw={700} tt="uppercase" c="dimmed" style={{ letterSpacing: '0.12em' }}>
            {eyebrow}
          </Text>
        )}
        <Title order={1}>{title}</Title>
        {description && (
          <Text c="dimmed" maw={720}>
            {description}
          </Text>
        )}
      </Stack>
      {actions ? <Box>{actions}</Box> : null}
    </Group>
  );
}

import type { ReactNode } from 'react';
import { Badge, Card, Group, Stack, Text, Title } from '@mantine/core';

export interface AccessSummaryProps {
  title: string;
  roles: string[];
  scope?: string;
  blocked?: boolean;
  description?: ReactNode;
}

export function AccessSummary({ title, roles, scope, blocked = false, description }: AccessSummaryProps) {
  return (
    <Card withBorder radius="lg" padding="lg">
      <Stack gap="sm">
        <Group justify="space-between" align="center">
          <Title order={4}>{title}</Title>
          <Badge color={blocked ? 'red' : 'teal'} variant="light">
            {blocked ? 'Blocked' : 'Allowed'}
          </Badge>
        </Group>
        <Group gap="xs">
          {roles.map((role) => (
            <Badge key={role} variant="outline">
              {role}
            </Badge>
          ))}
        </Group>
        {scope ? (
          <Text size="sm" c="dimmed">
            Scope: {scope}
          </Text>
        ) : null}
        {description ? <Text size="sm">{description}</Text> : null}
      </Stack>
    </Card>
  );
}

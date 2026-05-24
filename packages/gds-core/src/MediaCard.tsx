import type { ReactNode } from 'react';
import { ActionIcon, Badge, Card, Group, Stack, Text, Title } from '@mantine/core';
import { GdsIcons } from './icons';

export interface MediaCardAction {
  label: string;
  onClick?: () => void;
}

export interface MediaCardProps {
  title: string;
  image: ReactNode;
  description?: ReactNode;
  status?: string;
  overlay?: ReactNode;
  actions?: MediaCardAction[];
}

export function MediaCard({ title, image, description, status, overlay, actions = [] }: MediaCardProps) {
  const EyeIcon = GdsIcons.Eye;

  return (
    <Card withBorder radius="lg" padding="md">
      <Card.Section pos="relative">
        {image}
        {overlay ? (
          <div style={{ position: 'absolute', inset: 12, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
            {overlay}
          </div>
        ) : null}
      </Card.Section>
      <Stack gap="sm" mt="md">
        <Group justify="space-between" align="flex-start">
          <Stack gap={4}>
            <Title order={4}>{title}</Title>
            {description ? (
              <Text size="sm" c="dimmed" lineClamp={2}>
                {description}
              </Text>
            ) : null}
          </Stack>
          {status ? <Badge variant="light">{status}</Badge> : null}
        </Group>

        {actions.length ? (
          <Group justify="flex-end" gap="xs">
            {actions.map((action) => (
              <ActionIcon key={action.label} variant="light" aria-label={action.label} onClick={action.onClick}>
                <EyeIcon size="1rem" />
              </ActionIcon>
            ))}
          </Group>
        ) : null}
      </Stack>
    </Card>
  );
}

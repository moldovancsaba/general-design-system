import { Group, Title, Text, Box } from '@mantine/core';

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <Group justify="space-between" align="flex-start" mb="xl">
      <Box>
        <Title order={1}>{title}</Title>
        {description && (
          <Text c="dimmed" mt="xs" size="lg">
            {description}
          </Text>
        )}
      </Box>
      {actions && (
        <Group>
          {actions}
        </Group>
      )}
    </Group>
  );
}

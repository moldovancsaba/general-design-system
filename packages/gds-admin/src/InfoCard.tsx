import { Card, Text, Group, ThemeIcon, Box } from '@mantine/core';

export interface InfoCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
}

export function InfoCard({ title, value, description, icon, color = 'blue' }: InfoCardProps) {
  return (
    <Card p="xl">
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Box>
          <Text tt="uppercase" fw={700} c="dimmed" size="xs">
            {title}
          </Text>
          <Text fw={700} size="xl" mt="sm">
            {value}
          </Text>
          {description && (
            <Text c="dimmed" size="sm" mt="xs">
              {description}
            </Text>
          )}
        </Box>
        {icon && (
          <ThemeIcon size="xl" radius="md" variant="light" color={color}>
            {icon}
          </ThemeIcon>
        )}
      </Group>
    </Card>
  );
}

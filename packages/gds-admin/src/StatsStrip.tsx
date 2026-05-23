import { SimpleGrid, Paper, Text, Group } from '@mantine/core';

export interface StatItem {
  label: string;
  value: string | number;
  diff?: number;
}

export interface StatsStripProps {
  stats: StatItem[];
}

export function StatsStrip({ stats }: StatsStripProps) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
      {stats.map((stat, i) => (
        <Paper key={i} withBorder p="md" radius="md">
          <Group justify="space-between">
            <Text size="xs" color="dimmed" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
          </Group>
          <Group align="flex-end" gap="xs" mt={25}>
            <Text size="xl" fw={700}>
              {stat.value}
            </Text>
            {stat.diff !== undefined && (
              <Text color={stat.diff > 0 ? 'teal' : 'red'} size="sm" fw={500}>
                {stat.diff > 0 ? '+' : ''}{stat.diff}%
              </Text>
            )}
          </Group>
        </Paper>
      ))}
    </SimpleGrid>
  );
}

import { SimpleGrid, Paper, Text, Group, Box } from '@mantine/core';

export interface StatItem {
  label: string;
  value: string | number;
  diff?: number;
}

export interface StatsStripProps {
  stats: StatItem[];
}

export function StatsStrip({ stats }: StatsStripProps) {
  const items = stats.map((stat, index) => (
    <Paper key={index} p="lg" withBorder radius="md">
      <Group justify="space-between" align="flex-end" gap="xs">
        <Box>
          <Text c="dimmed" tt="uppercase" fw={700} size="xs">
            {stat.label}
          </Text>
          <Text fw={700} size="xl" mt="sm">
            {stat.value}
          </Text>
        </Box>
        {stat.diff !== undefined && (
          <Text c={stat.diff > 0 ? 'teal' : 'red'} size="sm" fw={600}>
            {stat.diff > 0 ? '+' : ''}{stat.diff}%
          </Text>
        )}
      </Group>
    </Paper>
  ));

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
      {items}
    </SimpleGrid>
  );
}

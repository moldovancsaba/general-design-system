import type { ReactNode } from 'react';
import { Container, Group, Stack, Text, Title } from '@mantine/core';

export interface ArticleShellProps {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  meta?: ReactNode;
  sideRail?: ReactNode;
  children: ReactNode;
}

export function ArticleShell({ eyebrow, title, lead, meta, sideRail, children }: ArticleShellProps) {
  return (
    <Container size="lg" py="xl">
      <Group align="flex-start" gap="xl" wrap="nowrap">
        <Stack gap="lg" maw={760} flex={1}>
          <Stack gap="sm">
            {eyebrow ? (
              <Text size="sm" fw={700} c="dimmed" tt="uppercase">
                {eyebrow}
              </Text>
            ) : null}
            <Title order={1}>{title}</Title>
            {lead ? (
              <Text size="lg" c="dimmed">
                {lead}
              </Text>
            ) : null}
            {meta ? <Group gap="md">{meta}</Group> : null}
          </Stack>
          <Stack gap="md">{children}</Stack>
        </Stack>
        {sideRail ? (
          <Stack visibleFrom="lg" gap="md" w={240}>
            {sideRail}
          </Stack>
        ) : null}
      </Group>
    </Container>
  );
}

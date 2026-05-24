import type { ReactNode } from 'react';
import { AppShell, Box, Burger, Container, Group, Stack, Text } from '@mantine/core';

export interface PublicShellProps {
  brand: ReactNode;
  navigation?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  mobileNavigation?: ReactNode;
  children: ReactNode;
  headerBordered?: boolean;
  compact?: boolean;
}

export function PublicShell({
  brand,
  navigation,
  actions,
  footer,
  mobileNavigation,
  children,
  headerBordered = true,
  compact = false,
}: PublicShellProps) {
  return (
    <AppShell header={{ height: 72 }} footer={mobileNavigation ? { height: 68 } : undefined} padding={0}>
      <AppShell.Header withBorder={headerBordered}>
        <Container size={compact ? 'md' : 'lg'} h="100%">
          <Group h="100%" justify="space-between" wrap="nowrap">
            <Group wrap="nowrap" gap="sm">
              {mobileNavigation ? <Burger hiddenFrom="sm" disabled opened={false} aria-hidden /> : null}
              <Box>{brand}</Box>
            </Group>
            <Group visibleFrom="sm" gap="lg">
              {navigation}
            </Group>
            <Group gap="sm">{actions}</Group>
          </Group>
        </Container>
      </AppShell.Header>

      {mobileNavigation ? (
        <AppShell.Footer withBorder>
          <Container size={compact ? 'md' : 'lg'} h="100%">
            <Group h="100%" justify="space-around" wrap="nowrap">
              {mobileNavigation}
            </Group>
          </Container>
        </AppShell.Footer>
      ) : null}

      <AppShell.Main>
        <Container size={compact ? 'md' : 'lg'} py="xl">
          <Stack gap="xl">{children}</Stack>
        </Container>
        {footer ? (
          <Box component="footer" py="xl">
            <Container size={compact ? 'md' : 'lg'}>
              <Text size="sm" c="dimmed">
                {footer}
              </Text>
            </Container>
          </Box>
        ) : null}
      </AppShell.Main>
    </AppShell>
  );
}

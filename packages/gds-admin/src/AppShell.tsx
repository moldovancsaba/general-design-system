import React from 'react';
import { AppShell as MantineAppShell, Burger, Group, Text, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export interface AppShellProps {
  title?: string;
  navLinks: { label: string; href: string }[];
  children: React.ReactNode;
}

/**
 * Standardized Admin App Shell
 */
export function AppShell({ title = 'Workspace', navLinks, children }: AppShellProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text fw={700} size="lg">{title}</Text>
        </Group>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar p="md">
        {navLinks.map((link) => (
          <Box key={link.href} py="xs" style={{ cursor: 'pointer' }}>
            <Text>{link.label}</Text>
          </Box>
        ))}
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>
        {children}
      </MantineAppShell.Main>
    </MantineAppShell>
  );
}

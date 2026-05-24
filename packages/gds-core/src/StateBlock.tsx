import type { ReactNode } from 'react';
import { Loader, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { GdsIcons } from './icons';

export type StateBlockVariant =
  | 'loading'
  | 'empty'
  | 'error'
  | 'permission'
  | 'disabled'
  | 'success'
  | 'info'
  | 'not-enough-data';

export interface StateBlockProps {
  variant: StateBlockVariant;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
  compact?: boolean;
}

const variantConfig: Record<StateBlockVariant, { color: string; icon: ReactNode }> = {
  loading: { color: 'violet', icon: <Loader size="sm" /> },
  empty: { color: 'gray', icon: <GdsIcons.Inbox size="1.1rem" /> },
  error: { color: 'red', icon: <GdsIcons.Danger size="1.1rem" /> },
  permission: { color: 'orange', icon: <GdsIcons.Verify size="1.1rem" /> },
  disabled: { color: 'gray', icon: <GdsIcons.Toggle size="1.1rem" /> },
  success: { color: 'teal', icon: <GdsIcons.Success size="1.1rem" /> },
  info: { color: 'blue', icon: <GdsIcons.Info size="1.1rem" /> },
  'not-enough-data': { color: 'yellow', icon: <GdsIcons.Analytics size="1.1rem" /> },
};

export function StateBlock({
  variant,
  title,
  description,
  action,
  icon,
  compact = false,
}: StateBlockProps) {
  const config = variantConfig[variant];

  return (
    <Stack
      align={compact ? 'flex-start' : 'center'}
      justify="center"
      gap="md"
      py={compact ? 'md' : 'xl'}
      ta={compact ? 'left' : 'center'}
    >
      <ThemeIcon variant="light" color={config.color} size={compact ? 'lg' : 'xl'} radius="xl">
        {icon ?? config.icon}
      </ThemeIcon>
      <Stack gap={6} align={compact ? 'flex-start' : 'center'}>
        <Title order={compact ? 4 : 3}>{title}</Title>
        {description ? (
          <Text c="dimmed" maw={compact ? undefined : 480}>
            {description}
          </Text>
        ) : null}
      </Stack>
      {action}
    </Stack>
  );
}

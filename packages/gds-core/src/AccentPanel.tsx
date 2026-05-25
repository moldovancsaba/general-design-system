import type { ReactNode } from 'react';
import { Box, Paper, Stack, Text, type PaperProps } from '@mantine/core';
import {
  getGdsAccentSurfaceStyles,
  type AccentPanelVariant,
  type AccentTone,
} from '@gds/theme';

export interface AccentPanelProps extends Omit<PaperProps, 'children' | 'title'> {
  tone?: AccentTone;
  variant?: AccentPanelVariant;
  title?: ReactNode;
  children: ReactNode;
}

export function AccentPanel({
  tone = 'violet',
  variant = 'subtle',
  title,
  children,
  style,
  ...paperProps
}: AccentPanelProps) {
  const surface = getGdsAccentSurfaceStyles(tone, variant);

  return (
    <Paper
      withBorder
      p="lg"
      radius="lg"
      style={{
        background: surface.background,
        borderColor: surface.borderColor,
        color: surface.color,
        boxShadow: 'none',
        ...style,
      }}
      {...paperProps}
    >
      <Stack gap="sm">
        {title ? (
          <Text fw={700} c={surface.titleColor}>
            {title}
          </Text>
        ) : null}
        <Box style={{ color: surface.color }}>{children}</Box>
      </Stack>
    </Paper>
  );
}

import type { ReactNode } from 'react';
import { Badge } from '@mantine/core';
import type { BadgeProps } from '@mantine/core';

/**
 * MeaningBadge (gap B7 / issue #322).
 *
 * Editorial/brand meaning labels, intentionally distinct from `StatusBadge`
 * (which carries system status). Variants map to brand tokens; meaning is always
 * conveyed by the label text, never color alone.
 */

export type MeaningVariant = 'attention' | 'validation' | 'info' | 'urgency';

export interface MeaningBadgeProps extends Omit<BadgeProps, 'color' | 'children'> {
  variant: MeaningVariant;
  label: ReactNode;
  icon?: ReactNode;
}

interface MeaningTokens {
  bg: string;
  fg: string;
}

const meaningTokens: Record<MeaningVariant, MeaningTokens> = {
  attention: {
    bg: 'var(--gds-brand-accent, var(--mantine-color-orange-5))',
    fg: 'var(--gds-text-on-inverse, var(--mantine-color-white))',
  },
  validation: {
    bg: 'var(--gds-state-success, var(--mantine-color-teal-6))',
    fg: 'var(--gds-text-on-inverse, var(--mantine-color-white))',
  },
  info: {
    bg: 'var(--gds-bg-info-tag, #f1ece4)',
    fg: 'var(--gds-text-primary, var(--mantine-color-dark-7))',
  },
  urgency: {
    bg: 'var(--gds-brand-accent-tint, #f3ded5)',
    fg: 'var(--gds-text-primary, var(--mantine-color-dark-7))',
  },
};

export function MeaningBadge({ variant, label, icon, ...props }: MeaningBadgeProps) {
  if (!label) {
    return null;
  }

  const tokens = meaningTokens[variant] ?? meaningTokens.info;

  return (
    <Badge
      variant="filled"
      leftSection={icon}
      style={{ backgroundColor: tokens.bg, color: tokens.fg }}
      {...props}
    >
      {label}
    </Badge>
  );
}

import type { ReactNode } from 'react';
import { Badge } from '@mantine/core';
import type { BadgeProps } from '@mantine/core';

export type StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface StatusBadgeProps extends Omit<BadgeProps, 'color'> {
  status: StatusVariant;
  children: ReactNode;
}

const statusColorMap: Record<StatusVariant, string> = {
  success: 'green',
  warning: 'yellow',
  danger: 'red',
  info: 'blue',
  neutral: 'gray',
};

/**
 * StatusBadge enforces strict semantic coloring. 
 * Arbitrary hex colors are prohibited.
 */
export function StatusBadge({ status, children, ...props }: StatusBadgeProps) {
  return (
    <Badge color={statusColorMap[status]} variant="light" {...props}>
      {children}
    </Badge>
  );
}

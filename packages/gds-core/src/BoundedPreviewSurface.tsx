import type { CSSProperties, ReactNode } from 'react';
import { Box, Paper } from '@mantine/core';

export interface BoundedPreviewSurfaceProps {
  children: ReactNode;
  minHeight?: CSSProperties['minHeight'];
  maxHeight?: CSSProperties['maxHeight'];
}

/**
 * Contains fixed-position preview internals so shell demos cannot paint over the
 * surrounding docs route on narrow screens.
 */
export function BoundedPreviewSurface({
  children,
  minHeight = 'clamp(22rem, 70vw, 34rem)',
  maxHeight = '42rem',
}: BoundedPreviewSurfaceProps) {
  return (
    <Paper withBorder radius="xl" p={0} style={{ isolation: 'isolate', overflow: 'hidden', position: 'relative' }}>
      <Box
        data-gds-bounded-preview-surface
        style={{
          background: 'var(--mantine-color-body)',
          contain: 'layout paint',
          inlineSize: '100%',
          isolation: 'isolate',
          maxHeight,
          minHeight,
          overflow: 'hidden',
          position: 'relative',
          transform: 'translateZ(0)',
          transformOrigin: 'top center',
        }}
      >
        <Box data-gds-bounded-preview-surface-inner style={{ inlineSize: '100%', minHeight: '100%' }}>
          {children}
        </Box>
      </Box>
    </Paper>
  );
}

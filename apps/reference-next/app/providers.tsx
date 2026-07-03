'use client';

import type { ReactNode } from 'react';
import { GdsProvider, createPublicBrandTheme } from '@sovereignsquad/gds-theme/client';

const referenceNextTheme = createPublicBrandTheme({
  flatSurfaces: true,
  overrides: {
    primaryColor: 'blue',
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GdsProvider theme={referenceNextTheme} defaultColorScheme="light">
      {children}
    </GdsProvider>
  );
}

import React from 'react';
import { MantineProvider } from '@mantine/core';
import { gdsTheme } from './theme';

export interface GdsProviderProps {
  children: React.ReactNode;
}

/**
 * GdsProvider is the single required root provider for any application
 * adopting the General Design System. It injects the strict Mantine theme.
 */
export function GdsProvider({ children }: GdsProviderProps) {
  return (
    <MantineProvider theme={gdsTheme} withCssVariables withGlobalClasses defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
}

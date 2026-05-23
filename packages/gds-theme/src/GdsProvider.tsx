import React from 'react';
import { MantineProvider } from '@mantine/core';
import { gdsTheme } from './theme';
import { GdsI18nContext } from './i18n';

export interface GdsProviderProps {
  children: React.ReactNode;
  locale?: string;
  messages?: Record<string, string>;
}

/**
 * GdsProvider is the single required root provider for any application
 * adopting the General Design System. It injects the strict Mantine theme.
 */
export function GdsProvider({ children, locale = 'en', messages = {} }: GdsProviderProps) {
  return (
    <GdsI18nContext.Provider value={{ locale, messages }}>
      <MantineProvider theme={gdsTheme} withCssVariables withGlobalClasses defaultColorScheme="light">
        {children}
      </MantineProvider>
    </GdsI18nContext.Provider>
  );
}

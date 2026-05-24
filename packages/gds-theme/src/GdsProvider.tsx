import React from 'react';
import { MantineProvider, DirectionProvider, Box } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
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
  const isRtl = ['ar', 'he'].includes(locale);
  const dir = isRtl ? 'rtl' : 'ltr';
  
  return (
    <DirectionProvider initialDirection={dir}>
      <GdsI18nContext.Provider value={{ locale, messages }}>
        <MantineProvider theme={gdsTheme} withCssVariables withGlobalClasses defaultColorScheme="light">
          <ModalsProvider>
            <Notifications />
            <Box dir={dir} h="100%">
              {children}
            </Box>
          </ModalsProvider>
        </MantineProvider>
      </GdsI18nContext.Provider>
    </DirectionProvider>
  );
}

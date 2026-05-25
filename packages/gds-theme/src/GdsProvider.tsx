import React from 'react';
import {
  MantineProvider,
  DirectionProvider,
  Box,
  type MantineColorScheme,
  type MantineThemeOverride,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { extendGdsTheme, gdsTheme } from './theme';
import { GdsI18nContext } from './i18n';

export interface GdsProviderProps {
  children: React.ReactNode;
  locale?: string;
  messages?: Record<string, string>;
  themeOverrides?: MantineThemeOverride;
  defaultColorScheme?: MantineColorScheme;
}

export function getDirectionForLocale(locale: string) {
  return ['ar', 'he'].includes(locale) ? 'rtl' : 'ltr';
}

/**
 * GdsProvider is the single required root provider for any application
 * adopting the General Design System. It injects the strict Mantine theme.
 */
export function GdsProvider({
  children,
  locale = 'en',
  messages = {},
  themeOverrides,
  defaultColorScheme = 'auto',
}: GdsProviderProps) {
  const dir = getDirectionForLocale(locale);
  const resolvedTheme = themeOverrides ? extendGdsTheme(themeOverrides) : gdsTheme;
  
  return (
    <DirectionProvider initialDirection={dir}>
      <GdsI18nContext.Provider value={{ locale, messages }}>
        <MantineProvider
          theme={resolvedTheme}
          withCssVariables
          withGlobalClasses
          defaultColorScheme={defaultColorScheme}
        >
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

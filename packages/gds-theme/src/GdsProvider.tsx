'use client';

import React, { useEffect, useMemo } from 'react';
import type { MantineThemeOverride } from '@mantine/core';
import { MantineProvider, DirectionProvider, Box } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { gdsTheme } from './theme';
import { GdsI18nContext, isGdsRtlLocale } from './i18n';
import { OverlayAdapterProvider, mantineOverlayAdapter, type OverlayAdapter } from './overlay-adapter';

export interface GdsProviderProps {
  children: React.ReactNode;
  locale?: string;
  messages?: Record<string, string>;
  theme?: MantineThemeOverride;
  defaultColorScheme?: 'light' | 'dark' | 'auto';
  forceColorScheme?: 'light' | 'dark';
  colorSchemeRootElement?: () => HTMLElement | undefined;
  cssVariablesSelector?: string;
  applyDocumentColorScheme?: boolean;
  /**
   * Overlay engine adapter (issue #349). Defaults to the Mantine-backed adapter.
   * Provide a custom adapter to swap the overlay engine without changing any
   * consumer code or component API.
   */
  overlayAdapter?: OverlayAdapter;
}

type GdsMantineColorScheme = 'light' | 'dark' | 'auto';

interface GdsMantineColorSchemeManager {
  get: (defaultValue: GdsMantineColorScheme) => GdsMantineColorScheme;
  set: (value: GdsMantineColorScheme) => void;
  subscribe: (onUpdate: (colorScheme: GdsMantineColorScheme) => void) => void;
  unsubscribe: () => void;
  clear: () => void;
}

function resolveDocumentColorScheme(colorScheme: GdsMantineColorScheme) {
  if (colorScheme !== 'auto') {
    return colorScheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * GdsProvider is the single required root provider for any application
 * adopting the General Design System. It injects the strict Mantine theme.
 */
export function GdsProvider({
  children,
  locale = 'en',
  messages = {},
  theme = gdsTheme,
  defaultColorScheme = 'light',
  forceColorScheme,
  colorSchemeRootElement,
  cssVariablesSelector = ':root',
  applyDocumentColorScheme = true,
  overlayAdapter = mantineOverlayAdapter,
}: GdsProviderProps) {
  const isRtl = isGdsRtlLocale(locale);
  const dir = isRtl ? 'rtl' : 'ltr';
  const colorSchemeManager = useMemo<GdsMantineColorSchemeManager>(() => ({
    get: (fallback) => forceColorScheme ?? defaultColorScheme ?? fallback,
    set: (value) => {
      (colorSchemeRootElement?.() ?? document.documentElement).setAttribute('data-mantine-color-scheme', resolveDocumentColorScheme(value));
    },
    subscribe: () => {},
    unsubscribe: () => {},
    clear: () => {
      (colorSchemeRootElement?.() ?? document.documentElement).setAttribute('data-mantine-color-scheme', resolveDocumentColorScheme(defaultColorScheme));
    },
  }), [colorSchemeRootElement, defaultColorScheme, forceColorScheme]);

  useEffect(() => {
    if (!applyDocumentColorScheme) {
      return;
    }

    const requestedScheme = forceColorScheme ?? defaultColorScheme;
    document.documentElement.setAttribute('data-mantine-color-scheme', resolveDocumentColorScheme(requestedScheme));
  }, [applyDocumentColorScheme, defaultColorScheme, forceColorScheme]);
  
  return (
    <DirectionProvider initialDirection={dir}>
      <GdsI18nContext.Provider value={{ locale, messages }}>
        <MantineProvider
          theme={theme}
          withCssVariables
          withGlobalClasses
          colorSchemeManager={colorSchemeManager}
          defaultColorScheme={defaultColorScheme}
          forceColorScheme={forceColorScheme}
          getRootElement={colorSchemeRootElement}
          cssVariablesSelector={cssVariablesSelector}
        >
          <ModalsProvider>
            <OverlayAdapterProvider adapter={overlayAdapter}>
              <Notifications />
              <Box
                dir={dir}
                mih="100vh"
                h="100%"
                bg="var(--mantine-color-body)"
                c="var(--mantine-color-text)"
                style={{ transition: 'background-color 120ms ease, color 120ms ease' }}
              >
                {children}
              </Box>
            </OverlayAdapterProvider>
          </ModalsProvider>
        </MantineProvider>
      </GdsI18nContext.Provider>
    </DirectionProvider>
  );
}

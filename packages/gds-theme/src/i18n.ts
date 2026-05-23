import { createContext, useContext } from 'react';

export interface GdsI18nContextValue {
  locale: string;
  messages: Record<string, string>;
}

export const GdsI18nContext = createContext<GdsI18nContextValue>({
  locale: 'en',
  messages: {},
});

/**
 * useGdsTranslation provides a lightweight translation hook.
 * It looks up the translation key in the provider's message dictionary,
 * and falls back to the default semantic English string if not found.
 */
export function useGdsTranslation() {
  const { messages, locale } = useContext(GdsI18nContext);
  return {
    t: (id: string, defaultMessage: string) => messages[id] || defaultMessage,
    locale,
  };
}

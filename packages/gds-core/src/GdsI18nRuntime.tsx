import { useContext, type ReactNode } from 'react';
import { GdsI18nContext, getGdsLocaleMetadata, gdsLocaleMetadata, isGdsRtlLocale } from '@doneisbetter/gds-theme';
import { Text } from '@mantine/core';
import { getGdsMessages, type GdsLocale } from './locales';

export type GdsI18nRuntimeEventType = 'missing_key' | 'fallback_locale_used' | 'unsupported_format_option';

export interface GdsI18nRuntimeEvent {
  type: GdsI18nRuntimeEventType;
  locale: string;
  key?: string;
  fallbackLocale?: string;
  formatter?: 'number' | 'currency' | 'date' | 'relative-time' | 'plural' | 'sort';
  reason?: string;
}

export interface GdsFormatOptions {
  locale?: string;
  fallbackLocale?: GdsLocale;
  onEvent?: (event: GdsI18nRuntimeEvent) => void;
}

export interface GdsPluralMessage {
  zero?: ReactNode;
  one: ReactNode;
  two?: ReactNode;
  few?: ReactNode;
  many?: ReactNode;
  other: ReactNode;
}

export interface GdsTextExpansionFixture {
  locale: string;
  direction: 'ltr' | 'rtl';
  sample: string;
  expandedSample: string;
  expansionRatio: number;
  minInlineSizeCh: number;
  notes: string[];
}

export interface GdsMissingKeyTracker {
  seen: Set<string>;
  emit: (event: GdsI18nRuntimeEvent) => void;
}

export interface GdsLocaleTextProps extends GdsFormatOptions {
  id: string;
  defaultMessage: string;
  values?: Record<string, string | number>;
}

export interface GdsFormattedNumberProps extends GdsFormatOptions, Intl.NumberFormatOptions {
  value: number;
}

export interface GdsFormattedCurrencyProps extends GdsFormatOptions {
  value: number;
  currency: string;
  currencyDisplay?: Intl.NumberFormatOptions['currencyDisplay'];
}

export interface GdsFormattedDateProps extends GdsFormatOptions, Intl.DateTimeFormatOptions {
  value: Date | number | string;
}

export interface GdsRelativeTimeProps extends GdsFormatOptions, Intl.RelativeTimeFormatOptions {
  value: number;
  unit: Intl.RelativeTimeFormatUnit;
}

export interface GdsPluralProps extends GdsFormatOptions {
  value: number;
  messages: GdsPluralMessage;
}

const numberFormatCache = new Map<string, Intl.NumberFormat>();
const dateFormatCache = new Map<string, Intl.DateTimeFormat>();
const relativeTimeFormatCache = new Map<string, Intl.RelativeTimeFormat>();
const pluralRulesCache = new Map<string, Intl.PluralRules>();
const collatorCache = new Map<string, Intl.Collator>();

function cacheKey(locale: string, options?: Record<string, unknown>) {
  return `${locale}:${JSON.stringify(options ?? {})}`;
}

function emitEvent(options: GdsFormatOptions | undefined, event: GdsI18nRuntimeEvent) {
  options?.onEvent?.(event);
}

function isSupportedLocale(locale: string) {
  return locale in gdsLocaleMetadata;
}

export function resolveGdsLocale({ locale = 'en', fallbackLocale = 'en', onEvent }: GdsFormatOptions = {}) {
  if (isSupportedLocale(locale)) {
    return locale;
  }
  onEvent?.({
    type: 'fallback_locale_used',
    locale,
    fallbackLocale,
    reason: 'Unsupported locale resolved to fallback locale.',
  });
  return fallbackLocale;
}

export function useGdsDirection(localeOverride?: string) {
  const { locale } = useContext(GdsI18nContext);
  const resolvedLocale = localeOverride ?? locale;
  const metadata = getGdsLocaleMetadata(resolvedLocale);
  return {
    locale: resolvedLocale,
    direction: metadata.direction,
    isRtl: metadata.direction === 'rtl',
    dir: metadata.direction,
  };
}

export function formatGdsNumber(value: number, options: GdsFormatOptions & Intl.NumberFormatOptions = {}) {
  const { locale, fallbackLocale, onEvent, ...formatOptions } = options;
  const resolvedLocale = resolveGdsLocale({ locale, fallbackLocale, onEvent });
  const key = cacheKey(resolvedLocale, formatOptions);
  let formatter = numberFormatCache.get(key);
  if (!formatter) {
    try {
      formatter = new Intl.NumberFormat(resolvedLocale, formatOptions);
    } catch (error) {
      emitEvent(options, {
        type: 'unsupported_format_option',
        locale: resolvedLocale,
        formatter: 'number',
        reason: error instanceof Error ? error.message : 'Intl.NumberFormat rejected the provided options.',
      });
      formatter = new Intl.NumberFormat(resolveGdsLocale({ locale: fallbackLocale ?? 'en' }));
    }
    numberFormatCache.set(key, formatter);
  }
  return formatter.format(value);
}

export function formatGdsCurrency(value: number, currency: string, options: GdsFormatOptions & Pick<Intl.NumberFormatOptions, 'currencyDisplay'> = {}) {
  return formatGdsNumber(value, {
    ...options,
    style: 'currency',
    currency,
  });
}

export function formatGdsDate(value: Date | number | string, options: GdsFormatOptions & Intl.DateTimeFormatOptions = {}) {
  const { locale, fallbackLocale, onEvent, ...formatOptions } = options;
  const resolvedLocale = resolveGdsLocale({ locale, fallbackLocale, onEvent });
  const key = cacheKey(resolvedLocale, formatOptions);
  let formatter = dateFormatCache.get(key);
  if (!formatter) {
    try {
      formatter = new Intl.DateTimeFormat(resolvedLocale, formatOptions);
    } catch (error) {
      emitEvent(options, {
        type: 'unsupported_format_option',
        locale: resolvedLocale,
        formatter: 'date',
        reason: error instanceof Error ? error.message : 'Intl.DateTimeFormat rejected the provided options.',
      });
      formatter = new Intl.DateTimeFormat(resolveGdsLocale({ locale: fallbackLocale ?? 'en' }));
    }
    dateFormatCache.set(key, formatter);
  }
  return formatter.format(new Date(value));
}

export function formatGdsRelativeTime(value: number, unit: Intl.RelativeTimeFormatUnit, options: GdsFormatOptions & Intl.RelativeTimeFormatOptions = {}) {
  const { locale, fallbackLocale, onEvent, ...formatOptions } = options;
  const resolvedLocale = resolveGdsLocale({ locale, fallbackLocale, onEvent });
  const key = cacheKey(resolvedLocale, formatOptions);
  let formatter = relativeTimeFormatCache.get(key);
  if (!formatter) {
    try {
      formatter = new Intl.RelativeTimeFormat(resolvedLocale, { numeric: 'auto', ...formatOptions });
    } catch (error) {
      emitEvent(options, {
        type: 'unsupported_format_option',
        locale: resolvedLocale,
        formatter: 'relative-time',
        reason: error instanceof Error ? error.message : 'Intl.RelativeTimeFormat rejected the provided options.',
      });
      formatter = new Intl.RelativeTimeFormat(resolveGdsLocale({ locale: fallbackLocale ?? 'en' }), { numeric: 'auto' });
    }
    relativeTimeFormatCache.set(key, formatter);
  }
  return formatter.format(value, unit);
}

export function formatGdsPlural(value: number, messages: GdsPluralMessage, options: GdsFormatOptions = {}) {
  if (value === 0 && messages.zero !== undefined) {
    return messages.zero;
  }
  const resolvedLocale = resolveGdsLocale(options);
  const key = cacheKey(resolvedLocale, { type: 'cardinal' });
  let rules = pluralRulesCache.get(key);
  if (!rules) {
    rules = new Intl.PluralRules(resolvedLocale);
    pluralRulesCache.set(key, rules);
  }
  const category = rules.select(value);
  return messages[category] ?? messages.other;
}

export function compareGdsLocaleString(left: string, right: string, options: GdsFormatOptions & Intl.CollatorOptions = {}) {
  const { locale, fallbackLocale, onEvent, ...collatorOptions } = options;
  const resolvedLocale = resolveGdsLocale({ locale, fallbackLocale, onEvent });
  const key = cacheKey(resolvedLocale, collatorOptions);
  let collator = collatorCache.get(key);
  if (!collator) {
    collator = new Intl.Collator(resolvedLocale, { sensitivity: 'base', numeric: true, ...collatorOptions });
    collatorCache.set(key, collator);
  }
  return collator.compare(left, right);
}

export function sortGdsLocaleStrings(values: string[], options: GdsFormatOptions & Intl.CollatorOptions = {}) {
  return [...values].sort((left, right) => compareGdsLocaleString(left, right, options));
}

export function createGdsMissingKeyTracker(onEvent?: (event: GdsI18nRuntimeEvent) => void): GdsMissingKeyTracker {
  const seen = new Set<string>();
  return {
    seen,
    emit: (event) => {
      const key = `${event.locale}:${event.key ?? event.reason ?? event.type}`;
      if (event.type === 'missing_key' && seen.has(key)) {
        return;
      }
      seen.add(key);
      onEvent?.(event);
    },
  };
}

function interpolate(message: string, values: Record<string, string | number> = {}) {
  return message.replace(/\{([A-Za-z0-9_.-]+)\}/g, (match, key) => String(values[key] ?? match));
}

export function resolveGdsMessage({ id, defaultMessage, values, locale = 'en', fallbackLocale = 'en', onEvent }: GdsLocaleTextProps) {
  const resolvedLocale = resolveGdsLocale({ locale, fallbackLocale, onEvent });
  const messages = getGdsMessages(resolvedLocale);
  const fallbackMessages = getGdsMessages(fallbackLocale);
  const message = messages[id as keyof typeof messages] ?? fallbackMessages[id as keyof typeof fallbackMessages];
  if (!message) {
    onEvent?.({
      type: 'missing_key',
      locale: resolvedLocale,
      fallbackLocale,
      key: id,
      reason: 'Message key was not present in locale or fallback packs.',
    });
  }
  return interpolate(message ?? defaultMessage, values);
}

export function createGdsTextExpansionFixture(locale: string, sample = 'Save changes') {
  const metadata = getGdsLocaleMetadata(locale);
  const direction = metadata.direction;
  const ratioByScript: Record<string, number> = {
    latin: locale === 'de' ? 1.45 : 1.3,
    cyrillic: 1.35,
    hebrew: 1.25,
    arabic: 1.3,
  };
  const expansionRatio = ratioByScript[metadata.script] ?? 1.3;
  const expandedLength = Math.ceil(sample.length * expansionRatio);
  const expandedSample = sample.padEnd(expandedLength, sample.at(-1) ?? '.');
  return {
    locale,
    direction,
    sample,
    expandedSample,
    expansionRatio,
    minInlineSizeCh: expandedLength,
    notes: [
      'Use this fixture for button, header, tab, card, and toolbar copy fit checks.',
      'Text must wrap or truncate by governed component contract; it must not push sibling controls off screen.',
      isGdsRtlLocale(locale) ? 'Validate mixed LTR data inside RTL layout with dir=\"auto\" where user data is shown.' : 'Validate expansion against responsive containers and long localized labels.',
    ],
  } satisfies GdsTextExpansionFixture;
}

export function GdsLocaleText({ id, defaultMessage, values, locale, fallbackLocale, onEvent }: GdsLocaleTextProps) {
  return <span data-gds-i18n-key={id}>{resolveGdsMessage({ id, defaultMessage, values, locale, fallbackLocale, onEvent })}</span>;
}

export function GdsFormattedNumber({ value, locale, fallbackLocale, onEvent, ...options }: GdsFormattedNumberProps) {
  return <span data-gds-formatted="number">{formatGdsNumber(value, { ...options, locale, fallbackLocale, onEvent })}</span>;
}

export function GdsFormattedCurrency({ value, currency, currencyDisplay, locale, fallbackLocale, onEvent }: GdsFormattedCurrencyProps) {
  return <span data-gds-formatted="currency">{formatGdsCurrency(value, currency, { currencyDisplay, locale, fallbackLocale, onEvent })}</span>;
}

export function GdsFormattedDate({ value, locale, fallbackLocale, onEvent, ...options }: GdsFormattedDateProps) {
  return <time dateTime={new Date(value).toISOString()}>{formatGdsDate(value, { ...options, locale, fallbackLocale, onEvent })}</time>;
}

export function GdsRelativeTime({ value, unit, locale, fallbackLocale, onEvent, ...options }: GdsRelativeTimeProps) {
  return <span data-gds-formatted="relative-time">{formatGdsRelativeTime(value, unit, { ...options, locale, fallbackLocale, onEvent })}</span>;
}

export function GdsPlural({ value, messages, locale, fallbackLocale, onEvent }: GdsPluralProps) {
  return <span data-gds-formatted="plural">{formatGdsPlural(value, messages, { locale, fallbackLocale, onEvent })}</span>;
}

export function GdsDirectionBoundary({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  const metadata = getGdsLocaleMetadata(locale);
  return (
    <Text component="span" dir={metadata.direction} data-gds-locale={locale} data-gds-direction={metadata.direction}>
      {children}
    </Text>
  );
}

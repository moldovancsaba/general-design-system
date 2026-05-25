import { GdsVocabulary, type SemanticAction } from './vocabulary';
import { ar } from './locales/ar';
import { de } from './locales/de';
import { en } from './locales/en';
import { fr } from './locales/fr';
import { he } from './locales/he';
import { hu } from './locales/hu';
import { it } from './locales/it';
import { ru } from './locales/ru';

const localeDictionaries: Record<string, Record<string, string>> = {
  ar,
  de,
  en,
  fr,
  he,
  hu,
  it,
  ru,
};

function normalizeLocale(locale = 'en') {
  return locale.toLowerCase().split('-')[0];
}

export function getSemanticActionLabel(action: SemanticAction, locale = 'en') {
  const dictionary = localeDictionaries[normalizeLocale(locale)] ?? en;
  const config = GdsVocabulary[action];
  return dictionary[config.id] ?? config.defaultMessage;
}

import { generatedSitePhrases } from './generated-site-phrases';
import type { SiteLocaleId } from './site-copy';

const phraseIndex: Map<string, Record<string, string>> = new Map(
  Object.values(generatedSitePhrases).map((entry) => [entry.en, entry as Record<string, string>]),
);

const translatableAttributes = [
  'aria-label',
  'alt',
  'placeholder',
  'title',
];

function normalizePhrase(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

export function translateSitePhrase(value: string, locale: string) {
  if (!value || locale === 'en') {
    return value;
  }

  const normalized = normalizePhrase(value);
  const entry = phraseIndex.get(normalized);
  const translated = entry?.[locale as SiteLocaleId];

  return translated && translated !== entry?.en ? translated : value;
}

function shouldSkipNode(node: Node) {
  const parent = node.parentElement;
  return Boolean(parent?.closest('code, pre, script, style, textarea'));
}

function translateTextNode(node: Text, locale: string) {
  if (shouldSkipNode(node)) {
    return;
  }

  const original = node.nodeValue ?? '';
  const normalized = normalizePhrase(original);
  if (!normalized) {
    return;
  }

  const translated = translateSitePhrase(normalized, locale);
  if (translated !== normalized) {
    node.nodeValue = original.replace(normalized, translated);
  }
}

function translateElementAttributes(element: Element, locale: string) {
  if (element.closest('code, pre, script, style')) {
    return;
  }

  for (const attribute of translatableAttributes) {
    const value = element.getAttribute(attribute);
    if (!value) continue;
    const translated = translateSitePhrase(value, locale);
    if (translated !== value) {
      element.setAttribute(attribute, translated);
    }
  }
}

export function translateSiteDom(root: ParentNode, locale: string) {
  if (locale === 'en') {
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let current: Node | null = walker.currentNode;

  while (current) {
    if (current.nodeType === Node.TEXT_NODE) {
      translateTextNode(current as Text, locale);
    } else if (current.nodeType === Node.ELEMENT_NODE) {
      translateElementAttributes(current as Element, locale);
    }
    current = walker.nextNode();
  }
}

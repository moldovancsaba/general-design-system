import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';

const traverse = traverseModule.default ?? traverseModule;
const root = process.cwd();
const targetFiles = [
  'apps/playground/src/info-pages.tsx',
  'apps/playground/src/showcase-pages.tsx',
  'apps/playground/src/pattern-pages.tsx',
  'apps/playground/src/pattern-registry.ts',
  'apps/playground/src/product-use-cases.ts',
  'apps/playground/src/site-routes.ts',
];
const localeIds = ['en', 'de', 'fr', 'it', 'es', 'ru', 'he', 'ar', 'hu'];
const generatedPath = resolve(root, 'apps/playground/src/generated-site-phrases.ts');
const failures = [];

function stableKey(value) {
  return `p_${createHash('sha256').update(value).digest('hex').slice(0, 12)}`;
}

function shouldInclude(value) {
  if (!/[A-Za-z][a-z]/.test(value)) return false;
  if (value.includes('\n')) return false;
  if (/[{}[\]`]|=>|;\s*$|^\s*,/.test(value)) return false;
  if (/^(?:@|\.\/|\/|https?:|mailto:)/.test(value)) return false;
  if (/^[a-z0-9_.:/#?=&${}\-[\]\s]+$/i.test(value) && !/\s/.test(value.trim())) return false;
  if (/^(?:id|title|status|draft|published|row-\d+)$/i.test(value.trim())) return false;
  if (value.length > 240) return false;
  return true;
}

function extractPhrases(source) {
  const phrases = new Set();
  const ast = parse(source, { sourceType: 'module', plugins: ['typescript', 'jsx'] });

  function add(value) {
    const phrase = value.replace(/\s+/g, ' ').trim();
    if (shouldInclude(phrase)) phrases.add(phrase);
  }

  traverse(ast, {
    StringLiteral(path) {
      add(path.node.value);
    },
    JSXText(path) {
      add(path.node.value);
    },
  });

  return phrases;
}

const generatedSource = readFileSync(generatedPath, 'utf8');
const match = generatedSource.match(/export const generatedSitePhrases = (\{[\s\S]*?\n\}) as const;/);
if (!match) {
  failures.push('generated-site-phrases.ts must export generatedSitePhrases as a const object.');
} else {
  const generated = Function(`return (${match[1]});`)();
  const requiredPhrases = new Set();

  for (const relativePath of targetFiles) {
    const source = readFileSync(resolve(root, relativePath), 'utf8');
    for (const phrase of extractPhrases(source)) {
      requiredPhrases.add(phrase);
    }
  }

  for (const phrase of requiredPhrases) {
    const key = stableKey(phrase);
    const entry = generated[key];
    if (!entry) {
      failures.push(`generated-site-phrases.ts is missing phrase key ${key}: ${phrase}`);
      continue;
    }
    for (const locale of localeIds) {
      if (typeof entry[locale] !== 'string' || entry[locale].trim().length === 0) {
        failures.push(`generated-site-phrases.ts key ${key} is missing ${locale} translation.`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error('Site phrase translation verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Site phrase translation verification passed.');

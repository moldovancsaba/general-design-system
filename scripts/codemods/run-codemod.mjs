import ts from 'typescript';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { basename, extname, join, relative, resolve } from 'node:path';

const SUPPORTED_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx']);
const OWNER_FALLBACK = '@gds-migration-owner';
const REMOVE_BY_FALLBACK = '2026-09-30';

const transformMetadata = {
  'discovery-shell': {
    description: 'Replace legacy AppShell usage with the GDS DiscoveryShell contract.',
    package: '@doneisbetter/gds-core',
  },
  'listing-card': {
    description: 'Replace PublicProductCard aliases with the governed ListingCard contract.',
    package: '@doneisbetter/gds-core',
  },
  'action-bar': {
    description: 'Replace simple CtaButtonGroup patterns with ActionBar semantic actions.',
    package: '@doneisbetter/gds-core',
  },
  'mantine-imports': {
    description: 'Replace safe Mantine form/control imports with governed GDS admin contracts.',
    package: '@doneisbetter/gds-admin',
  },
  'tabler-icons': {
    description: 'Replace safe Tabler icon imports with the semantic GdsIcons registry.',
    package: '@doneisbetter/gds-core',
  },
  'raw-controls': {
    description: 'Replace labelled raw HTML form controls with governed GDS admin fields.',
    package: '@doneisbetter/gds-admin',
  },
  'inline-styles': {
    description: 'Classify inline style authority and emit governed exception stubs for manual token migration.',
    package: '@doneisbetter/gds-core',
  },
  'alerts-confirms': {
    description: 'Replace safe alert surfaces and classify blocking browser dialogs for GDS feedback runtime migration.',
    package: '@doneisbetter/gds-core',
  },
  tables: {
    description: 'Replace simple table imports/usages and classify raw table markup for governed data-table migration.',
    package: '@doneisbetter/gds-admin',
  },
};

const gdsAdminImports = new Set(['AdminTextInput', 'AdminTextarea', 'AdminCheckbox', 'AdminSelect', 'AdminDataTable']);
const gdsCoreImports = new Set(['ActionBar', 'BannerNotice', 'DiscoveryShell', 'GdsIcons', 'InlineAlert', 'ListingCard']);
const mantineControlMap = {
  TextInput: 'AdminTextInput',
  Textarea: 'AdminTextarea',
  Checkbox: 'AdminCheckbox',
  Select: 'AdminSelect',
};
const rawControlMap = {
  input: 'AdminTextInput',
  textarea: 'AdminTextarea',
  select: 'AdminSelect',
};
const iconMap = {
  IconAlertCircle: 'Danger',
  IconBell: 'Notifications',
  IconCalendar: 'Calendar',
  IconCheck: 'Check',
  IconChevronDown: 'Forward',
  IconCopy: 'Copy',
  IconDeviceFloppy: 'Save',
  IconDownload: 'Download',
  IconEdit: 'Edit',
  IconEye: 'Eye',
  IconEyeOff: 'EyeOff',
  IconInfoCircle: 'Info',
  IconLanguage: 'Language',
  IconMenu2: 'Menu',
  IconMoon: 'Moon',
  IconPlus: 'Add',
  IconRefresh: 'Refresh',
  IconSearch: 'Search',
  IconSettings: 'Settings',
  IconSun: 'Sun',
  IconTrash: 'Delete',
  IconUpload: 'Upload',
  IconX: 'Close',
};

function listFiles(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'coverage', '.next', 'storybook-static'].includes(entry.name)) {
        continue;
      }
      listFiles(join(dir, entry.name), files);
      continue;
    }

    if (SUPPORTED_EXTENSIONS.has(extname(entry.name))) {
      files.push(join(dir, entry.name));
    }
  }
  return files;
}

function parseSource(content, fileName) {
  const scriptKind = fileName.endsWith('.tsx') || fileName.endsWith('.jsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  return ts.createSourceFile(fileName, content, ts.ScriptTarget.Latest, true, scriptKind);
}

function collectImports(sourceFile) {
  const imports = [];
  sourceFile.forEachChild((node) => {
    if (!ts.isImportDeclaration(node) || !node.importClause || !ts.isStringLiteral(node.moduleSpecifier)) {
      return;
    }
    const namedBindings = node.importClause.namedBindings;
    const specifiers = [];
    if (namedBindings && ts.isNamedImports(namedBindings)) {
      for (const specifier of namedBindings.elements) {
        specifiers.push({
          name: specifier.name.text,
          imported: specifier.propertyName?.text ?? specifier.name.text,
        });
      }
    }
    imports.push({
      start: node.getStart(sourceFile),
      end: node.getEnd(),
      module: node.moduleSpecifier.text,
      specifiers,
      text: node.getText(sourceFile),
    });
  });
  return imports;
}

function collectJsxTags(sourceFile) {
  const tags = [];
  function visit(node) {
    if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
      const tagName = node.tagName.getText(sourceFile);
      const attrs = {};
      for (const prop of node.attributes.properties) {
        if (ts.isJsxAttribute(prop)) {
          attrs[prop.name.text] = prop.initializer?.getText(sourceFile) ?? true;
        }
      }
      tags.push({ tagName, attrs, start: node.getStart(sourceFile), end: node.getEnd() });
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return tags;
}

function ensureNamedImport(content, moduleName, importNames) {
  const missing = [...importNames].filter((name) => !new RegExp(`\\b${name}\\b`).test(content) || !content.includes(`from '${moduleName}'`));
  if (missing.length === 0) {
    return content;
  }
  const sourceFile = parseSource(content, 'import-target.tsx');
  const imports = collectImports(sourceFile);
  const existing = imports.find((entry) => entry.module === moduleName && entry.specifiers.length > 0);
  if (existing) {
    const currentNames = new Set(existing.specifiers.map((specifier) => specifier.name));
    const nextNames = [...currentNames, ...importNames].sort();
    const replacement = `import { ${nextNames.join(', ')} } from '${moduleName}';`;
    return `${content.slice(0, existing.start)}${replacement}${content.slice(existing.end)}`;
  }
  return `import { ${[...importNames].sort().join(', ')} } from '${moduleName}';\n${content}`;
}

function removeNamedImports(content, moduleName, namesToRemove) {
  const sourceFile = parseSource(content, 'remove-imports.tsx');
  const imports = collectImports(sourceFile)
    .filter((entry) => entry.module === moduleName && entry.specifiers.length > 0)
    .sort((a, b) => b.start - a.start);
  let next = content;
  for (const entry of imports) {
    const kept = entry.specifiers.filter((specifier) => !namesToRemove.has(specifier.imported));
    if (kept.length === entry.specifiers.length) {
      continue;
    }
    const replacement = kept.length > 0
      ? `import { ${kept.map((specifier) => specifier.imported === specifier.name ? specifier.name : `${specifier.imported} as ${specifier.name}`).join(', ')} } from '${moduleName}';`
      : '';
    next = `${next.slice(0, entry.start)}${replacement}${next.slice(entry.end)}`;
  }
  return next.replace(/\n{3,}/g, '\n\n');
}

function classifyFinding({ transform, file, rule, message, replacement, severity = 'manual-follow-up' }) {
  return {
    id: `${transform}:${rule}:${basename(file)}`,
    transform,
    file,
    rule,
    severity,
    message,
    replacement,
  };
}

function createExceptionStub(finding, options) {
  return {
    surface: `${finding.transform}:${relative(process.cwd(), finding.file)}`,
    category: finding.transform === 'inline-styles' ? 'product-authored-experience' : 'migration-bridge',
    status: 'temporary',
    owner: options.owner,
    reason: finding.message,
    scope: [relative(process.cwd(), finding.file)],
    replacement: finding.replacement,
    removeBy: options.removeBy,
    reviewDate: options.removeBy,
    accessibility: 'Manual follow-up must preserve labels, keyboard order, focus visibility, semantic roles, and contrast before the exception can be removed.',
    testing: 'Run build, unit tests, route verification, gds-compliance, and the relevant accessibility evidence gate after migration.',
    observability: 'Track migration completion and any runtime fallback without logging private user data.',
    rollback: 'Revert the codemod patch from git diff or restore the previous package version if a released migration causes adoption risk.',
  };
}

function result({ changed = false, content, findings = [], state = changed ? 'patched' : 'skipped', reason } = {}) {
  return { changed, content, findings, state, reason };
}

function transformDiscoveryShell(content) {
  if (!content.includes("from '@doneisbetter/gds-admin'") || !content.includes('AppShell')) {
    return null;
  }

  if (!/header\s*=|sidebar\s*=/.test(content)) {
    return result({ findings: [classifyFinding({
      transform: 'discovery-shell',
      file: '',
      rule: 'unsupported-app-shell-shape',
      message: 'AppShell usage is not a simple header/sidebar shape; migrate manually to DiscoveryShell.',
      replacement: 'DiscoveryShell',
    })], reason: 'unsupported AppShell usage shape' });
  }

  let next = content
    .replace(/\bAppShell\b/g, 'DiscoveryShell')
    .replace(/from '@doneisbetter\/gds-admin'/g, "from '@doneisbetter/gds-core'");

  next = ensureNamedImport(next, '@doneisbetter/gds-core', new Set(['DiscoveryShell']));
  return result({ changed: next !== content, content: next, state: 'patched' });
}

function transformListingCard(content) {
  if (!content.includes('PublicProductCard')) {
    return null;
  }

  let next = content.replace(/\bPublicProductCard\b/g, 'ListingCard');
  next = ensureNamedImport(next, '@doneisbetter/gds-core', new Set(['ListingCard']));
  return result({ changed: next !== content, content: next, state: 'patched' });
}

function transformActionBar(content) {
  if (!content.includes('CtaButtonGroup')) {
    return null;
  }

  const tagPattern = /<CtaButtonGroup\s+primary=\{<SemanticButton action="([^"]+)" \/>\}\s*(secondary=\{<SemanticButton action="([^"]+)" \/>\})?\s*(tertiary=\{<SemanticButton action="([^"]+)" \/>\})?\s*\/>/g;
  if (!tagPattern.test(content)) {
    return result({ findings: [classifyFinding({
      transform: 'action-bar',
      file: '',
      rule: 'unsupported-action-group',
      message: 'CtaButtonGroup contains custom children or callbacks; migrate manually to ActionBar with semantic actions.',
      replacement: 'ActionBar',
    })], reason: 'unsupported CtaButtonGroup usage shape' });
  }

  const next = ensureNamedImport(
    removeNamedImports(content, '@doneisbetter/gds-core', new Set(['CtaButtonGroup'])),
    '@doneisbetter/gds-core',
    new Set(['ActionBar']),
  ).replace(tagPattern, (_, primaryAction, _secondaryGroup, secondaryAction, _tertiaryGroup, tertiaryAction) => {
    const fields = [`primary={{ action: '${primaryAction}' }}`];
    if (secondaryAction) fields.push(`secondary={[{ action: '${secondaryAction}' }]}`);
    if (tertiaryAction) fields.push(`tertiary={[{ action: '${tertiaryAction}' }]}`);
    return `<ActionBar ${fields.join(' ')} />`;
  });

  return result({ changed: next !== content, content: next, state: 'patched' });
}

function transformMantineImports(content, file) {
  if (!content.includes("from '@mantine/core'")) {
    return null;
  }
  const sourceFile = parseSource(content, file);
  const imports = collectImports(sourceFile).filter((entry) => entry.module === '@mantine/core');
  const usedNames = new Set();
  const manual = [];
  for (const entry of imports) {
    for (const specifier of entry.specifiers) {
      if (mantineControlMap[specifier.imported]) {
        usedNames.add(specifier.imported);
      } else if (['Button', 'ActionIcon', 'Alert', 'Table'].includes(specifier.imported)) {
        manual.push(classifyFinding({
          transform: 'mantine-imports',
          file,
          rule: `mantine-${specifier.imported}`,
          message: `${specifier.imported} from @mantine/core requires a semantic GDS replacement before strict adoption.`,
          replacement: specifier.imported === 'Button' || specifier.imported === 'ActionIcon' ? 'ActionBar or SemanticButton' : specifier.imported === 'Alert' ? 'InlineAlert or BannerNotice' : 'AdminDataTable',
        }));
      }
    }
  }
  if (usedNames.size === 0 && manual.length === 0) {
    return null;
  }
  let next = content;
  const addedImports = new Set();
  for (const [mantineName, gdsName] of Object.entries(mantineControlMap)) {
    if (!usedNames.has(mantineName)) continue;
    next = next.replace(new RegExp(`<${mantineName}\\b`, 'g'), `<${gdsName}`);
    next = next.replace(new RegExp(`</${mantineName}>`, 'g'), `</${gdsName}>`);
    addedImports.add(gdsName);
  }
  next = removeNamedImports(next, '@mantine/core', usedNames);
  next = ensureNamedImport(next, '@doneisbetter/gds-admin', addedImports);
  return result({ changed: next !== content, content: next, findings: manual, state: next !== content ? 'patched' : 'manual-follow-up' });
}

function transformTablerIcons(content, file) {
  if (!content.includes("from '@tabler/icons-react'")) {
    return null;
  }
  const sourceFile = parseSource(content, file);
  const imports = collectImports(sourceFile).filter((entry) => entry.module === '@tabler/icons-react');
  const supported = new Set();
  const unsupported = [];
  for (const entry of imports) {
    for (const specifier of entry.specifiers) {
      if (iconMap[specifier.imported] && specifier.name === specifier.imported) {
        supported.add(specifier.imported);
      } else {
        unsupported.push(classifyFinding({
          transform: 'tabler-icons',
          file,
          rule: `tabler-${specifier.imported}`,
          message: `${specifier.imported} does not have a safe one-to-one GdsIcons migration in this codemod.`,
          replacement: 'GdsIcons semantic key selected by product meaning',
        }));
      }
    }
  }
  if (supported.size === 0 && unsupported.length === 0) {
    return null;
  }
  let next = removeNamedImports(content, '@tabler/icons-react', supported);
  for (const iconName of supported) {
    next = next.replace(new RegExp(`<${iconName}\\b`, 'g'), `<GdsIcons.${iconMap[iconName]}`);
    next = next.replace(new RegExp(`</${iconName}>`, 'g'), `</GdsIcons.${iconMap[iconName]}>`);
  }
  if (supported.size > 0) {
    next = ensureNamedImport(next, '@doneisbetter/gds-core', new Set(['GdsIcons']));
  }
  return result({ changed: next !== content, content: next, findings: unsupported, state: next !== content ? 'patched' : 'manual-follow-up' });
}

function labelFromAttrs(attrs) {
  const label = attrs['aria-label'] ?? attrs.label ?? attrs.placeholder ?? attrs.name ?? attrs.id;
  return typeof label === 'string' ? label : undefined;
}

function transformRawControls(content, file) {
  const sourceFile = parseSource(content, file);
  const tags = collectJsxTags(sourceFile).filter((tag) => ['input', 'textarea', 'select'].includes(tag.tagName));
  if (tags.length === 0) {
    return null;
  }
  let next = content;
  const imports = new Set();
  const manual = [];
  for (const tag of [...tags].sort((a, b) => b.start - a.start)) {
    const original = content.slice(tag.start, tag.end);
    const label = labelFromAttrs(tag.attrs);
    const name = tag.attrs.name;
    const isCheckbox = tag.tagName === 'input' && tag.attrs.type === '"checkbox"';
    const replacementTag = isCheckbox ? 'AdminCheckbox' : rawControlMap[tag.tagName];
    if (!label || !name || !original.endsWith('/>')) {
      manual.push(classifyFinding({
        transform: 'raw-controls',
        file,
        rule: `raw-${tag.tagName}`,
        message: `Raw ${tag.tagName} does not expose a safe self-closing labelled migration shape.`,
        replacement: replacementTag,
      }));
      continue;
    }
    let replacement = original
      .replace(/^<input\b/, `<${replacementTag}`)
      .replace(/^<textarea\b/, `<${replacementTag}`)
      .replace(/^<select\b/, `<${replacementTag}`)
      .replace(/\saria-label=\{?["'][^"'}]+["']\}?/, '')
      .replace(/\splaceholder=\{?["'][^"'}]+["']\}?/, '');
    if (!/\slabel=/.test(replacement)) {
      replacement = replacement.replace(/\s\/>$/, ` label=${label} />`);
    }
    replacement = replacement.replace(/\stype="checkbox"/, '').replace(/\s{2,}/g, ' ');
    next = `${next.slice(0, tag.start)}${replacement}${next.slice(tag.end)}`;
    imports.add(replacementTag);
  }
  if (imports.size > 0) {
    next = ensureNamedImport(next, '@doneisbetter/gds-admin', imports);
  }
  return result({ changed: next !== content, content: next, findings: manual, state: next !== content ? 'patched' : 'manual-follow-up' });
}

function transformInlineStyles(content, file) {
  const sourceFile = parseSource(content, file);
  const tags = collectJsxTags(sourceFile).filter((tag) => tag.attrs.style);
  if (tags.length === 0) {
    return null;
  }
  return result({
    findings: tags.map((tag) => classifyFinding({
      transform: 'inline-styles',
      file,
      rule: 'inline-style-authority',
      message: `Inline style on <${tag.tagName}> must move to GDS tokens, component props, or a narrow reviewed exception.`,
      replacement: 'GDS token/primitive prop or approved exception-surface contract',
    })),
    state: 'manual-follow-up',
    reason: 'inline styles require design-token review',
  });
}

function transformAlertsConfirms(content, file) {
  let next = content;
  const findings = [];
  if (content.includes('<Alert')) {
    next = next.replace(/<Alert\b/g, '<InlineAlert').replace(/<\/Alert>/g, '</InlineAlert>');
    next = ensureNamedImport(removeNamedImports(next, '@mantine/core', new Set(['Alert'])), '@doneisbetter/gds-core', new Set(['InlineAlert']));
  }
  if (/\b(window\.)?alert\s*\(/.test(content)) {
    findings.push(classifyFinding({
      transform: 'alerts-confirms',
      file,
      rule: 'blocking-alert',
      message: 'Blocking alert() calls must migrate to GdsToastProvider/useGdsToasts with success/error/retry semantics.',
      replacement: 'useGdsToasts().notifySuccess/notifyError',
    }));
  }
  if (/\b(window\.)?confirm\s*\(/.test(content)) {
    findings.push(classifyFinding({
      transform: 'alerts-confirms',
      file,
      rule: 'blocking-confirm',
      message: 'Blocking confirm() calls must migrate to GdsConfirmProvider/useGdsConfirm or ConfirmDialog so keyboard and screen-reader behavior is governed.',
      replacement: 'useGdsConfirm().confirm or confirmDestructive',
    }));
  }
  if (next === content && findings.length === 0) {
    return null;
  }
  return result({ changed: next !== content, content: next, findings, state: next !== content ? 'patched' : 'manual-follow-up' });
}

function transformTables(content, file) {
  let next = content;
  const findings = [];
  if (content.includes('<Table') || content.includes("from '@mantine/core'")) {
    const sourceFile = parseSource(content, file);
    const mantineTable = collectImports(sourceFile).some((entry) => entry.module === '@mantine/core' && entry.specifiers.some((specifier) => specifier.imported === 'Table'));
    if (mantineTable) {
      next = removeNamedImports(next, '@mantine/core', new Set(['Table']));
      next = ensureNamedImport(next, '@doneisbetter/gds-admin', new Set(['AdminDataTable']));
      findings.push(classifyFinding({
        transform: 'tables',
        file,
        rule: 'mantine-table-import',
        message: 'Mantine Table import was removed; map table body to AdminDataTable columns/data before patch promotion.',
        replacement: 'AdminDataTable',
      }));
    }
  }
  if (/<table[\s>]/.test(content)) {
    findings.push(classifyFinding({
      transform: 'tables',
      file,
      rule: 'raw-table',
      message: 'Raw table markup requires row-header, caption, loading, empty, error, sorting, and mobile behavior review before migration.',
      replacement: 'AdminDataTable or SimpleDataTable',
    }));
  }
  if (next === content && findings.length === 0) {
    return null;
  }
  return result({ changed: next !== content, content: next, findings, state: next !== content ? 'patched' : 'manual-follow-up' });
}

const transforms = {
  'discovery-shell': transformDiscoveryShell,
  'listing-card': transformListingCard,
  'action-bar': transformActionBar,
  'mantine-imports': transformMantineImports,
  'tabler-icons': transformTablerIcons,
  'raw-controls': transformRawControls,
  'inline-styles': transformInlineStyles,
  'alerts-confirms': transformAlertsConfirms,
  tables: transformTables,
};

function createPlan(transformName, target, write, options) {
  return {
    contract: 'GdsCodemodPlan',
    transform: transformName,
    description: transformMetadata[transformName].description,
    target,
    mode: write ? 'patch' : 'dry-run',
    dryRunDefault: !write,
    owner: options.owner,
    removeBy: options.removeBy,
    runtimeStates: ['dry-run', 'patched', 'skipped', 'manual-follow-up', 'failed-transform'],
    rollback: write ? 'Review git diff and revert this patch if verification fails.' : 'No files are modified in dry-run mode.',
  };
}

function buildReport({ plan, files, fileResults, failures, options }) {
  const changedFiles = fileResults.filter((entry) => entry.state === 'patched').map((entry) => entry.file);
  const skippedFiles = fileResults.filter((entry) => entry.state === 'skipped').map((entry) => ({ file: entry.file, reason: entry.reason }));
  const manualFollowUps = fileResults.flatMap((entry) => entry.findings ?? []).map((finding) => ({
    ...finding,
    file: relative(process.cwd(), finding.file),
  }));
  return {
    contract: 'GdsCodemodResult',
    plan,
    summary: {
      filesScanned: files.length,
      transformed: changedFiles.length,
      skipped: skippedFiles.length,
      manualFollowUps: manualFollowUps.length,
      failedTransforms: failures.length,
      exceptionsCreated: manualFollowUps.length,
    },
    changedFiles: changedFiles.map((file) => relative(process.cwd(), file)),
    skippedFiles: skippedFiles.map((entry) => ({ ...entry, file: relative(process.cwd(), entry.file) })),
    manualFollowUps,
    exceptionStubs: manualFollowUps.map((finding) => createExceptionStub({ ...finding, file: resolve(finding.file) }, options)),
    failures,
    observability: {
      event: 'gds.codemod.completed',
      privacy: 'No source contents, secrets, or private user data are emitted; report includes file paths, counts, rules, and replacement guidance only.',
      counts: {
        transformed: changedFiles.length,
        skipped: skippedFiles.length,
        manualFollowUps: manualFollowUps.length,
        failedTransforms: failures.length,
      },
    },
    recovery: {
      retry: 'No automatic retry is performed. Fix manual follow-ups, then rerun the same transform; transforms are idempotent for supported shapes.',
      timeout: 'No long-running background process is kept alive; large repos should pass a narrowed target path per run.',
      rollback: plan.rollback,
    },
  };
}

function parseOptions(argv) {
  const options = {
    write: argv.includes('--write'),
    owner: OWNER_FALLBACK,
    removeBy: REMOVE_BY_FALLBACK,
  };
  for (const arg of argv) {
    if (arg.startsWith('--owner=')) options.owner = arg.slice('--owner='.length);
    if (arg.startsWith('--remove-by=')) options.removeBy = arg.slice('--remove-by='.length);
  }
  return options;
}

function main() {
  const transformName = process.argv[2];
  const target = process.argv[3] ? resolve(process.argv[3]) : process.cwd();
  const options = parseOptions(process.argv.slice(4));

  if (!transformName || !transforms[transformName]) {
    console.error(`Usage: node scripts/codemods/run-codemod.mjs <${Object.keys(transforms).join('|')}> [path] [--write] [--owner=@team] [--remove-by=YYYY-MM-DD]`);
    process.exit(1);
  }

  const files = statSync(target).isDirectory() ? listFiles(target) : [target];
  const fileResults = [];
  const failures = [];
  const plan = createPlan(transformName, target, options.write, options);

  for (const file of files) {
    try {
      const original = readFileSync(file, 'utf8');
      const output = transforms[transformName](original, file);
      if (!output) {
        continue;
      }
      const findings = (output.findings ?? []).map((finding) => ({ ...finding, file: finding.file || file }));
      if (!output.changed) {
        fileResults.push({ file, state: output.state ?? 'skipped', reason: output.reason ?? 'unsupported pattern', findings });
        continue;
      }
      fileResults.push({ file, state: 'patched', findings });
      if (options.write) {
        writeFileSync(file, output.content);
      }
    } catch (error) {
      failures.push({
        file: relative(process.cwd(), file),
        state: 'failed-transform',
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  process.stdout.write(JSON.stringify(buildReport({ plan, files, fileResults, failures, options }), null, 2));
}

main();

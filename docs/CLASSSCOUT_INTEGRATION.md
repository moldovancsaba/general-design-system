# ClassScout Integration Guide

GDS 3.5.0 delivers the 10 gaps (B1–B10) required for ClassScout to ship on pure GDS with no app-level forks. This guide covers install, GdsProvider bootstrap, and usage examples for every new contract.

## Install

```bash
npm install @doneisbetter/gds@3.5.0 @mantine/core @mantine/hooks @mantine/modals @mantine/notifications @tabler/icons-react
```

## Bootstrap

Wrap the app once. For ClassScout the provider belongs in your root layout/providers file:

```tsx
import { GdsProvider } from '@doneisbetter/gds';
import { createBrandTheme } from '@doneisbetter/gds-theme';
import { classcoutBrandColors } from './theme';

const classcoutTheme = createBrandTheme({
  brandColors: classcoutBrandColors,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GdsProvider theme={classcoutTheme} defaultColorScheme="light">
      {children}
    </GdsProvider>
  );
}
```

Never nest a second `GdsProvider` or add a parallel Mantine `MantineProvider`.

---

## B1 — Brand theme (`createBrandTheme`)

GH-316 · `@doneisbetter/gds-theme`

```tsx
import { createBrandTheme } from '@doneisbetter/gds-theme';

const theme = createBrandTheme({
  brandColors: {
    primary: '#1a6b4a',    // must pass WCAG AA against white
    accent: '#e85c2a',
    surface: '#f6f3ee',
  },
  fonts: {
    heading: 'Playfair Display, serif',
    body: 'Inter, sans-serif',
  },
});
// Pass to GdsProvider: <GdsProvider theme={theme}>
```

The theme emits `--gds-brand-primary`, `--gds-brand-accent`, `--gds-bg-surface`, `--gds-text-primary`, `--gds-price`, `--gds-state-*` as CSS custom properties. Contrast is enforced at build time — supplying a non-AA pair throws.

---

## B2 — Mobile bottom-tab navigation (`BottomTabBar`)

GH-317 · `@doneisbetter/gds-core`

Used automatically when you pass `mobileNavigationMode="bottom-tab"` to `PublicShell` or `DiscoveryShell`. Direct use:

```tsx
import { BottomTabBar } from '@doneisbetter/gds-core';
import { IconHome, IconSearch, IconPlus, IconMessage } from '@tabler/icons-react';

<BottomTabBar
  items={[
    { id: 'home',   href: '/',        label: 'Home',   icon: <IconHome size={22} /> },
    { id: 'search', href: '/search',  label: 'Search', icon: <IconSearch size={22} /> },
    { id: 'post',   href: '/post',    label: 'Post',   icon: <IconPlus size={22} />,  emphasized: true },
    { id: 'inbox',  href: '/inbox',   label: 'Inbox',  icon: <IconMessage size={22} /> },
  ]}
  activeId="home"
  emphasizedItemId="post"
  onNavItemSelect={(id) => router.push(itemHrefs[id])}
/>
```

Max 5 items. The `emphasizedItemId` renders the raised center-action button. `hiddenFrom="sm"` — the bar is invisible on desktop.

---

## B3 — Conversation surface (`ChatThread` / `ChatMessage` / `ChatInput` / `StreamingIndicator`)

GH-321 · `@doneisbetter/gds-core`

```tsx
import { ChatThread, type ChatMessageModel } from '@doneisbetter/gds-core';
import { useState } from 'react';

const [messages, setMessages] = useState<ChatMessageModel[]>([]);
const [streaming, setStreaming] = useState(false);

async function handleSend(text: string) {
  setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', content: text }]);
  setStreaming(true);
  const reply = await fetchAssistantReply(text);
  setStreaming(false);
  setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: reply }]);
}

<ChatThread
  messages={messages}
  streaming={streaming}
  onSend={handleSend}
  placeholder="Ask a question…"
  maxEmbeddedCards={3}
/>
```

Embed `ListingCard` or any GDS surface in `message.cards[]` — up to `maxEmbeddedCards` are shown inline, the rest summarized. Auto-scrolls while pinned to bottom; user scroll unpins.

---

## B4 — Searchable select / combobox (`SearchableSelect`)

GH-318 · `@doneisbetter/gds-core`

```tsx
import { SearchableSelect } from '@doneisbetter/gds-core';

// Synchronous options
<SearchableSelect
  value={selected}
  onChange={setSelected}
  options={[
    { value: 'math',    label: 'Mathematics' },
    { value: 'english', label: 'English Language', group: 'Core' },
  ]}
  placeholder="Select a subject"
  clearable
  ariaLabel="Subject"
/>

// Async options
<SearchableSelect
  value={selected}
  onChange={setSelected}
  loadOptions={(query) => fetch(`/api/subjects?q=${query}`).then((r) => r.json())}
  debounceMs={300}
  placeholder="Search subjects…"
/>
```

Stale async responses are discarded automatically. The `group` field clusters options under headings.

---

## B5 — Fit-score chip (`FitScoreChip`)

GH-319 · `@doneisbetter/gds-core`

```tsx
import { FitScoreChip } from '@doneisbetter/gds-core';

// Score-driven (auto-label)
<FitScoreChip value={87} />                  // "Great fit · 87"
<FitScoreChip value={63} />                  // "Good fit · 63"
<FitScoreChip value={31} />                  // "Partial fit · 31"

// With dimensions tooltip
<FitScoreChip
  value={87}
  dimensions={[
    { label: 'Location' },
    { label: 'Grade level' },
    { label: 'Schedule' },
  ]}
/>

// Custom label
<FitScoreChip label="Top match" />
```

Color is deterministic from score band — but meaning is always conveyed by text too (accessible by default).

---

## B6 — AI listing card slots (`ListingCard` reason / score / actions)

GH-320 · `@doneisbetter/gds-core`

```tsx
import { ListingCard, FitScoreChip, SemanticButton } from '@doneisbetter/gds';

<ListingCard
  title="Westside Academy"
  href="/schools/westside"
  description="K–8 STEM-focused charter school in the Mission district."
  metadata={[
    { id: 'district', label: 'SFUSD', icon: <IconMapPin size={14} /> },
    { id: 'grades',   label: 'K–8',   icon: <IconSchool size={14} /> },
  ]}
  score={<FitScoreChip value={91} dimensions={[{ label: 'Location' }, { label: 'Grades' }]} />}
  reason={
    <ul>
      <li>0.4 mi from home</li>
      <li>Matches grade preference</li>
    </ul>
  }
  actions={[
    <SemanticButton key="save"  action="save"   size="sm" />,
    <SemanticButton key="share" action="share"  size="sm" />,
  ]}
  price="$0 tuition"
/>
```

`reason` renders in a labeled region ("Why this fits"). `actions` replaces the default `primaryAction` footer slot (max 4).

---

## B7 — Meaning badges (`MeaningBadge`)

GH-322 · `@doneisbetter/gds-core`

Distinct from `StatusBadge` (system status). Use for editorial/brand labels:

```tsx
import { MeaningBadge } from '@doneisbetter/gds-core';

<MeaningBadge variant="attention"   label="New this week" />
<MeaningBadge variant="validation"  label="Verified" />
<MeaningBadge variant="info"        label="BETA" />
<MeaningBadge variant="urgency"     label="Deadline: Friday" />
```

Variants map to brand tokens; meaning is always conveyed by label text, not color alone.

---

## B8 — Resilient card media (`MediaWithFallback`)

GH-323 · `@doneisbetter/gds-core`

```tsx
import { MediaWithFallback } from '@doneisbetter/gds-core';

<MediaWithFallback
  src={school.imageUrl}        // optional — renders branded fallback if missing or broken
  alt={school.name}
  ratio={4 / 3}
  fallbackLabel={school.name}  // initials extracted automatically: "Westside Academy" → "WA"
  showShimmer
/>
```

Never collapses to null — always reserves the aspect-ratio box. Fires `onError` for analytics on load failure.

---

## B9 — Number stepper (`NumberStepper`)

GH-324 · `@doneisbetter/gds-core`

```tsx
import { NumberStepper } from '@doneisbetter/gds-core';

const [qty, setQty] = useState(1);

<NumberStepper
  value={qty}
  onChange={setQty}
  min={1}
  max={10}
  step={1}
  ariaLabel="Number of applications"
/>
```

Keyboard: Arrow keys step, Home/End jump to bounds. Disables the relevant button at each bound.

---

## B10 — AI search card (`AISearchCard`)

GH-325 · `@doneisbetter/gds-core`

Governed assistant-entry surface — search input + BETA badge + prompt chips:

```tsx
import { AISearchCard } from '@doneisbetter/gds-core';

<AISearchCard
  placeholder="Ask about schools near me…"
  prompts={[
    'Best STEM schools in Mission',
    'Schools with after-care programs',
    'Top-rated K–5 near me',
  ]}
  onSubmit={(query) => router.push(`/chat?q=${encodeURIComponent(query)}`)}
/>
```

`onSubmit` fires on Enter or the search button. `onPromptSelect` lets you intercept chip taps separately (defaults to `onSubmit`).

---

## Drop-in agent rules for ClassScout repo

Copy these into the ClassScout repo root so every AI coding session follows GDS automatically:

**`AGENTS.md`** (Claude Code, Cursor, Codex, Copilot):

```markdown
# AGENTS.md — UI is built with the General Design System (GDS)

This project uses @doneisbetter/gds for all UI. When building or changing interfaces:
- Import from '@doneisbetter/gds' — do not author parallel primitives.
- GdsProvider wraps the app at src/providers.tsx — do not add a second one.
- Style with component props and GDS tokens only — no custom CSS or raw hex.
- SemanticButton takes action="save"|"add"|"edit"|"delete"... not free text.
- New ClassScout-specific components: BottomTabBar, ChatThread, AISearchCard,
  FitScoreChip, ListingCard (with reason/score/actions slots), MeaningBadge,
  MediaWithFallback, NumberStepper, SearchableSelect — all in @doneisbetter/gds-core.
- Brand theme: createBrandTheme from @doneisbetter/gds-theme.
- Full guide: https://sovereignsquad.github.io/general-design-system/ai
```

**`CLAUDE.md`** (Claude Code):

```markdown
# CLAUDE.md
Install: npm install @doneisbetter/gds @mantine/core @mantine/hooks @mantine/modals @mantine/notifications
Wrap once: <GdsProvider theme={classcoutTheme}> in src/providers.tsx
Key rules:
- SemanticButton action="save"|"add"|"edit"|"delete" — not children
- SearchableSelect/Select data={[{value,label}]} — not <option>
- BottomTabBar items max 5; emphasizedItemId for raised center action
- ChatThread onSend, messages[], streaming bool
- AISearchCard onSubmit, prompts[]
Full rules: https://sovereignsquad.github.io/general-design-system/ai
```

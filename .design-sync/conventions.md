# Building with the General Design System (GDS)

GDS is a governed React design system (`@doneisbetter/gds`) built on Mantine. Every component here is the real, shipped component. Compose them — do not reimplement them, and do not invent parallel primitives.

## Required setup — wrap once in `GdsProvider`

`GdsProvider` is the single required root provider. It injects the GDS Mantine theme, tokens, fonts, color-scheme handling, and locale. **Without it, components render unstyled or throw.** Wrap the whole app once at the root:

```tsx
import { GdsProvider, AppShell, MetricCard, SemanticButton } from '@doneisbetter/gds';

export default function App() {
  return (
    <GdsProvider defaultColorScheme="light">
      <MetricCard label="Active adopters" value="18 apps" trend={{ tone: 'positive', label: '+2%' }} />
      <SemanticButton action="save" />
    </GdsProvider>
  );
}
```

Never nest a second `GdsProvider`, and never add a second Mantine `MantineProvider` — there is exactly one theme authority.

## The styling idiom — props and tokens, never raw CSS

GDS is Mantine-based, so you style by **component props and theme tokens**, not utility classes or custom CSS:

- Spacing/layout: Mantine spacing props on GDS primitives — `<GdsStack gap="md">`, `<GdsInline gap="sm">`, `<GdsBox p="lg">`, plus `mt`/`mb`/`p`/`px` token values (`xs|sm|md|lg|xl`).
- Color/typography: semantic props — `c="dimmed"`, `variant`, `color`, `size`, `radius`. Colors come from theme tokens; **never hardcode hex or px** in feature code.
- Prefer the GDS semantic component over a raw control whenever one exists: `SemanticButton action="save"` (the `action` is a semantic enum — see below), `MetricCard`, `EmptyState`, `StatusBadge`, `GdsDataTable`, the shells.

There is **no class-name vocabulary to learn or invent** — if you reach for a CSS class, you're off-pattern; use a prop or a GDS layout primitive instead.

## Component families (compose these)

- **Layout:** `GdsBox`, `GdsStack`, `GdsInline`, `GdsCluster`, `GdsGrid`, `GdsSplit`, `GdsSidebar`, `GdsContainer`, `GdsBleed`.
- **Shells:** `AppShell`, `PublicShell`, `AuthShell`, `ArticleShell`, `DiscoveryShell`, `WorkspaceHeader`, `PageHeader`.
- **Cards/surfaces:** `MetricCard`, `ProgressCard`, `ProductCard`, `EditorialCard`, `EditorialHero`, `InfoCard`, `SectionPanel`, `AccentPanel`, `StatsStrip`.
- **Forms:** `GdsForm`, `GdsSchemaForm`, `FormField`, `FormSection`, `Select` (use `data={[{value,label}]}`, never `<option>`), `TextInput`, `Switch`, `Radio`.
- **Data:** `GdsDataTable` / `DataTable` (via `createGdsTableAdapter(rows, columns)`), `SimpleDataTable`, `Table`, `GdsBarChart` / `GdsLineChart`.
- **Feedback/overlay:** `EmptyState`, `StateBlock` (loading/empty/error/success), `GdsNotificationProvider` + `GdsNotificationCenter`, `GdsModal`, `GdsDrawer`, `ConfirmDialog`, `CommandPalette`.
- **Access:** `GdsAccessGate` with `protectedContentPolicy="never-render-while-locked"` for teaser/paywall — locked content is never mounted.

## Key contracts to honor

- **`SemanticButton` (and `ActionBar`, `SemanticNavLink`, template/page actions) take a semantic `action` enum**, not free text: `action="save" | "add" | "edit" | "delete" | "search" | "settings" | "export" | "refresh" | "submit" | …`. Use `add` (not "create") and `refresh` (not "retry").
- **Every interactive surface has loading / empty / error / disabled / success states** — design them; reach for `StateBlock`, `EmptyState`, and the `loading`/`error` props components expose.
- **Mantine `Select`/`MultiSelect`** (incl. `AdminSelect`) take `data`, not `<option>` children.

## Where the truth lives

- Per-component props: each component's `components/<group>/<Name>/<Name>.d.ts` (the `<Name>Props` interface).
- Per-component usage: each `<Name>.prompt.md`.
- Tokens/theme: the bound `styles.css` import closure (Mantine base + GDS tokens). Read it before styling; do not duplicate its values inline.

When in doubt, read the component's `.d.ts` and `.prompt.md` and compose — the shipped component already encodes the correct behavior, accessibility, and responsive intent.

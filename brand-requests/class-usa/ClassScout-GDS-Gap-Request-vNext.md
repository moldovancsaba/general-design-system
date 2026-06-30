# ClassScout → GDS — Gap Request for the next GDS version

Status: **v1.0 — 2026-06-20 — authoritative (verified against installed packages)**
For: the **GDS team**. Goal: everything ClassScout needs to ship on **pure GDS** (no app-level forks).
Basis: inspected the installed `@doneisbetter/gds-core@2.6.4` and `@doneisbetter/gds-theme@2.6.4` type definitions in the ClassScout repo. This supersedes the inferred verdicts in `ClassScout-GDS-Implementability.md` wherever the installed package proved coverage.

---

## A. Already in GDS 2.6.4 — ClassScout will use these as-is (no ask)

Verified exports cover most of the redesign. Map of ClassScout need → GDS component:

| ClassScout need | Covered by (GDS 2.6.4) |
|---|---|
| App shell + dark sidebar + sections + active state | `DiscoveryShell`, `SidebarNav`, `SidebarNavItem`, `SidebarNavSection`, `PublicShell`, `PublicNav` |
| Discovery page (eyebrow/title/results/scope/toolbar/sort + **mobile filters** + loading/error/empty) | **`BrowseSurface`** (has `mobileFilters`, `filterDrawer`, `loading/error/empty` slots) |
| **Filter bottom sheet** | **`FilterDrawer`** — `FilterDrawerMode = 'side' | 'bottom-sheet'` ✅ |
| **Map** panel (with loading/empty/error, custom render or iframe) | **`MapPanel`** ✅ |
| Provider/listing card (image, metadata rows, price, **featured**, **save**, **share**, compact, sponsored disclosure) | **`ListingCard`** (best fit) + `PublicProductCard`, `ProductCard`, `MediaCard` |
| Provider profile page | **`DetailProfileShell`** |
| Chips / filter chips | `ChoiceChip`, `DataToolbar` (+ `DataToolbarFilterChip`), `BrowseSurfaceFilterChip` |
| Buttons / CTAs / action groups | `SemanticButton`, `CtaButtonGroup`, `ActionBar`, `ShareButtonGroup` |
| Status pill | `StatusBadge` (`StatusVariant = success|warning|danger|info|neutral`) |
| Empty / error / loading states | `StateBlock`, `EmptyState`, `PlaceholderPanel` |
| Hero / editorial / sections / feature band / panels / footers | `EditorialHero`, `EditorialCard`, `FeatureBand`, `SectionPanel`, `AccentPanel`, `PageHeader`, `PublicSiteFooter`, `PublicBrandFooter` |
| Forms / fields / upload / confirm | `FormField`, `MediaField`, `UploadDropzone`, `ConfirmDialog` |
| Notifications, theme toggle, i18n vocabulary | `showGdsNotification`, `ThemeToggle`, `GdsVocabulary` + locales |
| Brand color + font application | `createPublicBrandTheme({ editorialSerif, flatSurfaces, overrides })` — accepts Mantine `overrides` for colors + `fontFamily` (see §C) |

Net: discovery, filters (incl. mobile bottom-sheet), map, profile, cards (base), states, chrome, theming application — **all available now**. The gaps below are the only things blocking a 100%-GDS ClassScout.

---

## B. Missing — please ship in the next GDS version

Each item: what, why ClassScout needs it, proposed API, acceptance, priority.

### P0 — blocks the brand + mobile redesign on pure GDS

**B1. Mobile bottom-tab navigation mode**
- Gap: `PublicShellMobileNavigationMode = 'sheet' | 'inline-collapse' | 'drawer'` — there is **no persistent bottom-tab/rail** mode. `DiscoveryShell` collapses the sidebar to a hamburger at the breakpoint.
- Why: ClassScout is mobile-first; the brand Design System mandates a **white bottom tab bar** (terracotta active, slate inactive, no dark navy) with an emphasized center item (Scout AI). Hamburger/sheet nav fails the brief.
- Proposed: add `'bottom-tab'` to the mobile nav mode on `PublicShell`/`DiscoveryShell`, driven by the existing `navItems: PublicNavItem[]`, with: max 5 items, safe-area inset, active token, and an optional `emphasizedItemId` for a raised center action.
- Acceptance: at `<768px` a fixed bottom tab bar renders from nav items, theme-tokened, with an emphasized center item; content padding auto-applied.

**B2. Governed brand-theme + semantic-token API**
- Gap: `createPublicBrandTheme` accepts only `{ editorialSerif: boolean, flatSurfaces, overrides: MantineThemeOverride }`. Brand colors and fonts work **only via raw Mantine `overrides`**, and there is **no semantic token layer**. `editorialSerif` is a boolean, not a custom display-font slot.
- Why: ClassScout must theme to terracotta `#ca8570` / sage `#90a287` / navy `#0b223e` / cream `#faf7f1` / slate `#434c59` with **Bogart (display) + Garet (body)**, and reference roles (not hex) so the app never hardcodes colors. Raw overrides are fragile and bypass governance.
- Proposed: `createBrandTheme({ brandColors: { navy, terracotta, sage, cream, slate }, fonts: { display, body } })` **plus** a semantic token layer: `brand.primary` (navy), `brand.accent` (terracotta), `bg.page` (cream), `bg.surface` (white), `bg.inverse` (navy), `text.primary/secondary/onInverse`, `price`, `state.success/warning/danger/info`, and badge meanings (see B7). Expose as CSS vars + Mantine theme.
- Acceptance: an app can pass 5 brand ramps + 2 font families and get a fully tokened theme; components read semantic tokens, not hex.

### P1 — core experience (Scout AI + cards)

**B3. Conversation / Chat surface**
- Gap: no chat/conversation primitive (`ChatThread`, `ChatMessage`, streaming/typing state, input row) — confirmed absent.
- Why: the **Scout AI Assistant** is the product centerpiece (a chat that renders provider cards inline).
- Proposed: `ChatThread` (message list, role = `user|assistant`, bubble styling, auto-scroll), `ChatMessage` with a **slot to embed cards** (so AI answers render `ListingCard`s), a streaming/typing state, and a `ChatInput` (Enter sends, Shift+Enter newline). Token-styled (user = navy bubble, assistant = white).
- Acceptance: can render an alternating thread with an assistant message that contains 1–5 embedded cards and a streaming indicator.

**B4. AI card composition — reason slot + fit score + multi-action footer**
- Gap: `ListingCard`/`PublicProductCard` have `primaryAction` + (save/share or secondaryAction) but **no "why this fits" reason slot, no fit-score element, and no ≥4-action footer**.
- Why: AI result cards need a **"Why this fits"** line (2–4 reasons) + a **Fit Score** + four actions (**Save · View Details · Contact · Visit Website**).
- Proposed: extend `ListingCard` (or add `ConsumerListingCard` variant) with `reason?: ReactNode`, `score?: <FitScore>`, and `actions?: ReactNode[]` (footer with 2–4 affordances).
- Acceptance: a card renders image + title + meta + price + reason line + score chip + a 4-action footer, all tokened.

**B5. `FitScoreChip` primitive**
- Gap: none exists.
- Why: show match quality ("Great fit · 92") on AI/browse cards.
- Proposed: a compact pill/meter taking `value` (0–100) and/or `label`, colored on a sage→terracotta scale, with an accessible tooltip listing matched dimensions.
- Acceptance: renders a tokened score pill; AA contrast; tooltip support.

**B6. Searchable Select / Combobox**
- Gap: no searchable-selection primitive (relies on Mantine). Already a **known GDS gap flagged by KIDEX**.
- Why: neighborhood pickers and other large lists.
- Proposed: canonical `Combobox`/`SearchableSelect` with async options, grouping, and keyboard a11y. One solution serves ClassScout + KIDEX.
- Acceptance: typeahead filtering, keyboard nav, grouped options, controlled value.

### P2 — polish / DX

**B7. Meaning badges (brand semantics)** — `StatusBadge` only covers `success|warning|danger|info|neutral`. ClassScout needs **attention (Featured/Staff Pick → terracotta)**, **validation (Recommended/Parent Pick → sage)**, **info tag (neutral `#f1ece4`)**, **urgency (light terracotta tint)**. Add brand-meaning variants or a `MeaningBadge`, distinct from status.

**B8. `MediaWithFallback`** — image primitive with a **branded fallback** so a failed image never collapses a card to `null` (today the app drops the card, breaking result counts).

**B9. `NumberStepper`** — −/value/+ quantity control for the calculator (today composed from Mantine `ActionIcon`s).

**B10. `AISearchCard` pattern** — bless the homepage hero AI search card (input + BETA tag + prompt chips that route into the assistant) as a documented GDS pattern (composable today; standardizing avoids drift).

---

## C. Config-not-gap (works today; note for the brand work)
- **Brand colors:** pass via `createPublicBrandTheme({ overrides: { colors: {...} } })` now; B2 just makes it governed.
- **Fonts:** pass Garet via `overrides.fontFamily` and Bogart via `overrides.headings.fontFamily`; `editorialSerif: true` toggles a serif but does not take a custom family — B2 adds a real display/body font slot.
- **Map list+toggle, results header:** compose `BrowseSurface` + `MapPanel` at app level — no new primitive needed.

---

## D. One-screen summary for the GDS team
Ship for v-next so ClassScout is 100% GDS:
**P0:** (1) bottom-tab mobile nav mode, (2) governed brand-theme + semantic tokens.
**P1:** (3) chat/conversation surface, (4) AI card composition (reason + score + 4 actions), (5) FitScoreChip, (6) searchable Select/Combobox.
**P2:** (7) meaning badges, (8) MediaWithFallback, (9) NumberStepper, (10) AISearchCard pattern.
Everything else ClassScout needs already exists in 2.6.4 (BrowseSurface, FilterDrawer bottom-sheet, MapPanel, DetailProfileShell, ListingCard, shells, chips, states, theming application).

# ClassScout × GDS — Implementability & Gap Report

Status: **Draft v0.1 — 2026-06-20**
Audience: GDS team + ClassScout engineering
Companion to: `ClassScout-UIUX-SSOT.md`

Purpose: for every component in the redesigned UI set, state whether it's deliverable with **full GDS support today**, deliverable with **GDS config/variant**, or **requires the GDS team to ship something new**. The goal is one consolidated list of asks for the GDS team so the UI/UX track can ship in lockstep with development.

---

## 0. Platform baseline gap (resolve first)

| Item | ClassScout today | GDS SSOT today | Action |
|---|---|---|---|
| GDS line | `@sovereignsquad/gds-*` **2.6.4**, installed from **GitHub release tarballs** | **3.0.0**, published to **npm** (per KIDEX handover, aligned 2026-06-01) | Plan ClassScout upgrade 2.6.4 → 3.0.0; switch install source to npm |
| Mantine | **7.17** | **8.3** | Mantine 7→8 migration (breaking) |
| React / Next | React 18 / Next 15.3 | React 19 / Next 15.5 | Align during upgrade |
| Primitive policy | mixed (GDS + hand-rolled Mantine) | **Mantine-only product primitive policy** | Remove hand-rolled forks (e.g. compact card) |

**Why it matters:** building the new brand theme and components on 2.6.4 risks rework when ClassScout moves to 3.0.0. Recommendation: **do the brand-token + theme work against the GDS version ClassScout will ship on**, and sequence the platform upgrade early in the parallel track.

---

## 1. Brand theming

| Need | GDS support | Verdict |
|---|---|---|
| Terracotta/sage/navy/cream/slate palette as the brand theme | Current theme uses `createPublicBrandTheme({ flatSurfaces: true })` (teal/orange) | **GDS ask** — confirm the brand-theme composer accepts a full custom 5-color brand ramp set, or provide a `createBrandTheme(tokens)` path that takes our ramps |
| **Bogart Bold** (display) + **Garet** (body) fonts | GDS theme exposes font wiring; current app injects Google fonts (Poppins/Inter) at the app level | **Config** — wire licensed fonts via theme `fontFamily`/headings; confirm GDS doesn't hard-bind a font |
| Flat surfaces + hairline borders | Supported (`flatSurfaces: true`) | **Full** |
| Semantic token layer (role → ramp) | Unknown in 2.6.4 | **GDS ask** — expose semantic tokens (brand.primary, bg.inverse, text.onInverse, price, state.*) so the app never references raw hex |

---

## 2. Navigation & shell

| Component | GDS support | Verdict |
|---|---|---|
| `DiscoveryShell` + `SidebarNav` + `SidebarNavItem/Section` | Used today; supports dark theme, active color, sections, promo | **Full** — restyle to navy/terracotta via tokens |
| Dark navy sidebar with terracotta active | Likely via color props/tokens | **Config** — verify dark surface + active-state tokens |
| **Mobile bottom tab bar** (persistent, 5 tabs, safe-area, center-emphasized AI) | Not observed in 2.6.4; shell collapses sidebar at `lg` (hamburger pattern) | **GDS ask (high priority)** — ship a `BottomTabBar` / responsive nav contract, or bless an app-level component as a documented exception |
| **CategorySwitcher** sheet (mobile Discover) | Depends on BottomSheet (see §5) | **GDS ask** (depends on sheet) |
| Header with logo + actions + counts (`Indicator`) | Mantine primitives | **Full** |

---

## 3. Provider card (canonical)

| Variant | GDS support | Verdict |
|---|---|---|
| `rich` | `PublicProductCard` exists and is used (image, title, desc, price, metadata rows, primary/secondary actions) | **Full** — extend props |
| `compact` | Currently **hand-rolled** Mantine `Paper` (violates Mantine-only/GDS-primitive policy) | **GDS ask** — ship a `compact`/`dense` variant of `PublicProductCard` so we can delete the fork |
| `ai` (Fit Score chip + "Why this fits" + 4 actions) | Not in GDS | **GDS ask** — either a card slot for a reason line + score chip + a 4-action footer, or document an app composition pattern |
| Branded image-fallback (no `null`) | App concern, but a GDS `MediaWithFallback` would standardize it | **GDS ask (nice-to-have)** |

---

## 4. Discovery controls

| Component | GDS support | Verdict |
|---|---|---|
| `DataToolbar` (search/filter/sort/reset slots + active-filter chips) | Used today | **Full** |
| `SortSelect`, `SearchInput`, chips (`Chip`), `Badge` | Mantine + GDS | **Full** |
| **FilterSheet** (mobile bottom sheet w/ Apply/Clear) | Today filters are an inline `Collapse` + `Paper` | **GDS ask** — a `FilterSheet`/responsive filter pattern, or bless app-level with a BottomSheet primitive |
| **ResultsHeader** sticky (count + sort + filter) | Composable from primitives | **Config / app** |
| Map+list surface with **mobile toggle** | `CatalogMapListSurface` is app-level (MapLibre GL JS); GDS has no map primitive | **App-owned** — keep app-level; GDS exception (parallels existing recharts/PDF exceptions). Ask GDS only for the responsive list/detail sheet pattern |

---

## 5. Overlays & sheets

| Component | GDS support | Verdict |
|---|---|---|
| **BottomSheet / Drawer** (drag handle, snap points, safe-area) | Not observed in GDS 2.6.4; Mantine has `Drawer` but not a mobile bottom-sheet contract | **GDS ask (high priority)** — underpins FilterSheet, CategorySwitcher, map card, profile-on-mobile |
| Profile drawer/modal (`ProviderProfile`) | App-level today over Mantine | **Config** — align to GDS overlay tokens once sheet ships |
| Toast/Notifications | `@mantine/notifications` used | **Full** |

---

## 6. Scout AI surfaces (mostly new)

| Component | GDS support | Verdict |
|---|---|---|
| **AISearchCard** (hero, BETA tag, prompt chips) | Composable from primitives (Card, Input, Chip, Badge) | **Config / app** — standardize as a pattern; GDS could bless it |
| **ChatThread / AIMessage** (bubbles, embedded provider cards, streaming) | Not in GDS | **GDS ask** — a chat/conversation pattern (message list, role bubbles, streaming state, slot for embedded cards). If out of GDS scope, document as an app-owned exception with a shared contract |
| **SuggestedPrompts** | `Chip`/`Button` group | **Full** |
| **ProviderAISummary + AskAboutProvider** | Composable | **Config / app** |
| **FitScoreChip / WhyThisFits** | Not in GDS | **GDS ask** — small meter/chip primitive + a labeled reason line |

---

## 7. States, forms, content

| Component | GDS support | Verdict |
|---|---|---|
| `StateBlock` (empty/error) | Used today | **Full** — apply to Home/AI (stop `return null`) |
| **Skeletons** (card/hero/AI) | Mantine `Skeleton` | **Full / app** — define skeleton set |
| `PageHeader`, `SectionPanel`, `AccentPanel`, `EditorialHero`, `EditorialCard`, `FeatureBand`, footers | All used today | **Full** |
| **LabeledField** (no placeholder-only) | Mantine inputs support labels | **Full** — enforce via lint rule |
| Newsletter form → real endpoint or "coming soon" | App + backend | **App-owned** |
| **Searchable selection** (neighborhoods, large lists) | Known GDS gap (per KIDEX handover: "until GDS ships a canonical searchable-selection contract") | **GDS ask** — same gap KIDEX hit; one solution serves both products |

---

## 8. Consolidated GDS asks (hand this list to the GDS team)

Priority for ClassScout's mobile-first business goals:

**P0 — blocks mobile redesign**
1. **BottomTabBar / responsive primary-nav contract** (mobile).
2. **BottomSheet primitive** (drag handle, snap points, safe-area) — unlocks filters, category switcher, map card, mobile profile.
3. **Brand theme on the shipping GDS line** — custom 5-color brand ramps + Bogart/Garet fonts + semantic token layer.

**P1 — core experience**
4. **Provider card `compact` variant** (retire the hand-rolled fork) + **`ai` composition** (Fit Score chip, "Why this fits", 4-action footer).
5. **FitScoreChip** small meter/pill primitive.
6. **Chat/conversation pattern** for Scout AI (or a blessed app-owned exception + shared contract).
7. **FilterSheet** responsive filter pattern.

**P2 — consistency / shared with KIDEX**
8. **Searchable-selection** canonical contract (already a known GDS gap).
9. **MediaWithFallback** (branded image fallback, no silent `null`).
10. Map surface stays **app-owned** (GDS exception, like recharts/PDF); GDS only owns the responsive list/detail sheet around it.

**What is already fully supported (no GDS work):** shell + sidebar, `PublicProductCard` rich, `DataToolbar`, `PageHeader`/panels/editorial/hero/footers, `StateBlock`, notifications, Mantine form/skeleton primitives.

---

## 9. Recommended sequencing (parallel UI/UX + dev)

1. Lock brand tokens + type from `Class_Scout_Design_System.pdf` (pending).
2. GDS: confirm/issue P0 items; ClassScout starts theme + token work on the target GDS line.
3. Build canonical card variants + states + forms (mostly full GDS).
4. Layer Scout AI patterns (P1.4–6) as data/AI lands.
5. Reconcile against `nyc-kid-scout` Lovable UI; fold deltas into both docs.

## 10. Recorded limitation — palette not expressible via createPublicBrandTheme (implemented)

`@sovereignsquad/gds-theme`'s `createPublicBrandTheme({ flatSurfaces: true })` does not expose a way to
set the navy/terracotta/sage/cream brand palette (no brand-color input on the composer). Per the
redesign rules (§1 of the Developer-Agent prompt), the brand palette is therefore applied as
**app-level Mantine color overrides** via the composer's `overrides` option in
`src/theme/mantineTheme.ts`:

- `teal` & `dark` color scales → navy (existing primary CTAs / text recolor without touching call sites)
- `beige` and a new `cream` key → cream (page/surface backgrounds)
- `orange` → terracotta; new `navy` / `terracotta` / `sage` scales added for accents
- filled bases (shade 6) darkened so white text retains WCAG-AA contrast
- `primaryColor: "teal"` (now navy), `fontFamily`/`headings` bound to `--font-body` / `--font-display`

This is a temporary app-level override pending GDS exposing brand-color inputs on the public brand
theme composer. `gds:check` continues to pass because the raw color values live only in the approved
theme/token files (`mantineTheme.ts`, `globals.css`).

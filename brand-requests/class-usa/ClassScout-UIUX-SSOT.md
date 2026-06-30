# ClassScout UI/UX SSOT — Mobile-First Redesign

Status: **Draft v0.1 — 2026-06-20**
Owner: Product (delivery) · Audience: Engineering, GDS team, Design
Scope: The single source of truth for ClassScout UI/UX rules, the canonical UI component set, and the mobile-first interaction model that delivers the business requirements.

> This document is built from verified inputs: the brand sheet, the two product mockups (home, Scout AI Assistant), the AI MVP feature spec, the provider data model, and a full read of the live `classscout` codebase (Next.js + Mantine + GDS 3.5.0).
> **Open reconciliation** (see §11): `Class_Scout_Design_System.pdf`, `ClassScout-UX-Blueprint-v2.pdf`, and the business owner's Lovable repo `moldovancsaba/nyc-kid-scout` were not yet readable when this draft was written. Where this document defines tokens or components those sources may also define, the PDF/Lovable values win and this doc is updated to match.

---

## 1. Product in one line

ClassScout helps busy NYC parents find the right local activity for their kid — classes, camps, birthday parties, drop-ins, family events, and meet-up groups — by browsing, filtering, or **asking Scout AI in plain language**, and understanding *why* each result fits.

Three questions every screen must keep answerable:
1. What is this / what can I find here?
2. How do I narrow to my kid + my neighborhood?
3. What do I do next (save, view, contact, ask)?

---

## 2. Why this redesign (problems we are fixing)

Verified from the live app and the brief:

| # | Problem (today) | Impact | Fix (this SSOT) |
|---|---|---|---|
| P1 | Brand mismatch — app ships Poppins/Inter + teal/orange/grape; brand is **Bogart Bold + Garet** and **terracotta/sage/navy/cream/slate** | Off-brand; PO redesign not reflected | §3 brand tokens become the theme |
| P2 | No AI surface at all; AI is the centerpiece of the brief | Misses the core value prop | §6 Scout AI patterns |
| P3 | Mobile loses content — featured providers `visibleFrom="sm"`, category cards degrade to text-only buttons | Weakest experience on the primary device | §5 mobile-first rules |
| P4 | No persistent mobile navigation (sidebar collapses at `lg`) | Hard to move between sections on phones | §5.1 bottom tab bar |
| P5 | Homepage renders blank on slow/failed load (`HomeView` returns `null`) | Looks broken; violates own empty-state rule | §8 states |
| P6 | Listings silently vanish when an image fails (`ProviderCard` returns `null`); result counts mismatch | Confusing, untrustworthy | §7 card rules + §8 |
| P7 | Two card systems (GDS `PublicProductCard` + hand-rolled compact `Paper`); two parallel color-tone maps | Drift, inconsistency | §7 one card, variants |
| P8 | Demo prices + ratings shown as if real (disclosure only in footer) | Trust risk | §9 content/trust rules |
| P9 | Newsletter "success" with no backend; email field has no label | Misleading + a11y fail | §8 + §10 |
| P10 | Admin entry exposed in public chrome (footer + empty-state "Open admin") | Leaks internal surface | §9 |

---

## 3. Brand foundation (tokens)

> Source: brand sheet (`Class Scout Branding.png`). Reconcile exact ramps with `Class_Scout_Design_System.pdf`.

### 3.1 Color — core palette

| Token | Hex | Role |
|---|---|---|
| `--cs-terracotta` | `#ca8570` | Primary brand / primary actions, active nav, key accents |
| `--cs-sage` | `#90a287` | Secondary / supportive accents, success-adjacent |
| `--cs-navy` | `#0b223e` | Ink, dark surfaces (sidebar), headings on light |
| `--cs-cream` | `#faf7f1` | Page background, light surfaces |
| `--cs-slate` | `#434c59` | Muted text, secondary dark UI, borders on dark |

Each core color needs a full tint/shade ramp (50→900) for states. **Do not** introduce teal/orange/grape — retire the current theme's accent set.

### 3.2 Semantic color roles (map every UI color to a role, never a raw hex in components)

| Semantic | Source token |
|---|---|
| `color.brand.primary` | terracotta 500 |
| `color.brand.onPrimary` | cream 50 |
| `color.bg.page` | cream 50 |
| `color.bg.surface` | white |
| `color.bg.inverse` | navy 900 (sidebar, footers) |
| `color.text.primary` | navy 900 |
| `color.text.secondary` | slate 600 |
| `color.text.onInverse` | cream 50 |
| `color.accent.secondary` | sage 500 |
| `color.state.success` | sage 600 |
| `color.state.warning` | amber (derive) |
| `color.state.danger` | derive (warm red, not clashing with terracotta) |
| `color.price` | navy 900 (neutral, NOT a brand accent — see §9) |

### 3.3 Type

| Token | Family | Use |
|---|---|---|
| `font.display` | **Bogart Bold** | H1–H3, hero headlines, wordmark |
| `font.body` | **Garet** | Body, UI labels, buttons, inputs, captions |

Fallback stack until licensed webfonts load: display → `"Bogart", Georgia, serif`; body → `"Garet", ui-sans-serif, system-ui`. **Replace** the current `Poppins`/`Inter` wiring.

Type scale (mobile → desktop, fluid): H1 28→44, H2 22→32, H3 18→24, body 16, small 14, caption 12. Line-height 1.2 display / 1.5 body. Never below 12px.

### 3.4 Shape, spacing, elevation
- Radius: `sm 8`, `md 12`, `lg 16`, `pill 999`. Cards = `lg`. Chips/badges = `pill`.
- Spacing scale (4-based): 4, 8, 12, 16, 20, 24, 32, 40, 48.
- Elevation: flat surfaces with hairline borders (matches current `flatSurfaces: true`). One soft shadow level for raised sheets/modals only.
- Logo: scout-in-map-pin mark; wordmark "Class Scout" / "Class Scout NYC" with optional "New York" subtitle. Tagline: **"Scout Smarter. Find the Perfect Fit."**

---

## 4. Information architecture

Primary destinations (verified from mockups + data model):

**Discover:** Home · Classes · Camps · Birthday Parties · Drop-In Activities · **Family Events** (new) · Meet-Up Groups · **Scout AI Assistant** (new)
**My tools:** Saved · Calculator · My Account

Offerings/categories map 1:1 to the provider data model's six offering types. Family Events is a first-class category; Scout AI Assistant is a first-class destination, not a hidden feature.

Global chrome:
- **Header:** logo + wordmark · Saved (heart, count) · Notifications (bell) · Calculator · Account.
- **Sidebar (≥ lg):** dark navy, terracotta active state, Discover + My tools sections, "List your program → Get in touch" promo, trust line.
- **Bottom tab bar (< lg):** see §5.1.

Remove from public chrome: "Staff admin" link and any admin CTA (P10). Admin is reached by direct URL only.

---

## 5. Mobile-first rules (the heart of this redesign)

Design every screen for a ~390px viewport first, then enhance. Mobile is the primary device for parents on the go.

### 5.1 Navigation — persistent bottom tab bar (< lg)
- 5 tabs max: **Home · Discover · Scout AI · Saved · Account**.
  - "Discover" opens a category switcher (sheet) covering Classes/Camps/Parties/Drop-In/Family Events/Meet-Up.
  - Scout AI is center and visually emphasized (it is the differentiator).
- Tab bar is fixed, safe-area-aware, 56–64px tall, with labels. Active = terracotta.
- The full sidebar nav is replaced by the tab bar on mobile — never hide primary nav behind a single hamburger only.

### 5.2 Content parity
- **No content is `visibleFrom="sm"`-gated away on mobile.** Featured providers, category imagery, popular picks all render on mobile (P3) — reflow, don't remove.
- Category entry points on mobile keep their image + one-line description (cards, horizontally scrollable), not text-only buttons.

### 5.3 Filtering — bottom sheet, not inline collapse
- Filters open in a **bottom sheet** (drag handle, scrollable, "Apply (N)" + "Clear" pinned at bottom).
- Active filters show as a horizontally scrollable chip row directly under the search/results header, each chip removable.
- Borough/neighborhood selection is a chip row (scrollable) or a sheet, never a cramped inline wrap.

### 5.4 Map + list
- The map/list split (`CatalogMapListSurface`) becomes a **toggle** on mobile: default = list; a "Map" button opens full-screen map; selecting a pin opens a compact card sheet. Never show a half-height map above a half-height list on phones.

### 5.5 Touch + ergonomics
- Min touch target 44×44px. Primary actions reachable in the thumb zone (bottom third).
- Sticky "results header" (count + sort + filter button) stays accessible while scrolling.
- Provider card actions (Save/Share/Add) are large enough and spaced ≥ 8px.

### 5.6 Performance/perceived speed
- Skeletons for cards, hero, and AI responses (never blank — P5). Image lazy-loading with reserved aspect ratio to prevent layout shift.

---

## 6. Scout AI — the centerpiece (4 patterns)

> Source: `Class Scout AI MVP.docx` + Scout AI Assistant mockup + data model group G (AI Matching / Fit Score).

### 6.1 Homepage AI search (entry point)
- Lives in the hero. Card labeled "Scout AI" with a **BETA** tag.
- Placeholder: "Tell Scout AI what you are looking for…" (or "What are you looking for today?").
- Quick prompt chips below: Weekend activities · Classes near me · Birthday party ideas · Summer camps · Drop-in activities.
- On submit, parse intent (age, activity, category, location, schedule) and **route to the Scout AI Assistant page with the query preloaded and the answer already generating.** The home bar is an entry point, not a full conversation.

### 6.2 Scout AI Assistant page (destination)
- Title "Scout AI Assistant" + one-line intro.
- Suggested prompt buttons (Find classes near me, Weekend activities, Birthday party ideas, Summer camps, Help me choose, Indoor activities).
- Chat message area (user bubble right, AI left) + bottom input.
- AI answers = short practical explanation, then **3–5 provider cards** (§7) inline.
- Must support follow-ups: "show cheaper options", "only weekends", "anything closer", "more beginner-friendly".
- Personalization: when logged-in preferences exist (child age, borough, interests), use them ("Find something this weekend" → uses saved context).

### 6.3 AI provider cards
- Same canonical card as browse (§7), with an added **"Why this fits"** reason line and the four actions: **Save · View Details · Contact · Visit Website**.
- AI recommends **only real providers** from the catalog. If data is missing, the card/answer states: "Schedule, pricing, or availability should be confirmed directly with the provider."

### 6.4 Provider profile AI ("Scout AI Summary / Ask about this provider")
- A section inside the provider profile (not a separate chat page).
- "Scout AI Summary" paragraph grounded **only** in that provider's profile data.
- Quick-question buttons: Is this good for beginners? · Suitable for my child's age? · What makes this provider different? · Find similar providers nearby.
- Small "Ask about this provider…" input.
- Never invents details; missing data → confirm-with-provider language.

**Trust rule for all AI surfaces:** answers are grounded in catalog data, phrased as "may be a good fit," and always offer a verify-with-provider path. The BETA tag stays until quality is proven.

---

## 7. The canonical UI component set

One component system. Variants, not forks. (Maps to current GDS usage where possible; gaps tracked in the GDS report.)

### 7.1 Provider card (ONE component, three variants)
Fields available from the data model: image, name, category, activity tags, neighborhood/borough, age range, schedule tags, price, rating/reviews, badges (Featured, Verified, Staff pick), Fit Score + "Why this fits".

- **Variant `rich`** (browse grids): image, name, short description, price, location, up to 3 metadata rows, rating, primary action (View details / Book), secondary actions (Save, Share, Add to calculator).
- **Variant `compact`** (lists, popular picks, map sheet): image, name, location/next-date, category badge, 2–3 tags, price, View + icon actions.
- **Variant `ai`** (AI responses): compact + **Fit Score chip** + **"Why this fits"** line + four actions (Save, View Details, Contact, Visit Website).

Card rules:
- **Never render `null` on image failure.** Show a branded fallback (category illustration on cream) and keep the card (fixes P6). Result counts must equal rendered cards.
- Price always carries an "est." treatment (§9). Rating only shown when real (§9).
- Badges: max 2 visible; Featured (terracotta), Verified (sage), others muted.

### 7.2 Fit Score
- A compact chip/meter (e.g., "Great fit" / "Good fit" + score) driven by data-model group G (age/location/budget/schedule/interest match → fit score + recommendation rank).
- Visual: small pill with sage→terracotta scale; tooltip/expand reveals the matched dimensions. Used in AI cards and (optionally) browse when a query is active.

### 7.3 Navigation components
- **AppSidebar** (dark, ≥ lg) and **BottomTabBar** (< lg) — two presentations of one nav model.
- **CategorySwitcher** sheet (mobile Discover tab).

### 7.4 Discovery controls
- **SearchInput** (labeled), **AI SearchCard** (hero), **FilterSheet**, **ActiveFilterChips**, **BoroughChips**, **NeighborhoodChips**, **SortSelect**, **ResultsHeader** (count + sort + filter).

### 7.5 Surfaces & states
- **PageHeader** (eyebrow + title + description), **SectionPanel**, **AccentPanel**, **EditorialHero**, **EditorialCard**, **FeatureBand**, **StateBlock** (empty/error/loading), **Skeletons**, **Toast/Notification**, **BottomSheet/Drawer**, **Modal/ProfileDrawer**.

### 7.6 AI components
- **AISearchCard**, **ChatThread** (user/AI bubbles), **AIMessage** (text + embedded cards), **SuggestedPrompts**, **ProviderAISummary**, **AskAboutProvider** input, **WhyThisFits** line, **FitScoreChip**.

### 7.7 Forms
- **LabeledField** (label always present — no placeholder-only), **NewsletterForm** (must hit a real endpoint or be clearly "coming soon"), **ContactProvider** action, **PreferenceForm** (child age, borough, interests — powers AI personalization).

---

## 8. State rules (every data surface defines all five)

For Home, Discover, Saved, Calculator, AI, Profile:

1. **Loading** → skeletons that match final layout. Never `return null`. (Fixes P5.)
2. **Empty** → what happened + why + the best next action (per existing UX guidelines). No dead ends, no "Open admin".
3. **Error** → human cause + a retry. Home included.
4. **Partial** → if some items lack required media/data, show what's valid and reflect the true count; don't silently drop (P6).
5. **Success/loaded** → content.

AI-specific: "thinking" indicator, "no exact matches but here are nearby options" answer, and a graceful "confirm with provider" when data is thin.

---

## 9. Content & trust rules

- **Pricing:** every price is labeled estimated/demo at the point of display (e.g., "est. $45/class"), not only in the footer (P8). Price uses neutral ink, not a brand-accent color, to avoid implying a live transactable rate.
- **Ratings/reviews:** show only when backed by real data. If seed/demo, hide or clearly label. Never imply social proof that doesn't exist (P8).
- **Trust copy:** "Curated. Local. Parent-friendly. Built for busy NYC families." Specific and supportable; no real-time-completeness claims; no internal AI/pipeline language in user copy.
- **Public copy:** no URLs, no scraped chrome, no placeholder prose in descriptions (existing policy).
- **Admin:** never linked from public chrome (P10).
- **AI honesty:** "may be a good fit" framing + verify-with-provider; BETA tag retained.

---

## 10. Accessibility (mandatory, every touched surface)

- Every input has a visible, associated label (fixes the placeholder-only newsletter field, P9). Icon-only controls keep `aria-label` (already good in code — keep it).
- Color contrast ≥ WCAG AA: verify terracotta-on-cream and text-on-navy ramps; terracotta text on cream likely needs a darker shade.
- Touch targets ≥ 44px; focus-visible rings on all interactive elements; full keyboard path for chat, filters, sheets.
- Respect reduced-motion. Chat updates announced via polite live region. Sheets/modals trap focus and restore on close.

---

## 11. Sources & open reconciliation

Verified inputs used: brand sheet; home + Scout AI Assistant mockups; AI MVP doc; provider data-model diagram; live `classscout` code (Mantine 7 + GDS 3.5.0).

Pending (update this doc when available):
- `Class_Scout_Design_System.pdf` → exact color ramps, type scale, spacing, component specs. **Authoritative over §3 if different.**
- `ClassScout-UX-Blueprint-v2.pdf` → screen-by-screen flows incl. mobile.
- `moldovancsaba/nyc-kid-scout` (business owner's Lovable UI) → reference implementation; reconcile component names/props and visual detail.
- `provider card.xlsx` / `class_scout_provider_data_structure.xlsx` → field-level confirmation (appears to mirror the data-model diagram).

Governance: the shared **General Design System** is the design SSOT; this ClassScout document is the product adapter. Anything GDS ships, ClassScout uses; gaps are tracked in `ClassScout-GDS-Implementability.md`.

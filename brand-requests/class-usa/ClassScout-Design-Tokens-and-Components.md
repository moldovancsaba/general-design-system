# ClassScout — Locked Design Tokens & Component Specs

Status: **v1.0 — 2026-06-20 — reconciled from primary sources**
Supersedes the provisional token guesses in `ClassScout-UIUX-SSOT.md` §3.
Primary sources read in full: `Class_Scout_Design_System.pdf` (12pp, brand SSOT), `ClassScout-UX-Blueprint-v2.pdf` (20pp, dev handoff), brand sheet `Class Scout Branding.png`, AI MVP doc, provider data model.

---

## 0. Source authority & resolved conflicts

The two PDFs disagree. Resolution order: **brand sheet ≈ Design System PDF win on brand (color, type, hierarchy); UX Blueprint v2 wins on structure (IA, screen anatomy, responsive, AI rules, component layout).** The Blueprint's color/type values describe the *current live app*, not the brand, and are deprecated.

| Conflict | Design System PDF / brand sheet (AUTHORITATIVE) | UX Blueprint v2 (stale — reflects live app) | Decision |
|---|---|---|---|
| Terracotta | `#ca8570` | `#C2552B` | **`#ca8570`** |
| Navy | `#0b223e` | `#0B2545` | **`#0b223e`** |
| Sage | `#90a287` | `#84B59F` | **`#90a287`** |
| Warm Ivory | `#faf7f1` | `#FBFAF5` | **`#faf7f1`** |
| Slate | `#434c59` | `#222222` | **`#434c59`** |
| Display font | **Bogart Bold** (sparingly) | "Playfair-style serif" | **Bogart**; Playfair only as fallback |
| UI font | **Garet** (all app UI) | Poppins SemiBold + Inter | **Garet**; Poppins/Inter as fallback |
| "Teal" accent | does not exist | used for badges/price/focus | **No teal** — terracotta/sage/navy only |
| Mobile primary nav | **white bottom nav**, terracotta active, slate inactive ("avoid dark navy bottom navs") | hamburger sheet top-left | **Bottom tab bar** (better mobile UX + brand rule) |

Action for engineering: the live theme (teal/orange/grape, Poppins/Inter) is wrong on both color and type and must be replaced with the tokens below.

---

## 1. Color tokens (locked)

| Token | Hex | Role (Design System PDF) |
|---|---|---|
| `color.navy` (Deep Navy) | `#0b223e` | Trust & structure: primary text, logo, headings, sidebar, **primary CTA buttons** |
| `color.terracotta` | `#ca8570` | Attention & action: key CTAs/accents, **selected states**, important/Featured badges, **price + rating star** |
| `color.sage` (Sage Green) | `#90a287` | Validation & support: trust cues, gentle success, "Recommended"/"Parent Pick", neighborhood-selected |
| `color.ivory` (Warm Ivory) | `#faf7f1` | Warmth & canvas: page/dashboard background, empty states, modal backgrounds |
| `color.white` | `#ffffff` | Cards & content containers ONLY (clean, scannable data surfaces) |
| `color.slate` (Slate Charcoal) | `#434c59` | Calm secondary: metadata, helper copy, inactive nav, descriptions |
| `color.navy.pressed` | `#07182c` | Primary button pressed |
| `color.tag.neutral.bg` | `#f1ece4` | Neutral info tags (Ages, STEM, Weekend, Sports) |
| `color.terracotta.tint` | `#f5ddd5` | Urgency-badge / calculator-total background |
| `color.border.card` | `#eee7dd` | Card border |
| `color.nav.inactiveText` | `rgba(250,247,241,0.72)` | Sidebar inactive label on navy |

### Color hierarchy (governing principle — Design System p12)
Ivory (canvas) → White (cards) → Slate (metadata) → Navy (trust/framing/primary action) → Sage (friendly trust cues) → Terracotta (peak attention, key CTAs). Use the higher levels sparingly; they sit on top of the calm base. **Golden rule:** components never use big blocks of terracotta or sage — the logo, buttons, badges, and price accents carry the brand.

### Surfaces (Design System p5)
Warm Ivory for large soft sections + mobile backgrounds; Pure White strictly for cards/content; navy & terracotta elements "float" above cards. **Never** use navy as a full-page app background (too heavy for browsing).

---

## 2. Typography (locked)

| Role | Font | Notes |
|---|---|---|
| Display / hero / wordmark / tagline | **Bogart Bold** | Used *sparingly* — logo, landing/hero headlines, marketing only. Not for dense app UI. |
| All app UI | **Garet** | Nav, buttons (semibold), provider names, section titles, filters, cards, body, metadata |

Correction vs provisional SSOT: in-app page/section titles and provider-card names are **Garet semibold + navy**, not Bogart. Reserve Bogart for the home hero and marketing surfaces.
**Interim fonts (until Bogart/Garet are licensed):** display → **Fraunces** (free/OFL, warm characterful display serif — closest free match to Bogart); UI → **Outfit** (free/OFL geometric sans — closest free match to Garet). Both load from Google Fonts. Swap to the licensed faces later by changing only the first name in each stack.
Font stacks: display → `"Bogart","Fraunces","Playfair Display",Georgia,serif`; UI → `"Garet","Outfit",ui-sans-serif,system-ui`.
Eyebrows/tags: uppercase, ~11px, +0.16em tracking, terracotta.

> **Fonts are settled — Bogart/Garet (this doc is the authority).** The partner Lovable build ships Abril Fatface + Montserrat as placeholder substitutes; those carry no design weight and are replaced with Bogart/Garet on port. The Lovable repo informs functions, layout, and content only — never design. See `ClassScout-Lovable-Reconciliation.md` (Authority section).

---

## 3. Buttons (Design System p6)

| Type | Style | Use |
|---|---|---|
| **Primary** | Navy fill, white text (pressed `#07182c`) | Find Classes, Save Provider, View Details, Book Now |
| **Accent** | Terracotta fill, white text — **use sparingly** | Add to Calculator, Tickets, Join Waitlist |
| **Secondary** | White fill, hairline border, navy text | Share, Clear filters, Back |
| **Disabled** | Muted grey | Never navy or terracotta |

Radius pill/`lg`. Garet semibold.

---

## 4. Badges — color by meaning (Design System p9)

| Class | Color | Examples |
|---|---|---|
| Featured / attention | Terracotta `#ca8570`, white text | Featured, Staff Pick, Popular, Sponsored |
| Trust / validation | Sage `#90a287` | Recommended, Parent Pick, Great for Toddlers |
| Neutral info | `#f1ece4` bg, slate text | Ages 3–5, STEM, Weekend, Sports |
| Urgency / alert | Light terracotta tint `#f5ddd5`, terracotta text | Few Spots Left, Registration Open |

Max ~2 attention/trust badges visible per card; the rest neutral.

---

## 5. Selection logic (Design System p8 + Blueprint p17)

- **Borough bar (macro):** pills ~36px tall, "feel substantial." Default = white + border, navy text; hover = soft ivory `#f2ede5`; **selected = navy fill**, ivory text. Changing borough resets neighborhood.
- **Neighborhood chips (micro):** ~28px, "feel softer." Default = slate text; **selected = sage** `#90a287`. (Sage because it's a supportive step, not a primary CTA.) Horizontal scroll on mobile.
- **Filter chips (age / day-time / activity):** chip groups, single active = **terracotta soft**.

---

## 6. Provider card (Design System p10 + Blueprint p17)

- Container: white `#ffffff`, border `#eee7dd`, soft shadow, radius `lg`; hover lift −2px + elevated shadow (disable under reduced-motion).
- Image: 16:9 cover, lazy-loaded, 5% scale on hover (500ms). **Branded fallback if missing — never drop the card.**
- Top-left badge: attention pill (Featured / Staff Pick / Popular) — 11px uppercase +0.16em.
- Bottom-left badge: soft pill + megaphone icon — announcement (e.g. "Open enrollment").
- Top-right: heart toggle (40px circle), fills terracotta when saved.
- Title: provider name — **navy**, Garet semibold (→ terracotta on hover).
- Meta: pin icon + neighborhood, borough — **slate**.
- Tags: age & day-time chips (neutral/muted).
- Price + rating row: top border; **$/class in terracotta** (~20px); star + rating + reviews right-aligned, **star terracotta**.
- Footer actions: Primary **Book Now** (navy) OR **View details** (navy); accent **+** to calculator; share icon.

Golden rule applies: no big terracotta/sage fills — accents only.

## 6b. EventCard (Family Events — Blueprint p9, p17)
Same shell as ProviderCard, plus: date+time meta; top-left category badge (Free / Weekend / Toddler-friendly); **primary CTA "Tickets" = accent terracotta**; secondary "View details"; share. "Tickets" → in-app Event Checkout (no real payment in MVP). "View details" → Event profile side panel.

## 6c. AI provider card (AI MVP doc + Blueprint p12)
ProviderCard/EventCard + **Fit Score chip** + **"Why this fits"** (2–4 bullet reasons tied to parsed inputs) + four actions: Save · View Details · Contact · Visit Website. Real catalog items only; missing data → "confirm directly with the provider."

---

## 7. Provider Profile panel (Blueprint p14)

Right-side sheet on desktop (520–640px); **full-screen sheet on mobile**. Closes via overlay tap, ESC, close button. Keep it **bright** (white bg — never dark).
Regions: Hero (cover, close top-right, heart, share) → Header (name H2 navy, category eyebrow, neighborhood+borough) → Tags (ages, day/time, activities, languages) → Price (large terracotta numeral + rating/reviews) → About (2–4 paras + "Why families pick this" bullets) → Schedule (days×times grid) → Location (static map preview + address + travel hints) → Actions (Book Now primary navy, Add to Calculator accent, Share) → Related (3 similar nearby) → **Scout AI Summary** section (summary + quick-question buttons + "Ask about this provider…", grounded only in profile data).

---

## 8. Calculator (Design System p11 + Blueprint p13)

White panel. Price lines = navy; subtotals = slate; **Grand Total = terracotta**, total box uses light-terracotta tint `#f5ddd5`. Row: thumb, name, neighborhood, $/class, qty stepper (default 4/month), subtotal, remove. Totals: monthly subtotal + estimated annual (×12) + Clear all. "Add to Calculator" = accent terracotta; "Clear" = secondary outline/slate. **Disclaimer "Demo prices for planning purposes only" stated at the total** (not only the footer).

---

## 9. Navigation (Design System p7 + Blueprint p4)

- **Desktop ≥1280:** persistent 288px **navy** sidebar, two groups (Discover / My Tools). Active = **terracotta pill**, white text; inactive text `rgba(250,247,241,0.72)`.
- **Tablet 768–1023:** collapses to 72px **icon rail**, expands on hover/tap.
- **Mobile <768:** **white bottom tab bar**, active icon terracotta, inactive slate (Design System rule: no dark navy bottom navs). Sticky top bar: logo + wordmark, Saved (count), Notifications, Account.
- Top bar (desktop) also shows a Calculator pill.

IA (Blueprint p4): Discover = Home · Classes · Camps · Birthday Parties · Drop-In Activities · Family Events · Meet-Up Groups · Scout AI Assistant. My Tools = Saved · Calculator · My Account.

---

## 10. Responsive system (Blueprint p15)

| Breakpoint | Behavior |
|---|---|
| ≥1280 desktop | Sidebar 288px fixed; main max-w 1400px; 3-col grids; optional 360px map panel |
| 1024–1279 | Sidebar persistent; 3-col; map panel hidden by default |
| 768–1023 tablet | Sidebar → 72px icon rail; 2-col; profile = right sheet |
| <768 mobile | Bottom tab bar; 1-col; sticky top bar; profile = full-screen sheet |

---

## 11. Scout AI response rules (Blueprint p12 + AI MVP doc)

Surface: full-width card on ivory; title + subtitle; 4 suggested prompts (2×2); transcript; input row (Enter sends, Shift+Enter newline). Parse age, borough, neighborhood, budget, schedule, activity intent. Reply = short intro + 1–3 ProviderCard/EventCard inline; each with "Why this fits" (2–4 reasons). Fallback: suggest nearby neighborhoods / relaxed filters; **never invent providers**. Always offer next-step chips: "Show more", "Compare in calculator", "Switch borough". Homepage AI search routes into this page with the query preloaded.

---

## 12. Map behavior (Blueprint p12)

List-first. Desktop ≥1280: optional 360px right panel with pins for current results; hover card → highlight pin; click pin → scroll card into view. Pins: navy teardrop + white dot; **Featured = terracotta pin**. Mobile: "Map view" toggle in the filter row swaps list ↔ full-screen map. Never autoplay geolocation — ask only after "Near me".

---

## 13. Accessibility & performance (Blueprint p18-19)

WCAG AA: body ≥4.5:1 on ivory; verify chips/badges on navy/terracotta/sage. All controls have aria-labels + visible focus ring (2px outline + 2px offset — recolor from teal to **terracotta/navy**). Tap targets ≥44px; chip rows scroll-snap. Images width/height + lazy; hero preloaded; routes prefetch on hover. Respect prefers-reduced-motion (disable hover lift/scale). Logo always in a contrasting badge.

---

## 14. Reconciliation status
- `nyc-kid-scout` (partner Lovable UI) — **INGESTED 2026-06-20**. Tokens validated; AI contract, ProviderCard, and full view set captured. Stack divergence (shadcn/Supabase vs GDS/Mantine) + font substitution (Abril Fatface/Montserrat) recorded in `ClassScout-Lovable-Reconciliation.md`. Brand colors ship under legacy token names `--teal`(=terracotta)/`--orange`(=sage); base radius 8px.
- `provider card.xlsx` / `class_scout_provider_data_structure.xlsx` — still cloud-only; appear to mirror the already-ingested data-model diagram.

# ClassScout — Implementation Prompt Pack (existing app → target)

Status: **v1.0 — 2026-06-20**
For: the coding agent working in the production `classscout` repo (Next.js + Mantine + GDS).
How to use: each section below is a **ready-to-paste prompt**. Run them in order; each lists the files to touch, exact requirements, and acceptance criteria. They reference the specs in this folder.

## Source authority (state this to the agent every time)
- **Design (color, type, spacing, component styling):** `ClassScout-Design-Tokens-and-Components.md` (from the brand Design System PDF). This is the ONLY design authority.
- **Functions / layout / content:** the partner Lovable app (`nyc-kid-scout`) — behavior, IA, copy, and the Scout AI contract — see `ClassScout-Lovable-Reconciliation.md`. **Do not copy its colors or fonts.**
- **Logo:** the official pack received from the client, already staged at `public/images/brand/` (see §2).

---

## 0. Existing implementation vs target — the gap

| Area | Live `classscout` today | Target | Action |
|---|---|---|---|
| Palette | GDS `createPublicBrandTheme` → teal / orange / grape | terracotta `#ca8570` / sage `#90a287` / navy `#0b223e` / ivory `#faf7f1` / slate `#434c59` | Re-theme (§1) |
| Fonts | Inter + Poppins (`layout.tsx`) | Bogart (display) + Garet (UI) | Re-font (§1) |
| Logo | `Logo.tsx` → `class_scout_notext.png`, "teal.6" wordmark | New official pack | Swap (§2) |
| Mobile nav | sidebar collapses at `lg` (no persistent mobile nav) | white **bottom tab bar**, terracotta active | Add (§3) |
| Buttons | teal primary | **navy primary**, terracotta accent (sparingly), white secondary | Re-map (§1) |
| Provider card | `PublicProductCard`; returns `null` on image fail; price navy, star orange | + **Fit Score**, **"Why this fits"**, Contact/Website actions; **branded fallback** (no null); price+star terracotta | Extend (§4) |
| Scout AI | **none** | homepage AI search + Assistant page + AI cards + provider Q&A | Build (§5) |
| Family Events | none (only `family-friendly-services`) | category + **EventCard** + ticketing | Build (§6) |
| Sidebar items | Home, Classes, Camps, Birthday, Drop-In, This Week, Meet-Up, Saved, Calculator, My Account | + **Family Events**, + **Scout AI Assistant** | Add (§3) |
| Filters | inline `Collapse` + `Paper` | mobile **bottom sheet** + active-filter chips | Rework (§7) |
| Home/Calculator loading | `return null` (blank on slow/error) | skeleton + error states | Fix (§7) |
| Trust/admin | "Staff admin" in public footer; demo price only in footer | remove admin from public chrome; "est." at point of price | Fix (§7) |

What already matches and should be **kept**: GDS shell/sidebar, `DataToolbar`, `PageHeader`/`SectionPanel`/editorial components, `StateBlock`, accessible icon `aria-label`s, the category/discover/meetup/saved/calculator views.

---

## 1. PROMPT — Re-theme to the brand (colors + fonts + buttons)

> Re-theme the ClassScout app to the brand Design System. Authority: `docs/redesign/ClassScout-Design-Tokens-and-Components.md` §1–§4. Do NOT use teal/orange/grape or Poppins/Inter anymore.
>
> 1. **Colors.** In `src/theme/mantineTheme.ts`, replace the GDS `createPublicBrandTheme` accent set with the brand palette. Define Mantine colors so that **primary = terracotta `#ca8570`**, plus `navy #0b223e`, `sage #90a287`, ivory `#faf7f1` (page bg), slate `#434c59`. Add CSS variables `--cs-navy/-terracotta/-sage/-ivory/-slate/-tag-neutral(#f1ece4)/-terracotta-tint(#f5ddd5)/-border-card(#eee7dd)` in `globals.css`. Page background = ivory; cards = white; never navy as a full-page background.
> 2. **Buttons (semantic).** Primary button = **navy** fill / white text (e.g. View details, Book now, Save provider). Accent button = **terracotta**, used sparingly (Add to Calculator, Tickets). Secondary = white + hairline border, navy text (Share, Clear, Back). Disabled = muted grey — never navy or terracotta.
> 3. **Fonts (interim lookalikes until Bogart/Garet are licensed).** In `src/app/layout.tsx` remove the Inter/Poppins `next/font` wiring and instead load **Fraunces** (display, stand-in for Bogart) and **Outfit** (UI, stand-in for Garet) via `next/font/google` (both free/OFL). Use CSS variables `--font-display` / `--font-body` with stacks `"Bogart","Fraunces",Georgia,serif` and `"Garet","Outfit",system-ui,sans-serif` so the licensed faces take over automatically once their files are dropped into `public/fonts/` and added as the first `@font-face`. Set Mantine `theme.fontFamily` = the body var, `theme.headings.fontFamily` = the display var; use the display face for hero/marketing headings only — in-app section titles and provider names use the **UI face, semibold** (see tokens doc §2).
> 4. Verify: home renders on ivory, primary CTAs are navy, accents terracotta, no teal anywhere (`grep -ri "teal\|#0d9488\|poppins" src` returns nothing meaningful).
>
> Acceptance: theme builds; `npm run gds:check` passes or, if GDS blocks a custom brand ramp, document the exact failure in `docs/redesign/ClassScout-GDS-Implementability.md` and proceed with an app-level theme override.

---

## 2. PROMPT — Swap in the official logo

> Replace the logo with the official pack already staged in `public/images/brand/`:
> `logo-pin.png` (primary mark), `logo-pin-filled.png`, `mark-face-sage.png`, `mark-face-navy.png`, `wordmark.png`, `appicon-navy.png`, `appicon-sage.png`, `appicon-terracotta.png`, and source `ClassScout-logo-source.ai`.
>
> 1. In `src/components/scout/Logo.tsx`: use `logo-pin.png` as the mark (header, ~36px). Replace the text wordmark's `c="teal.6"` with terracotta (or render `wordmark.png`). Keep the `withWordmark` and `size` props. The mark must sit in a contrasting badge — never the same color as its surface.
> 2. Favicons / metadata in `src/app/layout.tsx`: point `icon`/`apple` to `appicon-navy.png` (and generate a 32px favicon from it). Update OpenGraph image to a logo lockup.
> 3. Retire the old `public/images/class_scout_*.png` references.
>
> Acceptance: header shows the new pin mark; favicon/app icons are the new brand; no references to old logo files remain.

---

## 3. PROMPT — Mobile bottom tab bar + new nav items

> Add a persistent mobile bottom navigation and two new sidebar destinations. Spec: tokens doc §9.
>
> 1. **Sidebar** (`src/components/scout/Sidebar.tsx`): add `Family Events` (Discover group) and `Scout AI Assistant` (Discover group) to `ITEMS`, with appropriate icons and routes. Active state stays terracotta pill / white text on the navy sidebar.
> 2. **BottomTabBar** (new `src/components/scout/BottomTabBar.tsx`, app-level since GDS lacks it): visible `< lg` only. White background, hairline top border, safe-area aware, 5 tabs: **Home · Discover · Scout AI · Saved · Account**. Active icon+label = terracotta, inactive = slate. "Scout AI" is the visually emphasized center item. "Discover" opens a category switcher sheet (Classes/Camps/Birthday/Drop-In/Family Events/Meet-Up). Rule: no dark-navy bottom nav.
> 3. Render it in `ClassScoutShell.tsx` and add bottom padding so content isn't hidden behind it. The GDS sidebar stays for `≥ lg`.
>
> Acceptance: on a 390px viewport the bottom bar is fixed and functional; on desktop the sidebar shows and the bar is hidden; Family Events + Scout AI appear in the sidebar.

---

## 4. PROMPT — Provider card: Fit Score, "Why this fits", actions, fallback

> Extend `src/components/scout/ProviderCard.tsx` to the locked anatomy (tokens doc §6, §6c). Keep `PublicProductCard` for the rich variant.
>
> 1. **No silent disappearance.** Stop `return null` on image failure — render a **branded fallback** (category illustration on ivory) and keep the card. The visible card count must equal the result count.
> 2. **Accents.** Price (`$/class`) and the rating star render in **terracotta**; provider name in navy (Garet semibold); location in slate.
> 3. **Badges by meaning:** Featured/Staff Pick = terracotta; Recommended/Parent Pick = sage; neutral tags (Ages, Weekend) = `#f1ece4`; urgency (Few spots left) = light terracotta tint.
> 4. **AI variant** (`variant="ai"`): add a **Fit Score** chip + a **"Why this fits"** line (2–4 reasons) + four actions: **Save · View Details · Contact · Visit Website**.
> 5. Add a small **FitScoreChip** component (sage→terracotta scale) driven by the data model's match scores.
>
> Acceptance: cards never vanish on image error; price/star are terracotta; an AI-variant card shows Fit Score + "Why this fits" + the 4 actions.

---

## 5. PROMPT — Scout AI (the centerpiece)

> Build the four Scout AI surfaces. Behavior/contract: `ClassScout-Lovable-Reconciliation.md` §5 + tokens doc §6/§11. Use the app's own AI lane for the backend (do NOT depend on Supabase/Lovable). Keep design per the tokens doc.
>
> 1. **Homepage AI search** (`HomeView`): a "Scout AI" card with a **BETA** tag, placeholder "What are you looking for today?", and quick-prompt chips (Weekend activities, Classes near me, Birthday party ideas, Summer camps, Drop-in activities). On submit, route to `/scout-ai` with the query preloaded and the answer generating.
> 2. **Assistant page** (`/scout-ai`, new view): title + intro, 4 suggested prompts (2×2), a chat transcript (user bubble navy/right, AI bubble white/left), bottom input (Enter sends, Shift+Enter newline).
> 3. **AI response contract:** the model receives a JSON list of REAL providers and may recommend ONLY by exact `id` (never invent). It writes a 1–2 sentence intro, then on its own line emits `[[PROVIDERS: id1, id2, id3]]` (1–5 ids); the **UI parses that marker and renders ProviderCard `variant="ai"` cards** (Fit Score + "Why this fits"), not a text list. Fallback when nothing fits: suggest nearby neighborhoods / relaxed filters, still grounded in real ids. Offer next-step chips: "Show more", "Compare in calculator", "Switch borough". Tone: warm, concise; ask one clarifying question only when needed; always note schedule/price/availability should be confirmed with the provider. Handle rate-limit/credit errors gracefully.
> 4. **Provider profile Scout AI Summary** (`ProviderProfile`): a "Scout AI Summary" section grounded ONLY in that provider's profile data, with quick-question buttons (beginners? / suitable for my child's age? / what makes this different? / find similar nearby) and an "Ask about this provider…" input. Never invents; missing data → confirm-with-provider.
>
> Acceptance: homepage search routes into a working assistant; AI answers render real provider cards from the `[[PROVIDERS]]` marker; profile shows a grounded AI summary + ask box; BETA tag present.

---

## 6. PROMPT — Family Events + ticketing

> Add Family Events as a first-class category with an EventCard and an in-app ticketing flow (no real payment in MVP). Spec: tokens doc §6b + Blueprint §5; reference behavior from the Lovable `EventCheckoutView`/`FamilyEventsView`.
>
> 1. New route/view `family-events` reusing the Discover shell. Filter row: borough → neighborhood → price (All/Free/Paid) → age → event type.
> 2. **EventCard**: same shell as ProviderCard + date/time meta + top-left category badge (Free / Weekend / Toddler-friendly) + primary **"Tickets"** (accent terracotta) + secondary "View details" + share.
> 3. "Tickets" → **EventCheckout** view (in-app, no real payment). "View details" → Event profile side panel (full description, schedule, location, share, Tickets CTA).
>
> Acceptance: Family Events lists events with badges + dual CTAs; Tickets reaches the in-app checkout; design uses the brand tokens.

---

## 7. PROMPT — Filters sheet, states, trust/content fixes

> Finish the UX hardening. Specs: tokens doc §5/§8 + SSOT §8–§9.
>
> 1. **Filters** (`Filters.tsx` + `DiscoverView`): on mobile, present filters in a **bottom sheet** (drag handle, scrollable, pinned "Apply (N)" + "Clear"). Show active filters as a horizontally scrollable removable-chip row under the results header. Borough selected = navy, neighborhood selected = sage, filter chips selected = terracotta.
> 2. **States:** remove `return null` on load/error in `HomeView`, `CalculatorView`, `MyAccountView` — render skeletons while loading and a `StateBlock` error with retry on failure (home included). Ensure empty states say what happened + why + the next action (no "Open admin").
> 3. **Trust/content:** remove the "Staff admin" link from the public footer and the "Open admin" CTA from public empty states. Show **"est."** at every price (point of display), not only the footer. Show ratings only when backed by real data. Keep the newsletter honest (real endpoint or "coming soon") and give the email field a visible label.
>
> Acceptance: filters open as a sheet on mobile; home never renders blank; no admin links in public chrome; prices show "est." inline; email field labelled.

---

## 8. PROMPT — Verification

> After the above, verify the whole redesign:
> - `npm run lint`, `npm test`, `npm run build` pass.
> - `grep -ri "teal\|poppins\|class_scout_notext" src public` returns nothing meaningful.
> - Manually (or via Playwright) screenshot Home, a Discover category, Scout AI, a Provider profile, Family Events, Calculator at 390px and 1440px; confirm: navy primary CTAs, terracotta accents/price, white bottom tab bar on mobile, no blank states, Fit Score + "Why this fits" on AI cards, new logo in header + favicon.
> - Re-read `ClassScout-Design-Tokens-and-Components.md` and spot-check each rule.

---

## Sequencing & dependencies
1 (theme) → 2 (logo) → 3 (nav) → 4 (card) → 5 (Scout AI, depends on 4's AI variant) → 6 (Family Events, depends on 4/EventCard) → 7 (states/filters) → 8 (verify). 1–4 and 7 can largely proceed in parallel with 5–6.

GDS note: items needing GDS primitives that may not exist yet (BottomSheet for §7, BottomTabBar for §3, custom brand theme for §1) are tracked in `ClassScout-GDS-Implementability.md` §8 — build app-level now, swap to GDS when shipped.

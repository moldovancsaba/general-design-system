# ClassScout — Partner Lovable UI Reconciliation

Status: **v1.0 — 2026-06-20**
Source: `github.com/moldovancsaba/nyc-kid-scout` (partner's Lovable build — the same product, partner's repo name) + client asset pack `Downloads/fwdclassscout` (logo `.ai`, `ClassScout.pdf` 9pp, 9 brand PNGs).
Companion to `ClassScout-Design-Tokens-and-Components.md` and `ClassScout-GDS-Implementability.md`.

## Authority — how we use this repo (read first)
**The Lovable repo is NOT a design source.** We take from it only: **UI behavior / functions**, **layout & IA structure**, and **content / copy**. **Design — color, typography, spacing, component styling — comes solely from the Design System PDF (brand SSOT).** Where the Lovable build's styling differs from the Design System PDF (e.g. fonts), the Design System PDF wins and the Lovable styling is ignored.

| We DO take from Lovable | We do NOT take from Lovable |
|---|---|
| Functions/features (EventCheckout, Scout AI marker contract, save/calculator stores, filters) | Colors / tokens (use Design System PDF) |
| Layout & IA, view composition, responsive structure | Typography (use Bogart/Garet) |
| Content & copy (AI system prompt, microcopy, labels) | Visual component styling decisions |

## TL;DR
The partner's implementation gives us the **exact AI behavior contract**, the **function/feature set**, and **layout + content** inputs. It runs on a **different tech stack** than production. Its colors happen to match our locked tokens (corroboration, not authority); its fonts do **not** match and are disregarded for design.

---

## 1. Tokens — CORROBORATION (design authority = Design System PDF) ✅
Not a design source — but useful confirmation: `src/index.css` independently reproduces the brand palette in HSL, matching the Design System PDF. Use the Design System PDF / `ClassScout-Design-Tokens-and-Components.md` as the authority; this just shows the brand colors are real and buildable.

| Token | index.css value | = Locked token |
|---|---|---|
| `--background` / `cream` | `40 41% 96%` → #FAF7F1 | ivory ✅ |
| `--foreground` / `--primary` / `navy` | `213 70% 14%` → #0B223E | navy ✅ |
| `--accent` (terracotta) | `14 46% 62%` → #CA8570 | terracotta ✅ |
| sage | `100 13% 58%` → #90A287 | sage ✅ |
| `--muted-foreground` (slate) | `215 14% 31%` → #434C59 | slate ✅ |
| `--secondary` (neutral tag) | `37 32% 92%` | tag-neutral ✅ |
| sidebar bg / active | navy `213 70% 14%` / terracotta `14 46% 62%` | matches ✅ |
| `--radius` | `0.5rem` (8px); lg=8, md=4, sm=0, xl=12, 2xl=16 | adopt 8px base |
| shadows | `--shadow-card`, `--shadow-elevated` | adopt |

**Conclusion:** the earlier "palette conflict" is resolved for good — the UX Blueprint's teal/`#C2552B` values were just *legacy token names* + stale hexes; the real build already ships the brand colors. Our locked tokens stand.

## 2. Token naming quirk (tech debt) ⚠️
Brand colors ship under **legacy shadcn names**: `--teal` **is** terracotta, `--orange` **is** sage. `terracotta`/`sage` Tailwind aliases point back to `--teal`/`--orange`. So in code, `bg-teal` renders terracotta. Recommendation: rename to semantic tokens (`--accent`/`--brand-secondary`) to stop the next dev misreading "teal" as teal. Until then, document it loudly.

## 3. Fonts — SETTLED by Design System PDF (not a Lovable input) ✅
Typography is **Bogart Bold (display) + Garet (UI)** per the Design System PDF — final. The Lovable build's **Abril Fatface / Montserrat** are the dev's placeholder substitutes and carry **no design weight**; they are disregarded. Engineering action: replace Abril Fatface→Bogart and Montserrat→Garet when these screens are ported to production. (UI-kit/Figma use Inter as a neutral stand-in pending the licensed fonts.)

## 4. Tech-stack DIVERGENCE — the big one ❗
| | Production `classscout` | Partner `nyc-kid-scout` (Lovable) |
|---|---|---|
| Framework | Next.js App Router | Vite + React Router (SPA, single `/` route, in-app view switching) |
| UI system | Mantine 7 + **GDS 2.6.4** | **shadcn/ui** + Radix + Tailwind |
| Data/AI | MongoDB + ClassScout Lite local AI | **Supabase** + Lovable AI gateway edge function |
| Components | GDS primitives | `src/components/ui/*` (shadcn): `sheet`, `drawer` (vaul), `sidebar`, `tabs`, `card`, etc. |

**Implication for the GDS question:** the partner UI is **not** GDS-based. Treat the Lovable repo as the **visual + UX + AI reference**, and port its patterns onto GDS/Mantine for production. This *confirms* the GDS gap asks — the Lovable app already relies on `sheet`/`drawer`/`sidebar` primitives, which is exactly what GDS must provide (P0: BottomSheet, responsive nav). See `ClassScout-GDS-Implementability.md` §8.

## 5. AI contract — CAPTURED ✅ (canonical)
`supabase/functions/scout-assistant/index.ts`:
- Streams from an AI gateway (`google/gemini-3-flash-preview`, SSE streaming).
- System prompt: warm, concise, parent-friendly; ask **one** clarifying question only when needed (age, borough, budget); always note schedule/price/availability should be verified with the provider.
- **Grounding rule:** given a JSON list of REAL providers, recommend ONLY by exact `id`; never invent.
- **Render contract:** AI writes a 1–2 sentence intro, then on its own line emits a marker `[[PROVIDERS: id1, id2, id3]]` (1–5 ids); the UI renders ProviderCards from the marker (no text list). Optional one follow-up after.
- Handles 429 (rate limit) and 402 (credits) gracefully.

This is the spec to build the Scout AI surfaces against — it matches the AI MVP doc and Blueprint §7, now with exact mechanics. `EventCheckoutView` confirms the Family-Events ticketing flow (no real payment in MVP).

## 6. ProviderCard — exact spec ✅
`rounded-lg border border-border bg-card shadow-card`, hover `-translate-y-0.5` + `shadow-elevated`. Image `h-44` (176px), lazy, `group-hover:scale-105` (500ms). Top-left badge = terracotta pill, 11px uppercase. Bottom-left = announcement pill (`bg-teal-soft`) + Megaphone icon. Top-right = 36px heart, fills terracotta when saved. Title = `font-display` serif (see §3). Matches our locked card anatomy; the only open question is the title font.

## 7. Components present (confirms IA + screen set)
Views: Home, Discover, FamilyEvents, **EventCheckout**, MeetupGroups, **ScoutAssistant**, Calculator, Saved, MyAccount. Panels: Provider/Event/MeetupGroup profiles + share dialogs, ProviderMap. Chrome: Sidebar, BoroughBar, Filters, NeighborhoodChips, TrustStrip, EmptyState. EventCard + ProviderCard + MeetupGroupCard. All consistent with the SSOT and the six Figma screens already built.

## 8. Housekeeping
- `.env` is committed and not gitignored, but contains only **Supabase publishable/anon** values (`VITE_*`, public by design). Low risk; still recommend adding `.env` to `.gitignore` and confirming Supabase **RLS** is enabled.
- Client `Downloads/fwdclassscout`: logo source (`.ai`) + brand PNG variants (scout-in-map-pin mark, sage app icon) + `ClassScout.pdf` (9pp). Logo/colors confirm the brand mark used in the kit.

## 9. Net changes to apply
1. Keep locked tokens (design authority = Design System PDF; Lovable corroborates). Adopt 8px radius base + the two shadow tokens.
2. Fonts settled = Bogart/Garet; engineering swaps out the Lovable placeholders (Abril Fatface→Bogart, Montserrat→Garet) on port. No design decision pending.
3. Take from Lovable: **functions** (§5 AI contract, EventCheckout, stores, filters), **layout/IA**, and **content/copy** — not styling. Add the legacy token-naming note (`--teal`=terracotta, `--orange`=sage) to engineering handoff only.
4. Record stack divergence: Lovable = UI/function/content reference on shadcn/Supabase; production = GDS/Mantine; port behavior + layout + copy, restyle to the Design System.
5. Build Scout AI to the §5 contract (provider-id marker render).

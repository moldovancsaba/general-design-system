# Let's Go Baby Compatibility Audit

Audit date: 2026-06-13  
Source: https://letsgobaby.co

This is a compatibility brief for building a similar partner system. It is not a clone spec. Do not reuse the Let's Go Baby name, logo, restaurant data, proprietary copy, SVG assets, CMS data, Webflow implementation, map scripts, or trademarked visual identity. The partner implementation should use equivalent patterns, owned content, and owned or licensed assets.

## Product Model

Let's Go Baby is a baby-friendly restaurant discovery product for NYC. The core screen is a map/list search experience with amenity filters, location cards, and detail pages. Supporting pages include a list/editorial index, add-to-map/submission entry, about/FAQ/contact content, newsletter capture, legal links, and Instagram.

Primary user job: find a child-friendly place quickly by amenity, cuisine, neighborhood, and price.

## Visual Language

The site is quiet, utilitarian, and directory-like rather than editorial. It uses a white tiled background, compact controls, low decoration, and strong green brand cues.

Core tokens observed from the live CSS:

| Token | Value | Role |
| --- | --- | --- |
| `core.light` | `#fff` | Page surface, cards, popups |
| `core.dark` | `#010800` | Primary readable text |
| `core.darkTint` | `#333` | Secondary text and neutral emphasis |
| `core.gray` | `#ddd` | Borders, dividers, inactive outlines |
| `secondary.teal` | `#08463b` | Brand text, active filter, result titles |
| `secondary.kale` | `#204a2c` | Dark hover and secondary green |
| `core.cocoa` | `#645550` | Muted navigation/body accent |
| `core.grains` | `#eedad0` | Warm error/accent surface |
| `primary.lime` | `#2fc800` | Primary CTA, hover accent, selected emphasis |
| `primary.limeHover` | `#32d101` | CTA hover |

Typography:

- Primary UI font: Inter, weights 300/400/500/600/700.
- Heading/display font: Jost, weights 300/400/500/600/700.
- Body copy is compact: most UI text is 12-15px, with page headings around 26-32px on small layouts and about 36px equivalent on larger pages.
- Result titles use Inter 14px/500 in teal. Result metadata uses 12px/14px in dark text.
- Links are understated, often teal, with lime underline accents on hover.

Shape, spacing, and elevation:

- Search/filter controls: 24px pill radius, 38-42px tall, 1px gray border.
- Amenity chips: 8px radius, compact square/rectangular touch targets.
- Generic chips/tags: 20px pill radius, 11-12px text, 4-8px padding.
- Result cards: 8px radius, 1px gray border, white surface.
- Map viewport: 16px radius.
- Newsletter modal: 8-12px card radius, teal translucent page overlay, subtle no-shadow/low-shadow treatment.
- Modal/filter dialog: 16px radius desktop; mobile CSS falls to 4px and near-full-height, but the partner system should keep radius consistent unless viewport constraints require otherwise.
- Shadows are rare and subtle: map popups use a small `0 2px 4px` shadow; pins use drop shadow.

## Core Components

### Header

- Left-aligned logo, right-aligned nav links.
- Nav links: Add to Map, Lists, About.
- Header max width is about 940px on desktop.
- Mobile currently overflows horizontally in the captured page; partner implementation should preserve the simple header but use a responsive menu or wrapping layout.

### Search And Filter Shell

- Page title: "Find baby-friendly spots" style, teal, medium weight, compact.
- Search input: full-width pill, placeholder searches amenity/cuisine/neighborhood, 13px Inter, gray border, dark focus border.
- Filter trigger: pill button with text and small filter icon.
- Reset: text-only teal action, underline on hover.
- Desktop layout: search takes most width; Filters and Reset sit on the right.
- Mobile layout: search, Filters, Reset stack vertically.

### Filter Dialog

- Full-screen dark/teal translucent overlay with blur.
- Dialog surface is white with gray border and compact vertical rhythm.
- Close action is text-only.
- Sections: Amenities and Price.
- Amenity grid: 4 columns desktop, 3 columns tablet, 2 columns small mobile.
- Amenity chip content: icon above or beside short label.
- Active chip state: teal background and white text; homepage inline CSS also uses `.ncf-filter-chip.active`.
- Price chips: `$`, `$$`, `$$$`, `$$$$`.
- Primary submit: lime CTA with dark text.

### Map

- Rounded map viewport with loader state.
- Desktop: map and result list sit in a two-column grid, approximately 2.5fr / 1fr.
- Mobile: map becomes a large rounded block above the result list.
- Custom zoom controls: 32px square buttons, 8px radius, white surface, dark border, plus/minus icons.
- Pins: 20px square SVG-style marker, drop shadow, scale on hover/active. Hover increases saturation; active appears gray/filtered.

### Result Card

- White card, 1px gray border, 8px radius.
- Compact content: title, cuisine, neighborhood, amenity icons, "See details ->".
- Hover: lime-tinted background and lime border.
- Active state: teal border.
- The pattern prioritizes scan speed over large imagery.

### Map Popup / Tooltip

- White popup, 1px gray border, 8px radius, small shadow.
- Compact vertical layout with title and metadata.
- Should be keyboard and pointer accessible in partner build.

### Location Detail Page

- Back link with arrow.
- Large centered Jost heading for place name.
- Address and phone as plain compact text.
- Action links: Photos, Website, View menu, Share.
- Classification tags: neighborhood and cuisine.
- Parent Tip section: teal bar label with uppercase/letter-spaced text and italic tip copy.
- Amenity badges/cards: small bordered items with icons and labels.
- Share uses a copy button and "Link Copied" feedback.

### Lists Page

- Simple page heading: "The Let's Go Baby List".
- Editorial/list links appear as compact text rows with right arrow.
- No heavy card styling; this should remain a lightweight content index.

### About / FAQ / Newsletter

- About page uses Jost section headings and compact Inter paragraphs.
- FAQ uses repeated question headings and short answers.
- Contact email is an inline link.
- Newsletter form uses an input plus lime primary button, 36px pill radius, success and error states.

### Newsletter Modal

- First-visit modal is visually dominant.
- Backdrop: teal/dark translucent overlay.
- Surface: white card with oversized pale-green GO mark in the background.
- Content: logo, large centered headline, short centered support copy, lime CTA.
- Mobile modal width is narrow with large heading and full-width CTA.
- Partner build should include a dismiss/close affordance and persist dismissal state; the captured modal did not expose an obvious close in the first viewport.

### Footer

- Compact footer row with copyright, Privacy Policy, Terms of Use, and Instagram icon.
- Desktop sits near the content width. Mobile footer can wrap, but legal links should remain readable and not clip.

## Interaction Requirements

- Search must match amenity, cuisine, neighborhood, and location/title content.
- Amenity and price filters must be combinable.
- Reset must clear all filters and search text.
- Filter dialog must close via close action, escape key, backdrop where appropriate, and primary apply action.
- Map pins and list cards must share hover/active state.
- Result cards must deep-link to detail pages.
- Share action must copy the canonical detail URL and show a short success state.
- Newsletter/signup forms need explicit success and error states.

## Responsive Requirements

Observed breakpoints in CSS:

- `max-width: 991px`
- `max-width: 767px`
- `max-width: 479px`
- `min-width: 768px`
- `min-width: 1440px`
- `min-width: 1920px`

Mobile screenshot behavior:

- Header remains a horizontal logo/nav row and can clip; partner system should fix this with wrapping or a menu.
- Search, filter, and reset stack.
- Map appears as a large rounded rectangle with loader state.
- Result cards become full-width compact rows below the map.
- Detail and newsletter modal remain single-column.

Desktop screenshot behavior:

- First-load newsletter modal overlays the map/list shell.
- Behind the modal, the map/list shell remains visible under a teal translucent overlay.
- Content width remains constrained, centered, and compact.

## Accessibility And Reliability Upgrades

To be compatible but production-grade, the partner system should improve these areas:

- Use semantic `button` elements for filter, reset, close, zoom, apply, and share actions.
- Provide accessible names for icon-only controls and amenity icons.
- Preserve visible focus states with at least 3:1 contrast against surrounding UI.
- Do not allow mobile header/footer clipping.
- Ensure modal has focus trap, escape close, labelled title, and persistent dismiss state.
- Keep active filter state as text-independent color plus selected indicator.
- Maintain WCAG AA contrast. Lime CTAs with dark text are acceptable; lime with white text is not.
- Avoid hidden or clipped control text in translated locales.

## Partner GDS Hooks

Recommended implementation surfaces in GDS:

- `partnerDiscoveryThemePreset`: token preset with teal/lime/white palette, Inter/Jost font lane support, compact radii, low-shadow elevation, and explicit light/dark behavior.
- `PartnerDiscoveryShell`, `PartnerDiscoveryHeader`, `PartnerDiscoveryFooter`: responsive public chrome with legal/social footer wrapping.
- `PartnerDiscoveryFilters`, `AmenityChipGrid`: search, filter trigger, reset, filter modal, localized amenity chips, active states, and price chips.
- `PartnerMapListShell`, `PartnerPlaceResultCard`, `PartnerMapPin`, `PartnerMapControls`: map/list discovery shell, adapter fallback, result cards, pins, controls, loading, empty, error, and retry states.
- `PartnerPlaceDetailTemplate`, `PartnerParentTipPanel`, `PartnerAmenityBadgeGrid`: detail page template, action links, parent tip, amenity badges, and share recovery states.
- `PartnerNewsletterCapture`, `PartnerNewsletterForm`: dismissible newsletter modal/inline form with loading, success, error, retry, and partner-owned visual slot.
- `PartnerListIndex`, `PartnerFaqList`, `PartnerContactBlock`, `PartnerSubmissionEntry`, `PartnerAboutPageSections`: owned-copy content and intake templates for lists, about, FAQ, contact, and add-to-map flows.
- `emitPartnerDiscoveryEvent`, `redactPartnerDiscoveryEventMetadata`: privacy-safe observability callbacks for discovery, map, detail, newsletter, and submission states.

Delivered package entrypoints:

- Theme: `@doneisbetter/gds-theme` exports `partnerDiscoveryThemePreset`; `resolveGdsThemePreset("partner-discovery")` resolves the same preset.
- Font lane: `resolveGdsFontLane("partner-discovery")` returns Inter body typography with Jost headings.
- Core: `@doneisbetter/gds-core` and `@doneisbetter/gds-core/server` export the partner discovery components and typed contracts listed above.

## Non-Copy Boundaries

Do not copy:

- Let's Go Baby logo, GO mark, favicon, social assets, or exact icon SVGs.
- Restaurant names, addresses, photos, phone numbers, amenity data, CMS metadata, or map coordinates.
- Exact marketing copy, list titles, FAQ answers, parent tips, or modal copy.
- Webflow class names as public API.
- Their custom map/preloading scripts, API keys, or generated CMS implementation.

Allowed compatibility targets:

- Similar information architecture.
- Similar component roles and density.
- Similar color semantics using partner-adjusted owned tokens.
- Similar interactions for map/list/filter/detail/share/newsletter.
- Original icons and copy that communicate equivalent concepts.

## Acceptance Checklist

- Partner theme has explicit light-mode tokens for every surface/text/control state.
- All chips, buttons, cards, map containers, dialogs, and modals use consistent radii.
- Mobile header does not clip or horizontally scroll.
- Search/filter/reset remain usable at 320px width.
- Filter dialog supports keyboard, touch, and translated labels.
- Map/list states cover loading, no results, error, active pin, active card, and selected filters.
- Detail page supports missing phone, missing website, missing menu, and missing photos.
- Newsletter modal can be dismissed and does not block core discovery forever.
- No Let's Go Baby trademarked assets, copy, data, or generated scripts ship in the partner system.

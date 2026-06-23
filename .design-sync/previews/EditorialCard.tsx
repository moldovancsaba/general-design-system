import { EditorialCard } from '@doneisbetter/gds';

const media = (from: string, to: string) => (
  <img
    alt=""
    style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
    src={`data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='480' height='270'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${from}'/><stop offset='1' stop-color='${to}'/></linearGradient></defs><rect width='480' height='270' fill='url(#g)'/></svg>`,
    )}`}
  />
);

export const Default = () => (
  <EditorialCard
    media={media('#6741d9', '#9775fa')}
    mediaAlt="Abstract violet gradient"
    eyebrow="Engineering"
    badge="New"
    title="Shipping the access gate runtime"
    description="How the gate keeps teaser content visible while protected markup stays unmounted until entitlement resolves."
    meta="8 min read · June 2026"
    ctaLabel="Read article"
    href="#article"
  />
);

export const Variants = () => (
  <div style={{ display: 'grid', gap: 16 }}>
    <EditorialCard
      variant="media-left"
      tone="cool"
      media={media('#1971c2', '#4dabf7')}
      mediaAlt="Blue gradient"
      eyebrow="Design"
      title="Tonal semantics across surfaces"
      description="One palette contract preserves readability from marketing pages to admin tables."
      meta="5 min read"
      ctaLabel="Explore"
      href="#design"
    />
    <EditorialCard
      variant="featured"
      tone="warm"
      media={media('#e8590c', '#ffa94d')}
      mediaAlt="Warm gradient"
      eyebrow="Community"
      badge="Featured"
      title="What adopters built this quarter"
      description="A round-up of production surfaces composed entirely from governed primitives."
      meta="12 min read"
      ctaLabel="See the showcase"
      href="#showcase"
    />
  </div>
);

export const Compact = () => (
  <EditorialCard
    variant="compact"
    tone="muted"
    density="compact"
    media={media('#495057', '#868e96')}
    mediaAlt="Neutral gradient"
    eyebrow="Changelog"
    title="v3.4.14 — patch release"
    description="Stability fixes for the docs shell and filter drawer focus return."
    meta="2 min read"
    href="#changelog"
  />
);

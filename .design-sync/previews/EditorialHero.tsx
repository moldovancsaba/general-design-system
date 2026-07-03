import { EditorialHero } from '@sovereignsquad/gds';

export const Default = () => (
  <EditorialHero
    eyebrow="Design System"
    title="One source of truth for every product surface"
    description="Governed components, tokens, and patterns that keep teams shipping accessible, on-brand UI without reinventing shells, cards, or state blocks."
    actions={[
      { label: 'Get started', href: '#' },
      { label: 'Browse patterns', href: '#', variant: 'subtle' },
    ]}
    meta={[
      { label: 'Version', value: '3.4.14' },
      { label: 'Components', value: '250+' },
    ]}
  />
);

export const Compact = () => (
  <EditorialHero
    eyebrow="Release"
    title="Access gate runtime is live"
    description="Teaser and paywall boundaries that never render protected content while locked."
    align="start"
    compact
    actions={[{ label: 'Read the changelog', href: '#' }]}
  />
);

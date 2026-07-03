import { ReferenceLinkGrid, ReferenceSection } from '@sovereignsquad/gds';

export const Default = () => (
  <ReferenceSection title="Getting started" description="Canonical entry points for the design system.">
    <ReferenceLinkGrid
      columns={2}
      items={[
        {
          id: 'install',
          title: 'Install Guide',
          description: 'Open the canonical install path and versioned package guidance.',
          href: '/general-design-system/install',
          badge: 'Start here',
        },
        {
          id: 'themes',
          title: 'Theme runtime',
          description: 'Inspect presets, color-scheme behavior, and font lanes.',
          href: '/general-design-system/themes',
          meta: 'Runtime owner',
        },
        {
          id: 'patterns',
          title: 'Pattern catalog',
          description: 'Browse every documented pattern family and its live contract.',
          href: '/general-design-system/patterns',
        },
        {
          id: 'governance',
          title: 'Governance rules',
          description: 'How the site stays a strict consumer of the primitives it documents.',
          href: '/general-design-system/governance',
        },
      ]}
    />
  </ReferenceSection>
);

export const ThreeColumn = () => (
  <ReferenceSection title="Component families">
    <ReferenceLinkGrid
      columns={3}
      items={[
        { id: 'foundations', title: 'Foundations', description: 'Tokens, color, type.', href: '#foundations' },
        { id: 'navigation', title: 'Navigation', description: 'Sidebar and shells.', href: '#navigation' },
        { id: 'data', title: 'Data', description: 'Tables and charts.', href: '#data' },
      ]}
    />
  </ReferenceSection>
);

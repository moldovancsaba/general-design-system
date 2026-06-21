import * as React from 'react';
import { PublicShell, PublicBrandFooter, SectionPanel } from '@doneisbetter/gds';

export const Default = () => (
  <PublicShell
    brand={<strong>General Design System</strong>}
    navItems={[
      { id: 'overview', label: 'Overview', href: '#overview' },
      { id: 'patterns', label: 'Patterns', href: '#patterns' },
      { id: 'docs', label: 'Docs', href: '#docs' },
    ]}
    activeNavId="overview"
    actions={<a href="#signin">Sign in</a>}
    mobileNavigationMode="inline-collapse"
    mobileNavigation={<a href="#patterns">Patterns</a>}
    footer={<PublicBrandFooter brandTitle="GDS" description="Canonical public shell." legal="© 2026 doneisbetter" />}
  >
    <SectionPanel title="Welcome" description="A licensed public surface built from shared GDS primitives.">
      <p>Everything on this page reuses the same contract — no local drift.</p>
    </SectionPanel>
  </PublicShell>
);

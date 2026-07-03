import { DocsPageShell, SectionPanel, SidebarNavItem } from '@sovereignsquad/gds';

export const Default = () => (
  <DocsPageShell
    eyebrow="Reference"
    title="Access Gate"
    lead="The access gate boundary keeps teaser content visible while protected content stays unmounted until unlocked."
    breadcrumbs={[
      { label: 'Docs', href: '#docs' },
      { label: 'Patterns', href: '#patterns' },
      { label: 'Access Gate' },
    ]}
    footerNext={{ label: 'Filter Drawer', href: '#filter-drawer' }}
  >
    <SectionPanel title="Overview" description="When to reach for the access gate.">
      <p>Use the gate for paywalls, login walls, and entitlement boundaries that must never leak protected markup.</p>
    </SectionPanel>
  </DocsPageShell>
);

export const WithSideRail = () => (
  <DocsPageShell
    eyebrow="Live demo family"
    title="Discovery & Cards"
    lead="Public discovery surfaces converge on shared cards, menus, and governed share affordances."
    meta={<span>Updated June 2026 · 7 min read</span>}
    sideRail={
      <>
        <SidebarNavItem action="home" href="#listing" active />
        <SidebarNavItem action="search" href="#media" />
        <SidebarNavItem action="filter" href="#menu" />
      </>
    }
  >
    <SectionPanel title="Unified listing card" description="One configurable contract instead of per-domain cards.">
      <p>Discovery-heavy products should not proliferate event, venue, and community card variants.</p>
    </SectionPanel>
  </DocsPageShell>
);

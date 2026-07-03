import { DocsShell, SidebarNavItem, SemanticButton, SectionPanel } from '@sovereignsquad/gds';

export const Default = () => (
  <DocsShell
    brand={<strong>General Design System</strong>}
    primaryNavigation={
      <>
        <SidebarNavItem action="home" href="#overview" active />
        <SidebarNavItem action="search" href="#components" />
        <SidebarNavItem action="settings" href="#tokens" />
      </>
    }
    secondaryNavigation={<SidebarNavItem action="help" href="#support" />}
    headerContext="Canonical docs and reference shell"
    actions={<SemanticButton action="theme" size="sm" />}
    contentWidth="full"
  >
    <SectionPanel
      title="Getting started"
      description="The docs shell frames reference content with package-owned navigation and header chrome."
    >
      <p>Compose primary navigation, header actions, and content within one governed boundary.</p>
    </SectionPanel>
  </DocsShell>
);

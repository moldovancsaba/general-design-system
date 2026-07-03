import { SidebarNav, SidebarNavSection, SidebarNavItem } from '@sovereignsquad/gds';

export const Default = () => (
  <SidebarNav ariaLabel="Pattern reference sidebar">
    <SidebarNavSection label="Primary">
      <SidebarNavItem action="dashboard" href="/general-design-system/patterns/foundations" active />
      <SidebarNavItem action="settings" href="/general-design-system/patterns" />
    </SidebarNavSection>
  </SidebarNav>
);

export const MultiSection = () => (
  <SidebarNav ariaLabel="Documentation sidebar">
    <SidebarNavSection label="Discover">
      <SidebarNavItem action="dashboard" href="/overview" description="Live demo surfaces" active />
      <SidebarNavItem action="search" href="/browse" description="Browse the catalog" />
    </SidebarNavSection>
    <SidebarNavSection label="Build">
      <SidebarNavItem action="add" href="/components" badge="252" />
      <SidebarNavItem action="analytics" href="/reporting" description="Evidence reports" />
    </SidebarNavSection>
    <SidebarNavSection label="Account" pushToBottom>
      <SidebarNavItem action="settings" href="/settings" />
    </SidebarNavSection>
  </SidebarNav>
);

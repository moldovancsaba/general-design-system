import { SidebarNav, SidebarNavSection, SidebarNavItem } from '@sovereignsquad/gds';

export const Default = () => (
  <SidebarNav ariaLabel="Workspace navigation">
    <SidebarNavSection label="Workspace">
      <SidebarNavItem action="dashboard" label="Dashboard" href="#dashboard" active />
      <SidebarNavItem action="analytics" label="Analytics" href="#analytics" />
      <SidebarNavItem action="settings" label="Settings" href="#settings" />
    </SidebarNavSection>
  </SidebarNav>
);

export const WithDescriptionAndBadge = () => (
  <SidebarNav ariaLabel="Project navigation">
    <SidebarNavSection label="Project">
      <SidebarNavItem
        action="dashboard"
        label="Overview"
        description="Health and live metrics"
        href="#overview"
        active
      />
      <SidebarNavItem
        action="list"
        label="Tasks"
        description="Open and assigned work"
        badge="12"
        href="#tasks"
      />
      <SidebarNavItem
        action="users"
        label="Team"
        description="Members and roles"
        href="#team"
      />
    </SidebarNavSection>
  </SidebarNav>
);

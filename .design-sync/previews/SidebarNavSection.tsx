import { SidebarNav, SidebarNavSection, SidebarNavItem } from '@doneisbetter/gds';

export const Default = () => (
  <SidebarNav ariaLabel="Console navigation">
    <SidebarNavSection label="Primary">
      <SidebarNavItem action="dashboard" label="Dashboard" href="#dashboard" active />
      <SidebarNavItem action="analytics" label="Analytics" href="#analytics" />
      <SidebarNavItem action="list" label="Catalog" href="#catalog" />
    </SidebarNavSection>
  </SidebarNav>
);

export const SectionedWithPinnedAccount = () => (
  <SidebarNav ariaLabel="Account console navigation">
    <SidebarNavSection label="Primary">
      <SidebarNavItem action="dashboard" label="Dashboard" href="#dashboard" active />
      <SidebarNavItem action="analytics" label="Reports" href="#reports" />
    </SidebarNavSection>
    <SidebarNavSection label="Account" pushToBottom>
      <SidebarNavItem action="settings" label="Settings" href="#settings" />
      <SidebarNavItem action="profile" label="Profile" href="#profile" />
    </SidebarNavSection>
  </SidebarNav>
);

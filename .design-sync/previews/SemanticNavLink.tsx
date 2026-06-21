import { SemanticNavLink, SidebarNav } from '@doneisbetter/gds';

export const Default = () => (
  <SidebarNav ariaLabel="Reference navigation">
    <SemanticNavLink action="dashboard" href="/general-design-system/patterns/data" active />
    <SemanticNavLink action="analytics" href="/general-design-system/patterns/reporting" />
    <SemanticNavLink action="settings" href="/general-design-system/patterns" />
  </SidebarNav>
);

export const WithDescriptionAndBadge = () => (
  <SidebarNav ariaLabel="Operations navigation">
    <SemanticNavLink
      action="dashboard"
      href="/operations/overview"
      description="Live operational summary"
      active
    />
    <SemanticNavLink
      action="analytics"
      href="/operations/reporting"
      description="Governed evidence reports"
      badge="New"
    />
  </SidebarNav>
);

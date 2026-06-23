import { AppShell, SemanticNavLink, SemanticButton } from '@doneisbetter/gds';

export const Default = () => (
  <AppShell
    logoText="Admin GDS"
    headerContext="Partner operations"
    primaryNavigation={<SemanticNavLink action="dashboard" href="/dashboard" active />}
    secondaryNavigation={<SemanticNavLink action="settings" href="/settings" />}
    headerActions={<SemanticButton action="add" />}
    showThemeToggle={false}
  >
    <div style={{ padding: 8 }}>
      <h2 style={{ marginTop: 0 }}>Partner directory</h2>
      <p style={{ margin: 0 }}>
        Review, approve, and publish partner listings across every region from a
        single workspace.
      </p>
    </div>
  </AppShell>
);

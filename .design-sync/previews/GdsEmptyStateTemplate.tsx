import { GdsEmptyStateTemplate } from '@sovereignsquad/gds';

export const Default = () => (
  <GdsEmptyStateTemplate
    eyebrow="Projects"
    title="No projects yet"
    description="Create your first project to start organizing work and inviting collaborators."
    actions={[
      { id: 'add', label: 'New project', kind: 'primary' },
      { id: 'import', label: 'Import', kind: 'secondary' },
    ]}
  />
);

export const NotFound = () => (
  <GdsEmptyStateTemplate
    state="not-found"
    eyebrow="Search"
    title="No matching results"
    description="We couldn't find anything for that query. Try a different keyword or clear your filters."
    actions={[{ id: 'reset', label: 'Clear filters', kind: 'secondary' }]}
  />
);

export const PermissionDenied = () => (
  <GdsEmptyStateTemplate
    state="permission-denied"
    eyebrow="Workspace"
    title="You don't have access"
    description="This workspace is restricted. Request access from an administrator to continue."
    actions={[{ id: 'send', label: 'Request access', kind: 'primary' }]}
  />
);

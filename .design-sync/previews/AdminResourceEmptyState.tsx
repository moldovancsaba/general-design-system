import { AdminResourceEmptyState, SemanticButton } from '@sovereignsquad/gds';

export const Default = () => (
  <AdminResourceEmptyState
    title="No partners yet"
    description="Add your first partner listing to start populating the directory."
    action={<SemanticButton action="add" />}
  />
);

export const Filtered = () => (
  <AdminResourceEmptyState
    title="No matching results"
    description="No partners match the current filters. Try clearing them to see all records."
    action={<SemanticButton action="search" />}
  />
);

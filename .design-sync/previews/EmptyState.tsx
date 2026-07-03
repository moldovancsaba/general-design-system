import { EmptyState, SemanticButton } from '@sovereignsquad/gds';

export const Default = () => (
  <EmptyState
    title="No resources yet"
    description="Create your first resource to see it listed here."
    action={<SemanticButton action="add" />}
  />
);

export const NoAction = () => (
  <EmptyState
    title="Nothing to show"
    description="This report has no data for the selected period. Try widening the date range."
  />
);

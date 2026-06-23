import { MapPanel } from '@doneisbetter/gds';

export const Empty = () => (
  <MapPanel
    title="Delivery coverage area"
    description="Configure a map provider to display the interactive coverage map."
    empty="No map source configured for this region yet."
    minHeight={220}
  />
);

export const Loading = () => (
  <MapPanel
    title="Store locations"
    description="Showing branches within 25 miles of downtown."
    loading
    minHeight={220}
  />
);

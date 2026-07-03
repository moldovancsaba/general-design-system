import { AsyncSurface, SemanticButton } from '@sovereignsquad/gds';

export const Success = () => (
  <AsyncSurface
    state="success"
    successContent={
      <div>
        <h3 style={{ marginTop: 0 }}>Partner directory</h3>
        <p style={{ margin: 0 }}>3 published listings, 1 pending review.</p>
      </div>
    }
  />
);

export const Loading = () => (
  <AsyncSurface
    state="loading"
    loadingTitle="Loading partners"
    loadingDescription="Fetching the latest directory records."
    minHeight={180}
  />
);

export const Empty = () => (
  <AsyncSurface
    state="empty"
    emptyTitle="No partners yet"
    emptyDescription="Add your first listing to populate the directory."
    minHeight={180}
  />
);

export const ErrorState = () => (
  <AsyncSurface
    state="error"
    errorTitle="Could not load partners"
    errorDescription="The request timed out. Retry to continue."
    retryAction={<SemanticButton action="refresh" />}
    minHeight={180}
  />
);

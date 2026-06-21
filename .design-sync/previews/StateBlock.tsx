import { StateBlock } from '@doneisbetter/gds';

export const Empty = () => (
  <StateBlock
    variant="empty"
    title="No patterns yet"
    description="Patterns you publish will appear here."
  />
);

export const Loading = () => (
  <StateBlock
    variant="loading"
    title="Loading report"
    description="Fetching the latest metrics…"
  />
);

export const ErrorState = () => (
  <StateBlock
    variant="error"
    title="Couldn’t load data"
    description="Something went wrong while fetching this report."
  />
);

export const Success = () => (
  <StateBlock
    variant="success"
    title="Export complete"
    description="Your file is ready to download."
  />
);

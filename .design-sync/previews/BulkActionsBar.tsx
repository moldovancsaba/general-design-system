import { BulkActionsBar } from '@sovereignsquad/gds';

export const Default = () => (
  <BulkActionsBar
    selectedCount={3}
    actions={
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button">Archive</button>
        <button type="button">Export</button>
        <button type="button">Delete</button>
      </div>
    }
    clearAction={<button type="button">Clear selection</button>}
  />
);

export const SingleSelection = () => (
  <BulkActionsBar
    selectedCount={1}
    actions={
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button">Publish</button>
        <button type="button">Duplicate</button>
      </div>
    }
    clearAction={<button type="button">Clear</button>}
  />
);

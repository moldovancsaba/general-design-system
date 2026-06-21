import { ActiveFilterChips } from '@doneisbetter/gds';

export const Default = () => (
  <ActiveFilterChips
    filters={[
      { id: 'status', label: 'Status: Published', onRemove: () => {} },
      { id: 'team', label: 'Team: Platform UI', onRemove: () => {} },
      { id: 'updated', label: 'Updated this week', onRemove: () => {} },
    ]}
  />
);

export const SingleFilter = () => (
  <ActiveFilterChips
    filters={[{ id: 'role', label: 'Role: Maintainer', onRemove: () => {} }]}
  />
);

export const Empty = () => (
  <ActiveFilterChips filters={[]} emptyLabel="No filters applied" />
);

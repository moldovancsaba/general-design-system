import { DataToolbar, SemanticButton } from '@doneisbetter/gds';

export const Default = () => (
  <DataToolbar
    searchSlot={<input aria-label="Search entries" placeholder="Search components" style={{ padding: '6px 10px', minWidth: 220 }} />}
    filterSlot={<SemanticButton action="filter">Filter</SemanticButton>}
    sortSlot={<SemanticButton action="sort">Sort</SemanticButton>}
    createAction={<SemanticButton action="add">New entry</SemanticButton>}
  />
);

export const WithActiveFilters = () => (
  <DataToolbar
    searchSlot={<input aria-label="Search entries" placeholder="Search components" style={{ padding: '6px 10px', minWidth: 220 }} />}
    filterSlot={<SemanticButton action="filter">Filter</SemanticButton>}
    resetAction={<SemanticButton action="cancel">Reset</SemanticButton>}
    createAction={<SemanticButton action="add">New entry</SemanticButton>}
    activeFilters={[
      { label: 'Family: Layout', value: 'layout' },
      { label: 'Status: Published', value: 'published' },
    ]}
  />
);

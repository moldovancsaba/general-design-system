import { ChoiceChip } from '@sovereignsquad/gds';

export const Default = () => (
  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
    <ChoiceChip label="Draft" active />
    <ChoiceChip label="Published" />
    <ChoiceChip label="Archived" />
  </div>
);

export const FilterRow = () => (
  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
    <ChoiceChip label="All" active />
    <ChoiceChip label="Components" />
    <ChoiceChip label="Patterns" />
    <ChoiceChip label="Tokens" />
    <ChoiceChip label="Deprecated" />
  </div>
);

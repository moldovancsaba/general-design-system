import { FilterDrawer, FormField, ChoiceChip, SemanticButton } from '@doneisbetter/gds';

const Body = () => (
  <div style={{ display: 'grid', gap: 16 }}>
    <FormField label="Category">
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <ChoiceChip label="Listings" active />
        <ChoiceChip label="Events" />
        <ChoiceChip label="Venues" />
      </div>
    </FormField>
    <FormField label="Availability">
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <ChoiceChip label="Available" />
        <ChoiceChip label="Preorder" />
      </div>
    </FormField>
  </div>
);

export const Opened = () => (
  <FilterDrawer
    opened
    title="Filters"
    description="Refine the discovery results by category and availability."
    applyAction={<SemanticButton action="filter" size="sm" />}
    resetAction={<SemanticButton action="reset" variant="default" size="sm" />}
    closeAction={<SemanticButton action="close" variant="subtle" size="sm" />}
  >
    <Body />
  </FilterDrawer>
);

export const BottomSheet = () => (
  <FilterDrawer
    opened
    mode="bottom-sheet"
    title="Filters"
    description="Mobile bottom-sheet presentation."
    primaryAction={<SemanticButton action="confirm" size="sm" />}
    secondaryAction={<SemanticButton action="cancel" variant="default" size="sm" />}
  >
    <Body />
  </FilterDrawer>
);

import { PartnerDiscoveryFilters } from '@doneisbetter/gds';

const amenities = [
  { id: 'high-chairs', label: 'High chairs' },
  { id: 'changing-table', label: 'Changing table' },
  { id: 'stroller', label: 'Stroller friendly' },
  { id: 'outdoor-seating', label: 'Outdoor seating' },
  { id: 'kids-menu', label: 'Kids menu' },
];

const labels = {
  search: 'Search',
  searchPlaceholder: 'Search cafes, parks, museums…',
  filters: 'Filters',
  reset: 'Reset',
  close: 'Close',
  apply: 'Apply',
  amenities: 'Amenities',
  price: 'Price',
  selected: 'selected',
};

export const Default = () => (
  <PartnerDiscoveryFilters
    opened
    value={{ query: 'park', amenities: ['high-chairs', 'stroller'], prices: ['$', '$$'] }}
    amenities={amenities}
    labels={labels}
    prices={['$', '$$', '$$$', '$$$$']}
  />
);

export const Empty = () => (
  <PartnerDiscoveryFilters
    opened
    value={{ query: '', amenities: [], prices: [] }}
    amenities={amenities}
    labels={labels}
    prices={['$', '$$', '$$$', '$$$$']}
  />
);

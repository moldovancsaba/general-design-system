import { SortMenu, GdsSafeBox } from '@doneisbetter/gds';

export const Default = () => (
  <GdsSafeBox style={{ padding: 24 }}>
    <SortMenu
      label="Sort by"
      value="recent"
      options={[
        { value: 'recent', label: 'Most recent' },
        { value: 'oldest', label: 'Oldest first' },
        { value: 'name', label: 'Name A–Z' },
        { value: 'popular', label: 'Most popular' },
      ]}
    />
  </GdsSafeBox>
);

export const Compact = () => (
  <GdsSafeBox style={{ padding: 24 }}>
    <SortMenu
      value="price-asc"
      options={[
        { value: 'price-asc', label: 'Price: low to high' },
        { value: 'price-desc', label: 'Price: high to low' },
        { value: 'rating', label: 'Top rated' },
      ]}
    />
  </GdsSafeBox>
);

import { BrowseSurface } from '@sovereignsquad/gds';

const DemoList = ({ items }: { items: string[] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
    {items.map((label) => (
      <div
        key={label}
        style={{
          padding: '14px 16px',
          borderRadius: 10,
          border: '1px solid var(--mantine-color-gray-3)',
          background: 'var(--mantine-color-body)',
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    ))}
  </div>
);

export const Default = () => (
  <BrowseSurface
    eyebrow="Catalog"
    title="Catalog discoverability"
    description="Single browse surface contract for search, filters, and sort."
    resultCount={3}
    resultLabel="components"
    scopeOptions={[
      { id: 'all', label: 'All', active: true },
      { id: 'public', label: 'Public' },
    ]}
    activeFilters={[{ id: 'status', label: 'Status: Published' }]}
    primaryControls={<button type="button">Create</button>}
    content={<DemoList items={['Discovery Shell', 'Listing Card', 'Map Panel']} />}
  />
);

export const Empty = () => (
  <BrowseSurface
    eyebrow="Catalog"
    title="Catalog discoverability"
    description="Single browse surface contract for search, filters, and sort."
    empty
    emptyTitle="No matching components"
    emptyDescription="Try widening the scope or clearing active filters."
    emptyAction={<button type="button">Clear filters</button>}
    content={null}
  />
);

export const Loading = () => (
  <BrowseSurface
    eyebrow="Catalog"
    title="Catalog discoverability"
    description="Single browse surface contract for search, filters, and sort."
    loading
    loadingTitle="Loading components"
    loadingDescription="Fetching the latest catalog entries."
    content={null}
  />
);

import { VisuallyHidden, Button } from '@doneisbetter/gds';
import { IconTrash, IconSearch } from '@tabler/icons-react';

export const IconButtonLabel = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Button color="red" variant="light" aria-label="Delete item">
      <IconTrash size={18} />
      <VisuallyHidden>Delete item</VisuallyHidden>
    </Button>
    <Button variant="light">
      <IconSearch size={18} />
      <VisuallyHidden>Search</VisuallyHidden>
    </Button>
  </div>
);

export const SkipLink = () => (
  <div
    style={{
      padding: 16,
      border: '1px solid var(--mantine-color-gray-3)',
      borderRadius: 8,
      maxWidth: 360,
    }}
  >
    <span style={{ fontSize: 14, color: 'var(--mantine-color-dimmed)' }}>
      Heading: Quarterly results
    </span>
    <VisuallyHidden>Section 3 of 7. Updated 2 hours ago.</VisuallyHidden>
  </div>
);

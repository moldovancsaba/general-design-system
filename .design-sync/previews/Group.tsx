import { Group, Badge, Button } from '@doneisbetter/gds';

export const Default = () => (
  <div
    style={{
      background: 'var(--mantine-color-body, #fff)',
      border: '1px solid var(--mantine-color-gray-3, #dee2e6)',
      borderRadius: 8,
      padding: 16,
    }}
  >
    <Group>
      <Badge color="blue">New</Badge>
      <Badge color="green">Active</Badge>
      <Badge color="gray">Archived</Badge>
    </Group>
  </div>
);

export const Actions = () => (
  <div
    style={{
      background: 'var(--mantine-color-body, #fff)',
      border: '1px solid var(--mantine-color-gray-3, #dee2e6)',
      borderRadius: 8,
      padding: 16,
    }}
  >
    <Group>
      <Button variant="filled">Save changes</Button>
      <Button variant="default">Cancel</Button>
    </Group>
  </div>
);

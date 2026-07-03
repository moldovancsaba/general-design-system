import { ActionIcon } from '@sovereignsquad/gds';
import { IconEdit, IconTrash, IconSettings, IconDownload } from '@tabler/icons-react';

export const Default = () => (
  <ActionIcon aria-label="Edit">
    <IconEdit size={18} />
  </ActionIcon>
);

export const Group = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    <ActionIcon aria-label="Edit">
      <IconEdit size={18} />
    </ActionIcon>
    <ActionIcon aria-label="Settings">
      <IconSettings size={18} />
    </ActionIcon>
    <ActionIcon aria-label="Download">
      <IconDownload size={18} />
    </ActionIcon>
    <ActionIcon aria-label="Delete" color="red">
      <IconTrash size={18} />
    </ActionIcon>
  </div>
);

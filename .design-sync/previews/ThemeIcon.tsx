import { ThemeIcon } from '@sovereignsquad/gds';
import {
  IconCheck,
  IconBell,
  IconAlertTriangle,
  IconCloudUpload,
  IconLock,
  IconStar,
} from '@tabler/icons-react';

export const Default = () => (
  <ThemeIcon size="lg" radius="md">
    <IconCheck size={20} />
  </ThemeIcon>
);

export const Colors = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <ThemeIcon color="green" size="lg" radius="md">
      <IconCheck size={20} />
    </ThemeIcon>
    <ThemeIcon color="blue" size="lg" radius="md">
      <IconBell size={20} />
    </ThemeIcon>
    <ThemeIcon color="yellow" size="lg" radius="md">
      <IconAlertTriangle size={20} />
    </ThemeIcon>
    <ThemeIcon color="red" size="lg" radius="md">
      <IconLock size={20} />
    </ThemeIcon>
  </div>
);

export const Variants = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <ThemeIcon variant="filled" color="indigo" size="lg" radius="md">
      <IconStar size={20} />
    </ThemeIcon>
    <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
      <IconStar size={20} />
    </ThemeIcon>
    <ThemeIcon variant="outline" color="indigo" size="lg" radius="md">
      <IconStar size={20} />
    </ThemeIcon>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <ThemeIcon color="teal" size="sm" radius="xl">
      <IconCloudUpload size={14} />
    </ThemeIcon>
    <ThemeIcon color="teal" size="md" radius="xl">
      <IconCloudUpload size={18} />
    </ThemeIcon>
    <ThemeIcon color="teal" size="lg" radius="xl">
      <IconCloudUpload size={22} />
    </ThemeIcon>
    <ThemeIcon color="teal" size="xl" radius="xl">
      <IconCloudUpload size={28} />
    </ThemeIcon>
  </div>
);

import {
  IconDashboard,
  IconSettings,
  IconUsers,
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconDeviceFloppy,
  IconCheck,
  IconAlertTriangle,
  IconAlertCircle,
  IconInfoCircle,
  IconChevronDown,
  IconChevronUp,
  IconX,
  IconMenu2,
  IconMoon,
  IconSun,
} from '@tabler/icons-react';

/**
 * GdsIcons is the centralized semantic icon dictionary.
 * Applications MUST use these exported icons instead of importing
 * raw icons from tabler/icons-react directly. This ensures complete
 * visual consistency across the platform.
 */
export const GdsIcons = {
  // Navigation
  Dashboard: IconDashboard,
  Settings: IconSettings,
  Users: IconUsers,

  // Actions
  Add: IconPlus,
  Edit: IconEdit,
  Delete: IconTrash,
  Search: IconSearch,
  Save: IconDeviceFloppy,

  // Feedback
  Success: IconCheck,
  Warning: IconAlertTriangle,
  Danger: IconAlertCircle,
  Info: IconInfoCircle,

  // System
  ChevronDown: IconChevronDown,
  ChevronUp: IconChevronUp,
  Close: IconX,
  Menu: IconMenu2,
  Moon: IconMoon,
  Sun: IconSun,
};



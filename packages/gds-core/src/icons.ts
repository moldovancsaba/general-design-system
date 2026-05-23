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
  IconChartBar,
  IconPlayerPlay,
  IconRocket,
  // New domain icons
  IconHome,
  IconInbox,
  IconCalendar,
  IconPhoto,
  IconHistory,
  IconUser,
  IconSend,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconPaperclip,
  IconUpload,
  IconDownload,
  IconPrinter,
  IconCopy,
  IconCopy as IconDuplicate, // Reusing copy for duplicate
  IconChecks,
  IconClearAll,
  IconCamera,
  IconVideo,
  IconCameraRotate,
  IconBolt,
  IconBook,
  IconNotebook,
  IconCertificate,
  IconSchool,
  IconBooks,
  IconAward,
  IconBaby,
  IconUsersGroup,
  IconTarget,
  IconFlag,
  IconFlame,
  IconGift,
  IconLanguage,
  IconPalette
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
  Analytics: IconChartBar,
  Home: IconHome,
  Inbox: IconInbox,
  Calendar: IconCalendar,
  Gallery: IconPhoto,
  History: IconHistory,
  Profile: IconUser,

  // Actions
  Add: IconPlus,
  Edit: IconEdit,
  Delete: IconTrash,
  Search: IconSearch,
  Save: IconDeviceFloppy,
  Play: IconPlayerPlay,
  Start: IconRocket,
  Send: IconSend,
  Reply: IconArrowBackUp,
  Forward: IconArrowForwardUp,
  Attach: IconPaperclip,
  Upload: IconUpload,
  Download: IconDownload,
  Print: IconPrinter,
  Copy: IconCopy,
  Duplicate: IconDuplicate,
  Check: IconCheck,
  Uncheck: IconX,
  Complete: IconChecks,
  Clear: IconClearAll,

  // Preferences & System
  Language: IconLanguage,
  Theme: IconPalette,

  // Media
  Capture: IconCamera,
  Record: IconVideo,
  Flip: IconCameraRotate,
  Flash: IconBolt,

  // Domain specific
  Course: IconBook,
  Lesson: IconNotebook,
  Certificate: IconCertificate,
  Student: IconSchool,
  Class: IconBooks,
  Grade: IconAward,
  Child: IconBaby,
  Family: IconUsersGroup,
  Habit: IconTarget,
  Goal: IconFlag,
  Streak: IconFlame,
  Reward: IconGift,

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

import { GdsIcons } from './icons';

export const GdsVocabulary = {
  // Base
  settings: { id: 'gds.action.settings', defaultMessage: 'Settings', icon: GdsIcons.Settings, feedback: { icon: GdsIcons.Check, color: 'teal', messageId: 'gds.feedback.saved' } },
  analytics: { id: 'gds.action.analytics', defaultMessage: 'Analytics', icon: GdsIcons.Analytics },
  dashboard: { id: 'gds.action.dashboard', defaultMessage: 'Dashboard', icon: GdsIcons.Dashboard },
  play: { id: 'gds.action.play', defaultMessage: 'Play', icon: GdsIcons.Play },
  start: { id: 'gds.action.start', defaultMessage: 'Start', icon: GdsIcons.Start },
  users: { id: 'gds.action.users', defaultMessage: 'Users', icon: GdsIcons.Users },
  add: { id: 'gds.action.add', defaultMessage: 'Add', icon: GdsIcons.Add, feedback: { icon: GdsIcons.Check, color: 'teal', messageId: 'gds.feedback.added' } },
  edit: { id: 'gds.action.edit', defaultMessage: 'Edit', icon: GdsIcons.Edit },
  delete: { id: 'gds.action.delete', defaultMessage: 'Delete', icon: GdsIcons.Delete, feedback: { icon: GdsIcons.Clear, color: 'red', messageId: 'gds.feedback.deleted' } },
  save: { id: 'gds.action.save', defaultMessage: 'Save', icon: GdsIcons.Save, feedback: { icon: GdsIcons.Check, color: 'teal', messageId: 'gds.feedback.saved' } },
  cancel: { id: 'gds.action.cancel', defaultMessage: 'Cancel', icon: GdsIcons.Cancel },
  confirm: { id: 'gds.action.confirm', defaultMessage: 'Confirm', icon: GdsIcons.Confirm, feedback: { icon: GdsIcons.Check, color: 'teal', messageId: 'gds.feedback.confirmed' } },
  close: { id: 'gds.action.close', defaultMessage: 'Close', icon: GdsIcons.Close },
  language: { id: 'gds.action.language', defaultMessage: 'Language', icon: GdsIcons.Language },
  theme: { id: 'gds.action.theme', defaultMessage: 'Theme', icon: GdsIcons.Theme },

  // Navigation
  home: { id: 'gds.action.home', defaultMessage: 'Home', icon: GdsIcons.Home },
  inbox: { id: 'gds.action.inbox', defaultMessage: 'Inbox', icon: GdsIcons.Inbox },
  calendar: { id: 'gds.action.calendar', defaultMessage: 'Calendar', icon: GdsIcons.Calendar },
  gallery: { id: 'gds.action.gallery', defaultMessage: 'Gallery', icon: GdsIcons.Gallery },
  history: { id: 'gds.action.history', defaultMessage: 'History', icon: GdsIcons.History },
  profile: { id: 'gds.action.profile', defaultMessage: 'Profile', icon: GdsIcons.Profile },

  // Actions
  send: { id: 'gds.action.send', defaultMessage: 'Send', icon: GdsIcons.Send, feedback: { icon: GdsIcons.Send, color: 'blue', messageId: 'gds.feedback.sent' } },
  reply: { id: 'gds.action.reply', defaultMessage: 'Reply', icon: GdsIcons.Reply, feedback: { icon: GdsIcons.Send, color: 'blue', messageId: 'gds.feedback.replied' } },
  forward: { id: 'gds.action.forward', defaultMessage: 'Forward', icon: GdsIcons.Forward, feedback: { icon: GdsIcons.Send, color: 'blue', messageId: 'gds.feedback.forwarded' } },
  attach: { id: 'gds.action.attach', defaultMessage: 'Attach', icon: GdsIcons.Attach },
  upload: { id: 'gds.action.upload', defaultMessage: 'Upload', icon: GdsIcons.Upload, feedback: { icon: GdsIcons.Check, color: 'teal', messageId: 'gds.feedback.uploaded' } },
  download: { id: 'gds.action.download', defaultMessage: 'Download', icon: GdsIcons.Download },
  print: { id: 'gds.action.print', defaultMessage: 'Print', icon: GdsIcons.Print },
  copy: { id: 'gds.action.copy', defaultMessage: 'Copy', icon: GdsIcons.Copy, feedback: { icon: GdsIcons.Check, color: 'teal', messageId: 'gds.feedback.copied' } },
  duplicate: { id: 'gds.action.duplicate', defaultMessage: 'Duplicate', icon: GdsIcons.Duplicate },
  check: { id: 'gds.action.check', defaultMessage: 'Check', icon: GdsIcons.Check, feedback: { icon: GdsIcons.Check, color: 'teal', messageId: 'gds.feedback.checked' } },
  uncheck: { id: 'gds.action.uncheck', defaultMessage: 'Uncheck', icon: GdsIcons.Uncheck, feedback: { icon: GdsIcons.Clear, color: 'red', messageId: 'gds.feedback.unchecked' } },
  complete: { id: 'gds.action.complete', defaultMessage: 'Complete', icon: GdsIcons.Complete, feedback: { icon: GdsIcons.Check, color: 'teal', messageId: 'gds.feedback.completed' } },
  clear: { id: 'gds.action.clear', defaultMessage: 'Clear', icon: GdsIcons.Clear, feedback: { icon: GdsIcons.Clear, color: 'red', messageId: 'gds.feedback.cleared' } },

  // Media (camera project)
  capture: { id: 'gds.action.capture', defaultMessage: 'Capture', icon: GdsIcons.Capture, feedback: { icon: GdsIcons.Check, color: 'teal', messageId: 'gds.feedback.captured' } },
  record: { id: 'gds.action.record', defaultMessage: 'Record', icon: GdsIcons.Record, feedback: { icon: GdsIcons.Check, color: 'teal', messageId: 'gds.feedback.recorded' } },
  flip: { id: 'gds.action.flip', defaultMessage: 'Flip', icon: GdsIcons.Flip },
  flash: { id: 'gds.action.flash', defaultMessage: 'Flash', icon: GdsIcons.Flash },

  // Domain specific (amanoba, classscout, kidex, habigoal)
  course: { id: 'gds.action.course', defaultMessage: 'Course', icon: GdsIcons.Course },
  lesson: { id: 'gds.action.lesson', defaultMessage: 'Lesson', icon: GdsIcons.Lesson },
  certificate: { id: 'gds.action.certificate', defaultMessage: 'Certificate', icon: GdsIcons.Certificate },
  student: { id: 'gds.action.student', defaultMessage: 'Student', icon: GdsIcons.Student },
  class: { id: 'gds.action.class', defaultMessage: 'Class', icon: GdsIcons.Class },
  grade: { id: 'gds.action.grade', defaultMessage: 'Grade', icon: GdsIcons.Grade },
  child: { id: 'gds.action.child', defaultMessage: 'Child', icon: GdsIcons.Child },
  family: { id: 'gds.action.family', defaultMessage: 'Family', icon: GdsIcons.Family },
  habit: { id: 'gds.action.habit', defaultMessage: 'Habit', icon: GdsIcons.Habit },
  goal: { id: 'gds.action.goal', defaultMessage: 'Goal', icon: GdsIcons.Goal },
  streak: { id: 'gds.action.streak', defaultMessage: 'Streak', icon: GdsIcons.Streak },
  reward: { id: 'gds.action.reward', defaultMessage: 'Reward', icon: GdsIcons.Reward, feedback: { icon: GdsIcons.Reward, color: 'yellow', messageId: 'gds.feedback.rewarded' } },

  // Codebase analysis additions
  trophy: { id: 'gds.action.trophy', defaultMessage: 'Trophy', icon: GdsIcons.Trophy, feedback: { icon: GdsIcons.Trophy, color: 'yellow', messageId: 'gds.feedback.rewarded' } },
  crown: { id: 'gds.action.crown', defaultMessage: 'Crown', icon: GdsIcons.Crown, feedback: { icon: GdsIcons.Crown, color: 'yellow', messageId: 'gds.feedback.rewarded' } },
  pause: { id: 'gds.action.pause', defaultMessage: 'Pause', icon: GdsIcons.Pause },
  message: { id: 'gds.action.message', defaultMessage: 'Message', icon: GdsIcons.Message },
  mail: { id: 'gds.action.mail', defaultMessage: 'Mail', icon: GdsIcons.Mail, feedback: { icon: GdsIcons.Send, color: 'blue', messageId: 'gds.feedback.mailed' } },
  refresh: { id: 'gds.action.refresh', defaultMessage: 'Refresh', icon: GdsIcons.Refresh },
  trendingUp: { id: 'gds.action.trendingUp', defaultMessage: 'Trending Up', icon: GdsIcons.TrendingUp },
  trendingDown: { id: 'gds.action.trendingDown', defaultMessage: 'Trending Down', icon: GdsIcons.TrendingDown },
  currency: { id: 'gds.action.currency', defaultMessage: 'Currency', icon: GdsIcons.Currency },
  grid: { id: 'gds.action.grid', defaultMessage: 'Grid', icon: GdsIcons.Grid },
  list: { id: 'gds.action.list', defaultMessage: 'List', icon: GdsIcons.List },
  logout: { id: 'gds.action.logout', defaultMessage: 'Logout', icon: GdsIcons.Logout },
  notifications: { id: 'gds.action.notifications', defaultMessage: 'Notifications', icon: GdsIcons.Notifications },
  back: { id: 'gds.action.back', defaultMessage: 'Back', icon: GdsIcons.Back },
  eye: { id: 'gds.action.eye', defaultMessage: 'View', icon: GdsIcons.Eye },
  eyeOff: { id: 'gds.action.eyeOff', defaultMessage: 'Hide', icon: GdsIcons.EyeOff },
  help: { id: 'gds.action.help', defaultMessage: 'Help', icon: GdsIcons.Help },
  filter: { id: 'gds.action.filter', defaultMessage: 'Filter', icon: GdsIcons.Filter },
  sort: { id: 'gds.action.sort', defaultMessage: 'Sort', icon: GdsIcons.Sort },
} as const;

export type SemanticAction = keyof typeof GdsVocabulary;

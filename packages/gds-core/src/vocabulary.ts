import { GdsIcons } from './icons';

export const GdsVocabulary = {
  // Base
  settings: { id: 'gds.action.settings', defaultMessage: 'Settings', icon: GdsIcons.Settings },
  analytics: { id: 'gds.action.analytics', defaultMessage: 'Analytics', icon: GdsIcons.Analytics },
  dashboard: { id: 'gds.action.dashboard', defaultMessage: 'Dashboard', icon: GdsIcons.Dashboard },
  play: { id: 'gds.action.play', defaultMessage: 'Play', icon: GdsIcons.Play },
  start: { id: 'gds.action.start', defaultMessage: 'Start', icon: GdsIcons.Start },
  users: { id: 'gds.action.users', defaultMessage: 'Users', icon: GdsIcons.Users },
  add: { id: 'gds.action.add', defaultMessage: 'Add', icon: GdsIcons.Add },
  edit: { id: 'gds.action.edit', defaultMessage: 'Edit', icon: GdsIcons.Edit },
  delete: { id: 'gds.action.delete', defaultMessage: 'Delete', icon: GdsIcons.Delete },
  save: { id: 'gds.action.save', defaultMessage: 'Save', icon: GdsIcons.Save },
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
  send: { id: 'gds.action.send', defaultMessage: 'Send', icon: GdsIcons.Send },
  reply: { id: 'gds.action.reply', defaultMessage: 'Reply', icon: GdsIcons.Reply },
  forward: { id: 'gds.action.forward', defaultMessage: 'Forward', icon: GdsIcons.Forward },
  attach: { id: 'gds.action.attach', defaultMessage: 'Attach', icon: GdsIcons.Attach },
  upload: { id: 'gds.action.upload', defaultMessage: 'Upload', icon: GdsIcons.Upload },
  download: { id: 'gds.action.download', defaultMessage: 'Download', icon: GdsIcons.Download },
  print: { id: 'gds.action.print', defaultMessage: 'Print', icon: GdsIcons.Print },
  copy: { id: 'gds.action.copy', defaultMessage: 'Copy', icon: GdsIcons.Copy },
  duplicate: { id: 'gds.action.duplicate', defaultMessage: 'Duplicate', icon: GdsIcons.Duplicate },
  check: { id: 'gds.action.check', defaultMessage: 'Check', icon: GdsIcons.Check },
  uncheck: { id: 'gds.action.uncheck', defaultMessage: 'Uncheck', icon: GdsIcons.Uncheck },
  complete: { id: 'gds.action.complete', defaultMessage: 'Complete', icon: GdsIcons.Complete },
  clear: { id: 'gds.action.clear', defaultMessage: 'Clear', icon: GdsIcons.Clear },

  // Media (camera project)
  capture: { id: 'gds.action.capture', defaultMessage: 'Capture', icon: GdsIcons.Capture },
  record: { id: 'gds.action.record', defaultMessage: 'Record', icon: GdsIcons.Record },
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
  reward: { id: 'gds.action.reward', defaultMessage: 'Reward', icon: GdsIcons.Reward },
} as const;

export type SemanticAction = keyof typeof GdsVocabulary;

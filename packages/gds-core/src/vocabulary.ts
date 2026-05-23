import { GdsIcons } from './icons';

export const GdsVocabulary = {
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
} as const;

export type SemanticAction = keyof typeof GdsVocabulary;

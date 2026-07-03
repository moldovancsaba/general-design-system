import { ActionBar } from '@sovereignsquad/gds';

export const Default = () => (
  <ActionBar
    primary={{ action: 'save' }}
    secondary={[{ action: 'cancel' }]}
  />
);

export const WithTertiary = () => (
  <ActionBar
    primary={{ action: 'submit' }}
    secondary={[{ action: 'reset' }]}
    tertiary={[{ action: 'export' }, { action: 'refresh' }]}
  />
);

export const Destructive = () => (
  <ActionBar
    primary={{ action: 'save' }}
    secondary={[{ action: 'cancel' }]}
    tertiary={[{ action: 'delete' }]}
  />
);

export const IconOnly = () => (
  <ActionBar
    primary={{ action: 'add' }}
    iconOnly={[{ action: 'edit' }, { action: 'delete' }, { action: 'refresh' }]}
  />
);

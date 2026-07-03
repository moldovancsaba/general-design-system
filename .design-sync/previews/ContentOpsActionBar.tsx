import { ContentOpsActionBar } from '@sovereignsquad/gds';

export const Default = () => (
  <ContentOpsActionBar
    status="All changes saved."
    actions={{
      primary: { action: 'save' },
      secondary: [{ action: 'cancel' }],
    }}
  />
);

export const Dirty = () => (
  <ContentOpsActionBar
    dirty
    status="Editing in shared governance mode."
    actions={{
      primary: { action: 'save' },
      secondary: [{ action: 'cancel' }],
      tertiary: [{ action: 'preview' }],
    }}
  />
);

export const Saving = () => (
  <ContentOpsActionBar
    saving
    status="Saving changes…"
    actions={{
      primary: { action: 'save' },
      secondary: [{ action: 'cancel' }],
    }}
  />
);

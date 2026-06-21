import { ConfirmDialog } from '@doneisbetter/gds';

export const Default = () => (
  <ConfirmDialog
    opened
    title="Publish this pattern?"
    confirmAction="save"
    cancelAction="cancel"
  >
    Publishing makes the pattern visible on the public reference site. You can unpublish later.
  </ConfirmDialog>
);

export const Danger = () => (
  <ConfirmDialog
    opened
    title="Delete this pattern"
    confirmAction="delete"
    cancelAction="cancel"
    isDanger
  >
    Destructive actions must remain explicit and reversible only with confirmation. This cannot be undone.
  </ConfirmDialog>
);

export const Loading = () => (
  <ConfirmDialog
    opened
    title="Archiving catalog entry"
    confirmAction="save"
    cancelAction="cancel"
    loading
  >
    Please wait while the entry is archived and removed from active listings.
  </ConfirmDialog>
);

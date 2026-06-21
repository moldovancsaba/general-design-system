import { AdminPageHeader, SemanticButton } from '@doneisbetter/gds';

export const Default = () => (
  <AdminPageHeader
    eyebrow="Partner operations"
    title="Partner directory"
    description="Review, approve, and publish partner listings across regions."
    primaryAction={<SemanticButton action="add" />}
  />
);

export const WithSubtitle = () => (
  <AdminPageHeader
    eyebrow="Content review"
    title="Pending submissions"
    subtitle="12 awaiting moderation"
    description="Submissions are queued in order of received date."
    primaryAction={<SemanticButton action="save" />}
    secondaryActions={<SemanticButton action="settings" />}
  />
);

export const Minimal = () => (
  <AdminPageHeader
    title="Account settings"
    description="Manage workspace defaults and access policies."
  />
);

import { AdminFileUpload } from '@doneisbetter/gds';

export const Default = () => (
  <AdminFileUpload
    name="avatar"
    label="Workspace logo"
    description="PNG or SVG, up to 2 MB. Recommended 512×512."
  />
);

export const Required = () => (
  <AdminFileUpload
    name="contract"
    label="Signed agreement"
    description="Upload the countersigned PDF before submitting."
    required
  />
);

export const ErrorState = () => (
  <AdminFileUpload
    name="contract"
    label="Signed agreement"
    state="error"
    error="File exceeds the 2 MB limit."
  />
);

export const Disabled = () => (
  <AdminFileUpload
    name="archive"
    label="Source archive"
    description="Uploads are disabled while the workspace is read-only."
    state="disabled"
    disabled
  />
);

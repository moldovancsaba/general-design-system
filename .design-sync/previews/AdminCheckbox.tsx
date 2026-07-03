import { AdminCheckbox } from '@sovereignsquad/gds';

export const Default = () => (
  <AdminCheckbox
    name="notifications"
    label="Email me about release notes"
    description="Sent once per published version, never more than weekly."
    checked
  />
);

export const Unchecked = () => (
  <AdminCheckbox
    name="beta"
    label="Enroll in the beta channel"
    description="Receive prerelease builds before general availability."
    checked={false}
  />
);

export const Required = () => (
  <AdminCheckbox
    name="terms"
    label="I accept the contributor agreement"
    checked={false}
    required
  />
);

export const ErrorState = () => (
  <AdminCheckbox
    name="terms"
    label="I accept the contributor agreement"
    checked={false}
    required
    state="error"
    error="You must accept the agreement to continue."
  />
);

export const Disabled = () => (
  <AdminCheckbox
    name="archived"
    label="Archived workspaces are read-only"
    checked
    state="disabled"
    disabled
  />
);

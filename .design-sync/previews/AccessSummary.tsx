import { AccessSummary } from '@doneisbetter/gds';

export const Allowed = () => (
  <AccessSummary
    title="Workspace access"
    roles={['platform-ui', 'maintainers']}
    scope="Public adopters"
    state="allowed"
    owner="platform-ui"
    description="Access and scope stay explicit on every protected surface."
  />
);

export const PermissionLimited = () => (
  <AccessSummary
    title="Shared access summary"
    roles={['platform-ui', 'maintainers']}
    scope="Reference site"
    state="permission-limited"
    owner="platform-ui"
    recoveryHint="Request the docs-admin scope to unlock private evidence."
    description="Access and scope stay explicit."
  />
);

export const Blocked = () => (
  <AccessSummary
    title="Private dashboard"
    roles={['analytics-admin']}
    scope="Internal metrics"
    state="blocked"
    blocked
    owner="data-platform"
    recoveryHint="This surface is restricted to the analytics-admin role."
  />
);

export const Expired = () => (
  <AccessSummary
    title="Session expired"
    roles={['contributor']}
    scope="Draft editor"
    state="expired"
    recoveryHint="Sign in again to restore your editing session."
  />
);

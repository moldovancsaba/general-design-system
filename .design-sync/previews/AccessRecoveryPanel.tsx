import { AccessRecoveryPanel } from '@sovereignsquad/gds';

export const Unauthenticated = () => (
  <AccessRecoveryPanel
    state="unauthenticated"
    primaryAction={{ action: 'login', onClick: () => {} }}
    secondaryAction={{ action: 'back', onClick: () => {}, variant: 'default' }}
  />
);

export const ExpiredSession = () => (
  <AccessRecoveryPanel
    state="expired-session"
    primaryAction={{ action: 'login', onClick: () => {} }}
    supportAction={{ action: 'help', onClick: () => {}, variant: 'subtle' }}
  />
);

export const Timeout = () => (
  <AccessRecoveryPanel
    state="timeout"
    primaryAction={{ action: 'refresh', onClick: () => {} }}
    secondaryAction={{ action: 'back', onClick: () => {}, variant: 'default' }}
    supportAction={{ action: 'help', onClick: () => {}, variant: 'subtle' }}
  />
);

export const Forbidden = () => (
  <AccessRecoveryPanel
    state="forbidden"
    title="You don't have access to this workspace"
    description="Ask a workspace owner to grant the docs-admin scope."
    primaryAction={{ action: 'back', onClick: () => {} }}
  />
);

export const Compact = () => (
  <AccessRecoveryPanel
    state="missing"
    compact
    primaryAction={{ action: 'back', onClick: () => {} }}
  />
);

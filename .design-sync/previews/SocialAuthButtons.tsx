import { SocialAuthButtons } from '@doneisbetter/gds';

export const Stack = () => (
  <SocialAuthButtons
    title="Sign in"
    description="Use a connected provider to continue."
    layout="stack"
    providers={[
      { id: 'google', href: '#google' },
      { id: 'apple', href: '#apple' },
      { id: 'github', href: '#github' },
    ]}
  />
);

export const Grid = () => (
  <SocialAuthButtons
    layout="grid"
    providers={[
      { id: 'google', href: '#google' },
      { id: 'microsoft', href: '#microsoft' },
      { id: 'github', href: '#github' },
      { id: 'linkedin', href: '#linkedin' },
    ]}
  />
);

export const WithPolicyAndError = () => (
  <SocialAuthButtons
    title="Continue with"
    layout="stack"
    providers={[
      { id: 'google', href: '#google', policyNote: 'Approved by identity policy.' },
      { id: 'github', error: 'Provider returned an error.' },
      { id: 'microsoft', tenantDisabledReason: 'Disabled by tenant policy.' },
    ]}
  />
);

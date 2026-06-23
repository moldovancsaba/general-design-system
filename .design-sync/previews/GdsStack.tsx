import { GdsStack } from '@doneisbetter/gds';

const Block = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      background: 'var(--mantine-color-blue-1, #d0ebff)',
      border: '1px solid var(--mantine-color-blue-3, #74c0fc)',
      borderRadius: 6,
      padding: 16,
      fontWeight: 600,
    }}
  >
    {children}
  </div>
);

export const Default = () => (
  <GdsStack gap="md">
    <Block>Profile</Block>
    <Block>Billing</Block>
    <Block>Notifications</Block>
    <Block>Security</Block>
  </GdsStack>
);

export const TightGap = () => (
  <GdsStack gap="xs">
    <Block>Step 1 — Account</Block>
    <Block>Step 2 — Workspace</Block>
    <Block>Step 3 — Invite team</Block>
  </GdsStack>
);

export const Centered = () => (
  <GdsStack gap="lg" align="center">
    <Block>Logo</Block>
    <Block>Sign in</Block>
    <Block>Create account</Block>
  </GdsStack>
);

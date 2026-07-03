import { ProviderIdentityButton } from '@sovereignsquad/gds';

export const Google = () => (
  <ProviderIdentityButton
    provider="google"
    label="Continue with Google"
    fullWidth
    variant="outline"
  />
);

export const Apple = () => (
  <ProviderIdentityButton
    provider="apple"
    label="Continue with Apple"
    fullWidth
    variant="solid"
  />
);

export const WithPolicy = () => (
  <ProviderIdentityButton
    provider="github"
    label="Continue with GitHub"
    description="We'll only read your public profile."
    policyNote="By continuing you agree to the Terms and Privacy Policy."
    fullWidth
    variant="neutral"
  />
);

export const Disabled = () => (
  <ProviderIdentityButton
    provider="microsoft"
    label="Continue with Microsoft"
    fullWidth
    disabled
    tenantDisabledReason="Microsoft sign-in is not enabled for this workspace."
  />
);

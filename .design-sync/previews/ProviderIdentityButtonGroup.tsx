import * as React from 'react';
import { ProviderIdentityButtonGroup, SectionPanel } from '@doneisbetter/gds';

export const StackedProviders = () => (
  <SectionPanel title="Sign in" description="Choose a provider to continue.">
    <ProviderIdentityButtonGroup
      layout="stack"
      providers={[
        { provider: 'google', label: 'Continue with Google', fullWidth: true },
        { provider: 'apple', label: 'Continue with Apple', fullWidth: true },
        { provider: 'github', label: 'Continue with GitHub', fullWidth: true },
      ]}
    />
  </SectionPanel>
);

export const GridProviders = () => (
  <SectionPanel title="Connect an account" description="Link any supported identity provider.">
    <ProviderIdentityButtonGroup
      layout="grid"
      providers={[
        { provider: 'google', label: 'Google' },
        { provider: 'apple', label: 'Apple' },
        { provider: 'microsoft', label: 'Microsoft' },
        { provider: 'facebook', label: 'Facebook' },
        { provider: 'github', label: 'GitHub' },
        { provider: 'linkedin', label: 'LinkedIn' },
      ]}
    />
  </SectionPanel>
);

export const WithStateNotes = () => (
  <SectionPanel title="Provider availability" description="Tenant policy and per-provider notices.">
    <ProviderIdentityButtonGroup
      layout="stack"
      providers={[
        { provider: 'google', label: 'Continue with Google', policyNote: 'Recommended for your team', fullWidth: true },
        { provider: 'apple', label: 'Continue with Apple', loading: true, fullWidth: true },
        { provider: 'github', label: 'Continue with GitHub', disabled: true, tenantDisabledReason: 'Disabled by your administrator', fullWidth: true },
      ]}
    />
  </SectionPanel>
);

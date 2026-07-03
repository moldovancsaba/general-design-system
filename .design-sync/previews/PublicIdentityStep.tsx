import * as React from 'react';
import { PublicIdentityStep, ProviderIdentityButtonGroup } from '@sovereignsquad/gds';

export const Default = () => (
  <PublicIdentityStep>
    <ProviderIdentityButtonGroup
      layout="stack"
      providers={[
        { provider: 'google', label: 'Continue with Google', fullWidth: true },
        { provider: 'apple', label: 'Continue with Apple', fullWidth: true },
      ]}
    />
  </PublicIdentityStep>
);

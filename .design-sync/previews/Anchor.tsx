import { Anchor } from '@sovereignsquad/gds';

export const Default = () => (
  <Anchor href="/docs/getting-started">Read the getting started guide</Anchor>
);

export const Inline = () => (
  <p style={{ margin: 0 }}>
    Review the{' '}
    <Anchor href="/policies/listing-guidelines">listing guidelines</Anchor> before
    publishing your partner profile.
  </p>
);

export const Group = () => (
  <div style={{ display: 'flex', gap: 16 }}>
    <Anchor href="/">Home</Anchor>
    <Anchor href="/docs">Docs</Anchor>
    <Anchor href="/support">Support</Anchor>
  </div>
);

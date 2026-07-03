import { GdsAccessGate, EditorialCard } from '@sovereignsquad/gds';

const teaser = (
  <div style={{ display: 'grid', gap: 8 }}>
    <h3 style={{ margin: 0 }}>The 2026 Design Systems Report</h3>
    <p style={{ margin: 0 }}>
      How 42 teams converged on a single governed component library — and what it cost them
      to get there. The first two sections are free to read.
    </p>
  </div>
);

const fullArticle = (
  <EditorialCard
    title="The 2026 Design Systems Report"
    description="Full report body, charts, and appendix render only after entitlement resolves."
  />
);

export const Locked = () => (
  <GdsAccessGate
    id="report-2026"
    state="locked"
    reason="subscription-required"
    title="Subscribe to keep reading"
    description="This report is available to Pro members. Your preview ends here."
    entitlementLabel="Pro membership"
    teaserLabel="Free preview"
    preview={teaser}
    protectedContent={fullArticle}
    protectedContentPolicy="never-render-while-locked"
    actions={[
      { kind: 'subscribe', label: 'Subscribe' },
      { kind: 'sign-in', label: 'Sign in' },
    ]}
  />
);

export const LoginRequired = () => (
  <GdsAccessGate
    id="account-page"
    state="locked"
    reason="login-required"
    title="Sign in to continue"
    description="Create a free account or sign in to view the rest of this page."
    teaserLabel="Preview"
    preview={teaser}
    protectedContent={fullArticle}
    protectedContentPolicy="never-render-while-locked"
    actions={[
      { kind: 'sign-in', label: 'Sign in' },
      { kind: 'sign-up', label: 'Create account' },
    ]}
  />
);

export const Unlocked = () => (
  <GdsAccessGate
    id="report-2026"
    state="unlocked"
    title="The 2026 Design Systems Report"
    description="Full access granted."
    preview={teaser}
    protectedContent={fullArticle}
  />
);

export const Error = () => (
  <GdsAccessGate
    id="report-2026"
    state="error"
    reason="network-timeout"
    title="We couldn't verify your access"
    description="Something went wrong checking your membership. Try again in a moment."
    preview={teaser}
    protectedContent={fullArticle}
    actions={[{ kind: 'retry', label: 'Try again' }]}
  />
);

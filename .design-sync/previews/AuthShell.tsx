import { AuthShell } from '@sovereignsquad/gds';

export const SignIn = () => (
  <AuthShell
    title="Sign in to GDS"
    description="Canonical auth placement with provider errors, guest entry, and support fallback."
    intent="sign-in"
    dividerLabel="or continue with email"
    guestAction={<button type="button">Continue as guest</button>}
    supportAction={<button type="button">Contact support</button>}
    helper="Keep provider logic in the app; keep layout in GDS."
  >
    <p style={{ margin: 0 }}>Social auth remains part of the shared auth shell contract.</p>
  </AuthShell>
);

export const WithError = () => (
  <AuthShell
    title="Sign in to GDS"
    description="Provider errors render inline and are announced through alert semantics."
    intent="sign-in"
    error="The last provider attempt timed out. Choose a provider, retry, or continue as guest."
    guestAction={<button type="button">Continue as guest</button>}
    supportAction={<button type="button">Contact support</button>}
  >
    <p style={{ margin: 0 }}>Choose a provider to retry your sign-in.</p>
  </AuthShell>
);

export const SignUp = () => (
  <AuthShell
    title="Create your GDS account"
    description="Start collaborating across the shared design system catalog."
    intent="sign-up"
    helper="Already have an account? Switch to sign-in."
  >
    <p style={{ margin: 0 }}>Pick a provider or register with email.</p>
  </AuthShell>
);

import { InlineAlert } from '@doneisbetter/gds';

export const Success = () => (
  <InlineAlert
    severity="success"
    title="Changes saved"
    message="Your profile was updated and is now visible to your team."
  />
);

export const Warning = () => (
  <InlineAlert
    severity="warning"
    title="Storage almost full"
    message="You have used 92% of your plan's storage. Upgrade to avoid interruptions."
  />
);

export const Error = () => (
  <InlineAlert
    severity="error"
    title="Payment failed"
    message="We couldn't charge your card ending in 4242. Update your billing details to continue."
  />
);

export const Info = () => (
  <InlineAlert
    severity="info"
    title="Scheduled maintenance"
    message="The dashboard will be read-only on Sunday from 02:00–04:00 UTC."
  />
);

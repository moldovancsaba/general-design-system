import { PartnerNewsletterForm } from '@sovereignsquad/gds';

const labels = {
  title: 'Subscribe to Family Places Weekly',
  description: 'Verified parent-friendly places, newly added each week.',
  emailLabel: 'Email address',
  emailPlaceholder: 'you@example.com',
  submitLabel: 'Subscribe',
  dismissLabel: 'Cancel',
  successMessage: "You're on the list — your first digest arrives Friday.",
  errorMessage: 'That email looks invalid. Please double-check and retry.',
};

export const Idle = () => (
  <PartnerNewsletterForm state="idle" email="parent@example.com" labels={labels} />
);

export const Submitting = () => (
  <PartnerNewsletterForm state="submitting" email="parent@example.com" labels={labels} />
);

export const Success = () => (
  <PartnerNewsletterForm state="success" email="parent@example.com" labels={labels} />
);

export const ErrorState = () => (
  <PartnerNewsletterForm state="error" email="not-an-email" labels={labels} />
);

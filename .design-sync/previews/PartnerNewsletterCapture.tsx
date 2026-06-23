import { PartnerNewsletterCapture } from '@doneisbetter/gds';

const visual =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='160'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%237c3aed'/%3E%3Cstop offset='1' stop-color='%2338bdf8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='160' fill='url(%23g)'/%3E%3Ctext x='160' y='90' font-family='sans-serif' font-size='18' fill='white' text-anchor='middle'%3EFamily Places Weekly%3C/text%3E%3C/svg%3E";

const labels = {
  title: 'Get the best family spots in your inbox',
  description: 'A short weekly digest of newly verified parent-friendly places near you.',
  emailLabel: 'Email address',
  emailPlaceholder: 'you@example.com',
  submitLabel: 'Subscribe',
  dismissLabel: 'No thanks',
  successMessage: "You're subscribed — watch for your first digest on Friday.",
  errorMessage: "We couldn't subscribe you. Please check the address and try again.",
};

export const Idle = () => (
  <PartnerNewsletterCapture
    opened
    state="idle"
    email="parent@example.com"
    labels={labels}
    visual={<img src={visual} alt="Family Places Weekly" style={{ width: '100%', display: 'block', borderRadius: 8 }} />}
  />
);

export const Success = () => (
  <PartnerNewsletterCapture
    opened
    state="success"
    email="parent@example.com"
    labels={labels}
    visual={<img src={visual} alt="Family Places Weekly" style={{ width: '100%', display: 'block', borderRadius: 8 }} />}
  />
);

export const ErrorState = () => (
  <PartnerNewsletterCapture
    opened
    state="error"
    email="not-an-email"
    labels={labels}
  />
);

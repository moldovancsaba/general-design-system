import { GdsErrorPageTemplate } from '@sovereignsquad/gds';

export const Default = () => (
  <GdsErrorPageTemplate
    state="error"
    code={500}
    eyebrow="Something went wrong"
    title="We hit an unexpected error"
    description="Our team has been notified. Please try again in a few moments."
    actions={[
      { id: 'refresh', label: 'Try again', kind: 'primary' },
      { id: 'home', label: 'Back to home', kind: 'link' },
    ]}
  />
);

export const NotFound = () => (
  <GdsErrorPageTemplate
    state="not-found"
    code={404}
    eyebrow="Page not found"
    title="This page doesn't exist"
    description="The link may be broken or the page may have been moved."
    actions={[{ id: 'home', label: 'Go home', kind: 'primary' }]}
  />
);

export const PermissionDenied = () => (
  <GdsErrorPageTemplate
    state="permission-denied"
    code={403}
    eyebrow="Access denied"
    title="You can't view this page"
    description="Your account doesn't have permission to access this resource."
    actions={[{ id: 'back', label: 'Go back', kind: 'secondary' }]}
  />
);

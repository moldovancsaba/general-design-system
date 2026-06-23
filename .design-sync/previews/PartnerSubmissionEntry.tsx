import { PartnerSubmissionEntry, PartnerNewsletterForm } from '@doneisbetter/gds';

const formLabels = {
  title: 'Place details',
  description: 'Tell us about a parent-friendly place.',
  emailLabel: 'Your email',
  emailPlaceholder: 'you@example.com',
  submitLabel: 'Submit place',
  dismissLabel: 'Cancel',
  successMessage: 'Thanks! Our team will review this place shortly.',
  errorMessage: 'Something went wrong. Please try again.',
};

export const Default = () => (
  <PartnerSubmissionEntry
    title="Suggest a place"
    description="Know a great parent-friendly spot? Share it and we'll verify and add it to the directory."
    form={<PartnerNewsletterForm state="idle" email="" labels={formLabels} />}
  />
);

export const Success = () => (
  <PartnerSubmissionEntry
    title="Suggest a place"
    description="Know a great parent-friendly spot? Share it and we'll verify and add it to the directory."
    form={<PartnerNewsletterForm state="success" email="parent@example.com" labels={formLabels} />}
    success="Submission received — thank you for helping families discover great places."
  />
);

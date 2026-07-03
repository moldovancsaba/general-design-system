import { FormErrorSummary, GdsFormProvider } from '@sovereignsquad/gds';

const snapshot = {
  fields: {
    email: { value: '', touched: true, dirty: true },
    password: { value: '123', touched: true, dirty: true },
    terms: { value: false, touched: true, dirty: false },
  },
  issues: [
    { field: 'email', message: 'Enter a valid email address.', severity: 'blocking' as const },
    { field: 'password', message: 'Password must be at least 8 characters.', severity: 'blocking' as const },
    { field: 'terms', message: 'You must accept the terms to continue.', severity: 'blocking' as const },
  ],
  submitState: 'error' as const,
};

export const Default = () => (
  <GdsFormProvider snapshot={snapshot}>
    <FormErrorSummary />
  </GdsFormProvider>
);

export const CustomTitle = () => (
  <GdsFormProvider snapshot={snapshot}>
    <FormErrorSummary title="We couldn't save your changes" />
  </GdsFormProvider>
);

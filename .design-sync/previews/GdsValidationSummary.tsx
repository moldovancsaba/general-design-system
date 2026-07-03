import { GdsValidationSummary, GdsFormProvider } from '@sovereignsquad/gds';

const snapshot = {
  fields: {
    email: { value: 'not-an-email', touched: true, dirty: true },
    password: { value: '123', touched: true, dirty: true },
    plan: { value: '', touched: true, dirty: false },
  },
  issues: [
    { field: 'email', message: 'Enter a valid email address.', severity: 'blocking' as const },
    { field: 'password', message: 'Password must be at least 8 characters.', severity: 'blocking' as const },
    { field: 'plan', message: 'Choose a plan to continue.', severity: 'blocking' as const },
  ],
  submitState: 'error' as const,
};

export const Default = () => (
  <GdsFormProvider snapshot={snapshot}>
    <GdsValidationSummary />
  </GdsFormProvider>
);

export const CustomTitle = () => (
  <GdsFormProvider snapshot={snapshot}>
    <GdsValidationSummary title="Please fix 3 issues before submitting" />
  </GdsFormProvider>
);

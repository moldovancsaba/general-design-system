import { GdsFormProvider, FormErrorSummary, ValidatedFieldMessage } from '@doneisbetter/gds';

const snapshot = {
  fields: {
    email: { value: 'not-an-email', touched: true, dirty: true },
    name: { value: 'Ada Lovelace', touched: true, dirty: true },
  },
  issues: [
    { field: 'email', message: 'Enter a valid email address.', severity: 'error' as const },
  ],
  submitState: 'error' as const,
  submitError: 'Please fix the errors below before submitting.',
};

export const Default = () => (
  <GdsFormProvider snapshot={snapshot}>
    <form style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
      <FormErrorSummary />
      <label style={{ display: 'grid', gap: 4 }}>
        <span style={{ fontWeight: 600 }}>Name</span>
        <input id="name" defaultValue="Ada Lovelace" />
      </label>
      <label style={{ display: 'grid', gap: 4 }}>
        <span style={{ fontWeight: 600 }}>Email</span>
        <input id="email" defaultValue="not-an-email" />
        <ValidatedFieldMessage field="email" />
      </label>
    </form>
  </GdsFormProvider>
);

const cleanSnapshot = {
  fields: {
    title: { value: 'Quarterly report', touched: true, dirty: true },
  },
  issues: [],
  submitState: 'saved' as const,
};

export const Saved = () => (
  <GdsFormProvider snapshot={cleanSnapshot}>
    <form style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
      <FormErrorSummary />
      <label style={{ display: 'grid', gap: 4 }}>
        <span style={{ fontWeight: 600 }}>Title</span>
        <input id="title" defaultValue="Quarterly report" />
      </label>
    </form>
  </GdsFormProvider>
);

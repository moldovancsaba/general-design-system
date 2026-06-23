import { ValidatedFieldMessage, GdsFormProvider, TextInput } from '@doneisbetter/gds';

const snapshot = {
  fields: {
    email: { value: 'ada@', touched: true, dirty: true },
    password: { value: '123', touched: true, dirty: true },
  },
  issues: [
    { field: 'email', message: 'Enter a valid email address.', severity: 'blocking' as const },
    { field: 'password', message: 'Password must be at least 8 characters.', severity: 'blocking' as const },
  ],
  submitState: 'error' as const,
};

export const EmailError = () => (
  <GdsFormProvider snapshot={snapshot}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <TextInput label="Email address" defaultValue="ada@" error />
      <ValidatedFieldMessage field="email" />
    </div>
  </GdsFormProvider>
);

export const PasswordError = () => (
  <GdsFormProvider snapshot={snapshot}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <TextInput label="Password" type="password" defaultValue="123" error />
      <ValidatedFieldMessage field="password" />
    </div>
  </GdsFormProvider>
);

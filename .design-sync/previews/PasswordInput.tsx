import { PasswordInput } from '@doneisbetter/gds';

export const Default = () => (
  <PasswordInput
    label="Password"
    placeholder="Enter your password"
    defaultValue="correct-horse-battery"
  />
);

export const WithError = () => (
  <PasswordInput
    label="Password"
    placeholder="Enter your password"
    defaultValue="short"
    error="Password must be at least 12 characters."
  />
);

export const Described = () => (
  <PasswordInput
    label="New password"
    description="Use 12+ characters with a mix of letters, numbers, and symbols."
    placeholder="Create a password"
  />
);

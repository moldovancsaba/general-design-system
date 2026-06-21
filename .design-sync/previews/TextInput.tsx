import { TextInput } from '@doneisbetter/gds';
import { IconSearch, IconMail } from '@tabler/icons-react';

export const Default = () => (
  <TextInput
    label="Workspace name"
    description="Shown to everyone in your organization."
    placeholder="Acme Inc."
  />
);

export const WithIcon = () => (
  <TextInput
    label="Email address"
    leftSection={<IconMail size={16} />}
    placeholder="you@company.com"
    defaultValue="ada@northwind.example"
  />
);

export const Error = () => (
  <TextInput
    label="Subdomain"
    placeholder="your-team"
    defaultValue="my team"
    error="Subdomains may only contain letters, numbers, and hyphens."
    withAsterisk
  />
);

export const Disabled = () => (
  <TextInput
    label="Account ID"
    leftSection={<IconSearch size={16} />}
    defaultValue="acct_9f12c8"
    disabled
  />
);

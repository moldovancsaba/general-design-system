import { AdminTextInput } from '@sovereignsquad/gds';

export const Default = () => (
  <AdminTextInput
    name="businessName"
    label="Business name"
    description="Shown as the listing title in the directory."
    value="Riverside Bakery"
  />
);

export const Required = () => (
  <AdminTextInput
    name="contactEmail"
    label="Contact email"
    value="hello@riverside.example"
    required
  />
);

export const ErrorState = () => (
  <AdminTextInput
    name="slug"
    label="URL slug"
    value="riverside bakery"
    state="error"
    error="Slugs cannot contain spaces."
  />
);

export const ReadOnly = () => (
  <AdminTextInput
    name="partnerId"
    label="Partner ID"
    value="p-104"
    readOnly
    state="readonly"
  />
);

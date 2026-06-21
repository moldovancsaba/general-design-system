import { AdminTextarea } from '@doneisbetter/gds';

export const Default = () => (
  <AdminTextarea
    name="description"
    label="Listing description"
    description="A short summary shown on the public directory page."
    value="Artisan bakery and cafe in the Old Town district, serving sourdough, pastries, and specialty coffee."
  />
);

export const Required = () => (
  <AdminTextarea
    name="reviewNotes"
    label="Review notes"
    value="Confirmed business address and verified ownership documents."
    required
  />
);

export const ErrorState = () => (
  <AdminTextarea
    name="bio"
    label="Public bio"
    value=""
    state="error"
    error="A public bio is required before publishing."
  />
);

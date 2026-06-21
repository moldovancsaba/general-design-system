import { AdminSelect } from '@doneisbetter/gds';

const regions = [
  { value: 'eu', label: 'EU-Central' },
  { value: 'us', label: 'US-West' },
  { value: 'apac', label: 'APAC' },
];

export const Default = () => (
  <AdminSelect
    name="region"
    label="Region"
    description="Determines which directory the listing appears in."
    value="eu"
    data={regions}
  />
);

export const Required = () => (
  <AdminSelect
    name="status"
    label="Listing status"
    value="published"
    required
    data={[
      { value: 'published', label: 'Published' },
      { value: 'pending', label: 'Pending review' },
      { value: 'archived', label: 'Archived' },
    ]}
  />
);

export const ErrorState = () => (
  <AdminSelect
    name="category"
    label="Category"
    value={null}
    state="error"
    error="Select a category to continue."
    placeholder="Choose a category"
    data={[
      { value: 'food', label: 'Food & drink' },
      { value: 'fitness', label: 'Fitness' },
    ]}
  />
);

export const Disabled = () => (
  <AdminSelect
    name="plan"
    label="Plan tier"
    value="pro"
    disabled
    data={[{ value: 'pro', label: 'Pro' }]}
  />
);

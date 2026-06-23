import { PageHeader, ActionBar } from '@doneisbetter/gds';

export const Default = () => (
  <PageHeader
    eyebrow="Discovery"
    title="Family-friendly places near you"
    subtitle="Curated by parents, for parents"
    description="Browse cafes, parks, and museums with high-chairs, changing tables, and stroller access."
  />
);

export const WithActions = () => (
  <PageHeader
    eyebrowVariant="ornamental"
    eyebrow="Admin"
    title="Place submissions"
    description="Review and approve community-submitted listings."
    actions={<ActionBar primary={{ action: 'add', size: 'sm' }} secondary={[{ action: 'export', size: 'sm' }]} />}
  />
);

export const Minimal = () => (
  <PageHeader title="About Partner Baby" />
);

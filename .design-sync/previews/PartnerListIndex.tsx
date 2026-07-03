import { PartnerListIndex } from '@sovereignsquad/gds';

export const Default = () => (
  <PartnerListIndex
    title="Curated lists"
    items={[
      { id: 'rainy', title: 'Best rainy-day spots', href: '#rainy', description: 'Indoor play, museums, and cozy cafes.' },
      { id: 'brunch', title: 'Stroller-friendly brunch', href: '#brunch', description: 'Step-free entrances and high-chairs.' },
      { id: 'parks', title: 'Top shaded playgrounds', href: '#parks', description: 'Toddler-safe with nearby restrooms.' },
      { id: 'nursing', title: 'Quiet nursing corners', href: '#nursing', external: true },
    ]}
  />
);

export const Empty = () => (
  <PartnerListIndex
    title="Saved lists"
    items={[]}
    empty="You haven’t saved any lists yet."
  />
);

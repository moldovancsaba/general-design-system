import { PartnerAmenityBadgeGrid } from '@doneisbetter/gds';

export const Default = () => (
  <PartnerAmenityBadgeGrid
    amenities={[
      { id: 'high-chairs', label: 'High chairs', description: 'Seating for toddlers' },
      { id: 'changing-table', label: 'Changing table', description: 'In accessible restroom' },
      { id: 'stroller', label: 'Stroller friendly', description: 'Step-free entrance' },
      { id: 'nursing', label: 'Nursing corner', description: 'Private quiet space' },
      { id: 'outdoor-seating', label: 'Outdoor seating' },
      { id: 'kids-menu', label: 'Kids menu' },
    ]}
  />
);

export const Compact = () => (
  <PartnerAmenityBadgeGrid
    amenities={[
      { id: 'parking', label: 'Parking' },
      { id: 'wifi', label: 'Free Wi-Fi' },
      { id: 'pets', label: 'Pet friendly' },
    ]}
  />
);

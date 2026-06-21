import { AmenityChipGrid } from '@doneisbetter/gds';

const amenities = [
  { id: 'wifi', label: 'Free Wi-Fi' },
  { id: 'parking', label: 'Parking' },
  { id: 'wheelchair', label: 'Wheelchair access' },
  { id: 'outdoor', label: 'Outdoor seating' },
  { id: 'pets', label: 'Pet friendly' },
  { id: 'cards', label: 'Card payments' },
];

export const Default = () => (
  <AmenityChipGrid amenities={amenities} selected={['wifi', 'outdoor', 'cards']} />
);

export const NoneSelected = () => (
  <AmenityChipGrid amenities={amenities} selected={[]} />
);

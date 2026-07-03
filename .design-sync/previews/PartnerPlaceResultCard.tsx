import { PartnerPlaceResultCard } from '@sovereignsquad/gds';

const amenityLabels = {
  highchairs: 'High chairs',
  changing: 'Changing table',
  stepfree: 'Step-free access',
  playarea: 'Play area',
  parking: 'Parking',
};

export const Default = () => (
  <PartnerPlaceResultCard
    place={{
      id: 'pl-201',
      title: 'Riverside Bakery & Cafe',
      category: 'Cafe',
      neighborhood: 'Old Town',
      amenities: ['highchairs', 'changing', 'stepfree'],
      price: '$$',
      href: '/places/riverside-bakery',
    }}
    amenityLabels={amenityLabels}
    detailLabel="View details"
  />
);

export const Active = () => (
  <PartnerPlaceResultCard
    active
    place={{
      id: 'pl-202',
      title: 'Meadow Park Playground Kiosk',
      category: 'Snacks',
      neighborhood: 'Meadow Park',
      amenities: ['playarea', 'parking', 'changing'],
      price: '$',
      href: '/places/meadow-park-kiosk',
    }}
    amenityLabels={amenityLabels}
    detailLabel="View details"
  />
);

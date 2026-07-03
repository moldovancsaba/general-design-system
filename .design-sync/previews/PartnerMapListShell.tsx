import { PartnerMapListShell, PartnerMapPin } from '@sovereignsquad/gds';

const places = [
  { id: 'green-cafe', title: 'Green Cafe', category: 'Cafe', neighborhood: 'Downtown', amenities: ['high-chairs', 'changing-table'], price: '$$' as const, href: '#green-cafe' },
  { id: 'park-tacos', title: 'Park Tacos', category: 'Mexican', neighborhood: 'Parkside', amenities: ['outdoor-seating', 'kids-menu'], price: '$' as const, href: '#park-tacos' },
  { id: 'riverside', title: 'Riverside Museum', category: 'Museum', neighborhood: 'Riverside', amenities: ['stroller', 'changing-table'], price: '$$' as const, href: '#riverside' },
];

const amenityLabels = {
  'high-chairs': 'High chairs',
  'changing-table': 'Changing table',
  'outdoor-seating': 'Outdoor seating',
  'kids-menu': 'Kids menu',
  stroller: 'Stroller friendly',
};

const mapAdapter = ({ places: p, activePlaceId }: { places: { id: string; title: string }[]; activePlaceId?: string }) => (
  <div
    style={{
      height: '100%',
      minHeight: 240,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 28,
      background:
        'linear-gradient(0deg, #e9f3ea, #e9f3ea), repeating-linear-gradient(0deg, #d8e6da 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, #d8e6da 0 1px, transparent 1px 40px)',
    }}
  >
    {p.map((place) => (
      <PartnerMapPin key={place.id} label={place.title} active={place.id === activePlaceId} />
    ))}
  </div>
);

export const Default = () => (
  <PartnerMapListShell
    places={places}
    filters={{ query: '', amenities: [], prices: [] }}
    activePlaceId="green-cafe"
    amenityLabels={amenityLabels}
    mapAdapter={mapAdapter}
  />
);

export const Empty = () => (
  <PartnerMapListShell
    places={[]}
    filters={{ query: 'unicorn castle', amenities: [], prices: [] }}
    amenityLabels={amenityLabels}
    mapAdapter={mapAdapter}
    empty="No places match your search yet."
  />
);

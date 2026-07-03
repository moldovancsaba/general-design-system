import { ListingCard } from '@sovereignsquad/gds';

const IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%236366f1'/%3E%3Cstop offset='1' stop-color='%2306b6d4'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g)'/%3E%3Ctext x='50%25' y='52%25' fill='white' font-family='sans-serif' font-size='28' text-anchor='middle'%3ELoft Studio%3C/text%3E%3C/svg%3E";

export const Default = () => (
  <ListingCard
    title="Sunlit loft in the Arts District"
    description="Open-plan studio with floor-to-ceiling windows, walk to galleries and cafes."
    image={<img src={IMG} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
    imageAlt="Sunlit loft interior"
    mediaRatio="4:3"
    price="$1,850 / mo"
    metadata={[
      { id: 'beds', label: 'Beds', value: '1' },
      { id: 'baths', label: 'Baths', value: '1' },
      { id: 'area', label: 'Area', value: '620 sq ft' },
    ]}
  />
);

export const Featured = () => (
  <ListingCard
    title="Garden townhouse with private patio"
    description="Three bedrooms across two floors, quiet tree-lined street, near transit."
    image={<img src={IMG} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
    imageAlt="Townhouse exterior"
    mediaRatio="16:9"
    featured
    price="$3,200 / mo"
    sponsoredDisclosure="Promoted listing"
    metadata={[
      { id: 'beds', label: 'Beds', value: '3' },
      { id: 'baths', label: 'Baths', value: '2' },
    ]}
  />
);

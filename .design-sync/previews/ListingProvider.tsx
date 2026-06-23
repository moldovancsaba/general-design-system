import { ListingProvider, ListingCard } from '@doneisbetter/gds';

const IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23f59e0b'/%3E%3Cstop offset='1' stop-color='%23ef4444'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g)'/%3E%3Ctext x='50%25' y='52%25' fill='white' font-family='sans-serif' font-size='26' text-anchor='middle'%3EHarbor View%3C/text%3E%3C/svg%3E";

export const Default = () => (
  <ListingProvider config={{ defaultSort: 'price', defaultPageSize: 12 }}>
    <ListingCard
      title="Harbor-view one bedroom"
      description="South-facing balcony, in-unit laundry, dedicated parking spot included."
      image={<img src={IMG} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      imageAlt="Harbor view apartment"
      mediaRatio="4:3"
      price="$2,100 / mo"
      metadata={[
        { id: 'beds', label: 'Beds', value: '1' },
        { id: 'baths', label: 'Baths', value: '1' },
      ]}
    />
  </ListingProvider>
);

import { PartnerPlaceDetailTemplate } from '@doneisbetter/gds';

const labels = {
  back: 'Back to results',
  photos: 'Photos',
  website: 'Website',
  menu: 'Menu',
  share: 'Share',
  parentTip: 'Parent tip',
  copied: 'Link copied',
  shareFailed: "Couldn't copy link",
};

export const Default = () => (
  <PartnerPlaceDetailTemplate
    backHref="/places"
    labels={labels}
    place={{
      id: 'pl-201',
      title: 'Riverside Bakery & Cafe',
      address: '14 Mill Lane, Old Town',
      phone: '+1 (555) 014-2200',
      neighborhood: 'Old Town',
      category: 'Cafe',
      parentTip: 'High chairs are out front and there is a quiet corner with a changing table near the back.',
      amenities: [
        { id: 'highchairs', label: 'High chairs' },
        { id: 'changing', label: 'Changing table' },
        { id: 'stepfree', label: 'Step-free access' },
      ],
      links: {
        photos: '/places/riverside-bakery/photos',
        website: 'https://example.com/riverside',
        menu: '/places/riverside-bakery/menu',
        shareUrl: 'https://example.com/places/riverside-bakery',
      },
    }}
  />
);

export const Shared = () => (
  <PartnerPlaceDetailTemplate
    backHref="/places"
    labels={labels}
    shareState="copied"
    place={{
      id: 'pl-202',
      title: 'Meadow Park Playground Kiosk',
      address: 'Meadow Park, North Gate',
      neighborhood: 'Meadow Park',
      category: 'Snacks',
      parentTip: 'Right beside the fenced playground — easy to keep an eye on kids while you grab a coffee.',
      amenities: [
        { id: 'playarea', label: 'Play area' },
        { id: 'parking', label: 'Parking' },
      ],
      links: {
        shareUrl: 'https://example.com/places/meadow-park-kiosk',
      },
    }}
  />
);

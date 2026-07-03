import { PartnerAboutPageSections } from '@sovereignsquad/gds';

export const Default = () => (
  <PartnerAboutPageSections
    title="About Partner Baby"
    sections={[
      { id: 'mission', title: 'Our mission', body: 'We help parents find places that genuinely welcome young families — from high-chairs to quiet nursing corners.' },
      { id: 'how', title: 'How listings are curated', body: 'Every place is submitted by a parent and reviewed for accuracy before it appears on the map.' },
      { id: 'community', title: 'Community first', body: 'Reviews, amenity tags, and tips all come from the people who actually visit with little ones.' },
    ]}
  />
);

export const TwoSections = () => (
  <PartnerAboutPageSections
    title="Frequently covered topics"
    sections={[
      { id: 'privacy', title: 'Privacy', body: 'We never sell your data. Saved places stay on your device unless you create an account.' },
      { id: 'accuracy', title: 'Keeping it accurate', body: 'Spot something wrong? Flag a listing and a moderator will follow up within 48 hours.' },
    ]}
  />
);

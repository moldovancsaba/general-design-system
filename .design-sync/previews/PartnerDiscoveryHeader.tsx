import { PartnerDiscoveryHeader } from '@sovereignsquad/gds';

export const Default = () => (
  <PartnerDiscoveryHeader
    logo={<strong>Partner Baby</strong>}
    navItems={[
      { id: 'map', label: 'Map', href: '#map', current: true },
      { id: 'lists', label: 'Lists', href: '#lists' },
      { id: 'about', label: 'About', href: '#about' },
      { id: 'add', label: 'Add a place', href: '#submit' },
    ]}
  />
);

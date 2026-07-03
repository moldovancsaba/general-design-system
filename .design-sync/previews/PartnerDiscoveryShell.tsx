import { PartnerDiscoveryShell, PartnerAmenityBadgeGrid, PartnerContactBlock } from '@sovereignsquad/gds';

export const Default = () => (
  <PartnerDiscoveryShell
    logo={<strong>Partner Baby</strong>}
    navItems={[
      { id: 'map', label: 'Map', href: '#map', current: true },
      { id: 'lists', label: 'Lists', href: '#lists' },
      { id: 'about', label: 'About', href: '#about' },
    ]}
    footer={{
      copyright: '© 2026 Partner Baby',
      legalLinks: [
        { id: 'privacy', label: 'Privacy', href: '#privacy' },
        { id: 'terms', label: 'Terms', href: '#terms' },
      ],
      socialLinks: [{ id: 'newsletter', label: 'Newsletter', href: '#newsletter' }],
    }}
  >
    <div style={{ display: 'grid', gap: 16 }}>
      <h2 style={{ margin: 0 }}>Welcoming places for families</h2>
      <PartnerAmenityBadgeGrid
        amenities={[
          { id: 'high-chairs', label: 'High chairs' },
          { id: 'changing-table', label: 'Changing table' },
          { id: 'stroller', label: 'Stroller friendly' },
        ]}
      />
      <PartnerContactBlock title="Suggest a place" description="Know somewhere great? Tell us." email="hello@partnerbaby.example" />
    </div>
  </PartnerDiscoveryShell>
);

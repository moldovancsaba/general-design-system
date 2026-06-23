import { PartnerDiscoveryFooter } from '@doneisbetter/gds';

export const Default = () => (
  <PartnerDiscoveryFooter
    copyright="© 2026 Partner Baby"
    legalLinks={[
      { id: 'privacy', label: 'Privacy', href: '#privacy' },
      { id: 'terms', label: 'Terms', href: '#terms' },
      { id: 'cookies', label: 'Cookies', href: '#cookies' },
    ]}
    socialLinks={[
      { id: 'instagram', label: 'Instagram', href: '#', external: true },
      { id: 'newsletter', label: 'Newsletter', href: '#newsletter' },
    ]}
  />
);

export const LegalOnly = () => (
  <PartnerDiscoveryFooter
    copyright="© 2026 Partner Baby"
    legalLinks={[
      { id: 'privacy', label: 'Privacy', href: '#privacy' },
      { id: 'terms', label: 'Terms', href: '#terms' },
    ]}
  />
);

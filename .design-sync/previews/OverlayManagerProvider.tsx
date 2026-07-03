import { OverlayManagerProvider, PartnerContactBlock } from '@sovereignsquad/gds';

export const Default = () => (
  <OverlayManagerProvider singleOverlayMode>
    <PartnerContactBlock
      title="Overlay-managed surface"
      description="This child mounts inside an OverlayManagerProvider, which coordinates a single active overlay (modal, drawer, sheet) per route."
      email="hello@partnerbaby.example"
    />
  </OverlayManagerProvider>
);

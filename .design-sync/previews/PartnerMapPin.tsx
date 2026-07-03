import { PartnerMapPin } from '@sovereignsquad/gds';

const mapFrame: React.CSSProperties = {
  position: 'relative',
  height: 220,
  borderRadius: 12,
  border: '1px solid #dee2e6',
  overflow: 'hidden',
  background:
    'linear-gradient(0deg, #e9f3ea, #e9f3ea), repeating-linear-gradient(0deg, #d8e6da 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, #d8e6da 0 1px, transparent 1px 40px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 32,
};

export const Default = () => (
  <div style={mapFrame}>
    <PartnerMapPin label="Green Cafe" />
    <PartnerMapPin label="Park Tacos" />
  </div>
);

export const Active = () => (
  <div style={mapFrame}>
    <PartnerMapPin label="Riverside Museum" active />
    <PartnerMapPin label="Sunny Playground" />
  </div>
);

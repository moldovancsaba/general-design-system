import { PartnerMapControls } from '@sovereignsquad/gds';

const mapFrame: React.CSSProperties = {
  position: 'relative',
  height: 220,
  borderRadius: 12,
  border: '1px solid #dee2e6',
  overflow: 'hidden',
  background:
    'linear-gradient(0deg, #e9f3ea, #e9f3ea), repeating-linear-gradient(0deg, #d8e6da 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, #d8e6da 0 1px, transparent 1px 40px)',
};

export const Default = () => (
  <div style={mapFrame}>
    <div style={{ position: 'absolute', top: 12, right: 12 }}>
      <PartnerMapControls zoomInLabel="Zoom in" zoomOutLabel="Zoom out" />
    </div>
  </div>
);

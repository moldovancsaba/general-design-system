import { Loader, GdsSafeBox } from '@sovereignsquad/gds';

export const Default = () => (
  <GdsSafeBox
    safeStyle={{ background: 'surface', border: 'default', radius: 'lg', inset: 'lg' }}
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: 200 }}
  >
    <Loader />
    <span style={{ fontSize: 13, color: '#64748b' }}>Loading workspace…</span>
  </GdsSafeBox>
);

export const Inline = () => (
  <GdsSafeBox
    safeStyle={{ background: 'surface', border: 'default', radius: 'lg', inset: 'md' }}
    style={{ display: 'flex', alignItems: 'center', gap: 10, width: 220 }}
  >
    <Loader size="sm" />
    <span style={{ fontSize: 14 }}>Saving changes</span>
  </GdsSafeBox>
);

import { GdsSafeBox } from '@sovereignsquad/gds';

export const Surface = () => (
  <GdsSafeBox
    safeStyle={{ background: 'surface', border: 'default', radius: 'lg', shadow: 'raised', inset: 'md' }}
  >
    <h3 style={{ margin: '0 0 4px' }}>Account summary</h3>
    <p style={{ margin: 0 }}>
      A safely-bounded surface using semantic background, border, and radius tokens.
    </p>
  </GdsSafeBox>
);

export const Accent = () => (
  <GdsSafeBox safeStyle={{ background: 'accent', radius: 'md', inset: 'md' }}>
    <strong>New</strong> — Regional reporting is now available in your workspace.
  </GdsSafeBox>
);

export const Danger = () => (
  <GdsSafeBox safeStyle={{ background: 'danger', border: 'danger', radius: 'md', inset: 'md' }}>
    Payment failed. Update your billing method to avoid interruption.
  </GdsSafeBox>
);

import { MonospaceInputFrame } from '@sovereignsquad/gds';

export const Default = () => (
  <MonospaceInputFrame style={{ width: 280 }}>
    <input
      defaultValue="GDS-4F9C-21A7-XK02"
      readOnly
      style={{
        border: 'none', outline: 'none', background: 'transparent',
        fontFamily: 'monospace', fontSize: 14, width: '100%', padding: '8px 10px',
      }}
    />
  </MonospaceInputFrame>
);

export const ApiKey = () => (
  <MonospaceInputFrame style={{ width: 320 }}>
    <code style={{ fontFamily: 'monospace', fontSize: 13, display: 'block', padding: '8px 10px' }}>
      sk_live_a1b2c3d4e5f6g7h8i9j0
    </code>
  </MonospaceInputFrame>
);

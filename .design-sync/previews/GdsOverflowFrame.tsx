import { GdsOverflowFrame } from '@doneisbetter/gds';

export const ScrollX = () => (
  <GdsOverflowFrame policy="scroll-x" label="Region columns" style={{ maxWidth: 280 }}>
    <div style={{ display: 'flex', gap: 8, width: 'max-content' }}>
      {['North', 'South', 'East', 'West', 'Central', 'Coastal'].map((r) => (
        <div
          key={r}
          style={{
            padding: '8px 16px',
            border: '1px solid #d0d7de',
            borderRadius: 8,
            whiteSpace: 'nowrap',
          }}
        >
          {r} region
        </div>
      ))}
    </div>
  </GdsOverflowFrame>
);

export const Clip = () => (
  <GdsOverflowFrame policy="clip" label="Truncated banner" style={{ maxWidth: 220 }}>
    <div style={{ whiteSpace: 'nowrap', padding: 8 }}>
      This long announcement banner is clipped to the frame width.
    </div>
  </GdsOverflowFrame>
);

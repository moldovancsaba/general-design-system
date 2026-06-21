import { ClippedFlexChild } from '@doneisbetter/gds';

export const Default = () => (
  <div
    style={{
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      maxWidth: 360,
      padding: 12,
      border: '1px solid var(--mantine-color-gray-3)',
      borderRadius: 10,
    }}
  >
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: 'var(--mantine-color-violet-5)',
        flexShrink: 0,
      }}
    />
    <ClippedFlexChild style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      A very long discoverable title that must truncate cleanly inside a flex row without pushing the trailing action out of view
    </ClippedFlexChild>
    <button type="button" style={{ flexShrink: 0 }}>Open</button>
  </div>
);

export const TwoLines = () => (
  <div style={{ display: 'flex', gap: 12, maxWidth: 340 }}>
    <ClippedFlexChild>
      <div style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        general-design-system / shared package consumer report
      </div>
      <div style={{ fontSize: 12, opacity: 0.7, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        Updated by the platform team a few minutes ago across all tenants
      </div>
    </ClippedFlexChild>
  </div>
);

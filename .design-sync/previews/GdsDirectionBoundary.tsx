import { GdsDirectionBoundary } from '@doneisbetter/gds';

const block = {
  border: '1px solid var(--mantine-color-gray-3, #ced4da)',
  borderRadius: 8,
  padding: 16,
  background: 'var(--mantine-color-gray-0, #f8f9fa)',
};

export const Default = () => (
  <GdsDirectionBoundary locale="en-US">
    <div style={block}>
      <h4 style={{ margin: '0 0 4px' }}>Left to right</h4>
      <p style={{ margin: 0 }}>Content flows in the reading direction for this locale.</p>
    </div>
  </GdsDirectionBoundary>
);

export const SideBySide = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
    <GdsDirectionBoundary locale="en-US">
      <div style={block}>
        <strong>LTR · English</strong>
        <p style={{ margin: '4px 0 0' }}>Read this from the left side first.</p>
      </div>
    </GdsDirectionBoundary>
    <GdsDirectionBoundary locale="ar-EG">
      <div style={block}>
        <strong>RTL · العربية</strong>
        <p style={{ margin: '4px 0 0' }}>اقرأ هذا من الجهة اليمنى أولاً.</p>
      </div>
    </GdsDirectionBoundary>
  </div>
);

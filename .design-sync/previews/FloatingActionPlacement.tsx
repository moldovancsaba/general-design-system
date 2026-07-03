import { FloatingActionPlacement, SemanticButton, SectionPanel } from '@sovereignsquad/gds';

export const Default = () => (
  <div style={{ position: 'relative', minHeight: 220, border: '1px dashed var(--mantine-color-gray-4)', borderRadius: 8 }}>
    <SectionPanel title="Order list" description="Scrollable content surface.">
      <p>The floating action stays pinned to the bottom-end corner of this container.</p>
    </SectionPanel>
    <FloatingActionPlacement position="bottom-end">
      <SemanticButton action="add" />
    </FloatingActionPlacement>
  </div>
);

export const TopStart = () => (
  <div style={{ position: 'relative', minHeight: 220, border: '1px dashed var(--mantine-color-gray-4)', borderRadius: 8 }}>
    <SectionPanel title="Document" description="Reading surface.">
      <p>Pinned to the top-start corner with a larger offset.</p>
    </SectionPanel>
    <FloatingActionPlacement position="top-start" offset={24}>
      <SemanticButton action="edit" variant="filled" />
    </FloatingActionPlacement>
  </div>
);

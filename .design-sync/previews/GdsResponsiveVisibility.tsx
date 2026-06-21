import { GdsResponsiveVisibility } from '@doneisbetter/gds';

export const Visible = () => (
  <GdsResponsiveVisibility visibility="visible">
    <div style={{ padding: 12, border: '1px solid #d0d7de', borderRadius: 8 }}>
      Always visible — shown at every breakpoint.
    </div>
  </GdsResponsiveVisibility>
);

export const PerBreakpoint = () => (
  <GdsResponsiveVisibility visibility={{ base: 'visible', md: 'hidden' }}>
    <div style={{ padding: 12, border: '1px dashed #4f46e5', borderRadius: 8 }}>
      Visible on small screens, hidden from the md breakpoint up.
    </div>
  </GdsResponsiveVisibility>
);

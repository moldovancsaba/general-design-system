import { LayeredSurfaceSlot, BodyText, LabelText } from '@sovereignsquad/gds';

const Content = ({ label, body }: { label: string; body: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 16 }}>
    <LabelText>{label}</LabelText>
    <BodyText>{body}</BodyText>
  </div>
);

export const Base = () => (
  <LayeredSurfaceSlot layer="base">
    <Content label="Base layer" body="The flat background surface that page content sits on." />
  </LayeredSurfaceSlot>
);

export const Raised = () => (
  <LayeredSurfaceSlot layer="raised">
    <Content label="Raised layer" body="A card-level surface lifted above the base with subtle elevation." />
  </LayeredSurfaceSlot>
);

export const Overlay = () => (
  <LayeredSurfaceSlot layer="overlay">
    <Content label="Overlay layer" body="The top surface used for popovers, menus, and dialogs." />
  </LayeredSurfaceSlot>
);

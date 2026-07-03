import * as React from 'react';
import { PublicCaptureFlow, GdsMediaFrame } from '@sovereignsquad/gds';

const hardware = (
  <GdsMediaFrame aspectRatio="16/9">
    <img
      alt="Live camera surface"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      src={
        'data:image/svg+xml;utf8,' +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0f172a"/><stop offset="1" stop-color="#334155"/></linearGradient></defs><rect width="640" height="360" fill="url(#g)"/><circle cx="320" cy="180" r="64" fill="none" stroke="#38bdf8" stroke-width="4"/></svg>',
        )
      }
    />
  </GdsMediaFrame>
);

export const Capture = () => (
  <PublicCaptureFlow
    stage="capture"
    state="ready"
    title="Capture your moment"
    description="Frame yourself inside the guide, then hold steady to capture."
    hardwareSurface={hardware}
    actions={[
      { action: 'send', priority: 'primary' },
      { action: 'cancel', priority: 'secondary' },
    ]}
  />
);

export const PermissionDenied = () => (
  <PublicCaptureFlow
    stage="capture"
    state="permission-denied"
    title="Camera access needed"
    description="We could not access your camera. Enable permissions to continue."
    notice="Permission denied by the browser."
    actions={[{ action: 'refresh', priority: 'primary' }]}
  />
);

export const Complete = () => (
  <PublicCaptureFlow
    stage="cta"
    state="complete"
    title="All done!"
    description="Your capture is saved. Share it or start a new session."
    body={<p>Your moment has been captured and stored securely. You can share it now or capture another.</p>}
    actions={[
      { action: 'send', priority: 'primary' },
      { action: 'refresh', priority: 'secondary' },
    ]}
  />
);

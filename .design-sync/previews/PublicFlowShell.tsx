import * as React from 'react';
import { PublicFlowShell, GdsMediaFrame } from '@sovereignsquad/gds';

const hardware = (
  <GdsMediaFrame aspectRatio="16/9">
    <img
      alt="Live preview"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      src={
        'data:image/svg+xml;utf8,' +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e293b"/><stop offset="1" stop-color="#475569"/></linearGradient></defs><rect width="640" height="360" fill="url(#g)"/></svg>',
        )
      }
    />
  </GdsMediaFrame>
);

export const Ready = () => (
  <PublicFlowShell
    eyebrow="Capture session"
    hardwareSurface={hardware}
    stage={{
      id: 'capture',
      title: 'Capture your moment',
      description: 'Frame yourself inside the guide, then capture.',
      status: 'ready',
      actions: [
        { action: 'send', priority: 'primary' },
        { action: 'cancel', priority: 'secondary' },
      ],
    }}
  />
);

export const Complete = () => (
  <PublicFlowShell
    eyebrow="Capture session"
    stage={{
      id: 'done',
      title: 'All set!',
      description: 'Your capture is saved and ready to share.',
      status: 'complete',
      body: <p>Your moment has been captured and stored securely. Share it now or start a new session.</p>,
      actions: [{ action: 'refresh', priority: 'primary' }],
    }}
  />
);

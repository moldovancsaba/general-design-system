import * as React from 'react';
import { PublicAcceptStep, SemanticButton, GdsMediaFrame } from '@sovereignsquad/gds';

const preview = (
  <GdsMediaFrame aspectRatio="16/9">
    <img
      alt="Captured preview"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      src={
        'data:image/svg+xml;utf8,' +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6366f1"/><stop offset="1" stop-color="#0ea5e9"/></linearGradient></defs><rect width="640" height="360" fill="url(#g)"/></svg>',
        )
      }
    />
  </GdsMediaFrame>
);

export const Default = () => (
  <PublicAcceptStep
    preview={preview}
    actions={
      <>
        <SemanticButton action="confirm" />
        <SemanticButton action="refresh" variant="default" />
      </>
    }
  />
);

export const PreviewOnly = () => <PublicAcceptStep preview={preview} />;

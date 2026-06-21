import * as React from 'react';
import { PublicShareOverlay } from '@doneisbetter/gds';

export const Default = () => (
  <PublicShareOverlay
    url="https://doneisbetter.com/share/abc123"
    title="Check out my capture"
    text="Made with the General Design System capture flow."
    label="Share this moment"
    description="Send your capture across any channel."
    channels={['copy', 'mail', 'x', 'whatsapp', 'linkedin']}
  />
);

export const Compact = () => (
  <PublicShareOverlay
    compact
    url="https://doneisbetter.com/share/abc123"
    title="Check out my capture"
    channels={['copy', 'mail', 'x']}
  />
);

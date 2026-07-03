import * as React from 'react';
import { PublicBrandFooter, SemanticButton } from '@sovereignsquad/gds';

export const Default = () => (
  <PublicBrandFooter
    brandTitle="General Design System"
    description="Shared primitives keep every public surface on-brand without local component drift."
    actions={<SemanticButton action="download" variant="filled" />}
    secondary={<a href="#docs">Documentation</a>}
    legal="© 2026 sovereignsquad — All rights reserved."
  />
);

export const Compact = () => (
  <PublicBrandFooter
    compact
    brandTitle="GDS"
    description="Canonical public footer, compact layout."
    legal="© 2026 sovereignsquad"
  />
);

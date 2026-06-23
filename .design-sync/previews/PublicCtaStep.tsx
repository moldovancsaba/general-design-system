import * as React from 'react';
import { PublicCtaStep, SemanticButton } from '@doneisbetter/gds';

export const Default = () => (
  <PublicCtaStep>
    <SemanticButton action="send" variant="filled" />
    <SemanticButton action="refresh" variant="default" />
  </PublicCtaStep>
);

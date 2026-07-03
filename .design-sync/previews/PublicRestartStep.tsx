import * as React from 'react';
import { PublicRestartStep, SemanticButton } from '@sovereignsquad/gds';

export const Default = () => (
  <PublicRestartStep>
    <p>Session ended. Want to capture another moment?</p>
    <SemanticButton action="refresh" variant="filled" />
  </PublicRestartStep>
);

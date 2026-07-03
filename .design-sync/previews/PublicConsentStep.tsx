import * as React from 'react';
import { PublicConsentStep } from '@sovereignsquad/gds';

export const Default = () => (
  <PublicConsentStep
    consentText="I agree to the capture terms and consent to my photo being processed for this session."
    control={<input type="checkbox" defaultChecked aria-label="Consent" />}
  />
);

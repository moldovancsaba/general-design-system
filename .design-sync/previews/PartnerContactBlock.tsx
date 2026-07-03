import { PartnerContactBlock } from '@sovereignsquad/gds';

export const Default = () => (
  <PartnerContactBlock
    title="Get in touch"
    description="Questions about a listing, or want to suggest a place? Our small team reads every message."
    email="hello@partnerbaby.example"
  />
);

export const NoEmail = () => (
  <PartnerContactBlock
    title="Press & partnerships"
    description="For media requests and collaboration enquiries, reach out through our partnerships page."
  />
);

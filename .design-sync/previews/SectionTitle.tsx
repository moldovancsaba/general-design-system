import { SectionTitle, SectionPanel, BodyText } from '@sovereignsquad/gds';

export const Default = () => (
  <SectionPanel>
    <SectionTitle order={2}>Reporting overview</SectionTitle>
    <BodyText>
      Section titles establish the canonical heading rhythm for documentation and
      reference surfaces.
    </BodyText>
  </SectionPanel>
);

export const Orders = () => (
  <SectionPanel>
    <SectionTitle order={2}>Pattern families</SectionTitle>
    <SectionTitle order={3}>Foundations</SectionTitle>
    <BodyText>Tokens, color schemes, and typographic lanes.</BodyText>
    <SectionTitle order={3}>Navigation</SectionTitle>
    <BodyText>Sidebar, public nav, and discovery shells.</BodyText>
  </SectionPanel>
);

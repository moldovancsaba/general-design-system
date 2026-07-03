import { SemanticInset, SectionPanel, BodyText, SectionTitle } from '@sovereignsquad/gds';

export const Default = () => (
  <SectionPanel title="Governance callout">
    <SemanticInset>
      <SectionTitle order={4}>Bounded inset surface</SectionTitle>
      <BodyText>
        Use a semantic inset to set apart supporting detail without inventing a new
        bordered container.
      </BodyText>
    </SemanticInset>
  </SectionPanel>
);

export const Nested = () => (
  <SectionPanel title="Evidence summary">
    <SemanticInset>
      <BodyText>Two locations are missing from this reporting period.</BodyText>
    </SemanticInset>
    <SemanticInset>
      <BodyText>The visible aggregate remains usable but must be disclosed.</BodyText>
    </SemanticInset>
  </SectionPanel>
);

import { SectionPanel, BodyText, SemanticButton } from '@doneisbetter/gds';

export const Default = () => (
  <SectionPanel
    title="Shared form guidance"
    description="GDS governs labels, descriptions, validation, and submit-state behavior."
  >
    <BodyText>
      Every reference page composes the same section rhythm: a heading, a summary,
      and the actionable content below.
    </BodyText>
  </SectionPanel>
);

export const WithAction = () => (
  <SectionPanel
    title="Theme runtime"
    description="Use the package-owned color-scheme control instead of local switches."
    action={<SemanticButton action="settings" variant="light" size="xs" />}
    divided
  >
    <BodyText>Presets, font lanes, and preview diagnostics live in the canonical route.</BodyText>
  </SectionPanel>
);

export const Tones = () => (
  <div style={{ display: 'grid', gap: 16 }}>
    <SectionPanel tone="warning" title="Migration pending" description="Three teams still consume the deprecated shell.">
      <BodyText>Schedule the upgrade before the next release train.</BodyText>
    </SectionPanel>
    <SectionPanel tone="critical" title="Dependency exception" description="A cross-boundary import awaits governance review.">
      <BodyText>Resolve the violation to restore a clean build gate.</BodyText>
    </SectionPanel>
    <SectionPanel tone="supporting" title="Documentation note">
      <BodyText>Pattern guidance now ships alongside every component.</BodyText>
    </SectionPanel>
  </div>
);

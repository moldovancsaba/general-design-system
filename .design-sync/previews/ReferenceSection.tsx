import { ReferenceSection, BodyText } from '@doneisbetter/gds';

export const Default = () => (
  <ReferenceSection
    title="Governed section framing"
    description="Reference pages should use one canonical section rhythm for heading, summary, and actionable content."
    eyebrow="Reference"
  >
    <BodyText>
      This section is the package-owned docs contract used across the official site.
    </BodyText>
  </ReferenceSection>
);

export const WithLink = () => (
  <ReferenceSection
    title="Browse pattern families"
    description="Every documented pattern is grouped into a public route so visitors can inspect the live contract."
    href="/general-design-system/patterns"
    linkLabel="Open pattern catalog"
  >
    <BodyText>Each entry keeps its section, family, route, and summary aligned with the canonical inventory.</BodyText>
  </ReferenceSection>
);

export const Tones = () => (
  <div style={{ display: 'grid', gap: 16 }}>
    <ReferenceSection tone="warning" title="Coverage gap" description="Two patterns still lack a shipped surface.">
      <BodyText>Document the bounded example before the next audit.</BodyText>
    </ReferenceSection>
    <ReferenceSection tone="critical" title="Local authority detected" description="A reusable surface was authored in the app layer.">
      <BodyText>Promote it into GDS to keep the site a strict consumer.</BodyText>
    </ReferenceSection>
  </div>
);

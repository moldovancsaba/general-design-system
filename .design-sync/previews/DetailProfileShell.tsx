import { DetailProfileShell, PageHeader, MetricCard, ConsumerSection, SemanticButton, CtaButtonGroup } from '@sovereignsquad/gds';

export const Page = () => (
  <DetailProfileShell
    mode="page"
    hero={<PageHeader title="Aurora Bakehouse" description="Artisan bakery · Downtown · Open until 8pm" />}
    actions={<CtaButtonGroup primary={<SemanticButton action="start">Book a table</SemanticButton>} secondary={<SemanticButton action="settings">Share</SemanticButton>} />}
    sections={[
      <ConsumerSection key="about" title="About" description="What guests can expect.">
        <p style={{ margin: 0 }}>Sourdough loaves, seasonal pastries, and single-origin coffee, baked fresh each morning.</p>
      </ConsumerSection>,
      <ConsumerSection key="stats" title="At a glance">
        <div style={{ display: 'flex', gap: 16 }}>
          <MetricCard label="Rating" value="4.8" description="312 reviews" />
          <MetricCard label="Price" value="$$" description="Per person" />
        </div>
      </ConsumerSection>,
    ]}
    related={(
      <ConsumerSection title="Nearby" tone="supporting">
        <p style={{ margin: 0 }}>Riverside Coffee · Maple & Co · The Corner Deli</p>
      </ConsumerSection>
    )}
    showDividers
  />
);

export const Drawer = () => (
  <DetailProfileShell
    mode="drawer"
    padding="md"
    hero={<PageHeader title="Aurora Bakehouse" description="Quick view" />}
    actions={<SemanticButton action="start">Book</SemanticButton>}
    sections={[
      <ConsumerSection key="about" title="About">
        <p style={{ margin: 0 }}>Artisan bakery serving sourdough and seasonal pastries downtown.</p>
      </ConsumerSection>,
    ]}
  />
);

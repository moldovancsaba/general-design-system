import { Container, PageHeader, MetricCard, ConsumerDashboardGrid } from '@doneisbetter/gds';

export const Default = () => (
  <Container>
    <PageHeader
      title="Catalog overview"
      description="Container centers page content and applies the shared max-width and gutters."
    />
    <ConsumerDashboardGrid columns={3}>
      <MetricCard label="Components" value="253" description="Published in the shared catalog." />
      <MetricCard label="Patterns" value="48" description="Composed from primitives." />
      <MetricCard label="Coverage" value="100%" description="Every export has a live demo." />
    </ConsumerDashboardGrid>
  </Container>
);

export const Narrow = () => (
  <Container style={{ maxWidth: 420 }}>
    <PageHeader
      title="Read width"
      description="Constrain to a comfortable measure for long-form content and forms."
    />
    <p style={{ margin: 0, lineHeight: 1.6 }}>
      The Container primitive keeps line length readable so prose and field stacks stay scannable
      across breakpoints without bespoke layout code.
    </p>
  </Container>
);

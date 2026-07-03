import { ArticleShell } from '@sovereignsquad/gds';

export const Default = () => (
  <ArticleShell
    eyebrow="Editorial"
    title="How reference docs stay strict"
    lead="A single shared shell keeps long-form article content consistent across the catalog."
    meta={<span>5 min read · Updated June 2026</span>}
  >
    <p>
      Every article in the catalog renders through the same shell, so headings,
      spacing, and side rails stay aligned no matter who authored the page.
    </p>
    <p>
      Authors focus on content while the shell owns layout, typography rhythm,
      and responsive behavior.
    </p>
  </ArticleShell>
);

export const WithSideRail = () => (
  <ArticleShell
    eyebrow="Docs"
    title="Install the design system"
    lead="Follow the package and provider setup flow to get a styled app running."
    meta={<span>Scope: Pattern catalog</span>}
    sideRail={
      <nav style={{ display: 'grid', gap: 8 }}>
        <strong style={{ fontSize: 12, opacity: 0.6 }}>On this page</strong>
        <a href="#install">Install packages</a>
        <a href="#provider">Wire the provider</a>
        <a href="#verify">Verify alignment</a>
      </nav>
    }
  >
    <p>Install packages, wire the provider, and verify release alignment.</p>
  </ArticleShell>
);

import { ScrollArea, SectionPanel, BodyText, SectionTitle } from '@sovereignsquad/gds';

export const Default = () => (
  <SectionPanel title="Release notes" description="Long-form content inside a bounded scroll surface.">
    <ScrollArea style={{ height: 180 }}>
      <div style={{ display: 'grid', gap: 12, paddingRight: 12 }}>
        {[
          '3.4.14 — Access gate runtime delivered.',
          '3.4.13 — Design handoff contract shipped.',
          '3.4.12 — Content design system finalized.',
          '3.4.11 — i18n runtime components added.',
          '3.4.10 — Production page templates landed.',
          '3.4.9 — Reporting section evidence slots.',
          '3.4.8 — Reference link grid columns prop.',
          '3.4.7 — Sidebar nav sections and items.',
        ].map((line) => (
          <div key={line}>
            <SectionTitle order={4}>{line.split(' — ')[0]}</SectionTitle>
            <BodyText>{line.split(' — ')[1]}</BodyText>
          </div>
        ))}
      </div>
    </ScrollArea>
  </SectionPanel>
);

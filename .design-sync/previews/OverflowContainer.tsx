import { OverflowContainer } from '@doneisbetter/gds';

export const Default = () => (
  <OverflowContainer label="Release notes" maxHeight={180} style={{ padding: 16, border: '1px solid #e9ecef', borderRadius: 12, background: '#fff' }}>
    <div style={{ display: 'grid', gap: 10 }}>
      <strong>Changelog — June 2026</strong>
      <p>3.4.14 — Partner discovery family ships with map/list shell, amenity badges, and FAQ list.</p>
      <p>3.4.13 — Access gate runtime delivered with kind-based actions.</p>
      <p>3.4.12 — Content design system tokens and editorial primitives.</p>
      <p>3.4.11 — i18n runtime components and locale-aware formatting.</p>
      <p>3.4.10 — Production page templates with metric card slots.</p>
      <p>3.4.9 — Design handoff contract and governance diagnostics.</p>
      <p>3.4.8 — Notification center with audit policy.</p>
    </div>
  </OverflowContainer>
);

export const ShortContent = () => (
  <OverflowContainer label="Summary" maxHeight={180} style={{ padding: 16, border: '1px solid #e9ecef', borderRadius: 12, background: '#fff' }}>
    <p>A single short paragraph that fits comfortably with no scroll needed.</p>
  </OverflowContainer>
);

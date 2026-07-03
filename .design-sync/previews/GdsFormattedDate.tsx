import { GdsFormattedDate } from '@sovereignsquad/gds';

export const Default = () => (
  <p style={{ fontSize: 16 }}>
    Published on <strong><GdsFormattedDate value="2026-03-14T10:30:00Z" /></strong>
  </p>
);

export const Locales = () => (
  <div style={{ display: 'grid', gap: 8, fontSize: 16 }}>
    <p>English (US): <GdsFormattedDate value="2026-03-14" locale="en-US" /></p>
    <p>German: <GdsFormattedDate value="2026-03-14" locale="de-DE" /></p>
    <p>French: <GdsFormattedDate value="2026-03-14" locale="fr-FR" /></p>
    <p>Japanese: <GdsFormattedDate value="2026-03-14" locale="ja-JP" /></p>
  </div>
);

export const EventCard = () => (
  <div style={{ border: '1px solid var(--mantine-color-gray-3, #ced4da)', borderRadius: 8, padding: 16, maxWidth: 320 }}>
    <h4 style={{ margin: '0 0 4px' }}>Quarterly review</h4>
    <p style={{ margin: 0, color: 'var(--mantine-color-dimmed, #868e96)' }}>
      Scheduled for <GdsFormattedDate value="2026-06-30T14:00:00Z" />
    </p>
  </div>
);

import { GdsFormattedNumber } from '@doneisbetter/gds';

export const Default = () => (
  <p style={{ fontSize: 16 }}>
    Total active users: <strong><GdsFormattedNumber value={1284502} /></strong>
  </p>
);

export const Styles = () => (
  <div style={{ display: 'grid', gap: 8, fontSize: 16 }}>
    <p>Decimal: <GdsFormattedNumber value={1234567.89} style="decimal" /></p>
    <p>Percent: <GdsFormattedNumber value={0.726} style="percent" /></p>
    <p>Currency: <GdsFormattedNumber value={4999.5} style="currency" /></p>
  </div>
);

export const Locales = () => (
  <div style={{ display: 'grid', gap: 8, fontSize: 16 }}>
    <p>US: <GdsFormattedNumber value={9876543.21} locale="en-US" /></p>
    <p>German: <GdsFormattedNumber value={9876543.21} locale="de-DE" /></p>
    <p>French: <GdsFormattedNumber value={9876543.21} locale="fr-FR" /></p>
  </div>
);

import { GdsFormattedCurrency } from '@doneisbetter/gds';

export const Default = () => (
  <p style={{ fontSize: 16 }}>
    Order total: <strong><GdsFormattedCurrency value={1299.99} currency="USD" /></strong>
  </p>
);

export const Currencies = () => (
  <div style={{ display: 'grid', gap: 8, fontSize: 16 }}>
    <p>US pricing: <GdsFormattedCurrency value={49.0} currency="USD" /></p>
    <p>EU pricing: <GdsFormattedCurrency value={45.5} currency="EUR" locale="de-DE" /></p>
    <p>UK pricing: <GdsFormattedCurrency value={39.95} currency="GBP" locale="en-GB" /></p>
    <p>JP pricing: <GdsFormattedCurrency value={6800} currency="JPY" locale="ja-JP" /></p>
  </div>
);

export const DisplayModes = () => (
  <div style={{ display: 'grid', gap: 8, fontSize: 16 }}>
    <p>Symbol: <GdsFormattedCurrency value={1200} currency="USD" currencyDisplay="symbol" /></p>
    <p>Code: <GdsFormattedCurrency value={1200} currency="USD" currencyDisplay="code" /></p>
    <p>Name: <GdsFormattedCurrency value={1200} currency="USD" currencyDisplay="name" /></p>
  </div>
);

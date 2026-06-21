import { GdsLocaleText } from '@doneisbetter/gds';

export const Default = () => (
  <p style={{ fontSize: 16 }}>
    <GdsLocaleText id="greeting.welcome" defaultMessage="Welcome back to your dashboard" />
  </p>
);

export const WithValues = () => (
  <p style={{ fontSize: 16 }}>
    <GdsLocaleText
      id="cart.summary"
      defaultMessage="You have {count} items in your cart"
      values={{ count: 3 }}
    />
  </p>
);

export const Labels = () => (
  <div style={{ display: 'grid', gap: 8, fontSize: 16 }}>
    <p><strong><GdsLocaleText id="nav.dashboard" defaultMessage="Dashboard" /></strong></p>
    <p><strong><GdsLocaleText id="nav.settings" defaultMessage="Settings" /></strong></p>
    <p><strong><GdsLocaleText id="nav.profile" defaultMessage="Profile" /></strong></p>
  </div>
);

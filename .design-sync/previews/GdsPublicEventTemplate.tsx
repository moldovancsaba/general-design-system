import { GdsPublicEventTemplate } from '@doneisbetter/gds';

const banner =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='480' height='200'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%237c3aed'/><stop offset='1' stop-color='%23db2777'/></linearGradient></defs><rect width='480' height='200' fill='url(%23g)'/><text x='240' y='110' fill='white' font-family='sans-serif' font-size='28' text-anchor='middle'>Design Summit 2026</text></svg>"
  );

export const Ready = () => (
  <GdsPublicEventTemplate
    eyebrow="Conference"
    title="Design Systems Summit 2026"
    description="A full day of talks on scaling design systems across product teams."
    when="June 24, 2026 · 9:00 AM PT"
    location="Moscone West, San Francisco"
    media={<img src={banner} alt="Design Systems Summit banner" style={{ width: '100%', borderRadius: 8 }} />}
    details={
      <p style={{ margin: 0 }}>
        Hear from teams at scale on tokens, governance, and contribution models.
        Lunch and networking included.
      </p>
    }
    registration={<p style={{ margin: 0 }}>Registration closes June 20. Seats are limited.</p>}
    actions={[
      { id: 'register', label: 'Register', kind: 'primary' },
      { id: 'share', label: 'Share', kind: 'link' },
    ]}
  />
);

export const Loading = () => (
  <GdsPublicEventTemplate
    eyebrow="Conference"
    title="Design Systems Summit 2026"
    when="June 24, 2026 · 9:00 AM PT"
    location="Moscone West, San Francisco"
    state="loading"
  />
);

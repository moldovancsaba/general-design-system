import { GdsPlural } from '@sovereignsquad/gds';

export const Items = () => (
  <p style={{ margin: 0 }}>
    Your cart has{' '}
    <GdsPlural
      value={3}
      messages={{ one: '1 item', other: '3 items' }}
    />
    .
  </p>
);

export const Zero = () => (
  <p style={{ margin: 0 }}>
    <GdsPlural
      value={0}
      messages={{ zero: 'No messages', one: '1 message', other: '0 messages' }}
    />{' '}
    in your inbox.
  </p>
);

export const Many = () => (
  <p style={{ margin: 0 }}>
    <GdsPlural
      value={42}
      messages={{ one: '1 person is attending', other: '42 people are attending' }}
    />
  </p>
);

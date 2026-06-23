import { CountBadge } from '@doneisbetter/gds';

export const Default = () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
    <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
      Inbox <CountBadge value={12} />
    </span>
    <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
      Mentions <CountBadge value={3} />
    </span>
  </div>
);

export const Capped = () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
    <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
      Notifications <CountBadge value={126} cap={99} srLabel="More than ninety nine updates" />
    </span>
    <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
      Queue <CountBadge value={1000} cap={999} />
    </span>
  </div>
);

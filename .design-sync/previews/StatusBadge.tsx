import { StatusBadge, GdsSafeBox } from '@doneisbetter/gds';

export const Tones = () => (
  <GdsSafeBox style={{ padding: 24 }}>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StatusBadge status="success">Published</StatusBadge>
      <StatusBadge status="warning">Needs review</StatusBadge>
      <StatusBadge status="danger">Blocked</StatusBadge>
      <StatusBadge status="info">In progress</StatusBadge>
      <StatusBadge status="neutral">Draft</StatusBadge>
    </div>
  </GdsSafeBox>
);

export const InContext = () => (
  <GdsSafeBox style={{ padding: 24 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Billing portal</span>
        <StatusBadge status="success">Live</StatusBadge>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Notifications service</span>
        <StatusBadge status="warning">Degraded</StatusBadge>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Legacy import</span>
        <StatusBadge status="danger">Down</StatusBadge>
      </div>
    </div>
  </GdsSafeBox>
);

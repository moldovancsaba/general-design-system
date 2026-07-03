import { Radio, GdsSafeBox } from '@sovereignsquad/gds';

export const Group = () => (
  <GdsSafeBox style={{ padding: 24 }}>
    <Radio.Group
      label="Notification frequency"
      description="Choose how often we email you."
      defaultValue="weekly"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
        <Radio value="realtime" label="Real-time" />
        <Radio value="daily" label="Daily digest" />
        <Radio value="weekly" label="Weekly summary" />
      </div>
    </Radio.Group>
  </GdsSafeBox>
);

export const States = () => (
  <GdsSafeBox style={{ padding: 24 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Radio checked label="Selected" />
      <Radio label="Unselected" />
      <Radio disabled label="Disabled" />
      <Radio checked disabled label="Disabled selected" />
    </div>
  </GdsSafeBox>
);

export const WithError = () => (
  <GdsSafeBox style={{ padding: 24 }}>
    <Radio.Group
      label="Plan"
      error="Select a plan to continue."
      defaultValue=""
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
        <Radio value="starter" label="Starter" />
        <Radio value="pro" label="Pro" />
      </div>
    </Radio.Group>
  </GdsSafeBox>
);

import { Checkbox } from '@sovereignsquad/gds';

export const Default = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Checkbox label="Email notifications" defaultChecked />
    <Checkbox label="SMS notifications" />
    <Checkbox label="Disabled option" disabled />
  </div>
);

export const Group = () => (
  <Checkbox.Group
    label="Notify me about"
    description="Choose which events should reach your inbox."
    defaultValue={['deploys']}
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
      <Checkbox value="deploys" label="Deploys" />
      <Checkbox value="incidents" label="Incidents" />
      <Checkbox value="digests" label="Weekly digests" />
    </div>
  </Checkbox.Group>
);

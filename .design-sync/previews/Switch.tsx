import { Switch } from '@doneisbetter/gds';

export const Default = () => (
  <Switch label="Enable email notifications" />
);

export const Checked = () => (
  <Switch
    label="Two-factor authentication"
    description="Require a code at sign-in."
    defaultChecked
  />
);

export const Disabled = () => (
  <Switch label="Beta features" description="Locked by your administrator." disabled />
);

export const Group = () => (
  <Switch.Group
    label="Workspace alerts"
    description="Choose which events notify your team."
    defaultValue={['deploys']}
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
      <Switch value="deploys" label="Production deploys" />
      <Switch value="incidents" label="Incident updates" />
      <Switch value="billing" label="Billing changes" />
    </div>
  </Switch.Group>
);

import { Tabs } from '@sovereignsquad/gds';
import { IconChartBar, IconSettings, IconUsers } from '@tabler/icons-react';

export const Default = () => (
  <Tabs defaultValue="overview">
    <Tabs.List>
      <Tabs.Tab value="overview" leftSection={<IconChartBar size={16} />}>
        Overview
      </Tabs.Tab>
      <Tabs.Tab value="members" leftSection={<IconUsers size={16} />}>
        Members
      </Tabs.Tab>
      <Tabs.Tab value="settings" leftSection={<IconSettings size={16} />}>
        Settings
      </Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="overview" pt="md">
      Monthly active users grew 12% versus last period, driven by the new onboarding flow.
    </Tabs.Panel>
    <Tabs.Panel value="members" pt="md">
      24 members across 3 teams. 2 invitations are pending acceptance.
    </Tabs.Panel>
    <Tabs.Panel value="settings" pt="md">
      Configure workspace name, default roles, and notification preferences.
    </Tabs.Panel>
  </Tabs>
);

export const Pills = () => (
  <Tabs defaultValue="weekly" variant="pills" color="indigo">
    <Tabs.List>
      <Tabs.Tab value="daily">Daily</Tabs.Tab>
      <Tabs.Tab value="weekly">Weekly</Tabs.Tab>
      <Tabs.Tab value="monthly">Monthly</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="weekly" pt="md">
      Showing aggregated metrics for the week of June 15–21.
    </Tabs.Panel>
  </Tabs>
);

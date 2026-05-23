import { useState } from 'react';
import { GdsProvider } from '@gds/theme';
import { AppShell, DataTable, StatsStrip, SemanticNavLink } from '@gds/admin';
import { SemanticButton, GdsVocabulary, type SemanticAction } from '@gds/core';
import { Group, Stack, Title, Text, Button } from '@mantine/core';
import { IconLanguage } from '@tabler/icons-react';

const huMessages = {
  'gds.action.settings': 'Beállítások',
  'gds.action.analytics': 'Analitika',
  'gds.action.dashboard': 'Irányítópult',
  'gds.action.play': 'Lejátszás',
  'gds.action.start': 'Indítás',
  'gds.action.users': 'Felhasználók',
  'gds.action.add': 'Hozzáadás',
  'gds.action.edit': 'Szerkesztés',
  'gds.action.delete': 'Törlés',
  'gds.action.save': 'Mentés',
};

export default function App() {
  const [locale, setLocale] = useState<'en' | 'hu'>('en');
  const [activeTab, setActiveTab] = useState('vocabulary');

  const navLinks = [
    <SemanticNavLink 
      key="vocab" 
      action="dashboard" 
      active={activeTab === 'vocabulary'} 
      onClick={() => setActiveTab('vocabulary')} 
    />,
    <SemanticNavLink 
      key="users" 
      action="users" 
      active={activeTab === 'users'} 
      onClick={() => setActiveTab('users')} 
    />,
    <SemanticNavLink 
      key="settings" 
      action="settings" 
      active={activeTab === 'settings'} 
      onClick={() => setActiveTab('settings')} 
    />,
  ];

  const headerActions = (
    <Button 
      variant="light" 
      leftSection={<IconLanguage size="1rem" />}
      onClick={() => setLocale(l => l === 'en' ? 'hu' : 'en')}
    >
      {locale === 'en' ? 'English' : 'Magyar'}
    </Button>
  );

  return (
    <GdsProvider locale={locale} messages={locale === 'hu' ? huMessages : {}}>
      <AppShell
        logoText="GDS"
        navLinks={navLinks}
        headerActions={headerActions}
      >
        {activeTab === 'vocabulary' && (
          <Stack gap="xl" p="md">
            <div>
              <Title order={2}>Semantic Vocabulary Registry</Title>
              <Text c="dimmed" mt="sm">
                These are the canonical actions available in the GDS. Developers must use 
                the SemanticAction key (e.g., <code>&lt;SemanticButton action="settings" /&gt;</code>) 
                instead of providing raw strings and icons. This guarantees the ubiquitous language.
              </Text>
            </div>

            <Group gap="md">
              {(Object.keys(GdsVocabulary) as SemanticAction[]).map(action => (
                <SemanticButton key={action} action={action} variant="outline" />
              ))}
            </Group>
          </Stack>
        )}

        {activeTab === 'users' && (
          <Stack gap="xl" p="md">
            <StatsStrip 
              stats={[
                { label: 'Total Users', value: '4,821' },
                { label: 'Active Today', value: '312' },
                { label: 'New Signups', value: '28' }
              ]}
            />
            <DataTable 
              columns={[
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Name' },
                { key: 'role', label: 'Role' },
              ]}
              data={[
                { id: '1', name: 'Alice Cooper', role: 'Admin' },
                { id: '2', name: 'Bob Builder', role: 'User' },
              ]}
            />
          </Stack>
        )}

        {activeTab === 'settings' && (
          <Stack gap="xl" p="md">
            <Title order={2}>Settings View</Title>
            <Text c="dimmed">Use the language toggle in the header to see this translate.</Text>
            <Group>
              <SemanticButton action="edit" />
              <SemanticButton action="save" color="blue" />
              <SemanticButton action="delete" color="red" />
            </Group>
          </Stack>
        )}
      </AppShell>
    </GdsProvider>
  );
}

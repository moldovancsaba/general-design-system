import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { GdsProvider } from '@gds/theme';
import { AppShell, DataTable, StatsStrip, SemanticNavLink, InfoCard, PageHeader, FormSection } from '@gds/admin';
import { SemanticButton, GdsVocabulary, type SemanticAction } from '@gds/core';
import { Group, Stack, Button, SimpleGrid, TextInput, Switch, Paper, Box } from '@mantine/core';
import { IconLanguage, IconServer, IconActivity, IconShieldCheck } from '@tabler/icons-react';

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

function PlaygroundContent() {
  const [locale, setLocale] = useState<'en' | 'hu'>('en');
  const location = useLocation();

  const navLinks = [
    <SemanticNavLink 
      key="dashboard" 
      action="dashboard" 
      component={Link}
      to="/"
      active={location.pathname === '/'} 
    />,
    <SemanticNavLink 
      key="users" 
      action="users" 
      component={Link}
      to="/users"
      active={location.pathname === '/users'} 
    />,
    <SemanticNavLink 
      key="settings" 
      action="settings" 
      component={Link}
      to="/settings"
      active={location.pathname === '/settings'} 
    />,
    <SemanticNavLink 
      key="vocab" 
      action="analytics" 
      component={Link}
      to="/vocabulary"
      active={location.pathname === '/vocabulary'} 
    />,
  ];

  const headerActions = (
    <Button 
      variant="light" 
      radius="md"
      leftSection={<IconLanguage size="1.2rem" />}
      onClick={() => setLocale(l => l === 'en' ? 'hu' : 'en')}
    >
      {locale === 'en' ? 'English' : 'Magyar'}
    </Button>
  );

  return (
    <GdsProvider locale={locale} messages={locale === 'hu' ? huMessages : {}}>
      <AppShell
        logoText="GDS Workspace"
        navLinks={navLinks}
        headerActions={headerActions}
      >
        <Box p="md" maw={1200} mx="auto">
          <Routes>
            <Route path="/" element={
              <Stack gap="xl">
                <PageHeader 
                  title="Overview" 
                  description="Welcome to the General Design System Live Demo."
                  actions={<SemanticButton action="play" size="md" />}
                />
                <StatsStrip 
                  stats={[
                    { label: 'Total Revenue', value: '$84,231', diff: 12.5 },
                    { label: 'Active Sessions', value: '1,204', diff: 4.2 },
                    { label: 'Bounce Rate', value: '24%', diff: -1.8 }
                  ]}
                />
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                  <InfoCard 
                    title="Server Status" 
                    value="Optimal" 
                    description="All systems running smoothly in us-east-1."
                    icon={<IconServer size="2rem" />}
                    color="teal"
                  />
                  <InfoCard 
                    title="Recent Activity" 
                    value="48 events" 
                    description="In the last 24 hours."
                    icon={<IconActivity size="2rem" />}
                    color="blue"
                  />
                  <InfoCard 
                    title="Security" 
                    value="Verified" 
                    description="No vulnerabilities found."
                    icon={<IconShieldCheck size="2rem" />}
                    color="violet"
                  />
                </SimpleGrid>
              </Stack>
            } />

            <Route path="/users" element={
              <Stack gap="xl">
                <PageHeader 
                  title="User Management" 
                  description="Manage team members and their roles."
                  actions={<SemanticButton action="add" size="md" />}
                />
                <DataTable 
                  columns={[
                    { key: 'id', label: 'ID' },
                    { key: 'name', label: 'Name' },
                    { key: 'role', label: 'Role' },
                  ]}
                  data={[
                    { id: '1', name: 'Alice Cooper', role: 'Admin' },
                    { id: '2', name: 'Bob Builder', role: 'Editor' },
                    { id: '3', name: 'Charlie Davis', role: 'Viewer' },
                  ]}
                />
              </Stack>
            } />

            <Route path="/settings" element={
              <Stack gap="xl">
                <PageHeader 
                  title="Preferences" 
                  description="Configure your workspace settings."
                />
                <FormSection title="Profile Information" description="Update your personal details.">
                  <Stack gap="md">
                    <TextInput label="Full Name" placeholder="John Doe" />
                    <TextInput label="Email Address" placeholder="john@example.com" />
                  </Stack>
                </FormSection>
                <FormSection title="Notifications" description="Choose what you want to be notified about.">
                  <Stack gap="md">
                    <Switch label="Email Notifications" description="Receive updates via email." defaultChecked />
                    <Switch label="Push Notifications" description="Receive updates on your device." />
                  </Stack>
                </FormSection>
                <Group justify="flex-end" mt="md">
                  <SemanticButton action="delete" variant="subtle" color="red" />
                  <SemanticButton action="save" size="md" />
                </Group>
              </Stack>
            } />

            <Route path="/vocabulary" element={
              <Stack gap="xl">
                <PageHeader 
                  title="Semantic Dictionary" 
                  description="A visual showcase of the canonical GDS Vocabulary."
                />
                <Paper withBorder p="xl" radius="md">
                  <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="lg">
                    {(Object.keys(GdsVocabulary) as SemanticAction[]).map(action => (
                      <SemanticButton key={action} action={action} variant="outline" fullWidth />
                    ))}
                  </SimpleGrid>
                </Paper>
              </Stack>
            } />
          </Routes>
        </Box>
      </AppShell>
    </GdsProvider>
  );
}

export default function App() {
  return (
    <Router basename="/general-design-system/">
      <PlaygroundContent />
    </Router>
  );
}

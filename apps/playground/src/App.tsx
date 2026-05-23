import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { GdsProvider } from '@gds/theme';
import { AppShell, DataTable, StatsStrip, SemanticNavLink, InfoCard, PageHeader, FormSection } from '@gds/admin';
import { SemanticButton, GdsVocabulary, type SemanticAction, en, hu, de, fr, it, ru, he, ar } from '@gds/core';
import { Stack, Button, SimpleGrid, TextInput, Switch, Paper, Box, Menu } from '@mantine/core';
import { IconLanguage, IconServer, IconActivity, IconShieldCheck, IconChevronDown } from '@tabler/icons-react';

const localesMap: Record<string, { label: string, messages: Record<string, string> }> = {
  en: { label: 'English', messages: en },
  de: { label: 'Deutsch', messages: de },
  fr: { label: 'Français', messages: fr },
  it: { label: 'Italiano', messages: it },
  ru: { label: 'Русский', messages: ru },
  he: { label: 'עברית (Hebrew)', messages: he },
  ar: { label: 'العربية (Arabic)', messages: ar },
  hu: { label: 'Magyar', messages: hu },
};

function PlaygroundContent() {
  const [locale, setLocale] = useState<string>('en');
  const location = useLocation();

  const navLinks = [
    <SemanticNavLink 
      key="overview" 
      action="home" 
      component={Link}
      to="/"
      active={location.pathname === '/'} 
    />,
    <SemanticNavLink 
      key="components" 
      action="grid" 
      component={Link}
      to="/components"
      active={location.pathname === '/components'} 
    />,
    <SemanticNavLink 
      key="vocab" 
      action="list" 
      component={Link}
      to="/vocabulary"
      active={location.pathname === '/vocabulary'} 
    />,
  ];

  const headerActions = (
    <Menu position="bottom-end" withArrow>
      <Menu.Target>
        <Button 
          variant="light" 
          radius="md"
          leftSection={<IconLanguage size="1.2rem" />}
          rightSection={<IconChevronDown size="1rem" />}
        >
          {localesMap[locale]?.label || 'Language'}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {Object.entries(localesMap).map(([key, config]) => (
          <Menu.Item key={key} onClick={() => setLocale(key)}>
            {config.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );

  return (
    <GdsProvider locale={locale} messages={localesMap[locale]?.messages || localesMap.en.messages}>
      <AppShell
        logoText="GDS Rulebook"
        navLinks={navLinks}
        headerActions={headerActions}
      >
        <Box p="md" maw={1200} mx="auto">
          <Routes>
            <Route path="/" element={
              <Stack gap="xl">
                <PageHeader 
                  title="GDS Principles & Guidelines" 
                  description="The General Design System (GDS) is built on strict ubiquitous language and semantic consistency."
                  actions={<SemanticButton action="start" size="md" />}
                />
                <StatsStrip 
                  stats={[
                    { label: 'Semantic Actions', value: '45+', diff: 100 },
                    { label: 'Consistency', value: '100%', diff: 0 },
                    { label: 'Dummy Text', value: '0%', diff: -100 }
                  ]}
                />
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                  <InfoCard 
                    title="1:1 Semantic Mapping" 
                    value="No Duplicates" 
                    description="Never reuse an icon for different concepts. E.g., 'Play' and 'Start' must be visually distinct."
                    icon={<IconShieldCheck size="2rem" />}
                    color="violet"
                  />
                  <InfoCard 
                    title="Self Documenting" 
                    value="Rulebook UI" 
                    description="This Playground acts as the official documentation. We don't use fake data here."
                    icon={<IconActivity size="2rem" />}
                    color="blue"
                  />
                  <InfoCard 
                    title="Accessible Routing" 
                    value="Shareable" 
                    description="Pages are natively routed. You can safely bookmark and share URLs."
                    icon={<IconServer size="2rem" />}
                    color="teal"
                  />
                </SimpleGrid>
              </Stack>
            } />

            <Route path="/components" element={
              <Stack gap="xl">
                <PageHeader 
                  title="Component Guidelines" 
                  description="Learn how to use @gds/admin layout and structural components correctly."
                  actions={<SemanticButton action="add" size="md" />}
                />
                <FormSection title="PageHeader Component" description="Use PageHeader at the very top of a new route view. It establishes page context and holds primary actions.">
                  <Stack gap="md">
                    <TextInput label="Title Requirement" value="Must concisely describe the page's primary domain entity." readOnly />
                    <TextInput label="Description Requirement" value="Should be a short subtitle guiding the user's focus." readOnly />
                  </Stack>
                </FormSection>
                
                <FormSection title="FormSection Component" description="Use FormSection to logically chunk large forms into categorized boxes.">
                  <Stack gap="md">
                    <Switch label="Strict Margins" description="FormSections automatically manage vertical rhythm." defaultChecked />
                    <Switch label="Semantic Actions" description="Actions inside forms should always use SemanticButton." defaultChecked />
                  </Stack>
                </FormSection>

                <FormSection title="DataTable Component" description="Use DataTable for dense list views of domain entities. It accepts strict typed columns.">
                  <DataTable 
                    columns={[
                      { key: 'prop', label: 'Prop Name' },
                      { key: 'type', label: 'Type' },
                      { key: 'required', label: 'Required' },
                    ]}
                    data={[
                      { prop: 'columns', type: 'Array<{key, label}>', required: 'Yes' },
                      { prop: 'data', type: 'Array<Record<string, any>>', required: 'Yes' },
                      { prop: 'onRowClick', type: 'Function', required: 'No' },
                    ]}
                  />
                </FormSection>
              </Stack>
            } />

            <Route path="/vocabulary" element={
              <Stack gap="xl">
                <PageHeader 
                  title="Semantic Dictionary" 
                  description="The Canonical Visual Lexicon. These buttons map exactly 1:1 to their underlying semantic concepts."
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

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
                  primaryAction={<SemanticButton action="start" size="md" />}
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
                  primaryAction={<SemanticButton action="add" size="md" />}
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

                <FormSection title="Button Micro-Interactions" description="SemanticButtons natively support physics-based hover/active states, inline micro-feedback morphing, and width-preserving loading spinners.">
                  <Stack gap="md">
                    <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
                      <SemanticButton action="save" />
                      <SemanticButton action="save" disabled />
                      <SemanticButton action="save" loading />
                      <DemoFeedbackButton />
                    </SimpleGrid>
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
                  title="Semantic Dictionary & Testing Matrix" 
                  description="Test all 45+ semantic actions across all interactive phases. These buttons map exactly 1:1 to their underlying concepts."
                />
                
                <Stack gap="xl">
                  {(Object.keys(GdsVocabulary) as SemanticAction[]).map(action => (
                    <Paper key={action} withBorder p="lg" radius="md">
                      <Stack gap="sm">
                        <Box fw={600} fz="sm" tt="uppercase" c="dimmed">gds.action.{action}</Box>
                        <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing="lg" verticalSpacing="xl">
                          <Box>
                            <Box fz="xs" c="dimmed" mb="xs">Default</Box>
                            <SemanticButton action={action} fullWidth />
                          </Box>
                          <Box>
                            <Box fz="xs" c="dimmed" mb="xs">Hover / Active</Box>
                            <SemanticButton action={action} fullWidth variant="light" />
                          </Box>
                          <Box>
                            <Box fz="xs" c="dimmed" mb="xs">Disabled</Box>
                            <SemanticButton action={action} fullWidth disabled />
                          </Box>
                          <Box>
                            <Box fz="xs" c="dimmed" mb="xs">Loading</Box>
                            <SemanticButton action={action} fullWidth loading />
                          </Box>
                          <Box>
                            <Box fz="xs" c="dimmed" mb="xs">Micro-Feedback Demo</Box>
                            <InteractiveDemoButton action={action} />
                          </Box>
                        </SimpleGrid>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </Stack>
            } />
          </Routes>
        </Box>
      </AppShell>
    </GdsProvider>
  );
}

function DemoFeedbackButton() {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<'success' | null>(null);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFeedback('success');
      setTimeout(() => setFeedback(null), 2000);
    }, 1500);
  };

  return (
    <SemanticButton 
      action="copy" 
      loading={loading}
      feedbackState={feedback}
      feedbackText="Copied!"
      onClick={handleClick}
    />
  );
}

export default function App() {
  return (
    <Router basename="/general-design-system/">
      <PlaygroundContent />
    </Router>
  );
}

function InteractiveDemoButton({ action }: { action: SemanticAction }) {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // For destructive actions, demo the error feedback state, else success
      const isDestructive = ['delete', 'clear', 'uncheck'].includes(action);
      setFeedback(isDestructive ? 'error' : 'success');
      setTimeout(() => setFeedback(null), 2000);
    }, 1000);
  };

  return (
    <SemanticButton 
      action={action} 
      fullWidth
      loading={loading}
      feedbackState={feedback}
      onClick={handleClick}
    />
  );
}

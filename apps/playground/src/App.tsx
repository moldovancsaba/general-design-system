import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { GdsProvider } from '@gds/theme';
import { AppShell, DataTable, StatsStrip, SemanticNavLink, InfoCard, PageHeader, FormSection } from '@gds/admin';
import { SemanticButton, GdsVocabulary, type SemanticAction } from '@gds/core';
import { Stack, Button, SimpleGrid, TextInput, Switch, Paper, Box } from '@mantine/core';
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
  'gds.action.language': 'Nyelv',
  'gds.action.theme': 'Téma',
  'gds.action.home': 'Főoldal',
  'gds.action.inbox': 'Beérkező',
  'gds.action.calendar': 'Naptár',
  'gds.action.gallery': 'Galéria',
  'gds.action.history': 'Előzmények',
  'gds.action.profile': 'Profil',
  'gds.action.send': 'Küldés',
  'gds.action.reply': 'Válasz',
  'gds.action.forward': 'Továbbítás',
  'gds.action.attach': 'Csatolás',
  'gds.action.upload': 'Feltöltés',
  'gds.action.download': 'Letöltés',
  'gds.action.print': 'Nyomtatás',
  'gds.action.copy': 'Másolás',
  'gds.action.duplicate': 'Duplikálás',
  'gds.action.check': 'Jelölés',
  'gds.action.uncheck': 'Jelölés törlése',
  'gds.action.complete': 'Kész',
  'gds.action.clear': 'Kiürítés',
  'gds.action.capture': 'Felvétel',
  'gds.action.record': 'Rögzítés',
  'gds.action.flip': 'Fordítás',
  'gds.action.flash': 'Vaku',
  'gds.action.course': 'Tanfolyam',
  'gds.action.lesson': 'Lecke',
  'gds.action.certificate': 'Tanúsítvány',
  'gds.action.student': 'Tanuló',
  'gds.action.class': 'Osztály',
  'gds.action.grade': 'Osztályzat',
  'gds.action.child': 'Gyermek',
  'gds.action.family': 'Család',
  'gds.action.habit': 'Szokás',
  'gds.action.goal': 'Cél',
  'gds.action.streak': 'Sorozat',
  'gds.action.reward': 'Jutalom',
  'gds.action.trophy': 'Trófea',
  'gds.action.crown': 'Korona',
  'gds.action.pause': 'Szünet',
  'gds.action.message': 'Üzenet',
  'gds.action.mail': 'Levél',
  'gds.action.refresh': 'Frissítés',
  'gds.action.trendingUp': 'Növekvő trend',
  'gds.action.trendingDown': 'Csökkenő trend',
  'gds.action.currency': 'Pénznem',
  'gds.action.grid': 'Rács',
  'gds.action.list': 'Lista',
  'gds.action.logout': 'Kijelentkezés',
  'gds.action.notifications': 'Értesítések',
  'gds.action.back': 'Vissza',
  'gds.action.eye': 'Megtekintés',
  'gds.action.eyeOff': 'Elrejtés',
  'gds.action.help': 'Súgó',
  'gds.action.filter': 'Szűrő',
  'gds.action.sort': 'Rendezés',
};

function PlaygroundContent() {
  const [locale, setLocale] = useState<'en' | 'hu'>('en');
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

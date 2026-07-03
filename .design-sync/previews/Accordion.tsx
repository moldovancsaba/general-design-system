import { Accordion } from '@sovereignsquad/gds';

export const Default = () => (
  <Accordion defaultValue="tokens">
    <Accordion.Item value="tokens">
      <Accordion.Control>Design tokens</Accordion.Control>
      <Accordion.Panel>
        Tokens define color, spacing, and typography so every surface stays on-brand.
      </Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item value="components">
      <Accordion.Control>Components</Accordion.Control>
      <Accordion.Panel>
        Governed React components compose tokens into accessible, reusable building blocks.
      </Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item value="patterns">
      <Accordion.Control>Patterns</Accordion.Control>
      <Accordion.Panel>
        Patterns assemble components into full page shells, cards, and state blocks.
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
);

export const Multiple = () => (
  <Accordion multiple defaultValue={['install', 'usage']}>
    <Accordion.Item value="install">
      <Accordion.Control>Installation</Accordion.Control>
      <Accordion.Panel>Add @sovereignsquad/gds and wrap your app in GdsProvider.</Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item value="usage">
      <Accordion.Control>Usage</Accordion.Control>
      <Accordion.Panel>Import named components and pass typed props from the catalog.</Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item value="theming">
      <Accordion.Control>Theming</Accordion.Control>
      <Accordion.Panel>Override theme tokens at the provider to retint every component.</Accordion.Panel>
    </Accordion.Item>
  </Accordion>
);

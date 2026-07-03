import { CommandPalette, CommandRegistryProvider } from '@sovereignsquad/gds';

export const Opened = () => (
  <CommandRegistryProvider>
    <CommandPalette opened />
  </CommandRegistryProvider>
);

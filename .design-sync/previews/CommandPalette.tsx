import { CommandPalette, CommandRegistryProvider } from '@doneisbetter/gds';

export const Opened = () => (
  <CommandRegistryProvider>
    <CommandPalette opened />
  </CommandRegistryProvider>
);

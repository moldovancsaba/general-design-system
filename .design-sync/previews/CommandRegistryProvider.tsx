import { CommandRegistryProvider, ConsumerSection, SemanticButton } from '@doneisbetter/gds';

export const Default = () => (
  <CommandRegistryProvider>
    <ConsumerSection
      title="Command palette"
      description="Press Cmd/Ctrl+K to open the shared command surface. Registered commands are scoped to this provider."
    >
      <div style={{ display: 'flex', gap: 12 }}>
        <SemanticButton action="search">Open command palette</SemanticButton>
        <SemanticButton action="settings">Register commands</SemanticButton>
      </div>
    </ConsumerSection>
  </CommandRegistryProvider>
);

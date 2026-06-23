import { GdsSplit } from '@doneisbetter/gds';

const Pane = ({ children, tone = 'blue' }: { children: React.ReactNode; tone?: 'blue' | 'grape' }) => (
  <div
    style={{
      background:
        tone === 'blue'
          ? 'var(--mantine-color-blue-1, #d0ebff)'
          : 'var(--mantine-color-grape-1, #eebefa)',
      border:
        tone === 'blue'
          ? '1px solid var(--mantine-color-blue-3, #74c0fc)'
          : '1px solid var(--mantine-color-grape-3, #e599f7)',
      borderRadius: 6,
      padding: 20,
      fontWeight: 600,
      minHeight: 96,
    }}
  >
    {children}
  </div>
);

export const Even = () => (
  <GdsSplit ratio="1:1" gap="md">
    <Pane>Editor</Pane>
    <Pane tone="grape">Live preview</Pane>
  </GdsSplit>
);

export const SidebarMain = () => (
  <GdsSplit ratio="1:2" gap="md">
    <Pane>Navigation</Pane>
    <Pane tone="grape">Main content</Pane>
  </GdsSplit>
);

export const MainAside = () => (
  <GdsSplit ratio="2:1" gap="lg">
    <Pane>Article body</Pane>
    <Pane tone="grape">Related links</Pane>
  </GdsSplit>
);

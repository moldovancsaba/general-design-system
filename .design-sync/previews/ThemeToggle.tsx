import { ThemeToggle } from '@sovereignsquad/gds';

export const Default = () => <ThemeToggle />;

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <ThemeToggle size="sm" />
    <ThemeToggle size="md" />
    <ThemeToggle size="lg" />
    <ThemeToggle size="xl" />
  </div>
);

import { AccentPanel } from '@sovereignsquad/gds';

export const Default = () => (
  <AccentPanel tone="violet" title="Accent band" badge="Advisory">
    <p>Use the accent panel for advisory messaging that needs gentle emphasis.</p>
    <p>Shared tonal semantics preserve readability across every surface.</p>
  </AccentPanel>
);

export const Tones = () => (
  <div style={{ display: 'grid', gap: 16 }}>
    <AccentPanel tone="green" title="Release shipped" badge="Success">
      <p>The access gate runtime is live in production for all adopters.</p>
    </AccentPanel>
    <AccentPanel tone="amber" title="Migration pending" badge="Heads up">
      <p>Three teams still consume the deprecated card shell.</p>
    </AccentPanel>
    <AccentPanel tone="red" title="Dependency exception" badge="Action needed">
      <p>A cross-boundary import is awaiting governance review.</p>
    </AccentPanel>
    <AccentPanel tone="blue" title="Documentation note">
      <p>Pattern guidance now ships alongside every component.</p>
    </AccentPanel>
  </div>
);

export const SoftOutline = () => (
  <AccentPanel tone="violet" variant="soft-outline" title="Soft outline variant">
    <p>The soft-outline variant adds a bordered frame for standalone callouts.</p>
  </AccentPanel>
);

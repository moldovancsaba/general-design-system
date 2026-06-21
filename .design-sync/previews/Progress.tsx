import { Progress, GdsSafeBox } from '@doneisbetter/gds';

export const Default = () => (
  <GdsSafeBox safeStyle={{ background: 'surface', border: 'default', radius: 'lg', inset: 'md' }}>
    <div style={{ width: 280, fontSize: 13, marginBottom: 8 }}>Upload progress — 72%</div>
    <Progress value={72} />
  </GdsSafeBox>
);

export const Sweep = () => (
  <GdsSafeBox safeStyle={{ background: 'surface', border: 'default', radius: 'lg', inset: 'md' }}>
    <div style={{ width: 280, fontSize: 13, marginBottom: 8 }}>Storage usage</div>
    <Progress.Root size="xl">
      <Progress.Section value={45} color="blue">
        <Progress.Label>Docs</Progress.Label>
      </Progress.Section>
      <Progress.Section value={30} color="teal">
        <Progress.Label>Media</Progress.Label>
      </Progress.Section>
      <Progress.Section value={15} color="orange">
        <Progress.Label>Other</Progress.Label>
      </Progress.Section>
    </Progress.Root>
  </GdsSafeBox>
);

export const Tones = () => (
  <GdsSafeBox safeStyle={{ background: 'surface', border: 'default', radius: 'lg', inset: 'md' }}>
    <div style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Progress value={92} color="green" />
      <Progress value={58} color="yellow" />
      <Progress value={24} color="red" />
    </div>
  </GdsSafeBox>
);

import { GdsChartLegend } from '@doneisbetter/gds';

const Swatch = ({ color, label }: { color: string; label: string }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
    <span style={{ width: 12, height: 12, borderRadius: 3, background: color, display: 'inline-block' }} />
    {label}
  </span>
);

export const Default = () => (
  <GdsChartLegend>
    <Swatch color="var(--mantine-color-violet-6)" label="Online" />
    <Swatch color="var(--mantine-color-teal-6)" label="Marketplace" />
    <Swatch color="var(--mantine-color-orange-6)" label="In-store" />
  </GdsChartLegend>
);

export const TwoSeries = () => (
  <GdsChartLegend>
    <Swatch color="var(--mantine-color-blue-6)" label="This year" />
    <Swatch color="var(--mantine-color-gray-5)" label="Last year" />
  </GdsChartLegend>
);

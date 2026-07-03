import { Slider, GdsSafeBox } from '@sovereignsquad/gds';

export const Default = () => (
  <GdsSafeBox style={{ padding: 24 }}>
    <Slider defaultValue={40} marks={[{ value: 0, label: '0%' }, { value: 50, label: '50%' }, { value: 100, label: '100%' }]} />
  </GdsSafeBox>
);

export const WithLabelAlways = () => (
  <GdsSafeBox style={{ padding: 24 }}>
    <Slider defaultValue={65} label={(v: number) => `${v}%`} labelAlwaysOn color="blue" />
  </GdsSafeBox>
);

export const Disabled = () => (
  <GdsSafeBox style={{ padding: 24 }}>
    <Slider defaultValue={30} disabled />
  </GdsSafeBox>
);

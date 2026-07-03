import { NumberInput, GdsSafeBox } from '@sovereignsquad/gds';

export const Default = () => (
  <GdsSafeBox safeStyle={{ background: 'surface', border: 'default', radius: 'lg', inset: 'md' }} style={{ width: 260 }}>
    <NumberInput
      label="Quantity"
      description="Units to add to this order."
      defaultValue={4}
      min={1}
      max={99}
    />
  </GdsSafeBox>
);

export const Currency = () => (
  <GdsSafeBox safeStyle={{ background: 'surface', border: 'default', radius: 'lg', inset: 'md' }} style={{ width: 260 }}>
    <NumberInput
      label="Budget cap"
      prefix="$"
      thousandSeparator=","
      defaultValue={12500}
      placeholder="Enter amount"
    />
  </GdsSafeBox>
);

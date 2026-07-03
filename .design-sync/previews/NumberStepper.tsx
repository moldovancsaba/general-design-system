import { useState } from 'react';
import { NumberStepper } from '@sovereignsquad/gds-core';
import { GdsSafeBox, GdsStack } from '@sovereignsquad/gds-core';

export default function Preview() {
  const [qty, setQty] = useState(2);
  const [apps, setApps] = useState(5);

  return (
    <GdsSafeBox p="lg">
      <GdsStack gap="lg">
        <NumberStepper
          value={qty}
          onChange={setQty}
          min={1}
          max={10}
          ariaLabel="Number of children"
        />
        <NumberStepper
          value={apps}
          onChange={setApps}
          min={1}
          max={20}
          step={1}
          ariaLabel="Maximum applications per cycle"
        />
        <NumberStepper
          value={1}
          onChange={() => {}}
          min={1}
          max={5}
          ariaLabel="Disabled stepper"
          disabled
        />
      </GdsStack>
    </GdsSafeBox>
  );
}

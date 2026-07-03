import { MeaningBadge } from '@sovereignsquad/gds-core';
import { GdsSafeBox, GdsInline, GdsStack } from '@sovereignsquad/gds-core';

export default function Preview() {
  return (
    <GdsSafeBox p="lg">
      <GdsStack gap="md">
        <GdsInline gap="sm" wrap="wrap">
          <MeaningBadge variant="attention"  label="New this week" />
          <MeaningBadge variant="validation" label="Verified" />
          <MeaningBadge variant="info"       label="BETA" />
          <MeaningBadge variant="urgency"    label="Deadline: Friday" />
        </GdsInline>
        <GdsInline gap="sm" wrap="wrap">
          <MeaningBadge variant="attention"  label="Featured" size="lg" />
          <MeaningBadge variant="validation" label="Top-rated" size="lg" />
        </GdsInline>
      </GdsStack>
    </GdsSafeBox>
  );
}

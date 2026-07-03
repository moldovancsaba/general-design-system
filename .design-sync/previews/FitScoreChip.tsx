import { FitScoreChip } from '@sovereignsquad/gds-core';
import { GdsStack, GdsInline } from '@sovereignsquad/gds-core';
import { GdsSafeBox } from '@sovereignsquad/gds-core';
import { Text } from '@sovereignsquad/gds-core';

export default function Preview() {
  return (
    <GdsSafeBox p="lg">
      <GdsStack gap="md">
        <GdsInline gap="sm" align="center">
          <FitScoreChip value={91} dimensions={[{ label: 'Location' }, { label: 'Grade level' }, { label: 'Schedule' }]} />
          <FitScoreChip value={65} />
          <FitScoreChip value={28} />
        </GdsInline>
        <GdsInline gap="sm" align="center">
          <FitScoreChip label="Top match" />
          <FitScoreChip label="Good fit" />
        </GdsInline>
      </GdsStack>
    </GdsSafeBox>
  );
}

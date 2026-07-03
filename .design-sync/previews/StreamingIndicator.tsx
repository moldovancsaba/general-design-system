import { StreamingIndicator } from '@sovereignsquad/gds-core';
import { GdsSafeBox, GdsStack } from '@sovereignsquad/gds-core';

export default function Preview() {
  return (
    <GdsSafeBox p="lg">
      <GdsStack gap="xs">
        <StreamingIndicator />
        <StreamingIndicator label="Loading results" />
      </GdsStack>
    </GdsSafeBox>
  );
}

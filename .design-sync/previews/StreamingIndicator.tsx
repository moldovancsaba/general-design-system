import { StreamingIndicator } from '@doneisbetter/gds-core';
import { GdsSafeBox, GdsStack } from '@doneisbetter/gds-core';

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

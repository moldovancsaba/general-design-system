import { ChatInput } from '@sovereignsquad/gds-core';
import { GdsSafeBox } from '@sovereignsquad/gds-core';

export default function Preview() {
  return (
    <GdsSafeBox p="lg" maw={480}>
      <ChatInput onSend={() => {}} placeholder="Message the assistant…" />
    </GdsSafeBox>
  );
}

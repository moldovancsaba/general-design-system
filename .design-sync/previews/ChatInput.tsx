import { ChatInput } from '@doneisbetter/gds-core';
import { GdsSafeBox } from '@doneisbetter/gds-core';

export default function Preview() {
  return (
    <GdsSafeBox p="lg" maw={480}>
      <ChatInput onSend={() => {}} placeholder="Message the assistant…" />
    </GdsSafeBox>
  );
}

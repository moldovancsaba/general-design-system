import { ChatMessage, type ChatMessageModel } from '@sovereignsquad/gds-core';
import { GdsStack, GdsSafeBox } from '@sovereignsquad/gds-core';

const userMsg: ChatMessageModel   = { id: '1', role: 'user',      content: 'What STEM schools are near the Mission?' };
const assistMsg: ChatMessageModel = { id: '2', role: 'assistant', content: 'Here are the top-rated STEM schools within 1 mile of the Mission district.' };
const errMsg: ChatMessageModel    = { id: '3', role: 'user',      content: 'Show me more options.', state: 'error' };

export default function Preview() {
  return (
    <GdsSafeBox p="lg">
      <GdsStack gap="md">
        <ChatMessage message={userMsg} />
        <ChatMessage message={assistMsg} />
        <ChatMessage message={errMsg} onRetry={() => {}} />
      </GdsStack>
    </GdsSafeBox>
  );
}

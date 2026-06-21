import { ChatThread, type ChatMessageModel } from '@doneisbetter/gds-core';
import { GdsSafeBox } from '@doneisbetter/gds-core';

const messages: ChatMessageModel[] = [
  { id: '1', role: 'user',      content: 'What STEM schools are near the Mission?' },
  { id: '2', role: 'assistant', content: 'Here are the top-rated STEM schools within 1 mile of the Mission district.' },
  { id: '3', role: 'user',      content: 'Do any have after-care?' },
  { id: '4', role: 'assistant', content: 'Yes — Westside Academy and Edison Charter both offer after-care until 6 pm.', state: 'streaming' },
];

export default function Preview() {
  return (
    <GdsSafeBox p="lg" style={{ height: 360 }}>
      <ChatThread
        messages={messages}
        streaming={false}
        onSend={() => {}}
        placeholder="Ask a question…"
      />
    </GdsSafeBox>
  );
}

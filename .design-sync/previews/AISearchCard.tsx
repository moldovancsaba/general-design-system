import { AISearchCard } from '@doneisbetter/gds-core';
import { GdsSafeBox } from '@doneisbetter/gds-core';

export default function Preview() {
  return (
    <GdsSafeBox p="lg" maw={480}>
      <AISearchCard
        placeholder="Ask about schools near me…"
        prompts={[
          'Best STEM schools in Mission',
          'Schools with after-care',
          'Top-rated K–5 programs',
        ]}
        onSubmit={() => {}}
      />
    </GdsSafeBox>
  );
}

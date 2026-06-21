import { MetadataText, GdsSafeBox } from '@doneisbetter/gds';

export const Default = () => (
  <GdsSafeBox safeStyle={{ background: 'surface', border: 'default', radius: 'lg', inset: 'md' }}>
    <div style={{ fontWeight: 600, marginBottom: 4 }}>Migration checklist v3</div>
    <MetadataText component="p">
      Last edited by Priya Nair · June 18, 2026 · 4 min read
    </MetadataText>
  </GdsSafeBox>
);

export const Inline = () => (
  <GdsSafeBox safeStyle={{ background: 'surface', border: 'default', radius: 'lg', inset: 'md' }}>
    <span style={{ marginRight: 8 }}>order-48217</span>
    <MetadataText component="span">Fulfilled · 3 items · $128.40</MetadataText>
  </GdsSafeBox>
);

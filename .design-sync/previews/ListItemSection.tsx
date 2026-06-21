import { ListItemSection, GdsSafeBox, MetadataText } from '@doneisbetter/gds';

export const Default = () => (
  <GdsSafeBox safeStyle={{ background: 'surface', border: 'default', radius: 'lg', inset: 'md' }}>
    <ListItemSection>
      <strong style={{ display: 'block', fontSize: 15 }}>Quarterly revenue report</strong>
      <MetadataText component="span">Updated 2 hours ago · Finance team</MetadataText>
    </ListItemSection>
  </GdsSafeBox>
);

export const WithTrailingMeta = () => (
  <GdsSafeBox safeStyle={{ background: 'surface', border: 'default', radius: 'lg', inset: 'md' }}>
    <ListItemSection>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span style={{ fontWeight: 600 }}>Design system sync</span>
        <MetadataText component="span">12 items</MetadataText>
      </div>
    </ListItemSection>
  </GdsSafeBox>
);

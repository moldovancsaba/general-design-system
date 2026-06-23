import { BoundedPreviewSurface, BannerNotice } from '@doneisbetter/gds';

export const Default = () => (
  <BoundedPreviewSurface minHeight={140} maxHeight={260}>
    <BannerNotice
      eyebrow="Preview"
      severity="info"
      title="Bounded preview surface"
      message="Constrains embedded content to a governed height range so previews stay tidy."
    />
  </BoundedPreviewSurface>
);

export const ScrollableContent = () => (
  <BoundedPreviewSurface minHeight={120} maxHeight={180}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          style={{
            padding: '10px 12px',
            border: '1px solid var(--mantine-color-gray-3)',
            borderRadius: 8,
          }}
        >
          Catalog item {i + 1}
        </div>
      ))}
    </div>
  </BoundedPreviewSurface>
);

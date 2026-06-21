import { GdsCrudEditorTemplate } from '@doneisbetter/gds';

const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 } as const;
const inputStyle = {
  width: '100%',
  padding: '8px 10px',
  border: '1px solid var(--mantine-color-gray-4)',
  borderRadius: 6,
  fontSize: 14,
  boxSizing: 'border-box' as const,
};

export const Ready = () => (
  <GdsCrudEditorTemplate
    eyebrow="Catalog"
    title="Edit product"
    description="Update the details for this product. Changes are saved to the live catalog."
    state="ready"
    actions={[
      { id: 'cancel', label: 'Cancel', kind: 'link' },
      { id: 'save', label: 'Save changes', kind: 'primary' },
    ]}
    form={
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
        <div>
          <label style={labelStyle}>Product name</label>
          <input style={inputStyle} defaultValue="Aurora Standing Desk" />
        </div>
        <div>
          <label style={labelStyle}>SKU</label>
          <input style={inputStyle} defaultValue="AUR-DSK-001" />
        </div>
        <div>
          <label style={labelStyle}>Price (USD)</label>
          <input style={inputStyle} defaultValue="649.00" />
        </div>
        <div>
          <label style={labelStyle}>Description</label>
          <textarea style={{ ...inputStyle, minHeight: 72 }} defaultValue="Height-adjustable desk with a bamboo surface and dual motors." />
        </div>
      </div>
    }
    summary={
      <div style={{ fontSize: 13, lineHeight: 1.8 }}>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>Status</div>
        <div>Published</div>
        <div style={{ color: 'var(--mantine-color-gray-6)' }}>Last edited 2 days ago by Dana</div>
      </div>
    }
    destructiveZone={
      <div style={{ fontSize: 13 }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Delete product</div>
        <div style={{ color: 'var(--mantine-color-gray-6)' }}>
          Permanently removes this product from the catalog. This cannot be undone.
        </div>
      </div>
    }
  />
);

export const Saving = () => (
  <GdsCrudEditorTemplate
    eyebrow="Catalog"
    title="Edit product"
    description="Update the details for this product."
    state="saving"
    statusLabel="Saving changes…"
    form={
      <div style={{ maxWidth: 480 }}>
        <label style={labelStyle}>Product name</label>
        <input style={inputStyle} defaultValue="Aurora Standing Desk" />
      </div>
    }
  />
);

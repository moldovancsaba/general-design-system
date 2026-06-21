import {
  ContentOpsEditor,
  ContentOpsSection,
  ContentOpsActionBar,
  PageHeader,
  FormField,
} from '@doneisbetter/gds';

export const Default = () => (
  <ContentOpsEditor
    header={<PageHeader title="Catalog admin shell" description="Canonical content operations workflow." />}
    status={(
      <ContentOpsActionBar
        dirty
        status="Editing in shared governance mode."
        actions={{
          primary: { action: 'save' },
          secondary: [{ action: 'cancel' }],
          tertiary: [{ action: 'preview' }],
        }}
      />
    )}
    sections={(
      <ContentOpsSection id="visibility" title="Visibility" description="Use shared sections and form contracts.">
        <FormField label="Visibility" description="Governed control and descriptive labels.">
          <select aria-label="Visibility" style={{ padding: '6px 10px', width: '100%' }}>
            <option>Public</option>
            <option>Private</option>
          </select>
        </FormField>
      </ContentOpsSection>
    )}
    actionBar={<ContentOpsActionBar actions={{ primary: { action: 'save' }, secondary: [{ action: 'refresh' }] }} />}
  />
);

export const WithPreview = () => (
  <ContentOpsEditor
    header={<PageHeader title="Content operations" description="Reusable operations editor composition." />}
    sections={(
      <ContentOpsSection id="general" title="General settings" description="Shared sectioning for ops workflows.">
        <FormField label="Title" description="Use the same pattern for every editor.">
          <input aria-label="Content title" defaultValue="Spring catalog refresh" style={{ padding: '6px 10px', width: '100%' }} />
        </FormField>
      </ContentOpsSection>
    )}
    preview={<div style={{ padding: 16, border: '1px dashed var(--mantine-color-gray-4, #ccc)', borderRadius: 8 }}>Live preview rail</div>}
    actionBar={<ContentOpsActionBar dirty actions={{ primary: { action: 'save' }, secondary: [{ action: 'refresh' }] }} />}
  />
);

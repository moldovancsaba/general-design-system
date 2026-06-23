import { EditorScaffold, FormField, SemanticButton, SectionPanel } from '@doneisbetter/gds';

export const Default = () => (
  <EditorScaffold
    header={<strong>Edit article — Release notes 3.4</strong>}
    context={<span>Draft · last saved 2 minutes ago</span>}
    form={
      <div style={{ display: 'grid', gap: 16 }}>
        <FormField label="Title" description="Shown in listings and the browser tab.">
          <input defaultValue="Access gate runtime is live" style={{ width: '100%', padding: 8 }} />
        </FormField>
        <FormField label="Summary">
          <textarea defaultValue="Teaser content stays visible while protected markup stays unmounted." rows={3} style={{ width: '100%', padding: 8 }} />
        </FormField>
      </div>
    }
    settings={
      <SectionPanel title="Publishing" description="Visibility and schedule.">
        <FormField label="Status">
          <span>Draft</span>
        </FormField>
      </SectionPanel>
    }
    footer={
      <div style={{ display: 'flex', gap: 8 }}>
        <SemanticButton action="save" />
        <SemanticButton action="cancel" variant="default" />
      </div>
    }
    stickyFooter
  />
);

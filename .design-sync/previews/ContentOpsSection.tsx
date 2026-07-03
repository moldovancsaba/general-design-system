import { ContentOpsSection, FormField, SemanticButton } from '@sovereignsquad/gds';

export const Default = () => (
  <ContentOpsSection
    id="general"
    title="General settings"
    description="Shared sectioning for ops workflows."
    action={<SemanticButton action="edit">Edit</SemanticButton>}
  >
    <FormField label="Title" description="Use the same pattern for every editor.">
      <input aria-label="Content title" defaultValue="Spring catalog refresh" style={{ padding: '6px 10px', width: '100%' }} />
    </FormField>
  </ContentOpsSection>
);

export const Warning = () => (
  <ContentOpsSection
    id="visibility"
    title="Visibility"
    description="This entry is currently public."
    tone="warning"
  >
    <FormField label="Visibility" description="Governed control and descriptive labels.">
      <select aria-label="Visibility" style={{ padding: '6px 10px', width: '100%' }}>
        <option>Public</option>
        <option>Private</option>
      </select>
    </FormField>
  </ContentOpsSection>
);

export const Critical = () => (
  <ContentOpsSection
    id="danger"
    title="Danger zone"
    description="Irreversible actions for this catalog entry."
    tone="critical"
  >
    <SemanticButton action="delete">Delete entry</SemanticButton>
  </ContentOpsSection>
);

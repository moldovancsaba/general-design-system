import { SemanticButton } from '@sovereignsquad/gds';

export const Actions = () => (
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
    <SemanticButton action="save" />
    <SemanticButton action="add" />
    <SemanticButton action="edit" />
    <SemanticButton action="search" />
    <SemanticButton action="settings" />
  </div>
);

export const Loading = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <SemanticButton action="save" loading />
    <SemanticButton action="analytics" loading />
  </div>
);

export const Feedback = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <SemanticButton action="save" feedbackState="success" feedbackText="Saved" />
    <SemanticButton action="delete" feedbackState="error" feedbackText="Failed" />
  </div>
);

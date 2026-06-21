import { Modal, SemanticButton } from '@doneisbetter/gds';

export const Open = () => (
  <Modal opened onClose={() => {}} title="Delete project" withinPortal={false}>
    <p style={{ marginTop: 0 }}>
      This permanently removes “Atlas” and all of its data. This action cannot be undone.
    </p>
    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
      <SemanticButton action="cancel">Cancel</SemanticButton>
      <SemanticButton action="delete">Delete</SemanticButton>
    </div>
  </Modal>
);

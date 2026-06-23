import { CtaButtonGroup, SemanticButton } from '@doneisbetter/gds';

export const Default = () => (
  <CtaButtonGroup
    primary={<SemanticButton action="save">Publish pattern</SemanticButton>}
    secondary={<SemanticButton action="preview">Preview</SemanticButton>}
  />
);

export const ThreeActions = () => (
  <CtaButtonGroup
    primary={<SemanticButton action="start">Get started</SemanticButton>}
    secondary={<SemanticButton action="settings">Configure</SemanticButton>}
    tertiary={<SemanticButton action="cancel">Cancel</SemanticButton>}
  />
);

export const PrimaryOnly = () => (
  <CtaButtonGroup primary={<SemanticButton action="add">Create entry</SemanticButton>} />
);

import { Button, ButtonProps } from '@mantine/core';
import { useGdsTranslation } from '@gds/theme';
import { GdsVocabulary, SemanticAction } from './vocabulary';

export interface SemanticButtonProps extends Omit<ButtonProps, 'leftSection' | 'children'> {
  action: SemanticAction;
}

/**
 * SemanticButton strictly enforces ubiquitous language and standardized iconography.
 * Developers cannot pass arbitrary text or icons; they must use a semantic action key.
 */
export function SemanticButton({ action, ...props }: SemanticButtonProps) {
  const { t } = useGdsTranslation();
  const config = GdsVocabulary[action];
  const Icon = config.icon;

  return (
    <Button leftSection={<Icon size="1rem" />} {...props}>
      {t(config.id, config.defaultMessage)}
    </Button>
  );
}

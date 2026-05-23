import { forwardRef } from 'react';
import { NavLink, NavLinkProps, createPolymorphicComponent } from '@mantine/core';
import { useGdsTranslation } from '@gds/theme';
import { GdsVocabulary, type SemanticAction } from '@gds/core';

export interface SemanticNavLinkProps extends Omit<NavLinkProps, 'leftSection' | 'label'> {
  action: SemanticAction;
}

/**
 * SemanticNavLink strictly enforces ubiquitous language and standardized iconography
 * for sidebar navigation links.
 */
const _SemanticNavLink = forwardRef<HTMLAnchorElement, SemanticNavLinkProps>(
  ({ action, ...props }, ref) => {
    const { t } = useGdsTranslation();
    const config = GdsVocabulary[action];
    const Icon = config.icon;

    return (
      <NavLink
        ref={ref}
        label={t(config.id, config.defaultMessage)}
        leftSection={<Icon size="1rem" stroke={1.5} />}
        {...props}
      />
    );
  }
);

export const SemanticNavLink = createPolymorphicComponent<'a', SemanticNavLinkProps>(_SemanticNavLink);

import { forwardRef } from 'react';
import { createPolymorphicComponent } from '@mantine/core';
import type { SidebarNavItemProps, SemanticAction } from '@sovereignsquad/gds-core';
import { SidebarNavItem } from '@sovereignsquad/gds-core';

export interface SemanticNavLinkProps extends Omit<SidebarNavItemProps, 'label' | 'icon' | 'action'> {
  action: SemanticAction;
}

/**
 * SemanticNavLink strictly enforces ubiquitous language and standardized iconography
 * for sidebar navigation links.
 */
const _SemanticNavLink = forwardRef<HTMLAnchorElement, SemanticNavLinkProps>(
  ({ action, ...props }, ref) => {
    return (
      <SidebarNavItem
        ref={ref}
        action={action}
        {...props}
      />
    );
  }
);

export const SemanticNavLink = createPolymorphicComponent<'a', SemanticNavLinkProps>(_SemanticNavLink);

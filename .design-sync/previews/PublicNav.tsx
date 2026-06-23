import * as React from 'react';
import { PublicNav } from '@doneisbetter/gds';

export const Default = () => (
  <PublicNav
    activeId="patterns"
    items={[
      { id: 'overview', label: 'Overview', href: '#overview' },
      { id: 'patterns', label: 'Patterns', href: '#patterns' },
      { id: 'themes', label: 'Themes', href: '#themes' },
      { id: 'docs', label: 'Docs', href: '#docs', external: true },
    ]}
  />
);

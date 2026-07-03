'use client';

import { Button } from '@mantine/core';
import { CtaButtonGroup, DocsCodeBlock, ThemeToggle } from '@sovereignsquad/gds-core/client';

export function ClientPanel() {
  return (
    <>
      <ThemeToggle />
      <DocsCodeBlock
        code={`npm install @sovereignsquad/gds-theme @sovereignsquad/gds-core @sovereignsquad/gds-admin
npm install @mantine/core @mantine/hooks @mantine/modals @mantine/notifications @tabler/icons-react`}
        language="bash"
        title="Install"
      />
      <CtaButtonGroup
        primary={<Button>Adopt provider</Button>}
        secondary={<Button variant="default">Review exports</Button>}
      />
    </>
  );
}

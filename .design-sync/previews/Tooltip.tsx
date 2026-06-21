import { Tooltip, Button } from '@doneisbetter/gds';

export const Default = () => (
  <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
    <Tooltip label="Saves changes to the live workspace" opened withinPortal={false}>
      <Button>Publish</Button>
    </Tooltip>
  </div>
);

export const WithArrow = () => (
  <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
    <Tooltip
      label="This action cannot be undone"
      opened
      withArrow
      color="red"
      position="bottom"
      withinPortal={false}
    >
      <Button color="red" variant="light">Delete project</Button>
    </Tooltip>
  </div>
);

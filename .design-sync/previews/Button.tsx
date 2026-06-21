import { Button } from '@doneisbetter/gds';

export const Default = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
    <Button>Save changes</Button>
    <Button>Cancel</Button>
  </div>
);

export const Group = () => (
  <Button.Group>
    <Button>Day</Button>
    <Button>Week</Button>
    <Button>Month</Button>
  </Button.Group>
);

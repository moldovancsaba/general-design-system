import { Badge } from '@doneisbetter/gds';

export const Default = () => (
  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
    <Badge>New</Badge>
    <Badge>Stable</Badge>
    <Badge>Beta</Badge>
  </div>
);

export const Statuses = () => (
  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
    <Badge>Published</Badge>
    <Badge>Draft</Badge>
    <Badge>Archived</Badge>
    <Badge>Deprecated</Badge>
  </div>
);

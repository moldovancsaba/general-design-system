import { MultiSelect, GdsSafeBox } from '@doneisbetter/gds';

export const Default = () => (
  <GdsSafeBox safeStyle={{ background: 'surface', border: 'default', radius: 'lg', inset: 'md' }} style={{ width: 300 }}>
    <MultiSelect
      label="Project tags"
      placeholder="Pick tags"
      defaultValue={['design', 'frontend']}
      data={[
        { value: 'design', label: 'Design' },
        { value: 'frontend', label: 'Frontend' },
        { value: 'backend', label: 'Backend' },
        { value: 'research', label: 'Research' },
      ]}
    />
  </GdsSafeBox>
);

export const Empty = () => (
  <GdsSafeBox safeStyle={{ background: 'surface', border: 'default', radius: 'lg', inset: 'md' }} style={{ width: 300 }}>
    <MultiSelect
      label="Assignees"
      placeholder="Search teammates"
      description="Add one or more people to this task."
      data={[
        { value: 'amir', label: 'Amir Khan' },
        { value: 'lin', label: 'Lin Wu' },
        { value: 'sara', label: 'Sara Lopez' },
      ]}
    />
  </GdsSafeBox>
);

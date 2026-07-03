import { useState } from 'react';
import { SearchableSelect } from '@sovereignsquad/gds-core';
import { GdsSafeBox } from '@sovereignsquad/gds-core';

export default function Preview() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <GdsSafeBox p="lg" maw={340}>
      <SearchableSelect
        value={value}
        onChange={setValue}
        options={[
          { value: 'math',    label: 'Mathematics',          group: 'Core Subjects' },
          { value: 'english', label: 'English Language Arts', group: 'Core Subjects' },
          { value: 'science', label: 'Science',              group: 'Core Subjects' },
          { value: 'art',     label: 'Visual Arts',          group: 'Electives' },
          { value: 'pe',      label: 'Physical Education',   group: 'Electives' },
        ]}
        placeholder="Search subjects…"
        clearable
        ariaLabel="Subject"
      />
    </GdsSafeBox>
  );
}

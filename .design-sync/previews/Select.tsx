import { Select, SectionPanel } from '@doneisbetter/gds';

export const Default = () => (
  <SectionPanel>
    <Select
      label="Reporting period"
      placeholder="Pick a period"
      defaultValue="last-30"
      data={[
        { value: 'last-7', label: 'Last 7 days' },
        { value: 'last-30', label: 'Last 30 days' },
        { value: 'quarter', label: 'Quarter to date' },
      ]}
    />
  </SectionPanel>
);

export const WithDescription = () => (
  <SectionPanel>
    <Select
      label="Color scheme"
      description="Applies across every documented surface."
      placeholder="Choose a scheme"
      data={[
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'auto', label: 'Follow system' },
      ]}
    />
  </SectionPanel>
);

export const ErrorState = () => (
  <SectionPanel>
    <Select
      label="Restaurant"
      placeholder="Select a restaurant"
      value={null}
      error="Selection is required before continuing."
      data={[
        { value: 'budapest', label: 'Budapest – District V' },
        { value: 'vienna', label: 'Vienna – Innere Stadt' },
      ]}
    />
  </SectionPanel>
);

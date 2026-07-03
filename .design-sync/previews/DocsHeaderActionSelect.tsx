import { DocsHeaderActionSelect } from '@sovereignsquad/gds';

export const Default = () => (
  <DocsHeaderActionSelect
    label="Version"
    options={[
      { value: '3.4', label: 'v3.4 (latest)' },
      { value: '3.3', label: 'v3.3' },
      { value: '3.2', label: 'v3.2' },
    ]}
  />
);

export const Locale = () => (
  <DocsHeaderActionSelect
    label="Language"
    options={[
      { value: 'en', label: 'English' },
      { value: 'de', label: 'Deutsch' },
      { value: 'fr', label: 'Français' },
      { value: 'es', label: 'Español' },
    ]}
  />
);

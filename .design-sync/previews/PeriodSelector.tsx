import { PeriodSelector } from '@sovereignsquad/gds';

const options = [
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days', description: 'Rolling month to date' },
  { value: 'qtd', label: 'Quarter to date' },
];

export const Default = () => (
  <PeriodSelector
    label="Reporting period"
    description="Choose the window for the dashboard below."
    value="7d"
    options={options}
    timezone="UTC"
  />
);

export const Stale = () => (
  <PeriodSelector
    label="Reporting period"
    value="30d"
    options={options}
    timezone="Europe/Berlin"
    stale
    helperText="Data is being refreshed for the selected window."
  />
);

export const ErrorState = () => (
  <PeriodSelector
    label="Reporting period"
    value="qtd"
    options={options}
    error="No data available for this period yet."
  />
);

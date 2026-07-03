import { ResultSummary, SectionPanel } from '@sovereignsquad/gds';

export const Default = () => (
  <SectionPanel>
    <ResultSummary
      resultCount={1240}
      noun="records"
      description="Sort: most recent. Active filters: 2."
    />
  </SectionPanel>
);

export const Single = () => (
  <SectionPanel>
    <ResultSummary resultCount={1} noun="restaurant" description="Matching the current search." />
  </SectionPanel>
);

export const Empty = () => (
  <SectionPanel>
    <ResultSummary resultCount={0} noun="patterns" description="No results for the active filters." />
  </SectionPanel>
);

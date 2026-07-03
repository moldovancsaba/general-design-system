import { ShareButtonGroup, SectionPanel } from '@sovereignsquad/gds';

export const Default = () => (
  <SectionPanel title="Share this page">
    <ShareButtonGroup
      url="https://sovereignsquad.github.io/general-design-system/patterns"
      title="GDS pattern catalog"
      text="Inspect the shipped pattern inventory."
      label="Share the catalog"
      description="Copy a link or open a native share sheet."
    />
  </SectionPanel>
);

export const Channels = () => (
  <SectionPanel title="Distribute the release notes">
    <ShareButtonGroup
      url="https://sovereignsquad.github.io/general-design-system/changelog"
      title="GDS 3.4.14 release"
      channels={['copy', 'mail', 'x', 'linkedin', 'whatsapp']}
    />
  </SectionPanel>
);

export const Compact = () => (
  <SectionPanel title="Compact share">
    <ShareButtonGroup
      url="https://sovereignsquad.github.io/general-design-system/patterns"
      title="GDS pattern catalog"
      channels={['copy', 'mail', 'linkedin']}
      compact
    />
  </SectionPanel>
);

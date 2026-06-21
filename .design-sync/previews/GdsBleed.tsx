import { GdsBleed } from '@doneisbetter/gds';

const Surface = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: 24,
      background: 'var(--mantine-color-gray-0)',
      border: '1px solid var(--mantine-color-gray-3)',
      borderRadius: 10,
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
);

const Banner = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: '14px 24px',
      background: 'var(--mantine-color-violet-6)',
      color: 'white',
      fontSize: 14,
      fontWeight: 600,
    }}
  >
    {children}
  </div>
);

export const FullBleedBanner = () => (
  <Surface>
    <p style={{ margin: '0 0 12px', fontSize: 14, color: 'var(--mantine-color-gray-7)' }}>
      Body text sits inside the card padding.
    </p>
    <GdsBleed bleed="lg">
      <Banner>This banner bleeds past the padding to the card edges.</Banner>
    </GdsBleed>
    <p style={{ margin: '12px 0 0', fontSize: 14, color: 'var(--mantine-color-gray-7)' }}>
      Body text resumes inside the padding below.
    </p>
  </Surface>
);

export const SmallBleed = () => (
  <Surface>
    <GdsBleed bleed="sm">
      <Banner>A smaller bleed extends only slightly beyond the content edge.</Banner>
    </GdsBleed>
  </Surface>
);

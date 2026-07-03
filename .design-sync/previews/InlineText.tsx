import { InlineText, BodyText } from '@sovereignsquad/gds';

export const Default = () => (
  <div
    style={{
      background: 'var(--mantine-color-body, #fff)',
      border: '1px solid var(--mantine-color-gray-3, #dee2e6)',
      borderRadius: 8,
      padding: 20,
    }}
  >
    <BodyText>
      Your invoice total is <InlineText>$1,240.00</InlineText> due on{' '}
      <InlineText>April 30</InlineText>.
    </BodyText>
  </div>
);

export const InSentence = () => (
  <div
    style={{
      background: 'var(--mantine-color-body, #fff)',
      border: '1px solid var(--mantine-color-gray-3, #dee2e6)',
      borderRadius: 8,
      padding: 20,
    }}
  >
    <BodyText>
      Signed in as <InlineText>jordan@acme.com</InlineText> in the{' '}
      <InlineText>Production</InlineText> workspace.
    </BodyText>
  </div>
);

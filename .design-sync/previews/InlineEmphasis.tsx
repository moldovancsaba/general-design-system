import { InlineEmphasis, BodyText } from '@sovereignsquad/gds';

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
      This action is <InlineEmphasis>permanent</InlineEmphasis> and cannot be undone.
    </BodyText>
  </div>
);

export const Highlight = () => (
  <div
    style={{
      background: 'var(--mantine-color-body, #fff)',
      border: '1px solid var(--mantine-color-gray-3, #dee2e6)',
      borderRadius: 8,
      padding: 20,
    }}
  >
    <BodyText>
      Only <InlineEmphasis>workspace admins</InlineEmphasis> can change billing settings.
    </BodyText>
  </div>
);

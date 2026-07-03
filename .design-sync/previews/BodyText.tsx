import { BodyText } from '@sovereignsquad/gds';

export const Default = () => (
  <BodyText>
    The shared design system keeps typography, spacing, and color governed in one
    place so product teams ship consistent surfaces without re-deriving the basics.
  </BodyText>
);

export const Paragraphs = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520 }}>
    <BodyText>
      Body copy renders with the governed font stack and reading measure.
    </BodyText>
    <BodyText component="span">
      It can also render inline as a span when composed with other elements.
    </BodyText>
  </div>
);

import { MediaWithFallback } from '@sovereignsquad/gds-core';
import { GdsSafeBox, GdsInline } from '@sovereignsquad/gds-core';

export default function Preview() {
  return (
    <GdsSafeBox p="lg">
      <GdsInline gap="md" align="flex-start">
        <div style={{ width: 180 }}>
          <MediaWithFallback
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400"
            alt="School building"
            ratio={4 / 3}
          />
        </div>
        <div style={{ width: 180 }}>
          <MediaWithFallback
            src={undefined}
            alt="Westside Academy"
            fallbackLabel="Westside Academy"
            ratio={4 / 3}
          />
        </div>
        <div style={{ width: 180 }}>
          <MediaWithFallback
            src="https://broken-url.invalid/image.jpg"
            alt="Broken image"
            fallbackLabel="Mission Charter"
            ratio={4 / 3}
          />
        </div>
      </GdsInline>
    </GdsSafeBox>
  );
}

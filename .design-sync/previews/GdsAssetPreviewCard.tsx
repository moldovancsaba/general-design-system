import { GdsAssetPreviewCard } from '@doneisbetter/gds';

const gradientSvg = (a: string, b: string, label: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480">` +
      `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
      `<stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>` +
      `<rect width="640" height="480" fill="url(#g)"/>` +
      `<text x="50%" y="50%" fill="white" font-family="sans-serif" font-size="40" font-weight="700" ` +
      `text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`,
  );

export const Ready = () => (
  <GdsAssetPreviewCard
    aspectRatio="16:9"
    asset={{
      id: 'asset-1',
      fileName: 'hero-banner.png',
      mimeType: 'image/png',
      size: 482133,
      status: 'ready',
      alt: 'Gradient hero banner artwork',
      caption: 'Spring campaign hero',
      url: gradientSvg('#7048e8', '#15aabf', 'hero-banner'),
      thumbnailUrl: gradientSvg('#7048e8', '#15aabf', 'hero-banner'),
    }}
  />
);

export const Square = () => (
  <GdsAssetPreviewCard
    aspectRatio="1:1"
    asset={{
      id: 'asset-2',
      fileName: 'avatar.png',
      mimeType: 'image/png',
      size: 91200,
      status: 'ready',
      alt: 'Profile avatar placeholder',
      url: gradientSvg('#e8590c', '#f08c00', 'avatar'),
      thumbnailUrl: gradientSvg('#e8590c', '#f08c00', 'avatar'),
    }}
  />
);

export const Processing = () => (
  <GdsAssetPreviewCard
    aspectRatio="4:3"
    asset={{
      id: 'asset-3',
      fileName: 'product-shot.jpg',
      mimeType: 'image/jpeg',
      size: 1240000,
      status: 'processing',
      alt: 'Product photo being processed',
      url: gradientSvg('#2f9e44', '#66a80f', 'processing'),
      thumbnailUrl: gradientSvg('#2f9e44', '#66a80f', 'processing'),
    }}
  />
);

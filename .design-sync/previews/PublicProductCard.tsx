import * as React from 'react';
import { PublicProductCard } from '@sovereignsquad/gds';

const productImage = (
  <img
    alt="Product"
    style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
    src={
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="270"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6366f1"/><stop offset="1" stop-color="#0ea5e9"/></linearGradient></defs><rect width="480" height="270" fill="url(#g)"/><rect x="180" y="75" width="120" height="120" rx="20" fill="#ffffff" opacity="0.85"/></svg>',
      )
    }
  />
);

export const Available = () => (
  <PublicProductCard
    title="Design System License"
    description="Flat media-first card for licensed public surfaces."
    image={productImage}
    imageAlt="Design System License"
    price="€39"
    state="available"
    helperText="Ships with full component contract."
    metadata={[{ label: 'Scope', value: 'UI primitives' }]}
    primaryAction={<a href="#buy">Buy</a>}
    secondaryAction={<a href="#details">Details</a>}
  />
);

export const Limited = () => (
  <PublicProductCard
    title="Founders Edition"
    description="Limited media-first variant with inventory cue."
    image={productImage}
    imageAlt="Founders Edition"
    price="€59"
    state="limited"
    helperKind="inventory"
    inventoryNote="Only 4 left"
    metadata={[{ label: 'Contract', value: 'GDS-owned' }]}
    primaryAction={<a href="#buy">Reserve</a>}
  />
);

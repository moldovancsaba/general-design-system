import * as React from 'react';
import { PublicFoodCard } from '@sovereignsquad/gds';

const dishImage = (
  <img
    alt="Smoked paprika chicken bowl"
    style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
    src={
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="270"><defs><radialGradient id="g" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="#fbbf24"/><stop offset="1" stop-color="#b45309"/></radialGradient></defs><rect width="480" height="270" fill="url(#g)"/><circle cx="240" cy="135" r="95" fill="#92400e"/><circle cx="240" cy="135" r="68" fill="#d97706"/></svg>',
      )
    }
  />
);

export const Preorder = () => (
  <PublicFoodCard
    title="Smoked paprika chicken bowl"
    description="Balanced, protein-forward dish with transparent prep and pickup expectations."
    image={dishImage}
    imageAlt="Smoked paprika chicken bowl"
    state="preorder"
    price="€12.50"
    helperText="Pickup window closes at 18:00."
    pickupNote="Today, 17:15–18:00"
    freshnessNote="Prepared in small daily batches"
    markers={[
      { id: 'featured', label: 'Featured', tone: 'positive' },
      { id: 'hot', label: 'Limited batch', tone: 'warning' },
    ]}
    metadata={[{ id: 'kcal', label: '540 kcal' }]}
    primaryAction={<a href="#reserve">Reserve pickup</a>}
  />
);

export const SoldOut = () => (
  <PublicFoodCard
    title="Citrus tart"
    description="Seasonal tart, sold in limited daily rounds."
    image={dishImage}
    imageAlt="Citrus tart"
    state="sold-out"
    price="€6.00"
    helperText="Back tomorrow at 09:00."
  />
);

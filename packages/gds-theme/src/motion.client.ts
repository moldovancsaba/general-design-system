'use client';

import { useEffect, useState } from 'react';
import { getGdsMotionPreset } from './motion';
import type { GdsMotionPresetId, GdsReducedMotionPolicy, GdsResolvedMotionPreset } from './motion';

export interface UseGdsReducedMotionResult {
  prefersReducedMotion: boolean;
  policy: GdsReducedMotionPolicy;
  getPreset: (id: GdsMotionPresetId) => GdsResolvedMotionPreset;
}

export function useGdsReducedMotion(policy: GdsReducedMotionPolicy = 'system'): UseGdsReducedMotionResult {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const resolvedPolicy: GdsReducedMotionPolicy = policy === 'system' && prefersReducedMotion ? 'reduce' : policy;

  return {
    prefersReducedMotion,
    policy: resolvedPolicy,
    getPreset: (id) => getGdsMotionPreset(id, resolvedPolicy),
  };
}

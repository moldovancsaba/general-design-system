export type GdsMotionDurationToken = 'instant' | 'fast' | 'base' | 'slow' | 'slower';
export type GdsMotionEasingToken = 'standard' | 'entrance' | 'exit' | 'emphasis' | 'linear';
export type GdsMotionPresetId = 'overlay' | 'drawer' | 'command' | 'list' | 'feedback' | 'skeleton' | 'state';
export type GdsReducedMotionPolicy = 'system' | 'reduce' | 'no-motion';

export interface GdsMotionPreset {
  id: GdsMotionPresetId;
  duration: GdsMotionDurationToken;
  easing: GdsMotionEasingToken;
  delayMs: number;
  transition: string;
  enterTransform: string;
  exitTransform: string;
  reducedTransition: string;
  reducedTransform: string;
  usage: string;
}

export interface GdsResolvedMotionPreset extends GdsMotionPreset {
  durationMs: number;
  easingValue: string;
  policy: GdsReducedMotionPolicy;
  shouldAnimate: boolean;
}

export const gdsMotionDurations: Record<GdsMotionDurationToken, number> = {
  instant: 0,
  fast: 120,
  base: 180,
  slow: 240,
  slower: 360,
};

export const gdsMotionEasings: Record<GdsMotionEasingToken, string> = {
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
  exit: 'cubic-bezier(0.7, 0, 0.84, 0)',
  emphasis: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  linear: 'linear',
};

export const gdsMotionPresets: Record<GdsMotionPresetId, GdsMotionPreset> = {
  overlay: {
    id: 'overlay',
    duration: 'base',
    easing: 'entrance',
    delayMs: 0,
    transition: 'opacity var(--gds-motion-duration-base) var(--gds-motion-ease-entrance), transform var(--gds-motion-duration-base) var(--gds-motion-ease-entrance)',
    enterTransform: 'translateY(0) scale(1)',
    exitTransform: 'translateY(0.5rem) scale(0.98)',
    reducedTransition: 'opacity var(--gds-motion-duration-fast) linear',
    reducedTransform: 'none',
    usage: 'Modal, popover, and blocking dialog entrance/exit.',
  },
  drawer: {
    id: 'drawer',
    duration: 'slow',
    easing: 'entrance',
    delayMs: 0,
    transition: 'opacity var(--gds-motion-duration-slow) var(--gds-motion-ease-entrance), transform var(--gds-motion-duration-slow) var(--gds-motion-ease-entrance)',
    enterTransform: 'translateX(0)',
    exitTransform: 'translateX(1rem)',
    reducedTransition: 'opacity var(--gds-motion-duration-fast) linear',
    reducedTransform: 'none',
    usage: 'Drawer, sheet, and mobile full-screen surface movement.',
  },
  command: {
    id: 'command',
    duration: 'fast',
    easing: 'standard',
    delayMs: 0,
    transition: 'opacity var(--gds-motion-duration-fast) var(--gds-motion-ease-standard), transform var(--gds-motion-duration-fast) var(--gds-motion-ease-standard)',
    enterTransform: 'translateY(0)',
    exitTransform: 'translateY(-0.25rem)',
    reducedTransition: 'opacity var(--gds-motion-duration-fast) linear',
    reducedTransform: 'none',
    usage: 'Command palette, quick action, and search result reveal.',
  },
  list: {
    id: 'list',
    duration: 'base',
    easing: 'standard',
    delayMs: 0,
    transition: 'opacity var(--gds-motion-duration-base) var(--gds-motion-ease-standard), transform var(--gds-motion-duration-base) var(--gds-motion-ease-standard)',
    enterTransform: 'translateY(0)',
    exitTransform: 'translateY(0.25rem)',
    reducedTransition: 'opacity var(--gds-motion-duration-fast) linear',
    reducedTransform: 'none',
    usage: 'List, table, and card collection state changes.',
  },
  feedback: {
    id: 'feedback',
    duration: 'fast',
    easing: 'emphasis',
    delayMs: 0,
    transition: 'opacity var(--gds-motion-duration-fast) var(--gds-motion-ease-emphasis), transform var(--gds-motion-duration-fast) var(--gds-motion-ease-emphasis)',
    enterTransform: 'translateY(0) scale(1)',
    exitTransform: 'translateY(0.25rem) scale(0.99)',
    reducedTransition: 'opacity var(--gds-motion-duration-fast) linear',
    reducedTransform: 'none',
    usage: 'Toast, notification, badge, and inline status feedback.',
  },
  skeleton: {
    id: 'skeleton',
    duration: 'slower',
    easing: 'linear',
    delayMs: 0,
    transition: 'opacity var(--gds-motion-duration-slower) linear',
    enterTransform: 'none',
    exitTransform: 'none',
    reducedTransition: 'none',
    reducedTransform: 'none',
    usage: 'Loading skeleton shimmer or pulse timing; content must not depend on motion.',
  },
  state: {
    id: 'state',
    duration: 'base',
    easing: 'standard',
    delayMs: 0,
    transition: 'background-color var(--gds-motion-duration-base) var(--gds-motion-ease-standard), border-color var(--gds-motion-duration-base) var(--gds-motion-ease-standard), color var(--gds-motion-duration-base) var(--gds-motion-ease-standard)',
    enterTransform: 'none',
    exitTransform: 'none',
    reducedTransition: 'none',
    reducedTransform: 'none',
    usage: 'Color, border, disabled, validation, and status state transitions.',
  },
};

export function getGdsMotionPreset(id: GdsMotionPresetId, policy: GdsReducedMotionPolicy = 'system'): GdsResolvedMotionPreset {
  const preset = gdsMotionPresets[id];
  const reduced = policy === 'reduce' || policy === 'no-motion';
  const noMotion = policy === 'no-motion';
  return {
    ...preset,
    durationMs: noMotion ? 0 : gdsMotionDurations[preset.duration],
    easingValue: noMotion ? gdsMotionEasings.linear : gdsMotionEasings[preset.easing],
    policy,
    shouldAnimate: !noMotion,
    transition: noMotion ? 'none' : (reduced ? preset.reducedTransition : preset.transition),
    enterTransform: reduced ? preset.reducedTransform : preset.enterTransform,
    exitTransform: reduced ? preset.reducedTransform : preset.exitTransform,
  };
}

export function createGdsMotionCssVariables(policy: GdsReducedMotionPolicy = 'system') {
  const noMotion = policy === 'no-motion';
  return {
    '--gds-motion-duration-instant': `${noMotion ? 0 : gdsMotionDurations.instant}ms`,
    '--gds-motion-duration-fast': `${noMotion ? 0 : gdsMotionDurations.fast}ms`,
    '--gds-motion-duration-base': `${noMotion ? 0 : gdsMotionDurations.base}ms`,
    '--gds-motion-duration-slow': `${noMotion ? 0 : gdsMotionDurations.slow}ms`,
    '--gds-motion-duration-slower': `${noMotion ? 0 : gdsMotionDurations.slower}ms`,
    '--gds-motion-ease-standard': noMotion ? gdsMotionEasings.linear : gdsMotionEasings.standard,
    '--gds-motion-ease-entrance': noMotion ? gdsMotionEasings.linear : gdsMotionEasings.entrance,
    '--gds-motion-ease-exit': noMotion ? gdsMotionEasings.linear : gdsMotionEasings.exit,
    '--gds-motion-ease-emphasis': noMotion ? gdsMotionEasings.linear : gdsMotionEasings.emphasis,
  } as const;
}

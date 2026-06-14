import { type CSSProperties, type ReactNode } from 'react';
import { Box } from '@mantine/core';
import type { BoxProps } from '@mantine/core';
import type { GdsLayoutBreakpoint, GdsLayoutToken, GdsResponsiveValue } from './LayoutPrimitives';

export type GdsMediaFit = 'cover' | 'contain' | 'fill' | 'scale-down';
export type GdsOverflowPolicy = 'visible' | 'clip' | 'scroll-x' | 'scroll-y' | 'auto' | 'contained';
export type GdsSemanticBackground = 'canvas' | 'surface' | 'subtle' | 'accent' | 'danger' | 'success' | 'warning' | 'info' | 'transparent';
export type GdsBorderRole = 'none' | 'default' | 'subtle' | 'accent' | 'danger' | 'success' | 'focus';
export type GdsRadiusToken = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'round';
export type GdsVisibilityValue = 'visible' | 'hidden' | 'screen-reader-only';

export interface GdsSafeStyleProps {
  background?: GdsSemanticBackground;
  border?: GdsBorderRole;
  radius?: GdsRadiusToken;
  shadow?: 'none' | 'subtle' | 'raised';
  overflow?: GdsOverflowPolicy;
  mediaFit?: GdsMediaFit;
  aspectRatio?: 'square' | 'video' | 'photo' | 'wide' | 'portrait';
  inset?: GdsLayoutToken;
  visibility?: GdsResponsiveValue<GdsVisibilityValue>;
  focusRing?: 'default' | 'inset';
  forcedColors?: 'auto' | 'preserve';
}

export interface GdsStyleContract {
  className: string;
  style: CSSProperties;
  css: string;
  attributes: {
    'data-gds-safe-style': string;
    'data-gds-overflow-policy'?: GdsOverflowPolicy;
    'data-gds-forced-colors'?: 'auto' | 'preserve';
  };
}

export interface GdsSafeBoxProps extends Omit<BoxProps, 'children' | 'style'> {
  children?: ReactNode;
  safeStyle?: GdsSafeStyleProps;
  style?: CSSProperties;
}

export interface GdsMediaFrameProps extends Omit<GdsSafeBoxProps, 'safeStyle'> {
  children: ReactNode;
  fit?: GdsMediaFit;
  aspectRatio?: NonNullable<GdsSafeStyleProps['aspectRatio']>;
}

export interface GdsOverflowFrameProps extends Omit<GdsSafeBoxProps, 'safeStyle'> {
  children: ReactNode;
  policy?: GdsOverflowPolicy;
  label?: string;
}

export interface GdsResponsiveVisibilityProps extends Omit<GdsSafeBoxProps, 'safeStyle'> {
  children: ReactNode;
  visibility: GdsResponsiveValue<GdsVisibilityValue>;
}

const breakpointPixels: Record<Exclude<GdsLayoutBreakpoint, 'base'>, number> = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const backgroundMap: Record<GdsSemanticBackground, CSSProperties> = {
  canvas: { backgroundColor: 'var(--mantine-color-body)', color: 'var(--mantine-color-text)' },
  surface: { backgroundColor: 'var(--mantine-color-default)', color: 'var(--mantine-color-text)' },
  subtle: { backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))', color: 'var(--mantine-color-text)' },
  accent: { backgroundColor: 'light-dark(var(--mantine-primary-color-light), color-mix(in srgb, var(--mantine-primary-color-filled) 28%, black))', color: 'var(--mantine-color-text)' },
  danger: { backgroundColor: 'light-dark(var(--mantine-color-red-0), color-mix(in srgb, var(--mantine-color-red-9) 72%, black))', color: 'light-dark(var(--mantine-color-red-9), var(--mantine-color-red-0))' },
  success: { backgroundColor: 'light-dark(var(--mantine-color-green-0), color-mix(in srgb, var(--mantine-color-green-9) 72%, black))', color: 'light-dark(var(--mantine-color-green-9), var(--mantine-color-green-0))' },
  warning: { backgroundColor: 'light-dark(var(--mantine-color-yellow-0), color-mix(in srgb, var(--mantine-color-yellow-9) 72%, black))', color: 'light-dark(var(--mantine-color-yellow-9), var(--mantine-color-yellow-0))' },
  info: { backgroundColor: 'light-dark(var(--mantine-color-blue-0), color-mix(in srgb, var(--mantine-color-blue-9) 72%, black))', color: 'light-dark(var(--mantine-color-blue-9), var(--mantine-color-blue-0))' },
  transparent: { backgroundColor: 'transparent', color: 'inherit' },
};

const borderMap: Record<GdsBorderRole, CSSProperties> = {
  none: { border: 0 },
  default: { border: '1px solid var(--mantine-color-default-border)' },
  subtle: { border: '1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))' },
  accent: { border: '1px solid var(--mantine-primary-color-filled)' },
  danger: { border: '1px solid var(--mantine-color-red-6)' },
  success: { border: '1px solid var(--mantine-color-green-6)' },
  focus: { border: '1px solid var(--mantine-primary-color-filled)', outline: '2px solid var(--mantine-primary-color-filled)', outlineOffset: 2 },
};

const radiusMap: Record<GdsRadiusToken, CSSProperties['borderRadius']> = {
  none: 0,
  sm: 'var(--mantine-radius-sm)',
  md: 'var(--mantine-radius-md)',
  lg: 'var(--mantine-radius-lg)',
  xl: 'var(--mantine-radius-xl)',
  round: '999rem',
};

const shadowMap: Record<NonNullable<GdsSafeStyleProps['shadow']>, CSSProperties['boxShadow']> = {
  none: 'none',
  subtle: 'var(--mantine-shadow-sm)',
  raised: 'var(--mantine-shadow-md)',
};

const aspectRatioMap: Record<NonNullable<GdsSafeStyleProps['aspectRatio']>, CSSProperties['aspectRatio']> = {
  square: '1 / 1',
  video: '16 / 9',
  photo: '4 / 3',
  wide: '21 / 9',
  portrait: '3 / 4',
};

const spacingTokenMap: Record<Exclude<GdsLayoutToken, 0>, string> = {
  none: '0',
  xs: 'var(--mantine-spacing-xs)',
  sm: 'var(--mantine-spacing-sm)',
  md: 'var(--mantine-spacing-md)',
  lg: 'var(--mantine-spacing-lg)',
  xl: 'var(--mantine-spacing-xl)',
  '2xl': 'calc(var(--mantine-spacing-xl) * 1.5)',
};

function spacing(value: GdsLayoutToken | undefined) {
  if (value === undefined) return undefined;
  if (value === 0) return '0';
  return spacingTokenMap[value];
}

function normalizeResponsiveValue<T>(value: GdsResponsiveValue<T> | undefined) {
  if (value === undefined || typeof value !== 'object' || Array.isArray(value)) {
    return { base: value, breakpoints: {} as Partial<Record<Exclude<GdsLayoutBreakpoint, 'base'>, T>> };
  }
  const responsive = value as Partial<Record<GdsLayoutBreakpoint, T>>;
  const { base, xs, sm, md, lg, xl } = responsive;
  return { base, breakpoints: { xs, sm, md, lg, xl } };
}

function hashSafeStyle(input: string) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = ((hash << 5) - hash + input.charCodeAt(index)) | 0;
  }
  return `gds-safe-style-${Math.abs(hash).toString(36)}`;
}

function visibilityStyle(value: GdsVisibilityValue | undefined): CSSProperties {
  if (value === 'hidden') {
    return { display: 'none' };
  }
  if (value === 'screen-reader-only') {
    return {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: 1,
    };
  }
  if (value === 'visible') {
    return {
      clip: 'auto',
      display: 'revert',
      height: 'auto',
      margin: 0,
      overflow: 'visible',
      padding: 0,
      position: 'static',
      whiteSpace: 'normal',
      width: 'auto',
    };
  }
  return {};
}

function visibilityCss(className: string, visibility: GdsResponsiveValue<GdsVisibilityValue> | undefined) {
  const normalized = normalizeResponsiveValue(visibility);
  return Object.entries(normalized.breakpoints)
    .filter((entry): entry is [Exclude<GdsLayoutBreakpoint, 'base'>, GdsVisibilityValue] => entry[1] !== undefined)
    .map(([breakpoint, value]) => {
      const style = visibilityStyle(value);
      const declarations = Object.entries(style).map(([key, nextValue]) => `${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}:${nextValue};`).join('');
      return declarations ? `@media (min-width: ${breakpointPixels[breakpoint]}px){.${className}{${declarations}}}` : '';
    })
    .join('');
}

export function gdsStyle(props: GdsSafeStyleProps = {}): Omit<GdsStyleContract, 'className' | 'css'> {
  const {
    background,
    border,
    radius,
    shadow,
    overflow,
    mediaFit,
    aspectRatio,
    inset,
    visibility,
    focusRing,
    forcedColors = 'auto',
  } = props;
  const normalizedVisibility = normalizeResponsiveValue(visibility);

  const style: CSSProperties = {
    boxSizing: 'border-box',
    ...(background ? backgroundMap[background] : {}),
    ...(border ? borderMap[border] : {}),
    borderRadius: radius ? radiusMap[radius] : undefined,
    boxShadow: shadow ? shadowMap[shadow] : undefined,
    objectFit: mediaFit,
    aspectRatio: aspectRatio ? aspectRatioMap[aspectRatio] : undefined,
    padding: spacing(inset),
    ...visibilityStyle(normalizedVisibility.base),
  };

  if (overflow === 'clip') {
    style.overflow = 'clip';
  } else if (overflow === 'scroll-x') {
    style.overflowX = 'auto';
    style.overflowY = 'hidden';
  } else if (overflow === 'scroll-y') {
    style.overflowY = 'auto';
    style.overflowX = 'hidden';
  } else if (overflow === 'auto' || overflow === 'contained') {
    style.overflow = 'auto';
  } else if (overflow === 'visible') {
    style.overflow = 'visible';
  }

  if (overflow === 'contained') {
    style.overscrollBehavior = 'contain';
    style.scrollbarGutter = 'stable';
  }

  if (focusRing === 'inset') {
    style.outlineOffset = -2;
  }

  return {
    style,
    attributes: {
      'data-gds-safe-style': 'true',
      'data-gds-overflow-policy': overflow,
      'data-gds-forced-colors': forcedColors,
    },
  };
}

export function createGdsStyleContract(id: string, props: GdsSafeStyleProps = {}): GdsStyleContract {
  const className = hashSafeStyle(`${id}:${JSON.stringify(props)}`);
  const resolved = gdsStyle(props);
  return {
    className,
    css: visibilityCss(className, props.visibility),
    style: resolved.style,
    attributes: {
      ...resolved.attributes,
      'data-gds-safe-style': id,
    },
  };
}

function SafeStyleSheet({ css }: { css: string }) {
  return css ? <style data-gds-safe-style-sheet>{css}</style> : null;
}

export function GdsSafeBox({
  children,
  safeStyle,
  className,
  style,
  ...props
}: GdsSafeBoxProps) {
  const contract = createGdsStyleContract('safe-box', safeStyle);
  return (
    <>
      <SafeStyleSheet css={contract.css} />
      <Box
        className={[contract.className, className].filter(Boolean).join(' ') || undefined}
        style={{ ...contract.style, ...style }}
        {...contract.attributes}
        {...props}
      >
        {children}
      </Box>
    </>
  );
}

export function GdsMediaFrame({
  children,
  fit = 'cover',
  aspectRatio = 'photo',
  style,
  ...props
}: GdsMediaFrameProps) {
  return (
    <GdsSafeBox
      safeStyle={{ mediaFit: fit, aspectRatio, overflow: 'clip', radius: 'lg', background: 'subtle' }}
      style={{ display: 'grid', placeItems: 'center', ...style }}
      {...props}
    >
      {children}
    </GdsSafeBox>
  );
}

export function GdsOverflowFrame({
  children,
  policy = 'contained',
  label,
  ...props
}: GdsOverflowFrameProps) {
  return (
    <GdsSafeBox
      safeStyle={{ overflow: policy, border: policy === 'visible' ? 'none' : 'subtle', radius: 'md' }}
      aria-label={label}
      {...props}
    >
      {children}
    </GdsSafeBox>
  );
}

export function GdsResponsiveVisibility({
  children,
  visibility,
  className,
  style,
  ...props
}: GdsResponsiveVisibilityProps) {
  const contract = createGdsStyleContract('responsive-visibility', { visibility });
  return (
    <>
      <SafeStyleSheet css={contract.css} />
      <Box
        className={[contract.className, className].filter(Boolean).join(' ') || undefined}
        style={{ ...contract.style, ...style }}
        {...contract.attributes}
        {...props}
      >
        {children}
      </Box>
    </>
  );
}

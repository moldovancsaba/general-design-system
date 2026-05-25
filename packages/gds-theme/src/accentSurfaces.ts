export type AccentTone = 'gray' | 'violet' | 'green' | 'red' | 'amber' | 'blue';
export type AccentPanelVariant = 'subtle' | 'soft-outline';

export interface GdsAccentSurfaceStyles {
  background: string;
  borderColor: string;
  color: string;
  mutedColor: string;
  titleColor: string;
  emphasisColor: string;
}

const tonePalette: Record<
  AccentTone,
  {
    light: string;
    dark: string;
    borderLight: string;
    borderDark: string;
    emphasis: string;
  }
> = {
  gray: {
    light: 'var(--mantine-color-gray-0)',
    dark: 'var(--mantine-color-dark-6)',
    borderLight: 'var(--mantine-color-gray-3)',
    borderDark: 'var(--mantine-color-dark-4)',
    emphasis: 'var(--mantine-color-gray-6)',
  },
  violet: {
    light: 'var(--mantine-color-violet-0)',
    dark: 'var(--mantine-color-violet-9)',
    borderLight: 'var(--mantine-color-violet-2)',
    borderDark: 'var(--mantine-color-violet-4)',
    emphasis: 'var(--mantine-color-violet-6)',
  },
  green: {
    light: 'var(--mantine-color-green-0)',
    dark: 'var(--mantine-color-green-9)',
    borderLight: 'var(--mantine-color-green-2)',
    borderDark: 'var(--mantine-color-green-4)',
    emphasis: 'var(--mantine-color-green-6)',
  },
  red: {
    light: 'var(--mantine-color-red-0)',
    dark: 'var(--mantine-color-red-9)',
    borderLight: 'var(--mantine-color-red-2)',
    borderDark: 'var(--mantine-color-red-4)',
    emphasis: 'var(--mantine-color-red-6)',
  },
  amber: {
    light: 'var(--mantine-color-yellow-0)',
    dark: 'var(--mantine-color-yellow-9)',
    borderLight: 'var(--mantine-color-yellow-2)',
    borderDark: 'var(--mantine-color-yellow-4)',
    emphasis: 'var(--mantine-color-yellow-7)',
  },
  blue: {
    light: 'var(--mantine-color-blue-0)',
    dark: 'var(--mantine-color-blue-9)',
    borderLight: 'var(--mantine-color-blue-2)',
    borderDark: 'var(--mantine-color-blue-4)',
    emphasis: 'var(--mantine-color-blue-6)',
  },
};

function mixWithBody(color: string, amount: number) {
  return `color-mix(in srgb, ${color} ${amount}%, var(--mantine-color-body))`;
}

function lightDark(light: string, dark: string) {
  return `light-dark(${light}, ${dark})`;
}

export function getGdsAccentSurfaceStyles(
  tone: AccentTone = 'violet',
  variant: AccentPanelVariant = 'subtle',
): GdsAccentSurfaceStyles {
  const palette = tonePalette[tone];
  const background =
    variant === 'soft-outline'
      ? lightDark(mixWithBody(palette.light, 24), mixWithBody(palette.dark, 16))
      : lightDark(palette.light, mixWithBody(palette.dark, 18));

  const borderColor =
    variant === 'soft-outline'
      ? lightDark(palette.borderLight, mixWithBody(palette.borderDark, 52))
      : lightDark(palette.borderLight, mixWithBody(palette.borderDark, 40));

  return {
    background,
    borderColor,
    color: lightDark('var(--mantine-color-gray-9)', 'var(--mantine-color-dark-0)'),
    mutedColor: lightDark('var(--mantine-color-gray-7)', 'var(--mantine-color-dark-2)'),
    titleColor: lightDark('var(--mantine-color-gray-9)', 'var(--mantine-color-white)'),
    emphasisColor: lightDark(palette.emphasis, palette.borderDark),
  };
}

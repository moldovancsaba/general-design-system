'use client';

import { useMantineColorScheme } from '@mantine/core';
import { getGdsVibeThemes, getGdsVibeThemeCssVariables } from './vibe-themes';
import type { GdsThemePresetId } from './theme-presets';

export interface VibeThemePickerProps {
  value: GdsThemePresetId;
  onChange: (id: GdsThemePresetId) => void;
  label?: string;
}

export function VibeThemePicker({ value, onChange, label = 'Choose theme' }: VibeThemePickerProps) {
  const { colorScheme } = useMantineColorScheme();
  const scheme = colorScheme === 'dark' ? 'dark' : 'light';
  const vibes = getGdsVibeThemes();

  return (
    <fieldset
      style={{ border: 'none', padding: 0, margin: 0 }}
      aria-label={label}
    >
      <legend
        style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
          color: 'var(--mantine-color-text)',
        }}
      >
        {label}
      </legend>
      <div
        role="radiogroup"
        aria-label={label}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
      >
        {vibes.map((vibe) => {
          const vars = getGdsVibeThemeCssVariables(vibe.id, scheme);
          const selected = vibe.id === value;
          return (
            <button
              key={vibe.id}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={vibe.label}
              title={vibe.label}
              onClick={() => onChange(vibe.id)}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: selected
                  ? `3px solid ${vars['--gds-vibe-text']}`
                  : `2px solid ${vars['--gds-vibe-border']}`,
                background: vars['--gds-vibe-hero'],
                cursor: 'pointer',
                outline: 'none',
                boxShadow: selected ? `0 0 0 3px ${vars['--gds-vibe-glow']}` : undefined,
                transition: 'box-shadow 120ms ease, border-width 120ms ease',
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLButtonElement).style.outline = `2px solid ${vars['--gds-vibe-primary']}`;
                (e.currentTarget as HTMLButtonElement).style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLButtonElement).style.outline = 'none';
              }}
            />
          );
        })}
      </div>
    </fieldset>
  );
}

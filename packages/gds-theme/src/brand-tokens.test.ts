import { describe, expect, it } from 'vitest';
import {
  brandContrastRatio,
  createBrandTheme,
  deriveBrandSemanticTokens,
  GdsBrandThemeError,
  type BrandColorRamps,
  type BrandFonts,
} from './brand-tokens';

const classScoutColors: BrandColorRamps = {
  navy: '#0b223e',
  terracotta: '#ca8570',
  sage: '#90a287',
  cream: '#faf7f1',
  slate: '#434c59',
};

const fonts: BrandFonts = { display: 'Bogart', body: 'Garet' };

describe('createBrandTheme', () => {
  it('returns a mantine theme, css variables, and a validated token graph', () => {
    const result = createBrandTheme({ brandColors: classScoutColors, fonts });
    expect(result.mantineTheme).toBeTruthy();
    expect(result.tokenGraph.themes).toEqual(['brand']);
    expect(result.cssVariables['--gds-brand-primary']).toBe('#0b223e');
    expect(result.cssVariables['--gds-brand-accent']).toBe('#ca8570');
    expect(result.cssVariables['--gds-bg-page']).toBe('#faf7f1');
  });

  it('emits light and dark values for every semantic role', () => {
    const { cssVariables } = createBrandTheme({ brandColors: classScoutColors, fonts });
    const roles = Object.keys(deriveBrandSemanticTokens(classScoutColors));
    for (const role of roles) {
      const base = `--gds-${role.replace('.', '-')}`;
      expect(cssVariables[base]).toBeTruthy();
      expect(cssVariables[`${base}-dark`]).toBeTruthy();
    }
  });

  it('applies the display font to headings and the body font to body', () => {
    const { mantineTheme } = createBrandTheme({ brandColors: classScoutColors, fonts });
    expect(mantineTheme.headings.fontFamily).toContain('Bogart');
    expect(mantineTheme.fontFamily).toContain('Garet');
  });

  it('is deterministic for identical input', () => {
    const a = createBrandTheme({ brandColors: classScoutColors, fonts });
    const b = createBrandTheme({ brandColors: classScoutColors, fonts });
    expect(a.cssVariables).toEqual(b.cssVariables);
    expect(a.tokenGraph.nodes).toEqual(b.tokenGraph.nodes);
  });

  it('throws GdsBrandThemeError on invalid hex', () => {
    expect(() =>
      createBrandTheme({ brandColors: { ...classScoutColors, navy: 'navy' }, fonts }),
    ).toThrow(GdsBrandThemeError);
  });

  it('throws GdsBrandThemeError on a missing font slot', () => {
    expect(() =>
      createBrandTheme({ brandColors: classScoutColors, fonts: { display: 'Bogart', body: '' } }),
    ).toThrow(GdsBrandThemeError);
  });

  it('throws when a derived text/surface pair fails WCAG AA', () => {
    // sage page background with sage text would collapse contrast; force via cream==navy.
    expect(() =>
      createBrandTheme({ brandColors: { ...classScoutColors, cream: '#0b223e' }, fonts }),
    ).toThrow(GdsBrandThemeError);
  });
});

describe('brandContrastRatio', () => {
  it('computes a high ratio for navy on cream and white on navy', () => {
    expect(brandContrastRatio('#0b223e', '#faf7f1')).toBeGreaterThan(4.5);
    expect(brandContrastRatio('#ffffff', '#0b223e')).toBeGreaterThan(4.5);
  });
});

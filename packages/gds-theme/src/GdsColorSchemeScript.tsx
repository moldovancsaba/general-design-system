import { ColorSchemeScript, type ColorSchemeScriptProps } from '@mantine/core';

export type GdsColorSchemeScriptProps = Omit<ColorSchemeScriptProps, 'defaultColorScheme'>;

export function GdsColorSchemeScript(props: GdsColorSchemeScriptProps) {
  return <ColorSchemeScript defaultColorScheme="auto" {...props} />;
}

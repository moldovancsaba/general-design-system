import type { ReactNode } from 'react';
import { Grid, Stack } from '@mantine/core';

export interface EditorScaffoldProps {
  header?: ReactNode;
  form: ReactNode;
  preview?: ReactNode;
  settings?: ReactNode;
}

export function EditorScaffold({ header, form, preview, settings }: EditorScaffoldProps) {
  return (
    <Stack gap="lg">
      {header}
      <Grid gutter="lg" align="start">
        <Grid.Col span={{ base: 12, md: preview ? 7 : 8 }}>
          {form}
        </Grid.Col>
        {(preview || settings) ? (
          <Grid.Col span={{ base: 12, md: preview ? 5 : 4 }}>
            <Stack gap="lg">
              {preview}
              {settings}
            </Stack>
          </Grid.Col>
        ) : null}
      </Grid>
    </Stack>
  );
}

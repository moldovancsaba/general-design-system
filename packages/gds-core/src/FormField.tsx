import React from 'react';
import { Box, Stack, Text } from '@mantine/core';

export interface FormFieldProps {
  label: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({ label, description, error, children }: FormFieldProps) {
  return (
    <Box component="label">
      <Stack gap={4}>
        <Text size="xs" fw={600} c="dimmed">
          {label}
        </Text>
        {description ? (
          <Text size="xs" c="dimmed">
            {description}
          </Text>
        ) : null}
        {children}
        {error ? (
          <Text size="xs" c="red.7">
            {error}
          </Text>
        ) : null}
      </Stack>
    </Box>
  );
}

import type { ReactNode } from 'react';
import { Box, Title, Text, Stack, Divider } from '@mantine/core';

export interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  withDivider?: boolean;
}

export function FormSection({ title, description, children, withDivider = true }: FormSectionProps) {
  return (
    <Box mb="xl">
      <Box mb="md">
        <Title order={4}>{title}</Title>
        {description && <Text c="dimmed" size="sm">{description}</Text>}
      </Box>
      <Stack gap="md">
        {children}
      </Stack>
      {withDivider && <Divider my="xl" />}
    </Box>
  );
}

import type { ReactNode } from 'react';
import { Anchor, Group, Stack, Text } from '@mantine/core';
import { useGdsTranslation } from '@sovereignsquad/gds-theme';
import { SectionPanel, type SectionPanelTone } from './SectionPanel';

export interface ReferenceSectionProps {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  action?: ReactNode;
  href?: string;
  linkLabel?: ReactNode;
  tone?: SectionPanelTone;
  children: ReactNode;
}

export function ReferenceSection({
  title,
  description,
  eyebrow,
  action,
  href,
  linkLabel,
  tone = 'default',
  children,
}: ReferenceSectionProps) {
  const { t } = useGdsTranslation();

  return (
    <SectionPanel
      tone={tone}
      title={(
        <Stack gap={4}>
          {eyebrow ? (
            <Text size="xs" fw={700} c="dimmed">
              {eyebrow}
            </Text>
          ) : null}
          <Group justify="space-between" align="flex-start" gap="md" wrap="wrap">
            <Stack gap={4}>
              <Text component="span" fw={700} size="xl">
                {title}
              </Text>
              {description ? (
                <Text size="sm" c="dimmed">
                  {description}
                </Text>
              ) : null}
            </Stack>
            {href ? (
              <Anchor href={href} fw={600}>
                {linkLabel ?? t('gds.reference.openSection', 'Open section')}
              </Anchor>
            ) : null}
          </Group>
        </Stack>
      )}
      action={action}
      divided={false}
    >
      {children}
    </SectionPanel>
  );
}

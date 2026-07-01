'use client';

import type { ReactNode } from 'react';
import { Box, Button, Group, Progress, SegmentedControl, Slider, Stack, Text, Title } from '@mantine/core';
import { useGdsTranslation } from '@doneisbetter/gds-theme';
import { FormField } from './FormField';

export interface GdsSegmentedControlOption<T extends string = string> {
  value: T;
  label: ReactNode;
  disabled?: boolean;
}

export interface GdsSegmentedControlProps<T extends string = string> {
  value: T;
  onChange: (value: T) => void;
  options: GdsSegmentedControlOption<T>[];
  ariaLabel: string;
  overflow?: 'scroll' | 'wrap';
  fullWidth?: boolean;
  disabled?: boolean;
}

export function GdsSegmentedControl<T extends string = string>({
  value,
  onChange,
  options,
  ariaLabel,
  overflow = 'scroll',
  fullWidth = false,
  disabled = false,
}: GdsSegmentedControlProps<T>) {
  return (
    <Box
      role="group"
      aria-label={ariaLabel}
      style={{
        overflowX: overflow === 'scroll' ? 'auto' : undefined,
        maxWidth: '100%',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <SegmentedControl
        value={value}
        onChange={(next) => onChange(next as T)}
        data={options.map((option) => ({
          value: option.value,
          label: option.label,
          disabled: option.disabled || disabled,
        }))}
        fullWidth={fullWidth}
        withItemsBorders={false}
        styles={{
          root: {
            minWidth: overflow === 'scroll' ? 'max-content' : undefined,
            flexWrap: overflow === 'wrap' ? 'wrap' : undefined,
            background: 'var(--gds-vibe-control, var(--mantine-color-gray-1))',
          },
          label: {
            minHeight: 36,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
          },
          indicator: {
            background: 'var(--gds-brand-primary, var(--gds-vibe-primary, var(--mantine-primary-color-filled)))',
          },
        }}
      />
    </Box>
  );
}

export interface GdsSliderProps {
  label: ReactNode;
  description?: ReactNode;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  ariaLabel?: string;
  marks?: { value: number; label?: ReactNode }[];
}

export function GdsSlider({
  label,
  description,
  value,
  onChange,
  min = 1,
  max = 10,
  step = 1,
  disabled = false,
  ariaLabel,
  marks,
}: GdsSliderProps) {
  const { t } = useGdsTranslation();
  return (
    <FormField label={label} description={description}>
      <Slider
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        marks={marks}
        disabled={disabled}
        aria-label={ariaLabel ?? (typeof label === 'string' ? label : t('gds.form.slider.label', 'Slider'))}
        color="var(--gds-brand-primary, var(--gds-vibe-primary, var(--mantine-primary-color-filled)))"
      />
    </FormField>
  );
}

export interface GdsRatingScaleProps extends Omit<GdsSliderProps, 'min' | 'max' | 'step'> {
  scale?: 5 | 10;
}

export function GdsRatingScale({ scale = 5, marks, ariaLabel, label, ...props }: GdsRatingScaleProps) {
  const { t } = useGdsTranslation();
  const resolvedAriaLabel = ariaLabel
    ?? (typeof label === 'string' ? label : t('gds.form.rating.aria', 'Rating'));
  return (
    <GdsSlider
      label={label}
      ariaLabel={resolvedAriaLabel}
      min={1}
      max={scale}
      step={1}
      marks={marks ?? [
        { value: 1, label: '1' },
        { value: scale, label: String(scale) },
      ]}
      {...props}
    />
  );
}

export interface GdsWizardStep {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  optional?: boolean;
  completed?: boolean;
}

export interface GdsWizardStepperProps {
  steps: GdsWizardStep[];
  activeStep: number;
  onStepChange?: (stepIndex: number) => void;
  onBack?: () => void;
  onSaveNext?: () => void | Promise<void>;
  backLabel?: string;
  saveNextLabel?: string;
  finishLabel?: string;
  loading?: boolean;
  ariaLabel?: string;
}

export function GdsWizardStepper({
  steps,
  activeStep,
  onStepChange,
  onBack,
  onSaveNext,
  backLabel,
  saveNextLabel,
  finishLabel,
  loading = false,
  ariaLabel,
}: GdsWizardStepperProps) {
  const { t } = useGdsTranslation();
  const resolvedBackLabel = backLabel ?? t('gds.form.wizard.back', 'Back');
  const resolvedSaveNextLabel = saveNextLabel ?? t('gds.form.wizard.next', 'Save & Next');
  const resolvedFinishLabel = finishLabel ?? t('gds.form.wizard.finish', 'Finish');
  const resolvedProgressLabel = ariaLabel ?? t('gds.form.wizard.progress', 'Progress');
  const safeIndex = Math.min(Math.max(activeStep, 0), Math.max(steps.length - 1, 0));
  const current = steps[safeIndex];
  const progress = steps.length <= 1 ? 100 : ((safeIndex + 1) / steps.length) * 100;
  const atFirst = safeIndex === 0;
  const atLast = safeIndex >= steps.length - 1;

  if (!steps.length) {
    return null;
  }

  return (
    <Stack gap="md" aria-label={resolvedProgressLabel}>
      <Progress value={progress} radius="xl" size="sm" aria-label={`${resolvedProgressLabel}: ${safeIndex + 1}/${steps.length}`} />
      <Group component="ol" gap="xs" wrap="nowrap" style={{ overflowX: 'auto', padding: 0, margin: 0 }}>
        {steps.map((step, index) => {
          const active = index === safeIndex;
          return (
            <Box component="li" key={step.id} style={{ listStyle: 'none', minWidth: 120 }}>
              <Button
                variant={active ? 'filled' : step.completed ? 'light' : 'default'}
                size="xs"
                fullWidth
                onClick={() => onStepChange?.(index)}
                aria-current={active ? 'step' : undefined}
              >
                {step.title}
              </Button>
            </Box>
          );
        })}
      </Group>
      <Stack gap={4}>
        <Title order={4}>{current.title}</Title>
        {current.description ? <Text size="sm" c="dimmed">{current.description}</Text> : null}
        {current.optional ? <Text size="xs" c="dimmed">{t('gds.form.wizard.optional', 'Optional step')}</Text> : null}
      </Stack>
      <Group justify="space-between" gap="sm">
        <Button variant="default" onClick={onBack} disabled={loading || atFirst}>
          {resolvedBackLabel}
        </Button>
        <Button onClick={() => { void onSaveNext?.(); }} loading={loading}>
          {atLast ? resolvedFinishLabel : resolvedSaveNextLabel}
        </Button>
      </Group>
    </Stack>
  );
}

import { useState } from 'react';
import { ActionIcon, Card, Group, Stack, TextInput } from '@mantine/core';
import { ChoiceChip } from './ChoiceChip';
import { MeaningBadge } from './MeaningBadge';
import { GdsIcons } from './icons';

/**
 * AISearchCard (gap B10 / issue #325).
 *
 * Governed pattern + thin wrapper for an AI search entry surface: a search
 * input, a BETA meaning badge, and prompt chips that route a query into the
 * assistant (e.g. a `ChatThread`). Routing/transport is owned by the consumer
 * via `onSubmit`; the component performs no navigation itself.
 */

export interface AISearchCardProps {
  onSubmit: (query: string) => void;
  prompts?: string[];
  onPromptSelect?: (prompt: string) => void;
  placeholder?: string;
  betaLabel?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export function AISearchCard({
  onSubmit,
  prompts = [],
  onPromptSelect,
  placeholder = 'Ask anything…',
  betaLabel = 'BETA',
  ariaLabel = 'AI search',
  disabled = false,
}: AISearchCardProps) {
  const [query, setQuery] = useState('');

  const submit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
  };

  const selectPrompt = (prompt: string) => {
    if (disabled) return;
    setQuery(prompt);
    if (onPromptSelect) {
      onPromptSelect(prompt);
    } else {
      onSubmit(prompt);
    }
  };

  return (
    <Card withBorder radius="lg" padding="lg" role="search" aria-label={ariaLabel}>
      <Stack gap="sm">
        <Group justify="flex-end">
          <MeaningBadge variant="info" label={betaLabel} />
        </Group>
        <Group gap="xs" wrap="nowrap">
          <TextInput
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                submit(query);
              }
            }}
            placeholder={placeholder}
            disabled={disabled}
            aria-label={placeholder}
            style={{ flex: 1 }}
          />
          <ActionIcon size="lg" aria-label="Search" disabled={disabled || !query.trim()} onClick={() => submit(query)}>
            <GdsIcons.Search size="1.1rem" />
          </ActionIcon>
        </Group>
        {prompts.length > 0 ? (
          <Group gap="xs" wrap="wrap" role="group" aria-label="Suggested prompts">
            {prompts.map((prompt) => (
              <ChoiceChip
                key={prompt}
                label={prompt}
                component="button"
                onClick={() => selectPrompt(prompt)}
                style={disabled ? { opacity: 0.5, pointerEvents: 'none' } : { cursor: 'pointer' }}
              />
            ))}
          </Group>
        ) : null}
      </Stack>
    </Card>
  );
}

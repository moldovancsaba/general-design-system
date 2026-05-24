import type { ReactNode } from 'react';
import { Modal, Group, Text } from '@mantine/core';
import { SemanticButton } from './SemanticButton';
import type { SemanticAction } from './vocabulary';

export interface ConfirmDialogProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
  confirmAction?: SemanticAction;
  cancelAction?: SemanticAction;
  isDanger?: boolean;
  loading?: boolean;
}

/**
 * Standardized destructive/confirmation dialog.
 */
export function ConfirmDialog({
  opened,
  onClose,
  onConfirm,
  title,
  children,
  confirmAction = 'confirm',
  cancelAction = 'cancel',
  isDanger = true,
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered trapFocus>
      <Text size="sm" mb="xl">
        {children}
      </Text>
      <Group justify="flex-end">
        <SemanticButton action={cancelAction} variant="default" onClick={onClose} disabled={loading} />
        <SemanticButton action={confirmAction} color={isDanger ? 'red' : 'violet'} onClick={onConfirm} loading={loading} />
      </Group>
    </Modal>
  );
}

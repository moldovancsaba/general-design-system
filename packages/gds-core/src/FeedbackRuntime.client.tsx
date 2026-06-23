'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Alert, Button, Group, Paper, Stack, Text } from '@mantine/core';
import { ConfirmDialog } from './ConfirmDialog';
import { GdsNotificationProvider, useGdsNotifications } from './Notifications.client';
import type { GdsNotificationMessage } from './Notifications';
import type { SemanticAction } from './vocabulary';

export interface ConfirmRequest {
  id?: string;
  title: string;
  message: ReactNode;
  targetName?: string;
  consequence?: ReactNode;
  confirmAction?: SemanticAction;
  cancelAction?: SemanticAction;
  danger?: boolean;
}

export interface GdsConfirmApi {
  confirm: (request: ConfirmRequest) => Promise<boolean>;
  confirmDestructive: (request: ConfirmRequest & { targetName: string }) => Promise<boolean>;
  confirmAction: <TPayload = unknown>(request: GdsConfirmationRequest<TPayload>) => Promise<GdsDestructiveActionResult<TPayload>>;
}

export type GdsRiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type GdsConfirmationStatus = 'idle' | 'open' | 'validating' | 'executing' | 'succeeded' | 'failed' | 'undoable' | 'cancelled';
export type GdsConfirmationEventType = 'opened' | 'cancelled' | 'confirmed' | 'failed' | 'retry' | 'undo_started' | 'undo_completed';

export interface GdsUndoPolicy<TPayload = unknown> {
  windowMs: number;
  label?: string;
  onUndo: (payload: TPayload) => void | Promise<void>;
}

export interface GdsConfirmationRequest<TPayload = unknown> extends ConfirmRequest {
  payload: TPayload;
  riskLevel?: GdsRiskLevel;
  preview?: ReactNode;
  validateTarget?: (payload: TPayload) => boolean | string | Promise<boolean | string>;
  execute?: (payload: TPayload) => void | Promise<void>;
  timeoutMs?: number;
  retryable?: boolean;
  undo?: GdsUndoPolicy<TPayload>;
}

export interface GdsDestructiveActionResult<TPayload = unknown> {
  status: GdsConfirmationStatus;
  payload?: TPayload;
  error?: string;
  undoUntil?: number;
}

export interface GdsConfirmationEvent {
  type: GdsConfirmationEventType;
  id: string;
  riskLevel: GdsRiskLevel;
  status: GdsConfirmationStatus;
  timestamp: number;
  privacy: 'metadata-only';
}

export interface GdsConfirmProviderProps {
  children: ReactNode;
  defaultTimeoutMs?: number;
  onConfirmationEvent?: (event: GdsConfirmationEvent) => void;
}

type ActiveConfirmRequest =
  | (ConfirmRequest & {
    mode: 'boolean';
    status: GdsConfirmationStatus;
    resolve: (confirmed: boolean) => void;
  })
  | (GdsConfirmationRequest<any> & {
    mode: 'action';
    status: GdsConfirmationStatus;
    error?: string;
    resolve: (result: GdsDestructiveActionResult<any>) => void;
  });

interface UndoState {
  id: string;
  label: string;
  expiresAt: number;
  onUndo: () => Promise<void>;
}

const GdsConfirmContext = createContext<GdsConfirmApi | null>(null);

function createConfirmationEvent(type: GdsConfirmationEventType, request: Pick<ConfirmRequest, 'id' | 'danger'> & { riskLevel?: GdsRiskLevel }, status: GdsConfirmationStatus): GdsConfirmationEvent {
  return {
    type,
    id: request.id ?? 'confirmation',
    riskLevel: request.riskLevel ?? (request.danger ? 'high' : 'medium'),
    status,
    timestamp: Date.now(),
    privacy: 'metadata-only',
  };
}

function timeoutPromise(timeoutMs: number) {
  return new Promise<never>((_, reject) => {
    window.setTimeout(() => reject(new Error('Confirmation action timed out.')), timeoutMs);
  });
}

export function GdsConfirmProvider({
  children,
  defaultTimeoutMs = 10000,
  onConfirmationEvent,
}: GdsConfirmProviderProps) {
  const [activeRequest, setActiveRequest] = useState<ActiveConfirmRequest | null>(null);
  const [undoState, setUndoState] = useState<UndoState | null>(null);
  const activeResolver = useRef<((confirmed: boolean) => void) | null>(null);
  const actionResolver = useRef<((result: GdsDestructiveActionResult<unknown>) => void) | null>(null);
  const focusReturnTarget = useRef<HTMLElement | null>(null);

  const emit = useCallback((type: GdsConfirmationEventType, request: Pick<ConfirmRequest, 'id' | 'danger'> & { riskLevel?: GdsRiskLevel }, status: GdsConfirmationStatus) => {
    onConfirmationEvent?.(createConfirmationEvent(type, request, status));
  }, [onConfirmationEvent]);

  const restoreFocus = useCallback(() => {
    const target = focusReturnTarget.current;
    focusReturnTarget.current = null;
    if (target) window.setTimeout(() => target.focus(), 0);
  }, []);

  const openConfirm = useCallback((request: ConfirmRequest) => new Promise<boolean>((resolve) => {
    if (activeResolver.current) {
      activeResolver.current(false);
    }
    focusReturnTarget.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    activeResolver.current = resolve;
    emit('opened', request, 'open');
    setActiveRequest({ ...request, mode: 'boolean', status: 'open', resolve });
  }), [emit]);

  const openActionConfirm = useCallback(<TPayload,>(request: GdsConfirmationRequest<TPayload>) => new Promise<GdsDestructiveActionResult<TPayload>>((resolve) => {
    if (actionResolver.current) {
      actionResolver.current({ status: 'cancelled' });
    }
    focusReturnTarget.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const resolver = resolve as (result: GdsDestructiveActionResult<any>) => void;
    actionResolver.current = resolver;
    emit('opened', request, 'open');
    const isDanger = request.danger ?? (request.riskLevel === 'high' || request.riskLevel === 'critical');
    setActiveRequest({
      ...request,
      mode: 'action',
      status: 'open',
      danger: isDanger,
      confirmAction: request.confirmAction ?? (isDanger ? 'delete' : 'confirm'),
      resolve: resolver,
    });
  }), [emit]);

  const resolveActive = useCallback((confirmed: boolean) => {
    if (activeRequest?.mode === 'boolean') {
      emit(confirmed ? 'confirmed' : 'cancelled', activeRequest, confirmed ? 'succeeded' : 'cancelled');
    }
    activeResolver.current?.(confirmed);
    activeResolver.current = null;
    setActiveRequest(null);
    restoreFocus();
  }, [activeRequest, emit, restoreFocus]);

  const cancelAction = useCallback(() => {
    if (activeRequest?.mode === 'action') {
      emit('cancelled', activeRequest, 'cancelled');
      actionResolver.current?.({ status: 'cancelled', payload: activeRequest.payload });
      actionResolver.current = null;
    }
    setActiveRequest(null);
    restoreFocus();
  }, [activeRequest, emit, restoreFocus]);

  const runAction = useCallback(async (retry = false) => {
    if (!activeRequest || activeRequest.mode !== 'action') return;
    const request = activeRequest;
    if (retry) emit('retry', request, 'executing');
    setActiveRequest({ ...request, status: request.validateTarget ? 'validating' : 'executing', error: undefined });

    try {
      if (request.validateTarget) {
        const validation = await request.validateTarget(request.payload);
        if (validation !== true) {
          throw new Error(typeof validation === 'string' ? validation : 'Target could not be validated.');
        }
      }

      setActiveRequest({ ...request, status: 'executing', error: undefined });
      if (request.execute) {
        await Promise.race([
          request.execute(request.payload),
          timeoutPromise(request.timeoutMs ?? defaultTimeoutMs),
        ]);
      }

      emit('confirmed', request, request.undo ? 'undoable' : 'succeeded');
      if (request.undo) {
        const expiresAt = Date.now() + request.undo.windowMs;
        const undoPolicy = request.undo;
        setUndoState({
          id: request.id ?? 'confirmation-undo',
          label: undoPolicy.label ?? 'Undo',
          expiresAt,
          onUndo: async () => {
            emit('undo_started', request, 'undoable');
            await undoPolicy.onUndo(request.payload);
            emit('undo_completed', request, 'succeeded');
            setUndoState(null);
          },
        });
        window.setTimeout(() => {
          setUndoState((current) => (current?.expiresAt === expiresAt ? null : current));
        }, request.undo.windowMs);
        actionResolver.current?.({ status: 'undoable', payload: request.payload, undoUntil: expiresAt });
      } else {
        actionResolver.current?.({ status: 'succeeded', payload: request.payload });
      }
      actionResolver.current = null;
      setActiveRequest(null);
      restoreFocus();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Action failed.';
      emit('failed', request, 'failed');
      setActiveRequest({ ...request, status: 'failed', error: message });
    }
  }, [activeRequest, defaultTimeoutMs, emit, restoreFocus]);

  const value = useMemo<GdsConfirmApi>(() => ({
    confirm: openConfirm,
    confirmDestructive: (request) => openConfirm({ ...request, danger: true, confirmAction: request.confirmAction ?? 'delete' }),
    confirmAction: openActionConfirm,
  }), [openActionConfirm, openConfirm]);

  return (
    <GdsConfirmContext.Provider value={value}>
      {children}
      {undoState ? (
        <Paper withBorder radius="md" p="sm" mb="sm" role="status" aria-live="polite" aria-label="Action can be undone">
          <Group justify="space-between">
            <Stack gap={2}>
              <Text fw={700} size="sm">Action can be undone</Text>
              <Text size="sm">Undo is available until the recovery window expires.</Text>
            </Stack>
            <Button size="xs" variant="default" onClick={() => { void undoState.onUndo(); }}>
              {undoState.label}
            </Button>
          </Group>
        </Paper>
      ) : null}
      <ConfirmDialog
        opened={Boolean(activeRequest)}
        onClose={() => (activeRequest?.mode === 'action' ? cancelAction() : resolveActive(false))}
        onConfirm={() => (activeRequest?.mode === 'action' ? void runAction(activeRequest.status === 'failed') : resolveActive(true))}
        title={activeRequest?.title ?? ''}
        confirmAction={activeRequest?.confirmAction ?? (activeRequest?.danger ? 'delete' : 'confirm')}
        cancelAction={activeRequest?.cancelAction ?? 'cancel'}
        isDanger={activeRequest?.danger ?? false}
        loading={activeRequest?.status === 'executing' || activeRequest?.status === 'validating'}
      >
        <Stack gap="xs">
          {activeRequest?.targetName ? <strong>{activeRequest.targetName}</strong> : null}
          {activeRequest?.targetName ? <br /> : null}
          {activeRequest?.message}
          {activeRequest?.consequence ? (
            <>
              <br />
              {activeRequest.consequence}
            </>
          ) : null}
          {activeRequest?.mode === 'action' && activeRequest.preview ? <div>{activeRequest.preview}</div> : null}
          {activeRequest?.mode === 'action' && activeRequest.status === 'failed' ? (
            <Alert color="red" title="Action failed" role="alert">
              <Text size="sm">{activeRequest.error}</Text>
              {activeRequest.retryable ? <Text size="xs">Use the primary action to retry.</Text> : null}
            </Alert>
          ) : null}
        </Stack>
      </ConfirmDialog>
    </GdsConfirmContext.Provider>
  );
}

export function useGdsConfirm() {
  const context = useContext(GdsConfirmContext);
  if (!context) {
    throw new Error('useGdsConfirm must be used within GdsConfirmProvider.');
  }
  return context;
}

export interface GdsToastMessage extends Omit<GdsNotificationMessage, 'id' | 'severity'> {
  id?: string;
}

export interface GdsToastApi {
  notifySuccess: (message: GdsToastMessage) => void;
  notifyError: (message: GdsToastMessage & { retry?: () => void | Promise<void> }) => void;
  notifyActionComplete: (message: GdsToastMessage) => void;
}

const GdsToastContext = createContext<GdsToastApi | null>(null);

function createToastId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function GdsToastProvider({ children }: { children: ReactNode }) {
  return (
    <GdsNotificationProvider>
      <GdsToastProviderInner>{children}</GdsToastProviderInner>
    </GdsNotificationProvider>
  );
}

function GdsToastProviderInner({ children }: { children: ReactNode }) {
  const { notify } = useGdsNotifications();
  const value = useMemo<GdsToastApi>(() => ({
    notifySuccess: (message) => notify({
      ...message,
      id: message.id ?? createToastId('success'),
      severity: 'success',
      autoCloseMs: message.autoCloseMs ?? 4000,
    }),
    notifyError: (message) => notify({
      ...message,
      id: message.id ?? createToastId('error'),
      severity: 'error',
      autoCloseMs: message.autoCloseMs ?? false,
      retry: message.retry ? { onRetry: message.retry, maxAttempts: 3, label: 'Retry' } : undefined,
    }),
    notifyActionComplete: (message) => notify({
      ...message,
      id: message.id ?? createToastId('complete'),
      severity: 'success',
      autoCloseMs: message.autoCloseMs ?? 3000,
    }),
  }), [notify]);

  return <GdsToastContext.Provider value={value}>{children}</GdsToastContext.Provider>;
}

export function useGdsToasts() {
  const context = useContext(GdsToastContext);
  if (!context) {
    throw new Error('useGdsToasts must be used within GdsToastProvider.');
  }
  return context;
}

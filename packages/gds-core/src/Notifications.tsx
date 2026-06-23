import type { ReactNode } from 'react';
import { Alert, Badge, Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import type { StateBlockVariant } from './StateBlock';
import { GdsIcons } from './icons';

export type GdsNotificationSeverity = 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'loading';
export type GdsNotificationStatus = 'shown' | 'loading' | 'retrying' | 'dismissed' | 'failed' | 'succeeded';
export type GdsNotificationPersistence = 'transient' | 'persistent' | 'critical' | 'announcement-only';
export type GdsNotificationLivePolicy = 'polite' | 'assertive' | 'off';
export type GdsNotificationDedupePolicy = 'replace' | 'ignore' | 'append';
export type GdsNotificationAuditEventType =
  | 'shown'
  | 'updated'
  | 'dismissed'
  | 'cleared'
  | 'action_clicked'
  | 'retry_started'
  | 'retry_failed'
  | 'retry_succeeded';

export interface GdsNotificationAction {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface GdsNotificationRetryPolicy {
  label?: string;
  maxAttempts?: number;
  timeoutMs?: number;
  onRetry: () => void | Promise<void>;
}

export interface GdsNotificationPolicy {
  autoCloseMs?: number | false;
  dedupe?: GdsNotificationDedupePolicy;
  persistence?: GdsNotificationPersistence;
  live?: GdsNotificationLivePolicy;
}

export interface GdsNotificationMessage {
  id: string;
  key?: string;
  title: string;
  message?: ReactNode;
  severity?: GdsNotificationSeverity;
  status?: GdsNotificationStatus;
  persistence?: GdsNotificationPersistence;
  live?: GdsNotificationLivePolicy;
  autoCloseMs?: number | false;
  actions?: GdsNotificationAction[];
  retry?: GdsNotificationRetryPolicy;
  retryAttempts?: number;
  createdAt?: number;
  updatedAt?: number;
  announcementOnly?: boolean;
}

export interface GdsNotificationAuditEvent {
  type: GdsNotificationAuditEventType;
  id: string;
  key?: string;
  severity: GdsNotificationSeverity;
  status: GdsNotificationStatus;
  timestamp: number;
  actionId?: string;
  retryAttempt?: number;
  privacy: 'metadata-only';
}

export interface InlineAlertProps {
  title: string;
  message?: ReactNode;
  severity?: GdsNotificationSeverity;
  status?: GdsNotificationStatus;
  action?: ReactNode;
}

export interface BannerNoticeProps extends InlineAlertProps {
  eyebrow?: ReactNode;
}

const notificationColorMap: Record<GdsNotificationSeverity, string> = {
  success: 'teal',
  error: 'red',
  warning: 'yellow',
  info: 'blue',
  neutral: 'gray',
  loading: 'blue',
};

function severityToStateVariant(severity: GdsNotificationSeverity): StateBlockVariant {
  if (severity === 'success') return 'success';
  if (severity === 'error') return 'error';
  if (severity === 'warning') return 'not-enough-data';
  if (severity === 'neutral') return 'disabled';
  return 'info';
}

export function createGdsNotificationId(prefix = 'notification') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getGdsNotificationLivePolicy(message: Pick<GdsNotificationMessage, 'severity' | 'live' | 'persistence'>): GdsNotificationLivePolicy {
  if (message.live) return message.live;
  if (message.persistence === 'announcement-only') return 'polite';
  if (message.severity === 'error' || message.severity === 'warning') return 'assertive';
  return 'polite';
}

export function createGdsNotificationAuditEvent(
  type: GdsNotificationAuditEventType,
  notification: GdsNotificationMessage,
  metadata: Pick<GdsNotificationAuditEvent, 'actionId' | 'retryAttempt'> = {},
): GdsNotificationAuditEvent {
  return {
    type,
    id: notification.id,
    key: notification.key,
    severity: notification.severity ?? 'info',
    status: notification.status ?? 'shown',
    timestamp: Date.now(),
    privacy: 'metadata-only',
    ...metadata,
  };
}

export function InlineAlert({
  title,
  message,
  severity = 'info',
  status,
  action,
}: InlineAlertProps) {
  const livePolicy = getGdsNotificationLivePolicy({ severity });
  return (
    <Alert
      variant="light"
      color={notificationColorMap[severity]}
      title={title}
      icon={<GdsIcons.Info size="1rem" />}
      role={severity === 'error' ? 'alert' : 'status'}
      aria-live={livePolicy === 'off' ? undefined : livePolicy}
      aria-atomic="true"
    >
      <Stack gap="xs">
        {status ? (
          <Badge variant="light" color={notificationColorMap[severity]} w="fit-content">
            {status.replace('-', ' ')}
          </Badge>
        ) : null}
        {message ? <Text size="sm">{message}</Text> : null}
        {action}
      </Stack>
    </Alert>
  );
}

export function BannerNotice({
  eyebrow,
  title,
  message,
  severity = 'info',
  action,
}: BannerNoticeProps) {
  return (
    <Paper withBorder radius="lg" p="md">
      <Stack gap="xs">
        <Group justify="space-between" align="center">
          <Group gap="xs">
            {eyebrow ? <Badge variant="light">{eyebrow}</Badge> : null}
            <Badge variant="light" color={notificationColorMap[severity]}>
              {severityToStateVariant(severity).replace('-', ' ')}
            </Badge>
          </Group>
          {action}
        </Group>
        <Title order={4}>{title}</Title>
        {message ? <Text size="sm" c="dimmed">{message}</Text> : null}
      </Stack>
    </Paper>
  );
}

export function NotificationCenterView({
  notifications,
  onDismiss,
  onClear,
  onAction,
  onRetry,
  title = 'Notifications',
  emptyMessage = 'No active notifications.',
}: {
  notifications: GdsNotificationMessage[];
  onDismiss?: (id: string) => void;
  onClear?: () => void;
  onAction?: (notification: GdsNotificationMessage, action: GdsNotificationAction) => void;
  onRetry?: (notification: GdsNotificationMessage) => void;
  title?: ReactNode;
  emptyMessage?: ReactNode;
}) {
  const visibleNotifications = notifications.filter((item) => item.persistence !== 'announcement-only' && !item.announcementOnly);

  return (
    <Paper withBorder radius="lg" p="md" role="region" aria-label={typeof title === 'string' ? title : 'Notifications'}>
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Title order={4}>{title}</Title>
          <Button size="xs" variant="subtle" onClick={onClear} disabled={visibleNotifications.length === 0 || !onClear}>
            Clear all
          </Button>
        </Group>
        {visibleNotifications.length === 0 ? (
          <Text size="sm" c="dimmed">{emptyMessage}</Text>
        ) : (
          <Stack gap="sm">
            {visibleNotifications.map((item) => (
              <InlineAlert
                key={item.id}
                severity={item.severity}
                status={item.status}
                title={item.title}
                message={item.message}
                action={(
                  <Group gap="xs">
                    {item.actions?.map((action) => (
                      <Button
                        key={action.id}
                        size="xs"
                        variant="default"
                        onClick={() => onAction?.(item, action)}
                        disabled={action.disabled}
                      >
                        {action.label}
                      </Button>
                    ))}
                    {item.retry ? (
                      <Button
                        size="xs"
                        variant="default"
                        onClick={() => onRetry?.(item)}
                        disabled={!onRetry || item.status === 'retrying'}
                      >
                        {item.status === 'retrying' ? 'Retrying' : (item.retry.label ?? 'Retry')}
                      </Button>
                    ) : null}
                    <Button size="xs" variant="subtle" onClick={() => onDismiss?.(item.id)} disabled={!onDismiss}>
                      Dismiss
                    </Button>
                  </Group>
                )}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}

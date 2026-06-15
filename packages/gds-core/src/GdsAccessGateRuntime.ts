export type GdsAccessGateState =
  | 'loading-auth'
  | 'preview'
  | 'locked'
  | 'unlocking'
  | 'unlocked'
  | 'permission-denied'
  | 'expired'
  | 'error';

export type GdsAccessGateReason =
  | 'login-required'
  | 'subscription-required'
  | 'role-required'
  | 'session-expired'
  | 'entitlement-missing'
  | 'network-timeout'
  | 'unknown-error';

export type GdsAccessGateActionKind =
  | 'sign-in'
  | 'sign-up'
  | 'subscribe'
  | 'request-access'
  | 'retry'
  | 'back';

export interface GdsAccessGateAction {
  kind: GdsAccessGateActionKind;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void | Promise<void>;
}

export interface GdsAccessGateContract {
  id: string;
  state: GdsAccessGateState;
  reason?: GdsAccessGateReason;
  title: string;
  description: string;
  actions?: GdsAccessGateAction[];
  entitlementLabel?: string;
  teaserLabel?: string;
  protectedContentPolicy?: 'never-render-while-locked';
}

export interface GdsAccessSession {
  status: 'loading' | 'anonymous' | 'authenticated' | 'expired';
  subjectId?: string;
}

export interface GdsAccessEntitlement {
  allowed: boolean;
  reason?: GdsAccessGateReason;
  label?: string;
}

export interface GdsAccessAdapter {
  getSession: (signal?: AbortSignal) => Promise<GdsAccessSession> | GdsAccessSession;
  getEntitlement?: (session: GdsAccessSession, signal?: AbortSignal) => Promise<GdsAccessEntitlement> | GdsAccessEntitlement;
}

export interface GdsAccessAdapterOptions {
  gateId: string;
  timeoutMs?: number;
}

export interface GdsAccessGateEvent {
  type:
    | 'gds.access_gate.view'
    | 'gds.access_gate.action'
    | 'gds.access_gate.unlocked'
    | 'gds.access_gate.denied'
    | 'gds.access_gate.timeout'
    | 'gds.access_gate.error';
  gateId: string;
  state: GdsAccessGateState;
  reason?: GdsAccessGateReason;
  actionKind?: GdsAccessGateActionKind;
  metadata?: Record<string, string | number | boolean>;
}

const states: GdsAccessGateState[] = [
  'loading-auth',
  'preview',
  'locked',
  'unlocking',
  'unlocked',
  'permission-denied',
  'expired',
  'error',
];

const reasons: GdsAccessGateReason[] = [
  'login-required',
  'subscription-required',
  'role-required',
  'session-expired',
  'entitlement-missing',
  'network-timeout',
  'unknown-error',
];

const actionPriority: Record<GdsAccessGateActionKind, number> = {
  'sign-in': 10,
  subscribe: 20,
  'sign-up': 30,
  'request-access': 40,
  retry: 50,
  back: 60,
};

const sensitiveMetadataPattern = /token|secret|password|email|content|body|html|markdown|cookie|session/i;

export function getGdsAccessGateStates() {
  return [...states];
}

export function getGdsAccessGateReasons() {
  return [...reasons];
}

export function getGdsAccessGateActionPriority(kind: GdsAccessGateActionKind) {
  return actionPriority[kind];
}

export function sortGdsAccessGateActions(actions: GdsAccessGateAction[]) {
  return [...actions].sort((first, second) => actionPriority[first.kind] - actionPriority[second.kind]);
}

export function validateGdsAccessGateContract(contract: GdsAccessGateContract) {
  const failures: string[] = [];

  if (!contract.id.trim()) {
    failures.push('Access gate requires a stable id.');
  }
  if (!states.includes(contract.state)) {
    failures.push(`Unsupported access gate state: ${contract.state}.`);
  }
  if (contract.reason && !reasons.includes(contract.reason)) {
    failures.push(`Unsupported access gate reason: ${contract.reason}.`);
  }
  if (!contract.title.trim()) {
    failures.push('Access gate requires a visible title.');
  }
  if (!contract.description.trim()) {
    failures.push('Access gate requires a visible description.');
  }
  if (contract.state !== 'unlocked' && contract.protectedContentPolicy !== 'never-render-while-locked') {
    failures.push('Locked access gates must declare protectedContentPolicy: never-render-while-locked.');
  }
  if ((contract.state === 'locked' || contract.state === 'permission-denied') && (!contract.actions || contract.actions.length === 0)) {
    failures.push('Locked and denied access gates require at least one recovery action.');
  }

  return failures;
}

export function redactGdsAccessGateMetadata(metadata: Record<string, unknown> = {}) {
  const safe: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(metadata)) {
    if (sensitiveMetadataPattern.test(key)) {
      safe[key] = '[redacted]';
      continue;
    }
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      safe[key] = value;
    }
  }

  return safe;
}

export function createGdsAccessGateEvent(
  type: GdsAccessGateEvent['type'],
  contract: Pick<GdsAccessGateContract, 'id' | 'state' | 'reason'>,
  metadata?: Record<string, unknown>,
  actionKind?: GdsAccessGateActionKind,
): GdsAccessGateEvent {
  return {
    type,
    gateId: contract.id,
    state: contract.state,
    reason: contract.reason,
    actionKind,
    metadata: redactGdsAccessGateMetadata(metadata),
  };
}

export function resolveGdsAccessState({
  gateId,
  session,
  entitlement,
  error,
}: {
  gateId: string;
  session?: GdsAccessSession;
  entitlement?: GdsAccessEntitlement;
  error?: unknown;
}): GdsAccessGateContract {
  if (error) {
    return {
      id: gateId,
      state: 'error',
      reason: 'unknown-error',
      title: 'Access check failed',
      description: 'We could not verify access. Retry before showing protected content.',
      actions: [{ kind: 'retry' }],
      protectedContentPolicy: 'never-render-while-locked',
    };
  }

  if (!session || session.status === 'loading') {
    return {
      id: gateId,
      state: 'loading-auth',
      title: 'Checking access',
      description: 'We are verifying the session before protected content is considered.',
      protectedContentPolicy: 'never-render-while-locked',
    };
  }

  if (session.status === 'anonymous') {
    return {
      id: gateId,
      state: 'locked',
      reason: 'login-required',
      title: 'Sign in to continue',
      description: 'Preview is available. The rest is only rendered after sign in.',
      actions: [{ kind: 'sign-in' }, { kind: 'sign-up' }],
      protectedContentPolicy: 'never-render-while-locked',
    };
  }

  if (session.status === 'expired') {
    return {
      id: gateId,
      state: 'expired',
      reason: 'session-expired',
      title: 'Session expired',
      description: 'Sign in again to unlock this content.',
      actions: [{ kind: 'sign-in' }, { kind: 'retry' }],
      protectedContentPolicy: 'never-render-while-locked',
    };
  }

  if (entitlement && !entitlement.allowed) {
    const reason = entitlement.reason ?? 'entitlement-missing';
    return {
      id: gateId,
      state: 'permission-denied',
      reason,
      title: reason === 'subscription-required' ? 'Subscription required' : 'Access unavailable',
      description: entitlement.label
        ? `${entitlement.label} is required before this content can be rendered.`
        : 'Your account is signed in but does not have access to this content.',
      actions: reason === 'subscription-required' ? [{ kind: 'subscribe' }, { kind: 'back' }] : [{ kind: 'request-access' }, { kind: 'back' }],
      entitlementLabel: entitlement.label,
      protectedContentPolicy: 'never-render-while-locked',
    };
  }

  return {
    id: gateId,
    state: 'unlocked',
    title: 'Content unlocked',
    description: 'The current session and entitlement allow this content to render.',
  };
}

export function createGdsAccessAdapter(adapter: GdsAccessAdapter) {
  return adapter;
}

export async function resolveGdsAccessAdapterState(
  adapter: GdsAccessAdapter,
  options: GdsAccessAdapterOptions,
) {
  const timeoutMs = options.timeoutMs ?? 3500;
  const controller = typeof AbortController === 'undefined' ? undefined : new AbortController();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      controller?.abort();
      reject(new Error('gds-access-gate-timeout'));
    }, timeoutMs);
  });

  try {
    const session = await Promise.race([Promise.resolve(adapter.getSession(controller?.signal)), timeout]);
    const entitlement = adapter.getEntitlement
      ? await Promise.race([Promise.resolve(adapter.getEntitlement(session, controller?.signal)), timeout])
      : undefined;

    return resolveGdsAccessState({ gateId: options.gateId, session, entitlement });
  } catch (error) {
    const timeoutError = error instanceof Error && error.message === 'gds-access-gate-timeout';
    return {
      ...resolveGdsAccessState({ gateId: options.gateId, error }),
      reason: timeoutError ? 'network-timeout' as const : 'unknown-error' as const,
      title: timeoutError ? 'Access check timed out' : 'Access check failed',
      description: timeoutError
        ? 'The access service did not respond in time. Retry before showing protected content.'
        : 'We could not verify access. Retry before showing protected content.',
    };
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

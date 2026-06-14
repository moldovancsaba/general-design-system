'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Drawer, Modal } from '@mantine/core';
import type { DrawerProps, ModalProps } from '@mantine/core';
import { getGdsMotionPreset } from '@doneisbetter/gds-theme';

export type GdsOverlayType = 'modal' | 'dialog' | 'drawer' | 'sheet' | 'popover' | 'command';
export type OverlayKind = GdsOverlayType | 'tooltip';
export type OverlayCloseReason = 'escape' | 'backdrop' | 'outside-click' | 'programmatic' | 'action' | 'route-change';
export type GdsOverlayStatus = 'opening' | 'open' | 'nested' | 'closing' | 'blocked-close' | 'route-recovery' | 'mobile-fullscreen';
export type GdsOverlayRoutePolicy = 'close' | 'preserve' | 'recover';
export type GdsOverlayEventType = 'overlay_opened' | 'overlay_closed' | 'escape_close' | 'blocked_close' | 'route_recovered';

export interface GdsOverlayPolicy {
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  allowNested?: boolean;
  routeChange?: GdsOverlayRoutePolicy;
  mobileFullscreen?: boolean;
  returnFocus?: boolean;
}

export interface OverlayDescriptor {
  id: string;
  kind: OverlayKind;
  title?: ReactNode;
  description?: ReactNode;
  invokerId?: string;
  policy?: GdsOverlayPolicy;
  status?: GdsOverlayStatus;
}

export interface GdsOverlayStackItem extends OverlayDescriptor {
  openedAt: number;
  status: GdsOverlayStatus;
}

export interface GdsOverlayEvent {
  type: GdsOverlayEventType;
  id: string;
  kind: OverlayKind;
  reason?: OverlayCloseReason;
  status: GdsOverlayStatus;
  timestamp: number;
  privacy: 'metadata-only';
}

interface OverlayManagerValue {
  stack: GdsOverlayStackItem[];
  registerOverlay: (overlay: OverlayDescriptor) => void;
  unregisterOverlay: (id: string, reason?: OverlayCloseReason) => void;
  openOverlay: (overlay: OverlayDescriptor) => void;
  closeOverlay: (id: string, reason?: OverlayCloseReason) => boolean;
  isTopMost: (id: string) => boolean;
  getOverlay: (id: string) => GdsOverlayStackItem | undefined;
  requestClose: (id: string, reason: OverlayCloseReason) => OverlayCloseReason | null;
}

export interface OverlayManagerProviderProps {
  children: ReactNode;
  defaultPolicy?: GdsOverlayPolicy;
  singleOverlayMode?: boolean;
  routeKey?: string | number;
  onOverlayEvent?: (event: GdsOverlayEvent) => void;
}

const defaultOverlayPolicy: Required<GdsOverlayPolicy> = {
  closeOnEscape: true,
  closeOnOutsideClick: true,
  allowNested: false,
  routeChange: 'close',
  mobileFullscreen: false,
  returnFocus: true,
};

const OverlayManagerContext = createContext<OverlayManagerValue | null>(null);

function normalizePolicy(defaultPolicy: GdsOverlayPolicy | undefined, policy: GdsOverlayPolicy | undefined): Required<GdsOverlayPolicy> {
  return {
    ...defaultOverlayPolicy,
    ...defaultPolicy,
    ...policy,
  };
}

function createOverlayEvent(type: GdsOverlayEventType, item: Pick<GdsOverlayStackItem, 'id' | 'kind' | 'status'>, reason?: OverlayCloseReason): GdsOverlayEvent {
  return {
    type,
    id: item.id,
    kind: item.kind,
    reason,
    status: item.status,
    timestamp: Date.now(),
    privacy: 'metadata-only',
  };
}

function getFocusableElement(invokerId?: string) {
  if (invokerId) {
    return document.getElementById(invokerId);
  }
  const active = document.activeElement;
  return active instanceof HTMLElement ? active : null;
}

export function OverlayManagerProvider({
  children,
  defaultPolicy,
  singleOverlayMode = false,
  routeKey,
  onOverlayEvent,
}: OverlayManagerProviderProps) {
  const [stack, setStack] = useState<GdsOverlayStackItem[]>([]);
  const focusReturnTargets = useRef<Map<string, HTMLElement>>(new Map());
  const previousRouteKey = useRef(routeKey);

  const emit = useCallback((type: GdsOverlayEventType, item: GdsOverlayStackItem, reason?: OverlayCloseReason) => {
    onOverlayEvent?.(createOverlayEvent(type, item, reason));
  }, [onOverlayEvent]);

  const registerOverlay = useCallback((overlay: OverlayDescriptor) => {
    const policy = normalizePolicy(defaultPolicy, overlay.policy);
    const focusTarget = getFocusableElement(overlay.invokerId);
    if (policy.returnFocus && focusTarget) {
      focusReturnTargets.current.set(overlay.id, focusTarget);
    }

    setStack((current) => {
      const withoutExisting = current.filter((item) => item.id !== overlay.id);
      const shouldReplace = singleOverlayMode || (!policy.allowNested && withoutExisting.length > 0);
      const base = shouldReplace ? [] : withoutExisting;
      const item: GdsOverlayStackItem = {
        ...overlay,
        status: policy.mobileFullscreen ? 'mobile-fullscreen' : (base.length > 0 ? 'nested' : 'open'),
        openedAt: Date.now(),
        policy,
      };
      emit('overlay_opened', item);
      return [...base, item];
    });
  }, [defaultPolicy, emit, singleOverlayMode]);

  const unregisterOverlay = useCallback((id: string, reason: OverlayCloseReason = 'programmatic') => {
    setStack((current) => {
      const target = current.find((item) => item.id === id);
      if (target) {
        emit(reason === 'escape' ? 'escape_close' : 'overlay_closed', { ...target, status: 'closing' }, reason);
      }
      return current.filter((item) => item.id !== id);
    });

    const focusTarget = focusReturnTargets.current.get(id);
    if (focusTarget) {
      window.setTimeout(() => focusTarget.focus(), 0);
      focusReturnTargets.current.delete(id);
    }
  }, [emit]);

  const isTopMost = useCallback((id: string) => stack.length > 0 && stack[stack.length - 1]?.id === id, [stack]);

  const requestClose = useCallback((id: string, reason: OverlayCloseReason) => {
    const target = stack.find((item) => item.id === id);
    if (!target || !isTopMost(id)) {
      if (target) emit('blocked_close', { ...target, status: 'blocked-close' }, reason);
      return null;
    }

    const policy = normalizePolicy(defaultPolicy, target.policy);
    if (reason === 'escape' && !policy.closeOnEscape) {
      emit('blocked_close', { ...target, status: 'blocked-close' }, reason);
      return null;
    }
    if ((reason === 'backdrop' || reason === 'outside-click') && !policy.closeOnOutsideClick) {
      emit('blocked_close', { ...target, status: 'blocked-close' }, reason);
      return null;
    }

    return reason;
  }, [defaultPolicy, emit, isTopMost, stack]);

  const closeOverlay = useCallback((id: string, reason: OverlayCloseReason = 'programmatic') => {
    const acceptedReason = requestClose(id, reason);
    if (!acceptedReason) return false;
    unregisterOverlay(id, acceptedReason);
    return true;
  }, [requestClose, unregisterOverlay]);

  useEffect(() => {
    if (previousRouteKey.current === routeKey) return;
    previousRouteKey.current = routeKey;
    setStack((current) => {
      const preserved: GdsOverlayStackItem[] = [];
      for (const item of current) {
        const policy = normalizePolicy(defaultPolicy, item.policy);
        if (policy.routeChange === 'preserve') {
          preserved.push(item);
          continue;
        }
        emit('route_recovered', { ...item, status: 'route-recovery' }, 'route-change');
        focusReturnTargets.current.delete(item.id);
      }
      return preserved;
    });
  }, [defaultPolicy, emit, routeKey]);

  const value = useMemo<OverlayManagerValue>(() => ({
    stack,
    registerOverlay,
    unregisterOverlay,
    openOverlay: registerOverlay,
    closeOverlay,
    isTopMost,
    getOverlay: (id) => stack.find((item) => item.id === id),
    requestClose,
  }), [closeOverlay, isTopMost, registerOverlay, requestClose, stack, unregisterOverlay]);

  return (
    <OverlayManagerContext.Provider value={value}>
      {children}
    </OverlayManagerContext.Provider>
  );
}

export function useOverlayManager() {
  const context = useContext(OverlayManagerContext);
  if (!context) {
    throw new Error('useOverlayManager must be used within OverlayManagerProvider.');
  }
  return context;
}

interface GdsOverlaySurfaceBaseProps {
  id: string;
  opened: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  invokerId?: string;
  policy?: GdsOverlayPolicy;
  onBlockedClose?: (reason: OverlayCloseReason) => void;
}

export type GdsModalProps = GdsOverlaySurfaceBaseProps & Omit<ModalProps, 'opened' | 'onClose' | 'title' | 'children' | 'trapFocus'>;
export type GdsDrawerProps = GdsOverlaySurfaceBaseProps & Omit<DrawerProps, 'opened' | 'onClose' | 'title' | 'children' | 'trapFocus'>;
export type GdsSheetProps = GdsDrawerProps;

function useOverlaySurface({
  id,
  opened,
  kind,
  title,
  description,
  invokerId,
  policy,
  onClose,
  onBlockedClose,
}: GdsOverlaySurfaceBaseProps & { kind: GdsOverlayType }) {
  const {
    registerOverlay,
    unregisterOverlay,
    requestClose: requestOverlayClose,
  } = useOverlayManager();

  useEffect(() => {
    if (!opened) return undefined;
    registerOverlay({ id, kind, title, description, invokerId, policy });
    return () => unregisterOverlay(id);
  }, [description, id, invokerId, kind, opened, policy, registerOverlay, title, unregisterOverlay]);

  const requestClose = useCallback((reason: OverlayCloseReason) => {
    const acceptedReason = requestOverlayClose(id, reason);
    if (!acceptedReason) {
      onBlockedClose?.(reason);
      return;
    }
    unregisterOverlay(id, acceptedReason);
    onClose();
  }, [id, onBlockedClose, onClose, requestOverlayClose, unregisterOverlay]);

  return requestClose;
}

export function GdsModal({
  id,
  opened,
  onClose,
  title,
  description,
  children,
  invokerId,
  policy,
  onBlockedClose,
  ...modalProps
}: GdsModalProps) {
  const requestClose = useOverlaySurface({ id, opened, kind: 'modal', title, description, children, invokerId, policy, onClose, onBlockedClose });
  const motion = getGdsMotionPreset('overlay');

  return (
    <Modal
      {...modalProps}
      opened={opened}
      onClose={() => requestClose('escape')}
      title={title}
      centered={modalProps.centered ?? true}
      trapFocus
      closeOnEscape={policy?.closeOnEscape ?? true}
      closeOnClickOutside={policy?.closeOnOutsideClick ?? true}
      transitionProps={{ transition: 'fade', duration: motion.durationMs }}
    >
      {children}
    </Modal>
  );
}

export function GdsDrawer({
  id,
  opened,
  onClose,
  title,
  description,
  children,
  invokerId,
  policy,
  onBlockedClose,
  ...drawerProps
}: GdsDrawerProps) {
  const requestClose = useOverlaySurface({ id, opened, kind: 'drawer', title, description, children, invokerId, policy, onClose, onBlockedClose });
  const motion = getGdsMotionPreset('drawer');

  return (
    <Drawer
      {...drawerProps}
      opened={opened}
      onClose={() => requestClose('escape')}
      title={title}
      position={drawerProps.position ?? 'right'}
      size={policy?.mobileFullscreen ? '100%' : drawerProps.size}
      trapFocus
      closeOnEscape={policy?.closeOnEscape ?? true}
      closeOnClickOutside={policy?.closeOnOutsideClick ?? true}
      transitionProps={{ transition: 'slide-left', duration: motion.durationMs }}
    >
      {children}
    </Drawer>
  );
}

export function GdsSheet(props: GdsSheetProps) {
  return <GdsDrawer {...props} position={props.position ?? 'bottom'} policy={{ mobileFullscreen: true, ...props.policy }} />;
}

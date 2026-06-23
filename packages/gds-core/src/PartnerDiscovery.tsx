import type { ReactNode } from 'react';
import {
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  VisuallyHidden,
} from '@mantine/core';
import { GdsIcons } from './icons';
import { StateBlock } from './StateBlock';

export type PartnerPriceLevel = '$' | '$$' | '$$$' | '$$$$';

export interface PartnerNavItem {
  id: string;
  label: string;
  href: string;
  current?: boolean;
  external?: boolean;
}

export interface PartnerAmenityOption {
  id: string;
  label: string;
  icon?: ReactNode;
  description?: string;
}

export interface PartnerDiscoveryFilterState {
  query: string;
  amenities: string[];
  prices: PartnerPriceLevel[];
}

export interface PartnerDiscoveryFilterLabels {
  search: string;
  searchPlaceholder: string;
  filters: string;
  reset: string;
  close: string;
  apply: string;
  amenities: string;
  price: string;
  selected?: string;
}

export interface PartnerPlaceResult {
  id: string;
  title: string;
  category?: string;
  neighborhood?: string;
  amenities: string[];
  price?: PartnerPriceLevel;
  href: string;
  coordinates?: { lat: number; lng: number };
}

export interface PartnerMapViewport {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface PartnerMapAdapterProps {
  places: PartnerPlaceResult[];
  activePlaceId?: string;
  onPinSelect?: (placeId: string) => void;
  onViewportChange?: (viewport: PartnerMapViewport) => void;
}

export type PartnerDiscoveryEventName =
  | 'filter_open'
  | 'filter_apply'
  | 'filter_reset'
  | 'zero_results'
  | 'map_load'
  | 'map_error'
  | 'result_select'
  | 'pin_select'
  | 'detail_action_click'
  | 'share_success'
  | 'share_failure'
  | 'newsletter_submit_success'
  | 'newsletter_submit_failure'
  | 'submission_failure';

export interface PartnerDiscoveryEvent {
  name: PartnerDiscoveryEventName;
  component: string;
  timestamp: string;
  metadata?: Record<string, string | number | boolean | null>;
}

export type PartnerDiscoveryEventHandler = (event: PartnerDiscoveryEvent) => void;

export const partnerDiscoveryDefaultAmenities: PartnerAmenityOption[] = [
  { id: 'high-chairs', label: 'High chairs' },
  { id: 'booster-seats', label: 'Booster seats' },
  { id: 'changing-table', label: 'Changing table' },
  { id: 'menu-mods', label: 'Menu mods' },
  { id: 'stroller-storage', label: 'Stroller storage' },
  { id: 'kids-options', label: 'Kids options' },
  { id: 'outdoor-seating', label: 'Outdoor seating' },
  { id: 'reservations', label: 'Reservations' },
];

export const partnerDiscoveryDefaultFilterState: PartnerDiscoveryFilterState = {
  query: '',
  amenities: [],
  prices: [],
};

const partnerSurface = {
  page: 'light-dark(color-mix(in srgb, var(--mantine-color-white) 82%, var(--mantine-color-teal-0)), color-mix(in srgb, var(--mantine-color-teal-9) 18%, var(--mantine-color-dark-9)))',
  card: 'light-dark(var(--mantine-color-white), color-mix(in srgb, var(--mantine-color-teal-9) 28%, var(--mantine-color-dark-8)))',
  cardActive: 'light-dark(var(--mantine-color-teal-0), color-mix(in srgb, var(--mantine-color-teal-9) 48%, var(--mantine-color-dark-8)))',
  border: 'light-dark(var(--mantine-color-gray-3), color-mix(in srgb, var(--mantine-color-teal-4) 42%, var(--mantine-color-dark-5)))',
  borderActive: 'light-dark(var(--mantine-color-teal-7), var(--mantine-color-lime-2))',
  text: 'light-dark(var(--mantine-color-dark-9), var(--mantine-color-gray-0))',
  muted: 'light-dark(var(--mantine-color-dark-5), var(--mantine-color-gray-3))',
};

function safeExternalProps(item: { external?: boolean }) {
  return item.external ? { target: '_blank', rel: 'noreferrer noopener' } : {};
}

function createPartnerEvent(
  name: PartnerDiscoveryEventName,
  component: string,
  metadata?: PartnerDiscoveryEvent['metadata'],
): PartnerDiscoveryEvent {
  return {
    name,
    component,
    timestamp: new Date().toISOString(),
    metadata: redactPartnerDiscoveryEventMetadata(metadata),
  };
}

export function redactPartnerDiscoveryEventMetadata(metadata: PartnerDiscoveryEvent['metadata'] = {}) {
  const blocked = new Set(['email', 'phone', 'query', 'apiKey', 'token', 'location', 'lat', 'lng']);
  return Object.fromEntries(
    Object.entries(metadata).map(([key, value]) => [
      key,
      blocked.has(key) ? '[redacted]' : value,
    ]),
  );
}

export function emitPartnerDiscoveryEvent(
  handler: PartnerDiscoveryEventHandler | undefined,
  name: PartnerDiscoveryEventName,
  component: string,
  metadata?: PartnerDiscoveryEvent['metadata'],
) {
  if (!handler) {
    return;
  }

  try {
    handler(createPartnerEvent(name, component, metadata));
  } catch {
    // Telemetry adapters must never break the UI flow.
  }
}

export function togglePartnerAmenity(
  state: PartnerDiscoveryFilterState,
  amenityId: string,
): PartnerDiscoveryFilterState {
  const amenities = state.amenities.includes(amenityId)
    ? state.amenities.filter((id) => id !== amenityId)
    : [...state.amenities, amenityId];

  return { ...state, amenities };
}

export function togglePartnerPrice(
  state: PartnerDiscoveryFilterState,
  price: PartnerPriceLevel,
): PartnerDiscoveryFilterState {
  const prices = state.prices.includes(price)
    ? state.prices.filter((value) => value !== price)
    : [...state.prices, price];

  return { ...state, prices };
}

export function resetPartnerDiscoveryFilters(): PartnerDiscoveryFilterState {
  return { ...partnerDiscoveryDefaultFilterState };
}

export function filterPartnerPlaces(
  places: PartnerPlaceResult[],
  filters: PartnerDiscoveryFilterState,
  viewport?: PartnerMapViewport,
) {
  const query = filters.query.trim().toLocaleLowerCase();

  return places.filter((place) => {
    const haystack = [place.title, place.category, place.neighborhood, place.price, ...place.amenities]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase();
    const queryMatch = !query || haystack.includes(query);
    const amenityMatch = filters.amenities.every((amenity) => place.amenities.includes(amenity));
    const priceMatch = !filters.prices.length || (place.price ? filters.prices.includes(place.price) : false);
    const viewportMatch = !viewport || !place.coordinates || (
      place.coordinates.lat <= viewport.north
      && place.coordinates.lat >= viewport.south
      && place.coordinates.lng <= viewport.east
      && place.coordinates.lng >= viewport.west
    );

    return queryMatch && amenityMatch && priceMatch && viewportMatch;
  });
}

export interface PartnerDiscoveryShellProps {
  logo: ReactNode;
  navItems: PartnerNavItem[];
  footer?: {
    copyright: string;
    legalLinks: PartnerNavItem[];
    socialLinks?: PartnerNavItem[];
  };
  children: ReactNode;
}

export function PartnerDiscoveryShell({
  logo,
  navItems,
  footer,
  children,
}: PartnerDiscoveryShellProps) {
  return (
    <Box
      style={{
        minHeight: '100vh',
        color: partnerSurface.text,
        background: partnerSurface.page,
      }}
    >
      <Stack gap="lg" maw={940} mx="auto" px={{ base: 'md', sm: 'lg' }} py="md">
        <PartnerDiscoveryHeader logo={logo} navItems={navItems} />
        <Box component="main">{children}</Box>
        {footer ? <PartnerDiscoveryFooter {...footer} /> : null}
      </Stack>
    </Box>
  );
}

export function PartnerDiscoveryHeader({
  logo,
  navItems,
}: Pick<PartnerDiscoveryShellProps, 'logo' | 'navItems'>) {
  return (
    <Box component="header">
      <Group component="nav" aria-label="Primary navigation" justify="space-between" align="center" gap="md" wrap="wrap">
        <Box style={{ minWidth: 0 }}>{logo}</Box>
        <Group gap="lg" wrap="wrap" justify="flex-end">
          {navItems.map((item) => (
            <Anchor
              key={item.id}
              href={item.href}
              c={item.current ? 'teal.8' : undefined}
              fw={item.current ? 700 : 500}
              size="sm"
              aria-current={item.current ? 'page' : undefined}
              {...safeExternalProps(item)}
            >
              {item.label}
            </Anchor>
          ))}
        </Group>
      </Group>
    </Box>
  );
}

export function PartnerDiscoveryFooter({
  copyright,
  legalLinks,
  socialLinks = [],
}: NonNullable<PartnerDiscoveryShellProps['footer']>) {
  return (
    <Group component="footer" gap="md" wrap="wrap" c="dimmed" fz="sm" pt="md">
      <Text size="sm">{copyright}</Text>
      {[...legalLinks, ...socialLinks].map((item) => (
        <Anchor key={item.id} href={item.href} size="sm" {...safeExternalProps(item)}>
          {item.label}
        </Anchor>
      ))}
    </Group>
  );
}

export interface AmenityChipGridProps {
  amenities: PartnerAmenityOption[];
  selected: string[];
  onToggle?: (amenityId: string) => void;
}

export function AmenityChipGrid({
  amenities,
  selected,
  onToggle,
}: AmenityChipGridProps) {
  if (!amenities.length) {
    return <StateBlock variant="empty" title="No amenities" description="No amenity filters are available." compact />;
  }

  return (
    <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="xs">
      {amenities.map((amenity) => {
        const active = selected.includes(amenity.id);
        return (
          <Button
            key={amenity.id}
            type="button"
            variant={active ? 'filled' : 'outline'}
            color={active ? 'teal' : 'gray'}
            radius="md"
            h="auto"
            py="xs"
            px="xs"
            aria-pressed={active}
            leftSection={amenity.icon}
            onClick={() => onToggle?.(amenity.id)}
            styles={{
              label: {
                whiteSpace: 'normal',
                lineHeight: 1.2,
                textAlign: 'center',
              },
            }}
          >
            {amenity.label}
          </Button>
        );
      })}
    </SimpleGrid>
  );
}

export interface PartnerDiscoveryFiltersProps {
  value: PartnerDiscoveryFilterState;
  amenities: PartnerAmenityOption[];
  labels: PartnerDiscoveryFilterLabels;
  prices?: PartnerPriceLevel[];
  opened?: boolean;
  loading?: boolean;
  onQueryChange?: (query: string) => void;
  onAmenityToggle?: (amenityId: string) => void;
  onPriceToggle?: (price: PartnerPriceLevel) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onReset?: () => void;
  onApply?: () => void;
  onEvent?: PartnerDiscoveryEventHandler;
}

export function PartnerDiscoveryFilters({
  value,
  amenities,
  labels,
  prices = ['$', '$$', '$$$', '$$$$'],
  opened = false,
  loading = false,
  onQueryChange,
  onAmenityToggle,
  onPriceToggle,
  onOpen,
  onClose,
  onReset,
  onApply,
  onEvent,
}: PartnerDiscoveryFiltersProps) {
  const hasFilters = Boolean(value.query || value.amenities.length || value.prices.length);

  return (
    <Stack gap="sm">
      <Group align="flex-end" gap="sm" wrap="wrap">
        <TextInput
          aria-label={labels.search}
          placeholder={labels.searchPlaceholder}
          value={value.query}
          onChange={(event) => onQueryChange?.(event.currentTarget.value)}
          leftSection={<GdsIcons.Search size="1rem" aria-hidden />}
          disabled={loading}
          style={{ flex: '1 1 320px' }}
        />
        <Button
          type="button"
          variant="outline"
          color="teal"
          leftSection={<GdsIcons.Filter size="1rem" aria-hidden />}
          onClick={() => {
            emitPartnerDiscoveryEvent(onEvent, 'filter_open', 'PartnerDiscoveryFilters');
            onOpen?.();
          }}
          disabled={loading}
        >
          {labels.filters}
        </Button>
        <Button
          type="button"
          variant="subtle"
          color="teal"
          disabled={!hasFilters || loading}
          onClick={() => {
            emitPartnerDiscoveryEvent(onEvent, 'filter_reset', 'PartnerDiscoveryFilters');
            onReset?.();
          }}
        >
          {labels.reset}
        </Button>
      </Group>

      {hasFilters ? (
        <Group gap="xs" aria-label={labels.selected ?? 'Selected filters'}>
          {value.amenities.map((id) => (
            <Badge key={id} color="teal" variant="light">{amenities.find((item) => item.id === id)?.label ?? id}</Badge>
          ))}
          {value.prices.map((price) => (
            <Badge key={price} color="lime" variant="light">{price}</Badge>
          ))}
        </Group>
      ) : null}

      <Modal opened={opened} onClose={onClose ?? (() => {})} title={labels.filters} centered radius="md" trapFocus>
        <Stack gap="md">
          <Stack gap="xs">
            <Text fw={700}>{labels.amenities}</Text>
            <AmenityChipGrid amenities={amenities} selected={value.amenities} onToggle={onAmenityToggle} />
          </Stack>
          <Stack gap="xs">
            <Text fw={700}>{labels.price}</Text>
            <Group gap="xs">
              {prices.map((price) => {
                const active = value.prices.includes(price);
                return (
                  <Button
                    key={price}
                    type="button"
                    variant={active ? 'filled' : 'outline'}
                    color={active ? 'teal' : 'gray'}
                    radius="md"
                    aria-pressed={active}
                    onClick={() => onPriceToggle?.(price)}
                  >
                    {price}
                  </Button>
                );
              })}
            </Group>
          </Stack>
          <Group justify="space-between" wrap="wrap">
            <Button type="button" variant="subtle" onClick={onClose}>{labels.close}</Button>
            <Group gap="xs">
              <Button type="button" variant="light" disabled={!hasFilters} onClick={onReset}>{labels.reset}</Button>
              <Button
                type="button"
                color="lime"
                c="dark.9"
                onClick={() => {
                  emitPartnerDiscoveryEvent(onEvent, 'filter_apply', 'PartnerDiscoveryFilters', {
                    amenityCount: value.amenities.length,
                    priceCount: value.prices.length,
                  });
                  onApply?.();
                }}
              >
                {labels.apply}
              </Button>
            </Group>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}

export interface PartnerPlaceResultCardProps {
  place: PartnerPlaceResult;
  amenityLabels?: Record<string, string>;
  active?: boolean;
  detailLabel?: ReactNode;
  onSelect?: (placeId: string) => void;
  onEvent?: PartnerDiscoveryEventHandler;
}

export function PartnerPlaceResultCard({
  place,
  amenityLabels = {},
  active = false,
  detailLabel = 'See details',
  onSelect,
  onEvent,
}: PartnerPlaceResultCardProps) {
  return (
    <Card
      component="article"
      withBorder
      radius="md"
      p="sm"
      data-active={active || undefined}
      style={{
        borderColor: active ? partnerSurface.borderActive : partnerSurface.border,
        background: active ? partnerSurface.cardActive : partnerSurface.card,
      }}
    >
      <Stack gap={4}>
        <Anchor
          href={place.href}
          fw={700}
          c="teal.8"
          onClick={() => {
            emitPartnerDiscoveryEvent(onEvent, 'result_select', 'PartnerPlaceResultCard', { placeId: place.id });
            onSelect?.(place.id);
          }}
        >
          {place.title}
        </Anchor>
        <Text size="xs" c="dimmed">{[place.category, place.neighborhood, place.price].filter(Boolean).join(' · ')}</Text>
        <Group gap={4} aria-label="Amenities" wrap="wrap">
          {place.amenities.slice(0, 8).map((amenity) => (
            <Badge key={amenity} variant="light" color="teal" radius="md">
              {amenityLabels[amenity] ?? amenity}
            </Badge>
          ))}
        </Group>
        <Anchor href={place.href} size="sm" c="teal.8">
          <Group component="span" gap={4} wrap="nowrap">
            <span>{detailLabel}</span>
            <GdsIcons.Forward size="0.95rem" aria-hidden />
          </Group>
        </Anchor>
      </Stack>
    </Card>
  );
}

export interface PartnerMapPinProps {
  label: string;
  active?: boolean;
  onSelect?: () => void;
}

export function PartnerMapPin({
  label,
  active = false,
  onSelect,
}: PartnerMapPinProps) {
  return (
    <Button
      type="button"
      aria-pressed={active}
      aria-label={label}
      onClick={onSelect}
      variant="filled"
      color={active ? 'gray' : 'teal'}
      radius="md"
      w={28}
      h={28}
      p={0}
      style={{ filter: 'drop-shadow(0 2px 2px color-mix(in srgb, var(--mantine-color-black) 45%, transparent))' }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      <GdsIcons.Home size="1rem" aria-hidden />
    </Button>
  );
}

export interface PartnerMapControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  zoomInLabel?: string;
  zoomOutLabel?: string;
}

export function PartnerMapControls({
  onZoomIn,
  onZoomOut,
  zoomInLabel = 'Zoom in',
  zoomOutLabel = 'Zoom out',
}: PartnerMapControlsProps) {
  return (
    <Group gap="xs">
      <Button type="button" variant="default" aria-label={zoomInLabel} onClick={onZoomIn} w={32} h={32} p={0}>
        <GdsIcons.Add size="1rem" aria-hidden />
      </Button>
      <Button type="button" variant="default" aria-label={zoomOutLabel} onClick={onZoomOut} w={32} h={32} p={0}>
        <GdsIcons.Remove size="1rem" aria-hidden />
      </Button>
    </Group>
  );
}

export interface PartnerMapListShellProps {
  places: PartnerPlaceResult[];
  filters: PartnerDiscoveryFilterState;
  activePlaceId?: string;
  loading?: boolean;
  error?: ReactNode;
  empty?: ReactNode;
  onRetry?: () => void;
  onActivePlaceChange?: (placeId: string) => void;
  mapAdapter?: (props: PartnerMapAdapterProps) => ReactNode;
  amenityLabels?: Record<string, string>;
  onEvent?: PartnerDiscoveryEventHandler;
}

export function PartnerMapListShell({
  places,
  filters,
  activePlaceId,
  loading = false,
  error,
  empty,
  onRetry,
  onActivePlaceChange,
  mapAdapter,
  amenityLabels,
  onEvent,
}: PartnerMapListShellProps) {
  const visiblePlaces = filterPartnerPlaces(places, filters);

  const mapBody = loading ? (
    <StateBlock variant="loading" title="Loading map" description="Discovery results are loading." compact />
  ) : error ? (
    <StateBlock
      variant="error"
      title="Map unavailable"
      description={error}
      compact
      action={onRetry ? <Button type="button" onClick={onRetry}>Retry</Button> : undefined}
    />
  ) : mapAdapter ? (
    mapAdapter({
      places: visiblePlaces,
      activePlaceId,
      onPinSelect: (placeId) => {
        emitPartnerDiscoveryEvent(onEvent, 'pin_select', 'PartnerMapListShell', { placeId });
        onActivePlaceChange?.(placeId);
      },
    })
  ) : (
    <StateBlock variant="empty" title="List-only mode" description="Connect a map adapter to render pins." compact />
  );

  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" style={{ alignItems: 'start' }}>
      <Paper
        withBorder
        radius="md"
        p="sm"
        style={{
          minHeight: 360,
          overflow: 'hidden',
          background: 'light-dark(var(--mantine-color-gray-0), color-mix(in srgb, var(--mantine-color-teal-9) 36%, var(--mantine-color-dark-8)))',
        }}
      >
        {mapBody}
      </Paper>
      <Stack gap="xs" component="section" aria-label="Results">
        {loading ? (
          <StateBlock variant="loading" title="Loading results" compact />
        ) : error ? (
          <StateBlock variant="error" title="Results unavailable" description={error} action={onRetry ? <Button type="button" onClick={onRetry}>Retry</Button> : undefined} compact />
        ) : visiblePlaces.length ? (
          visiblePlaces.map((place) => (
            <PartnerPlaceResultCard
              key={place.id}
              place={place}
              amenityLabels={amenityLabels}
              active={place.id === activePlaceId}
              onSelect={onActivePlaceChange}
              onEvent={onEvent}
            />
          ))
        ) : (
          <StateBlock variant="empty" title="No places found" description={empty ?? 'Adjust the search or filters to see more places.'} compact />
        )}
      </Stack>
    </SimpleGrid>
  );
}

export interface PartnerPlaceDetail {
  id: string;
  title: string;
  address?: string;
  phone?: string;
  neighborhood?: string;
  category?: string;
  parentTip?: string;
  amenities: PartnerAmenityOption[];
  links?: {
    photos?: string;
    website?: string;
    menu?: string;
    shareUrl?: string;
  };
}

export interface PartnerPlaceDetailLabels {
  back: string;
  photos: string;
  website: string;
  menu: string;
  share: string;
  parentTip: string;
  copied: string;
  shareFailed: string;
}

export interface PartnerPlaceDetailTemplateProps {
  place: PartnerPlaceDetail;
  backHref: string;
  labels: PartnerPlaceDetailLabels;
  shareState?: 'idle' | 'copying' | 'copied' | 'failed';
  onShare?: (url: string) => void;
  onEvent?: PartnerDiscoveryEventHandler;
}

export function PartnerPlaceDetailTemplate({
  place,
  backHref,
  labels,
  shareState = 'idle',
  onShare,
  onEvent,
}: PartnerPlaceDetailTemplateProps) {
  const actions = [
    place.links?.photos ? { id: 'photos', label: labels.photos, href: place.links.photos } : null,
    place.links?.website ? { id: 'website', label: labels.website, href: place.links.website } : null,
    place.links?.menu ? { id: 'menu', label: labels.menu, href: place.links.menu } : null,
  ].filter(Boolean) as PartnerNavItem[];

  return (
    <Stack gap="lg">
      <Anchor href={backHref} size="sm">
        <Group gap={6}><GdsIcons.Back size="1rem" aria-hidden />{labels.back}</Group>
      </Anchor>
      <Stack gap="xs" align="center" ta="center">
        <Title order={1}>{place.title}</Title>
        {place.address ? <Text>{place.address}</Text> : null}
        {place.phone ? <Anchor href={`tel:${place.phone.replace(/[^\d+]/g, '')}`}>{place.phone}</Anchor> : null}
      </Stack>
      <Group justify="center" gap="xs" wrap="wrap">
        {actions.map((action) => (
          <Button
            key={action.id}
            component="a"
            href={action.href}
            variant="outline"
            onClick={() => emitPartnerDiscoveryEvent(onEvent, 'detail_action_click', 'PartnerPlaceDetailTemplate', { action: action.id })}
          >
            {action.label}
          </Button>
        ))}
        {place.links?.shareUrl ? (
          <Button
            type="button"
            leftSection={<GdsIcons.Refer size="1rem" aria-hidden />}
            loading={shareState === 'copying'}
            color={shareState === 'failed' ? 'red' : 'teal'}
            onClick={() => {
              if (shareState === 'failed') {
                emitPartnerDiscoveryEvent(onEvent, 'share_failure', 'PartnerPlaceDetailTemplate', { placeId: place.id });
              }
              onShare?.(place.links?.shareUrl ?? '');
            }}
          >
            {shareState === 'copied' ? labels.copied : shareState === 'failed' ? labels.shareFailed : labels.share}
          </Button>
        ) : null}
      </Group>
      <Group justify="center" gap="xs">
        {place.neighborhood ? <Badge variant="light">{place.neighborhood}</Badge> : null}
        {place.category ? <Badge variant="light">{place.category}</Badge> : null}
      </Group>
      {place.parentTip ? <PartnerParentTipPanel label={labels.parentTip}>{place.parentTip}</PartnerParentTipPanel> : null}
      <PartnerAmenityBadgeGrid amenities={place.amenities} />
    </Stack>
  );
}

export function PartnerParentTipPanel({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <Paper withBorder radius="md" p="md">
      <Stack gap="xs" align="center">
        <Badge color="teal" radius="md" tt="uppercase" lts={1.5}>{label}</Badge>
        <Text fs="italic" ta="center">{children}</Text>
      </Stack>
    </Paper>
  );
}

export function PartnerAmenityBadgeGrid({ amenities }: { amenities: PartnerAmenityOption[] }) {
  if (!amenities.length) {
    return <StateBlock variant="empty" title="No amenities listed" compact />;
  }

  return (
    <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="xs">
      {amenities.map((amenity) => (
        <Paper key={amenity.id} withBorder radius="md" p="sm">
          <Stack gap={4} align="center" ta="center">
            {amenity.icon ? <ThemeIcon variant="light" radius="xl">{amenity.icon}</ThemeIcon> : null}
            <Text size="sm" fw={600}>{amenity.label}</Text>
          </Stack>
        </Paper>
      ))}
    </SimpleGrid>
  );
}

export interface PartnerNewsletterLabels {
  title: string;
  description?: string;
  emailLabel: string;
  emailPlaceholder?: string;
  submitLabel: string;
  dismissLabel: string;
  successMessage: string;
  errorMessage: string;
}

export interface PartnerNewsletterCaptureProps {
  opened?: boolean;
  labels: PartnerNewsletterLabels;
  visual?: ReactNode;
  email?: string;
  state?: 'idle' | 'submitting' | 'success' | 'error';
  onEmailChange?: (email: string) => void;
  onSubmit?: () => void;
  onDismiss?: () => void;
  onEvent?: PartnerDiscoveryEventHandler;
}

export function PartnerNewsletterCapture({
  opened = false,
  labels,
  visual,
  email = '',
  state = 'idle',
  onEmailChange,
  onSubmit,
  onDismiss,
  onEvent,
}: PartnerNewsletterCaptureProps) {
  return (
    <Modal opened={opened} onClose={onDismiss ?? (() => {})} centered radius="md" title={labels.title} trapFocus>
      <PartnerNewsletterForm
        labels={labels}
        visual={visual}
        email={email}
        state={state}
        onEmailChange={onEmailChange}
        onSubmit={() => {
          emitPartnerDiscoveryEvent(onEvent, state === 'error' ? 'newsletter_submit_failure' : 'newsletter_submit_success', 'PartnerNewsletterCapture');
          onSubmit?.();
        }}
        onDismiss={onDismiss}
      />
    </Modal>
  );
}

export function PartnerNewsletterForm({
  labels,
  visual,
  email = '',
  state = 'idle',
  onEmailChange,
  onSubmit,
  onDismiss,
}: Omit<PartnerNewsletterCaptureProps, 'opened' | 'onEvent'>) {
  return (
    <Stack gap="md" ta="center">
      {visual ? <Box aria-hidden>{visual}</Box> : null}
      {labels.description ? <Text>{labels.description}</Text> : null}
      <TextInput
        type="email"
        label={labels.emailLabel}
        placeholder={labels.emailPlaceholder}
        value={email}
        onChange={(event) => onEmailChange?.(event.currentTarget.value)}
        error={state === 'error' ? labels.errorMessage : undefined}
      />
      {state === 'success' ? <StateBlock variant="success" title={labels.successMessage} compact /> : null}
      <Group justify="space-between" wrap="wrap">
        <Button type="button" variant="subtle" onClick={onDismiss}>{labels.dismissLabel}</Button>
        <Button type="button" color="lime" c="dark.9" loading={state === 'submitting'} onClick={onSubmit}>
          {labels.submitLabel}
        </Button>
      </Group>
    </Stack>
  );
}

export interface PartnerEditorialLink {
  id: string;
  title: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface PartnerFaqItem {
  id: string;
  question: string;
  answer: ReactNode;
}

export function PartnerListIndex({
  title,
  items,
  empty,
}: {
  title: ReactNode;
  items: PartnerEditorialLink[];
  empty?: ReactNode;
}) {
  return (
    <Stack gap="md">
      <Title order={1}>{title}</Title>
      {items.length ? items.map((item) => (
        <Anchor key={item.id} href={item.href} fw={700} {...safeExternalProps(item)}>
          <Group component="span" gap={4} wrap="nowrap">
            <span>{item.title}</span>
            <GdsIcons.Forward size="0.95rem" aria-hidden />
          </Group>
        </Anchor>
      )) : <StateBlock variant="empty" title="No links yet" description={empty} compact />}
    </Stack>
  );
}

export function PartnerFaqList({ items }: { items: PartnerFaqItem[] }) {
  if (!items.length) {
    return <StateBlock variant="empty" title="No FAQ items" compact />;
  }

  return (
    <Stack gap="md">
      {items.map((item) => (
        <Stack key={item.id} gap={4}>
          <Title order={3}>{item.question}</Title>
          <Text>{item.answer}</Text>
        </Stack>
      ))}
    </Stack>
  );
}

export function PartnerContactBlock({
  title,
  description,
  email,
}: {
  title: ReactNode;
  description?: ReactNode;
  email?: string;
}) {
  return (
    <Paper withBorder radius="md" p="md">
      <Stack gap="xs">
        <Title order={2}>{title}</Title>
        {description ? <Text>{description}</Text> : null}
        {email ? <Anchor href={`mailto:${email}`}>{email}</Anchor> : null}
      </Stack>
    </Paper>
  );
}

export function PartnerSubmissionEntry({
  title,
  description,
  form,
  success,
  error,
}: {
  title: ReactNode;
  description?: ReactNode;
  form: ReactNode;
  success?: ReactNode;
  error?: ReactNode;
}) {
  return (
    <Paper withBorder radius="md" p="lg">
      <Stack gap="md">
        <Stack gap={4}>
          <Title order={1}>{title}</Title>
          {description ? <Text c="dimmed">{description}</Text> : null}
        </Stack>
        {error ? <StateBlock variant="error" title="Submission failed" description={error} compact /> : null}
        {success ? <StateBlock variant="success" title="Submission received" description={success} compact /> : form}
      </Stack>
    </Paper>
  );
}

export function PartnerAboutPageSections({
  title,
  sections,
}: {
  title: ReactNode;
  sections: Array<{ id: string; title: ReactNode; body: ReactNode }>;
}) {
  return (
    <Stack gap="xl">
      <Title order={1}>{title}</Title>
      {sections.map((section) => (
        <Stack key={section.id} gap="xs">
          <Title order={2}>{section.title}</Title>
          <Divider />
          <Text>{section.body}</Text>
        </Stack>
      ))}
    </Stack>
  );
}

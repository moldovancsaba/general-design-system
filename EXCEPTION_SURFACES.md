# Exception Surfaces

Status: Active SSOT
Version: 2.3.0
Last updated: 2026-05-24

This document defines which surfaces stay outside first-class GDS component ownership and how they must still integrate with the system.

## Chart surfaces

The GDS does not currently own chart engines.

It does own:

- chart container framing
- surrounding page rhythm
- loading, empty, error, and permission states
- summary-before-chart priority on mobile
- export/action placement around analytics panels

## Map surfaces

The GDS does not currently own map engines.

It does own:

- surrounding shell/layout integration
- empty, blocked, and attribution framing
- side-panel, filter, and detail-card consistency around map views

## Embed surfaces

The GDS does not currently own third-party embed runtimes.

It does own:

- host-shell framing
- loading/error/permission handling
- accessibility affordances such as labels and fallback links

## Permanent or likely-long-lived exceptions

- immersive game/runtime canvases
- offline HTML report rendering
- certificate, email, and OG rendering internals
- third-party provider-branded auth controls when branding requirements cannot be normalized further

## Required documentation for any exception

Every project-local exception note must state:

1. reason and scope
2. user impact
3. what shared shell/state/theme rules still apply
4. removal condition, if any

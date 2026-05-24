# Camera Adoption Plan

Status: Planned
Version: 1.0.0
Last updated: 2026-05-24
Project: `Camera`

## Objective

Define the GDS work Camera needs so it can become a clean consumer instead of a permanently exception-heavy product.

## Current pressure areas

- needs Mantine 9 / React 19 / Next 16 clarity
- needs stronger admin package coverage
- needs public-surface package coverage
- needs media/gallery/upload patterns
- needs editor/configuration workflow patterns
- needs permission/access UI patterns
- needs SSR-safe App Router guidance

## Central contracts Camera is expected to drive

1. compatibility and upgrade policy
2. server-safe/client-safe exports
3. stable admin package contract
4. public shell, auth, profile, and share/detail surface contract
5. media-heavy and upload pattern family
6. editor and settings workflow patterns
7. permission and access UI patterns

## Local exception direction

Keep these local unless another product proves the same contract:

- domain-specific media pipelines
- bespoke slideshow/layout editor internals
- relationship-specific data semantics beyond shared list/card/access framing

## Exit criteria

- Camera is listed in the portfolio matrix
- the missing shared contracts are linked to central GDS issues
- exception boundaries are explicit instead of implicit local freedom

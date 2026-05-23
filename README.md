# General Design System

Status: Active SSOT
Version: 2.1.0
Last updated: 2026-05-23

`/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM` is the cross-project single source of truth for design, UI, and UX.

## How to Use This Design System

This repository serves as the central, hardened hub for all UI, UX, and design patterns across projects. It is organized around strict foundation rules, reusable component contracts, a cross-project pattern service model, and governance requirements.

### Getting Started

1. **Familiarize Yourself with the Foundation**: Start by reading [FOUNDATION.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/FOUNDATION.md) to understand the core principles, accessibility baselines, and our strict Mantine token policies.
2. **Review the Component Contracts**: Before building a new UI component or workflow, check [COMPONENTS_AND_PATTERNS.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/COMPONENTS_AND_PATTERNS.md) to see if a canonical pattern already exists for buttons, tables, modals, or forms.
3. **Use the Pattern Service Model**: Before borrowing from Mantine UI or another project, read [PATTERN_SERVICE_MODEL.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/PATTERN_SERVICE_MODEL.md) to convert references into governed, reusable contracts.
4. **Adopt & Migrate**: Use [GOVERNANCE_AND_ADOPTION.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/GOVERNANCE_AND_ADOPTION.md) to understand how to correctly implement this system in a new or legacy codebase, including the required local project statement.

### What You Can Find Here

- **Core Principles & Tokens**: [FOUNDATION.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/FOUNDATION.md) — The fundamental rules that guide UI decisions, dark/light modes, and Mantine boundaries.
- **Component Contracts & Patterns**: [COMPONENTS_AND_PATTERNS.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/COMPONENTS_AND_PATTERNS.md) — Required behaviors for standard UI elements and full-page workflows.
- **Pattern Service Model**: [PATTERN_SERVICE_MODEL.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/PATTERN_SERVICE_MODEL.md) — The reusable cross-project process for borrowing Mantine-native patterns, promoting them into contracts, and enforcing consistency.
- **Governance & Migration**: [GOVERNANCE_AND_ADOPTION.md](/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM/GOVERNANCE_AND_ADOPTION.md) — Strict rules on how projects must adopt the system, review PRs, and deprecate old code.
- **Operational Files**: `CONTRIBUTING.md` and `CHANGELOG.md` — Shared rules for contributing to the design system and its versioned history.
- **Templates**: `TEMPLATES/` — Starter templates for your project's theme, providers, shell, and thin wrappers.
- **Projects**: `PROJECTS/` — Product-specific migration plans and adoption strategies.

---

Product repositories may document:
- local theme/provider paths
- local implementation paths for required pattern contracts
- wrapper component paths
- migration state
- validation commands
- narrow approved exceptions

Product repositories may **not** redefine:
- component behavior
- interaction patterns
- token policy
- responsive strategy
- accessibility baseline
- UX meaning of canonical controls

**If a project-local UI document conflicts with this directory, this directory wins.**

## Repository Rules

This directory is intended to be managed as its own git repository.

Required repository behavior:
- every normative change is committed here, not only in consuming product repos
- projects should reference the SSOT path and aligned version/date in local docs
- breaking behavior changes should be treated as major contract changes
- additive patterns should be documented here before they spread to multiple products

## Non-Negotiable Rules

- One interaction concept gets one canonical pattern.
- One product gets one active theme and token source.
- New product UI must use Mantine primitives or thin approved wrappers around them.
- No new product UI may bypass Mantine with raw custom primitives, ad hoc HTML/CSS controls, or alternate component frameworks.
- Mantine UI examples may be used only as reference material; reusable output must become GDS-governed project contracts.
- Raw colors and repeated hard-coded spacing in feature code are prohibited.
- Dark/light mode readability is mandatory; mixed-mode surfaces require documented exceptions.
- Loading, empty, error, success, disabled, and permission states are part of every component contract.
- Mobile and responsive behavior must be designed intentionally, not inherited accidentally from desktop.
- Accessibility is part of design acceptance, not a cleanup pass.
- Internationalization resilience is mandatory for shared patterns.

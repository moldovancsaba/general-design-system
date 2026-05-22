# Governance

Status: Normative
Version: 1.3.3
Last updated: 2026-05-22

## Adoption Rule

New projects must start from this system immediately.

Existing projects must:

- point local docs to this directory as the design/UI/UX SSOT
- stop adding new parallel UI patterns
- stop adding any new non-Mantine product primitives
- document the local adapter and migration debt
- migrate high-traffic and high-change screens first
- remove legacy styling systems once replaced

## Project Adapter Rule

Each product may define a local adapter for:

- theme file location
- provider setup
- wrapper component paths
- notifications/modals setup
- validation commands
- known exceptions
- migration backlog

The adapter may not redefine:

- component behavior
- token policy
- accessibility rules
- canonical navigation patterns
- responsive behavior rules
- shared UX meaning
- the Mantine-only platform rule

## Review Rule

Any UI-affecting change must be reviewed against:

- this SSOT
- project adapter compliance
- component contract compliance
- responsive behavior
- accessibility impact
- state coverage
- cross-project reuse value

State coverage review must explicitly consider:

- loading
- empty
- error
- success where useful
- disabled
- permission

## Exception Rule

Exceptions require a written note in the adopting project.

The note must include:

- reason
- scope
- owning file or component
- user impact
- removal condition

Exceptions must remain narrow. Do not promote a one-off exception into a shared primitive unless it proves broadly useful and is documented here first.

## Versioning

Treat this directory as versioned policy.

Change types:

- patch: wording fixes, clarifications, examples
- minor: additive contracts, new approved patterns, stronger guidance without breaking existing meaning
- major: removed patterns, changed default behavior, breaking contract changes

Adopting projects should record the SSOT version or date they align to when doing meaningful UI migration work.

## Required Project Checklist

Every adopting project must have:

- local docs that name this directory as design/UI/UX SSOT
- one shared theme/provider path
- approved wrapper policy or direct primitive policy
- explicit Mantine-only product primitive policy
- notifications and modals setup path
- responsive strategy for major surfaces
- accessibility baseline note
- validation commands for UI drift
- known exceptions and migration backlog

## Pull Request Checklist

- Does this introduce a pattern that already exists?
- Does this use the approved local adapter?
- Could theme defaults solve this instead of local override logic?
- Are loading, empty, error, success, disabled, and permission states covered?
- Does the component remain keyboard- and screen-reader-usable?
- Does mobile behavior remain intentional and usable?
- Are labels localizable and resilient to longer strings?
- Did any hard-coded design value enter feature code?
- Is this a local exception that should actually be standardized here?

## Migration Order

Recommended order for legacy projects:

1. local docs point to this SSOT
2. provider and theme
3. buttons, action icons, inputs, alerts, modals
4. forms and auth flows
5. cards, tables, filters, navigation
6. mobile shell and responsive priority surfaces
7. business-critical detail and workflow screens
8. secondary/admin/reporting surfaces
9. removal of old CSS/token systems

## Definition of Done

A project can claim SSOT compliance when:

- this directory is documented as the design/UI/UX SSOT
- Mantine is the primary enforced UI foundation
- Mantine is the only approved product primitive system
- tokens come from the shared project theme
- repeated primitives are Mantine or thin approved wrappers
- local docs are adapters, not competing design authorities
- accessibility and responsive behavior are part of normal review
- exceptions are explicit and time-bound

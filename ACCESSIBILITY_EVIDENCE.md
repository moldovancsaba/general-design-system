# Accessibility Evidence

GDS ships accessibility evidence as a release contract, not as optional prose.

## What Every Stable Pattern Must Publish

Each stable pattern record must include:

- owner
- update date
- evidence source
- keyboard behavior
- visible focus behavior
- screen-reader semantics and announcements
- WCAG mappings
- assistive-technology and browser status rows
- known limitations, when present
- recovery guidance

The package-native helper surface is exported from `@doneisbetter/gds-core`:

- `createGdsAccessibilityEvidenceIndex(...)`
- `getGdsAccessibilityEvidence(...)`
- `getGdsAccessibilityEvidenceSummary(...)`
- `validateGdsAccessibilityEvidence(...)`

The official docs site renders the current registry on:

- `/coverage`
- `/api`
- `/governance`

## WCAG Mapping Policy

The current baseline is mandatory for every stable record:

- `1.3.1` Info and Relationships
- `1.4.3` Contrast (Minimum)
- `2.1.1` Keyboard
- `2.4.7` Focus Visible
- `4.1.2` Name, Role, Value

Additional criteria may be added where a pattern needs them, but these five are non-optional.

## AT / Browser Matrix

The registry currently tracks shipped evidence against these baseline environments:

- VoiceOver + Safari on iOS
- VoiceOver + Safari on macOS
- NVDA + Chrome or Firefox on Windows

Known limitations must stay visible in the registry. They are not allowed to hide behind vague “supported by browser defaults” wording.

## Verification

Run:

```bash
npm run verify:accessibility-evidence
npm run verify:release
```

The gate fails when:

- a stable pattern has no evidence record
- required fields are missing
- required WCAG mappings are absent
- AT/browser rows are missing
- evidence is stale but not marked expired
- a known limitation has no owner or recovery path

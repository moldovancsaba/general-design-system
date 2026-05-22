# Component Contracts

Status: Normative
Version: 1.3.3
Last updated: 2026-05-22

These contracts define required behavior for shared UI concepts. Projects may change theme values and local wrappers, but they may not silently change interaction meaning.

## Buttons

Base: Mantine `Button`

Required variants:

- `primary`: main action in the current scope
- `secondary`: visible lower-emphasis action
- `subtle`: lightweight utility action
- `danger`: destructive action

Rules:

- Use one primary action per visual scope where practical.
- Loading state must prevent duplicate submission.
- Disabled actions must explain why when the reason is not obvious.
- Button labels should be short, action-oriented verbs.
- Destructive buttons must not rely on color alone.
- Buttons that trigger navigation should still read like user goals, not technical routes.

Do not:

- place multiple competing primary buttons side by side
- style links as primary actions unless they start a primary workflow
- introduce page-specific button color logic outside the theme

## Icon Buttons

Base: Mantine `ActionIcon`

Rules:

- Every icon-only action needs an accessible label.
- Use tooltips when the icon is not universally obvious.
- Keep dimensions stable within a toolbar or action group.
- Reserve danger styling for destructive actions only.
- Do not use tiny icon buttons in dense mobile clusters without spacing review.

## Text Inputs

Base: Mantine `TextInput`

Rules:

- Every field must render a visible label.
- Placeholder text is an example, not a field name.
- Helper text should appear before failure when it prevents mistakes.
- Field-level errors must appear near the field.
- Multi-field forms should include a summary when several errors block progress.
- Preserve user-entered values after recoverable server errors.

## Password Inputs

Base: Mantine `PasswordInput`

Rules:

- Include show/hide affordance.
- Show password requirements before failure when policy is non-trivial.
- Do not communicate strength or validity by color alone.
- Do not echo password-like values in logs, helper text, or analytics.

## Search Inputs

Base: Mantine `TextInput` or `Combobox`

Rules:

- Use a search icon when it improves recognition.
- Debounce remote search.
- Show loading, no-results, and cleared-query states.
- Preserve the query when users inspect results and return.
- Distinguish “nothing exists” from “nothing matches”.

## Date and Time Inputs

Base: Mantine date/time primitives when needed

Rules:

- Use structured date/time inputs when precision matters more than freeform speed.
- Show the expected timezone context when it affects interpretation.
- Range selection must make start/end meaning obvious.
- Validation must catch impossible or reversed ranges near the fields.
- Do not force calendar-heavy interactions for values that are better entered as simple text or select controls.

## Selects, Multi-Selects, and Comboboxes

Base: Mantine `Select`, `MultiSelect`, `Combobox`

Rules:

- Use `Select` for small controlled sets.
- Use searchable patterns for long or user-generated lists.
- Use `MultiSelect` only when multiple values are genuinely allowed.
- Provide clear empty and no-results copy.
- Do not fake field inputs with generic menus unless the interaction is not true data entry.

## Textareas

Base: Mantine `Textarea`

Rules:

- Use only for real multi-line input.
- Show length guidance when limits matter.
- Autosize only when it improves workflow.
- Avoid oversized textareas in cramped modal layouts unless the modal is explicitly for focused editing.

## File Uploads

Base: Mantine input patterns or approved upload integrations

Rules:

- Allowed file types and limits must be visible before failure when they matter.
- Show upload progress or explicit pending state for non-trivial uploads.
- Failed uploads must explain whether retry is possible.
- Preview and replace/remove actions should be obvious when the asset is user-relevant.
- Do not hide destructive replacement behavior inside vague labels.

## Checkboxes, Radios, and Switches

Base: Mantine `Checkbox`, `Radio`, `Switch`

Rules:

- `Checkbox`: independent opt-in/out choices.
- `Radio`: mutually exclusive choices.
- `Switch`: immediate on/off state changes.
- Do not use switches for values that should only commit on submit.
- Label text must describe the state or choice clearly.

## Forms

Base: Mantine field primitives plus project form adapter

Rules:

- Actions appear after the fields they affect.
- Submit actions must have loading state.
- Cancel/back actions remain visually lower emphasis than submit.
- Required fields must be discoverable before submit.
- Server validation must map back to fields where possible.
- Form layout should group related fields under short headings when the form grows.

## Alerts

Base: Mantine `Alert`

Rules:

- Use alerts for scoped, meaningful state messaging.
- Alert title should be concise and specific.
- Error alerts should explain what the user can do next.
- Warning alerts should identify the actual risk.
- Do not use alerts as permanent page decoration.

## Loaders and Skeletons

Base: Mantine `Loader` and `Skeleton`

Rules:

- Use skeletons when layout shape is known and content is pending.
- Use loaders when the operation itself needs emphasis more than content shape.
- Loading placeholders should resemble the final structure closely enough to preserve orientation.
- Long operations need text status or progress context, not only motion.
- Loading surfaces must not masquerade as empty state.

## Notifications

Base: Mantine notifications system

Rules:

- Use notifications for transient, cross-surface feedback.
- Do not rely on notifications as the only place a critical error appears.
- Success notifications should confirm completion briefly.
- Long or multi-step recovery instructions belong in-page, not only in toast text.

## Tooltips

Base: Mantine `Tooltip`

Rules:

- Use tooltips for clarification, not as the only label for an action.
- Tooltips must not contain essential instructions required to complete the baseline workflow.
- Keyboard and touch behavior must be considered; hover-only meaning is not sufficient.
- Dense toolbars should not become tooltip-dependent mystery meat navigation.

## Badges and Status Chips

Base: Mantine `Badge`

Rules:

- Use badges for compact state, not for paragraphs of meaning.
- Badge color must not be the only signal.
- Repeated status sets must use consistent labels and ordering.
- Badge clusters on mobile should be aggressively prioritized.

## Breadcrumbs

Base: Mantine breadcrumbs pattern or thin local adapter

Rules:

- Use breadcrumbs only when hierarchy materially helps orientation.
- Labels should reflect user concepts, not route segments.
- Breadcrumbs do not replace the page title.
- Deep breadcrumb chains should be collapsed or simplified on small screens when necessary.

## Cards and Panels

Base: Mantine `Card` or `Paper`

Rules:

- Cards group related content and actions.
- Repeated cards use consistent header, body, metadata, and action placement.
- Cards must not become decorative page fragments by default.
- Avoid deep card nesting.
- Clickable cards must expose the same destination through keyboard and accessible naming.

## Pagination

Base: Mantine `Pagination`

Rules:

- Use pagination when result size or performance makes it necessary.
- Current page, total context, and result count should be clear when users need orientation.
- Pagination controls must work at small widths without becoming dense tap targets.
- Preserve filters and sort when users paginate unless the workflow explicitly resets them.

## Empty States

Base: Mantine layout primitives

Rules:

- Empty state must explain what is missing.
- If an action exists, the empty state should expose it clearly.
- Empty is not an error state.
- Empty states should reduce uncertainty, not only fill space.

## Modals

Base: Mantine `Modal`

Use for:

- confirmation
- focused editing
- short multi-step tasks
- blocking decisions

Rules:

- Every modal needs a clear title.
- Modal body must explain the task or decision.
- Primary and cancel actions must be obvious.
- Destructive confirmation must restate target or consequence.
- Focus must trap inside the modal and return to the trigger on close.
- Errors inside a modal must stay visible and actionable.

Do not:

- use modals as replacements for full pages
- stack routine modals on top of modals
- hide irreversible impact in secondary text only

## Drawers

Base: Mantine `Drawer`

Use for:

- contextual details
- filters
- secondary editing
- review panels

Rules:

- Drawer title must identify the object or task.
- Save/apply actions must remain reachable.
- Drawer width and close behavior must be defined for small screens.
- High-consequence destructive confirmation should usually escalate to a modal.

## Menus

Base: Mantine `Menu`

Rules:

- Menus contain commands, not field input.
- Labels must describe the result of selecting the item.
- Destructive items must be visually distinct and placed carefully.
- Do not hide primary workflow actions in menus if users need them constantly.

## Tabs

Base: Mantine `Tabs`

Rules:

- Use tabs for sibling sections of equal importance.
- Tab labels must be short and concrete.
- Tabs are for navigation between views, not actions.
- On small screens, tab overflow behavior must be intentional.

## Tables

Base: Mantine `Table`

Rules:

- Use tables for scanning, comparison, and bulk management.
- Columns should be chosen by decision value, not backend shape.
- Sortable columns must show current sort state.
- Bulk actions require selected-count visibility and clear reset behavior.
- Empty and loading states must preserve user orientation.
- Mobile behavior must be explicitly defined.

## Lists

Base: Mantine layout primitives or `List`

Rules:

- Use lists for history, feed, activity, search results, or compact summaries.
- Each item needs a clear primary label and optional metadata.
- Repeated row actions must appear consistently.
- Infinite scroll requires a clear accessible alternative or very explicit behavior.

## Page Headers

Base: Mantine layout primitives

Rules:

- Page headers answer: where am I, what is this for, what can I do next?
- A header primary action should apply to the whole page.
- Metadata should stay compact and scannable.
- Operational surfaces should not use oversized marketing-style headers.

## Navigation

Base: Mantine shell primitives plus project shell

Rules:

- Main navigation must be stable across sibling screens.
- Current location must be visually and semantically indicated.
- Labels should be destinations or user concepts, not implementation terms.
- Destructive actions do not belong in primary navigation.
- Mobile navigation must preserve access to primary destinations without relying on hidden affordances alone.

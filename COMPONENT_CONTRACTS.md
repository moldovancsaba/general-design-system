# Component Contracts

Status: Normative
Version: 1.0.0
Last updated: 2026-05-21

These contracts define required behavior. Projects may change visual theme values, but they may not silently change interaction meaning.

## Buttons

Base: Mantine `Button`

Required variants:

- `primary`: main action in a scope
- `secondary`: visible lower-emphasis action
- `subtle`: lightweight action in dense UI
- `danger`: destructive action

Rules:

- Use one primary action per visual group when practical.
- Loading state must prevent duplicate submission.
- Disabled actions must explain why when the reason is not obvious.
- Icon-left is preferred for command buttons when a matching icon exists.
- Button text must be action-oriented and short.
- Destructive buttons must not rely on color alone.

Do not:

- place multiple competing primary buttons side by side
- style links as primary buttons unless they start a primary workflow
- use generic template colors outside the theme contract

## Icon Buttons

Base: Mantine `ActionIcon`

Rules:

- Every icon-only action needs an accessible label.
- Use tooltips for unfamiliar icons or dense toolbars.
- Keep stable square dimensions.
- Reserve danger styling for destructive icon actions.

## Text Inputs

Base: Mantine `TextInput`

Rules:

- Always render a label, not placeholder-only identification.
- Placeholder text is an example, not a field name.
- Helper text appears before failure when guidance prevents mistakes.
- Field-level errors must sit near the field.
- Multi-field forms should include a summary when several errors block submission.
- Preserve typed values after recoverable server errors.

## Password Inputs

Base: Mantine `PasswordInput`

Rules:

- Include show/hide affordance.
- Show password requirements before failure when policy is non-trivial.
- Do not indicate strength or validity by color alone.
- Do not log or echo password-like values in helper text, errors, or analytics.

## Search Inputs

Base: Mantine `TextInput` or `Combobox` with search behavior

Rules:

- Use a search icon where it improves recognition.
- Debounce remote searches.
- Show loading and no-results states.
- Preserve the query when users navigate through filtered results and return.

## Selects, Multi-Selects, and Comboboxes

Base: Mantine `Select`, `MultiSelect`, `Combobox`

Rules:

- Use `Select` for small controlled sets.
- Use searchable patterns for long or user-generated lists.
- Use `MultiSelect` only when multiple values are genuinely allowed.
- Provide clear empty and no-results copy.
- Do not fake form selects with menus unless the interaction is not field input.

## Textareas

Base: Mantine `Textarea`

Rules:

- Use only for real multi-line input.
- Show max-length guidance when limits matter.
- Autosize only when it improves the workflow.
- Avoid very large textareas inside modals unless the modal is explicitly for focused editing.

## Checkboxes, Radios, and Switches

Base: Mantine `Checkbox`, `Radio`, `Switch`

Rules:

- `Checkbox`: independent opt-in/out choices.
- `Radio`: mutually exclusive choices.
- `Switch`: immediate on/off state changes.
- Do not use switches for values that should only commit on form submit.
- Label text must describe the state or choice, not just the field category.

## Forms

Base: Mantine form primitives plus project form adapter

Rules:

- Form actions appear after the fields they affect.
- Submit actions must have loading state.
- Cancel/back actions must be visually lower emphasis than submit.
- Server validation must map to field errors where possible.
- Required fields must be discoverable before submit.
- Avoid clearing user input after failed submit.

## Cards and Panels

Base: Mantine `Card` or `Paper`

Rules:

- Cards group related content and actions.
- Repeated cards use consistent header, content, metadata, and action placement.
- Cards must not become page-section decoration by default.
- Avoid card-inside-card nesting unless hierarchy is explicit and shallow.
- Clickable cards must expose the same destination through keyboard and accessible name.

## Modals

Base: Mantine `Modal`

Use for:

- confirmation
- focused editing
- short multi-step tasks
- blocking decisions

Rules:

- Every modal needs a clear title.
- Modal body must explain the decision or task.
- Primary and cancel actions must be visually obvious.
- Destructive confirmation must restate the target or consequence.
- Focus must trap inside the modal and return to the trigger on close.
- Errors inside a modal must remain visible and actionable.

Do not:

- use a modal as a replacement for a full page
- open a second modal for routine validation
- hide irreversible consequences in secondary text only

## Drawers

Base: Mantine `Drawer`

Use for:

- contextual details
- filters
- secondary editing
- side-by-side review

Rules:

- Drawer title must identify the object or task.
- Save/apply actions must remain reachable.
- Mobile drawer behavior must be defined.
- Destructive confirmation should use a modal when consequence needs focused attention.

## Tables

Base: Mantine `Table`

Rules:

- Use tables for scanning, comparison, and bulk management.
- Define columns by user decision value, not database shape.
- Sortable columns must show current sort state.
- Bulk actions require clear selected-row count and reset behavior.
- Empty state must explain what is missing and what action exists.
- Loading state must preserve layout where practical.
- Mobile behavior must be explicit.

## Lists

Base: Mantine layout primitives or `List`

Rules:

- Use lists for feed, history, activity, search results, or compact object summaries.
- Each item needs a clear primary label and optional metadata.
- Repeated row actions must be placed consistently.
- Infinite scroll requires an accessible alternative or clear pagination behavior.

## Navigation

Base: Mantine navigation primitives and project shell

Rules:

- Main navigation is stable across sibling screens.
- Current location must be visually and semantically indicated.
- Navigation labels must be nouns or destinations, not implementation terms.
- Destructive actions do not belong in primary navigation.
- Mobile navigation must preserve access to primary destinations.

## Tabs

Base: Mantine `Tabs`

Rules:

- Use tabs for peer views under one object or workflow.
- Labels should be short and stable.
- Deep-link tabs when they represent meaningful destinations.
- Do not use tabs for a stepper or wizard.

## Alerts

Base: Mantine `Alert`

Required states:

- info
- success
- warning
- error

Rules:

- Alerts should identify consequence or next action.
- Use inline alerts for local context.
- Use page-level alerts for route-wide state.
- Do not replace field validation with a generic alert only.

## Notifications

Base: Mantine notifications

Rules:

- Use for transient operation feedback.
- Success notifications should be concise.
- Error notifications should include next action or point to inline details.
- Avoid stacking multiple success notifications for one action.

## Badges and Status Chips

Base: Mantine `Badge`

Rules:

- Badges communicate status, category, role, or count.
- Status vocabulary must be canonical within each project.
- Badges must not be the only way to understand state.
- Avoid using badges as primary controls.

## Menus and Popovers

Base: Mantine `Menu`, `Popover`

Rules:

- Menus contain commands or navigational choices.
- Popovers contain lightweight supplemental content.
- Menu items need consistent icon and destructive treatment.
- Critical actions need confirmation outside the menu when consequence is high.

## Tooltips

Base: Mantine `Tooltip`

Rules:

- Tooltips clarify controls; they do not carry required instructions.
- Icon-only buttons should use tooltips unless the icon is universally clear.
- Tooltip content must be short.

## Empty States

Base: project wrapper on Mantine layout primitives

Required content:

- what is missing
- why it matters or why it happened when useful
- next action when the user can resolve it

Avoid vague copy such as "Nothing here."

## Loading States

Base: Mantine `Loader`, `Skeleton`, progress components

Rules:

- Use skeletons when layout shape is known.
- Use spinners only for small or ambiguous waits.
- Long-running operations must communicate progress, queued state, or expected wait where possible.
- Loading must not cause major layout shift.

## Error States

Rules:

- Error copy must say what went wrong and what the user can do next.
- Retry actions should be available for recoverable failures.
- Permission errors must be distinct from empty states.
- Log technical details separately; do not expose internals to users.

## Pagination

Base: Mantine `Pagination`

Rules:

- Use pagination for bounded lists, admin tables, and search results.
- Preserve filters and sort while paging.
- Show enough context for result count when available.
- Infinite scroll is allowed only when history, deep links, and accessibility remain acceptable.

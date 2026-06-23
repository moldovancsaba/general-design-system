## Shared Contract Checklist

- [ ] This change preserves Mantine as the only foundational UI platform.
- [ ] Shared package versions, docs, and `VERSION` stay aligned when release behavior changes.
- [ ] Server-safe vs client-safe package usage is intentional for the target runtime.
- [ ] Loading, empty, error, disabled, and permission states are handled where relevant.
- [ ] No page-local shell/card/toolbar/state pattern was invented where a shared contract exists.
- [ ] Accessibility, contrast, and responsive behavior were considered before merge.
- [ ] `npm run build`, `npm run lint`, and `npm run test:run` were run for shared-package changes.

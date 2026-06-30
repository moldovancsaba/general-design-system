# Schema Forms

Status: Active SSOT
Version: 3.7.0
Last updated: 2026-06-30

Schema forms turn existing contracts into governed GDS form models. Use them when a product already has JSON Schema, OpenAPI, or Zod contracts and needs predictable labels, required state, validation, i18n keys, and accessibility wiring.

## Runtime API

- `createGdsFormFromSchema(source, options)`: adapter selector for JSON Schema, OpenAPI, or Zod-like object schemas.
- `jsonSchemaToGdsFormSchema(schema, options?)`: normalizes object JSON Schema contracts.
- `openApiToGdsFormSchema(document, options?)`: extracts a request body or component schema before normalization.
- `zodToGdsFormSchema(schema, options?)`: reads consumer-supplied Zod-like object schemas without adding Zod as a hard dependency.
- `GdsSchemaForm`: renders a generated form through `useGdsFormOrchestration`, `GdsFormProvider`, `GdsValidationSummary`, `FormField`, and `ValidatedFieldMessage`.
- `uploadAdapter`: optional `GdsSchemaUploadAdapter` for schema file-upload fields that must upload immediately and submit upload results instead of raw `File[]` values.

## Support Matrix

- Supported: string, email, URL, password, date, number, integer, boolean, enum/select, textarea by long `maxLength`, hidden fields, conditional-field metadata, and schema file uploads.
- Requires renderer override: arrays, nested objects, `$ref`, `oneOf`, and `anyOf`.
- Unsupported schema nodes produce advisory adapter issues and blocking generated-form validation until a renderer override is supplied.

## Accessibility Contract

- Every generated field has a label and deterministic field ID.
- Descriptions and errors use deterministic `aria-describedby` IDs.
- Required fields include visible required copy in the label and native `required` semantics where the input supports it.
- Validation failures render in `GdsValidationSummary` and at field level through `ValidatedFieldMessage`.

## I18n

Each field receives an `i18nKey`. Explicit `x-gds-i18nKey` wins; otherwise GDS generates:

```text
gds.form.{formId}.{fieldName}
```

Generated copy is a fallback. Production products should map these keys through their host i18n system.

## Renderer Overrides

Unsafe or product-specific fields must use explicit renderers:

```tsx
<GdsSchemaForm
  schema={schema}
  onSubmit={save}
  renderers={{
    files: ({ field }) => <UploadDropzone aria-label={field.label} />,
  }}
/>
```

Overrides must still use GDS components and tokens. Do not bypass GDS with route-local visual systems.

## Upload Adapter

When `uploadAdapter` is provided, the default `file-upload` field:

- starts upload immediately after file selection
- renders progress, retry, cancel, and remove controls through `UploadDropzone`
- blocks submit while raw `File` values are still pending
- writes `GdsSchemaUploadResult[]` into form values after upload succeeds

```tsx
<GdsSchemaForm
  schema={schema}
  uploadAdapter={{
    upload: async ({ files, signal, onProgress }) => {
      onProgress(25);
      return uploadFiles(files, { signal });
    },
    remove: async ({ value, signal }) => {
      await removeFiles(value, { signal });
    },
  }}
  onSubmit={save}
/>
```

## Observability

Schema adapters emit metadata-only events:

- `schema_parse_failed`
- `unsupported_field`
- `generated_submit_failed`
- `upload_started`
- `upload_progress`
- `upload_succeeded`
- `upload_failed`
- `upload_cancelled`
- `upload_removed`
- `upload_retry_requested`

Payloads never include form values.

## Rollback

Schema-form APIs are additive. Existing manual forms and `useGdsFormOrchestration` consumers remain supported.

## Verification

```bash
npm run test:run -- packages/gds-core/src/core.test.tsx
npm run verify:api-docs-coverage
npm run verify:release
```

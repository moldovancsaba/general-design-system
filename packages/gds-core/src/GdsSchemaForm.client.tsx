'use client';

import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { Button, Stack, Text } from '@mantine/core';
import { FormField } from './FormField';
import { GdsFormProvider, GdsValidationSummary, type GdsFormOrchestrationEvent, type ValidationIssue, ValidatedFieldMessage, useGdsFormOrchestration } from './GdsForm.client';
import { StateBlock } from './StateBlock';

export type GdsSchemaFieldType = 'text' | 'email' | 'url' | 'password' | 'number' | 'boolean' | 'select' | 'textarea' | 'date' | 'hidden' | 'conditional' | 'unsupported';

export interface GdsFieldOption {
  label: string;
  value: string;
}

export interface GdsFieldDescriptor {
  name: string;
  type: GdsSchemaFieldType;
  label: string;
  description?: string;
  i18nKey: string;
  required?: boolean;
  hidden?: boolean;
  condition?: string;
  options?: GdsFieldOption[];
  defaultValue?: unknown;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  unsupportedReason?: string;
}

export interface GdsFormSchema {
  id: string;
  title?: string;
  description?: string;
  fields: GdsFieldDescriptor[];
}

export interface GdsSchemaAdapterResult {
  schema?: GdsFormSchema;
  issues: ValidationIssue[];
  events: GdsSchemaFormEvent[];
}

export interface GdsSchemaFormEvent {
  type: 'schema_parse_failed' | 'unsupported_field' | 'generated_submit_failed';
  field?: string;
  timestamp: number;
  privacy: 'metadata-only';
  message?: string;
}

export type GdsFieldRenderer = (context: GdsFieldRendererContext) => ReactNode;

export interface GdsFieldRendererContext {
  field: GdsFieldDescriptor;
  value: unknown;
  setValue: (value: unknown) => void;
  describedBy: string;
  invalid: boolean;
}

export type GdsFieldRendererMap = Partial<Record<GdsSchemaFieldType | string, GdsFieldRenderer>>;

export interface CreateGdsFormFromSchemaOptions {
  adapter: 'json-schema' | 'openapi' | 'zod';
  id?: string;
  schemaName?: string;
}

export interface GdsSchemaFormProps<TValues extends Record<string, unknown> = Record<string, unknown>> {
  schema: GdsFormSchema;
  onSubmit: (values: TValues) => Promise<void> | void;
  renderers?: GdsFieldRendererMap;
  onEvent?: (event: GdsSchemaFormEvent | GdsFormOrchestrationEvent) => void;
  submitLabel?: string;
}

function createSchemaEvent(type: GdsSchemaFormEvent['type'], message?: string, field?: string): GdsSchemaFormEvent {
  return { type, message, field, timestamp: Date.now(), privacy: 'metadata-only' };
}

function humanizeFieldName(name: string) {
  return name
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}

function makeI18nKey(formId: string, fieldName: string) {
  return `gds.form.${formId}.${fieldName}`;
}

function normalizeJsonField(formId: string, name: string, source: Record<string, unknown>, required: boolean): GdsFieldDescriptor {
  const title = typeof source.title === 'string' ? source.title : humanizeFieldName(name);
  const description = typeof source.description === 'string' ? source.description : undefined;
  const customType = typeof source['x-gds-fieldType'] === 'string' ? source['x-gds-fieldType'] : undefined;
  const hidden = source['x-gds-hidden'] === true;
  const condition = typeof source['x-gds-condition'] === 'string' ? source['x-gds-condition'] : undefined;
  const base = {
    name,
    label: title,
    description,
    required,
    hidden,
    condition,
    i18nKey: typeof source['x-gds-i18nKey'] === 'string' ? source['x-gds-i18nKey'] : makeI18nKey(formId, name),
    defaultValue: source.default,
    minLength: typeof source.minLength === 'number' ? source.minLength : undefined,
    maxLength: typeof source.maxLength === 'number' ? source.maxLength : undefined,
    min: typeof source.minimum === 'number' ? source.minimum : undefined,
    max: typeof source.maximum === 'number' ? source.maximum : undefined,
    pattern: typeof source.pattern === 'string' ? source.pattern : undefined,
  };
  const enumValues = Array.isArray(source.enum) ? source.enum : undefined;

  if (hidden) return { ...base, type: 'hidden' };
  if (condition) return { ...base, type: 'conditional' };
  if (enumValues?.length) {
    return {
      ...base,
      type: 'select',
      options: enumValues.map((value) => ({ label: String(value), value: String(value) })),
    };
  }
  if (customType) return { ...base, type: customType as GdsSchemaFieldType };
  if (source.oneOf || source.anyOf) return { ...base, type: 'unsupported', unsupportedReason: 'oneOf/anyOf schemas require an explicit GDS renderer override.' };
  if (source.type === 'array') return { ...base, type: 'unsupported', unsupportedReason: 'Array schemas require an explicit GDS renderer override.' };
  if (source.type === 'object' || source.$ref) return { ...base, type: 'unsupported', unsupportedReason: 'Nested or referenced schemas require a separate form section or renderer override.' };
  if (source.type === 'boolean') return { ...base, type: 'boolean' };
  if (source.type === 'number' || source.type === 'integer') return { ...base, type: 'number' };
  if (source.format === 'email') return { ...base, type: 'email' };
  if (source.format === 'uri' || source.format === 'url') return { ...base, type: 'url' };
  if (source.format === 'date') return { ...base, type: 'date' };
  if (source.format === 'password') return { ...base, type: 'password' };
  if (Number(source.maxLength) > 160) return { ...base, type: 'textarea' };
  return { ...base, type: 'text' };
}

export function jsonSchemaToGdsFormSchema(schema: Record<string, unknown>, options: { id?: string } = {}): GdsSchemaAdapterResult {
  const id = options.id ?? (typeof schema.$id === 'string' ? schema.$id.replace(/[^a-zA-Z0-9_-]/g, '-') : 'schema-form');
  const properties = schema.properties;
  if (!properties || typeof properties !== 'object' || Array.isArray(properties)) {
    return {
      issues: [{ field: 'schema', message: 'JSON Schema form generation requires an object schema with properties.', severity: 'blocking' }],
      events: [createSchemaEvent('schema_parse_failed', 'Missing object properties.')],
    };
  }

  const required = new Set(Array.isArray(schema.required) ? schema.required.map(String) : []);
  const fields = Object.entries(properties as Record<string, Record<string, unknown>>).map(([name, value]) => normalizeJsonField(id, name, value, required.has(name)));
  const unsupported = fields.filter((field) => field.type === 'unsupported');
  return {
    schema: {
      id,
      title: typeof schema.title === 'string' ? schema.title : undefined,
      description: typeof schema.description === 'string' ? schema.description : undefined,
      fields,
    },
    issues: unsupported.map((field) => ({ field: field.name, message: field.unsupportedReason ?? 'Unsupported schema field.', severity: 'warning' })),
    events: unsupported.map((field) => createSchemaEvent('unsupported_field', field.unsupportedReason, field.name)),
  };
}

export function openApiToGdsFormSchema(document: Record<string, any>, options: { id?: string; schemaName?: string } = {}): GdsSchemaAdapterResult {
  const schema = options.schemaName
    ? document.components?.schemas?.[options.schemaName]
    : document.schema ?? document.requestBody?.content?.['application/json']?.schema ?? document.components?.schemas?.[Object.keys(document.components?.schemas ?? {})[0]];
  if (!schema) {
    return {
      issues: [{ field: 'openapi', message: 'OpenAPI form generation requires a requestBody schema or components.schemas entry.', severity: 'blocking' }],
      events: [createSchemaEvent('schema_parse_failed', 'Missing OpenAPI schema.')],
    };
  }
  return jsonSchemaToGdsFormSchema(schema, { id: options.id ?? options.schemaName ?? 'openapi-form' });
}

function readZodShape(schema: any): Record<string, any> | null {
  const shape = schema?.shape ?? schema?._def?.shape;
  if (typeof shape === 'function') return shape();
  if (shape && typeof shape === 'object') return shape;
  return null;
}

function zodFieldToJson(name: string, field: any): Record<string, unknown> {
  const definition = field?._def ?? field?.def ?? {};
  const typeName = String(definition.typeName ?? definition.type ?? field?.type ?? '');
  const inner = definition.innerType ?? definition.schema;
  const optional = typeName.toLowerCase().includes('optional') || Boolean(inner);
  const target = inner ?? field;
  const targetDefinition = target?._def ?? target?.def ?? definition;
  const targetType = String(targetDefinition.typeName ?? targetDefinition.type ?? typeName).toLowerCase();
  const description = typeof target.description === 'string' ? target.description : undefined;
  const json: Record<string, unknown> = { title: humanizeFieldName(name), description };
  if (targetType.includes('number')) json.type = 'number';
  else if (targetType.includes('boolean')) json.type = 'boolean';
  else if (targetType.includes('enum')) {
    json.type = 'string';
    json.enum = targetDefinition.values ?? targetDefinition.entries ? Object.values(targetDefinition.entries ?? targetDefinition.values) : undefined;
  } else if (targetType.includes('array')) json.type = 'array';
  else if (targetType.includes('object')) json.type = 'object';
  else json.type = 'string';
  json['x-gds-optional'] = optional;
  return json;
}

export function zodToGdsFormSchema(zodSchema: unknown, options: { id?: string } = {}): GdsSchemaAdapterResult {
  const shape = readZodShape(zodSchema);
  if (!shape) {
    return {
      issues: [{ field: 'zod', message: 'Zod form generation requires an object schema with a readable shape.', severity: 'blocking' }],
      events: [createSchemaEvent('schema_parse_failed', 'Missing Zod object shape.')],
    };
  }
  const properties = Object.fromEntries(Object.entries(shape).map(([name, field]) => [name, zodFieldToJson(name, field)]));
  const required = Object.entries(properties).filter(([, value]) => value['x-gds-optional'] !== true).map(([name]) => name);
  return jsonSchemaToGdsFormSchema({ type: 'object', properties, required }, { id: options.id ?? 'zod-form' });
}

export function createGdsFormFromSchema(source: unknown, options: CreateGdsFormFromSchemaOptions): GdsSchemaAdapterResult {
  if (options.adapter === 'json-schema') return jsonSchemaToGdsFormSchema(source as Record<string, unknown>, { id: options.id });
  if (options.adapter === 'openapi') return openApiToGdsFormSchema(source as Record<string, unknown>, { id: options.id, schemaName: options.schemaName });
  return zodToGdsFormSchema(source, { id: options.id });
}

function getInitialValues(schema: GdsFormSchema) {
  return Object.fromEntries(schema.fields.map((field) => {
    const fallback = field.type === 'boolean' ? false : '';
    return [field.name, field.defaultValue ?? fallback];
  }));
}

function validateSchemaValues(schema: GdsFormSchema, values: Record<string, unknown>, renderers: GdsFieldRendererMap = {}): ValidationIssue[] {
  return schema.fields.flatMap((field) => {
    if (field.hidden || field.type === 'hidden') return [];
    const value = values[field.name];
    const text = String(value ?? '').trim();
    if (field.type === 'unsupported' && !renderers[field.name] && !renderers[field.type]) return [{ field: field.name, message: field.unsupportedReason ?? 'Unsupported schema field.', severity: 'blocking' as const }];
    if (field.required && (value === undefined || value === null || text === '')) return [{ field: field.name, message: `${field.label} is required.`, severity: 'blocking' as const }];
    if (field.minLength && text.length > 0 && text.length < field.minLength) return [{ field: field.name, message: `${field.label} must contain at least ${field.minLength} characters.`, severity: 'blocking' as const }];
    if (field.maxLength && text.length > field.maxLength) return [{ field: field.name, message: `${field.label} must contain at most ${field.maxLength} characters.`, severity: 'blocking' as const }];
    if (field.pattern && text.length > 0 && !new RegExp(field.pattern).test(text)) return [{ field: field.name, message: `${field.label} does not match the required format.`, severity: 'blocking' as const }];
    if (field.type === 'email' && text.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return [{ field: field.name, message: `${field.label} must be a valid email address.`, severity: 'blocking' as const }];
    if (field.type === 'number' && value !== '' && value !== undefined) {
      const numberValue = Number(value);
      if (Number.isNaN(numberValue)) return [{ field: field.name, message: `${field.label} must be a number.`, severity: 'blocking' as const }];
      if (field.min !== undefined && numberValue < field.min) return [{ field: field.name, message: `${field.label} must be at least ${field.min}.`, severity: 'blocking' as const }];
      if (field.max !== undefined && numberValue > field.max) return [{ field: field.name, message: `${field.label} must be at most ${field.max}.`, severity: 'blocking' as const }];
    }
    return [];
  });
}

function renderDefaultField({ field, value, setValue, describedBy, invalid }: GdsFieldRendererContext) {
  const common = {
    id: field.name,
    'aria-label': field.label,
    'aria-describedby': describedBy,
    'aria-invalid': invalid || undefined,
    required: field.required,
  };
  if (field.type === 'boolean') return <input {...common} type="checkbox" checked={Boolean(value)} onChange={(event) => setValue(event.currentTarget.checked)} />;
  if (field.type === 'number') return <input {...common} type="number" value={String(value ?? '')} onChange={(event) => setValue(event.currentTarget.value === '' ? '' : Number(event.currentTarget.value))} />;
  if (field.type === 'select') {
    return (
      <select {...common} value={String(value ?? '')} onChange={(event) => setValue(event.currentTarget.value)}>
        <option value="">Select...</option>
        {(field.options ?? []).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    );
  }
  if (field.type === 'textarea') return <textarea {...common} value={String(value ?? '')} onChange={(event) => setValue(event.currentTarget.value)} />;
  return <input {...common} type={field.type === 'password' ? 'password' : field.type === 'email' ? 'email' : field.type === 'url' ? 'url' : field.type === 'date' ? 'date' : 'text'} value={String(value ?? '')} onChange={(event) => setValue(event.currentTarget.value)} />;
}

export function GdsSchemaForm<TValues extends Record<string, unknown> = Record<string, unknown>>({
  schema,
  onSubmit,
  renderers = {},
  onEvent,
  submitLabel = 'Submit',
}: GdsSchemaFormProps<TValues>) {
  const initialValues = useMemo(() => getInitialValues(schema), [schema]);
  const form = useGdsFormOrchestration({
    initialValues,
    validate: (snapshot) => validateSchemaValues(schema, Object.fromEntries(Object.entries(snapshot.fields).map(([name, field]) => [name, field.value])), renderers),
    onSubmit: async (values) => {
      try {
        await onSubmit(values as TValues);
      } catch (error) {
        onEvent?.(createSchemaEvent('generated_submit_failed', error instanceof Error ? error.message : 'Generated schema submit failed.'));
        throw error;
      }
    },
    onEvent,
  });

  return (
    <GdsFormProvider snapshot={form.snapshot}>
      <Stack gap="md">
        {schema.title ? <Text fw={700}>{schema.title}</Text> : null}
        {schema.description ? <Text size="sm" c="dimmed">{schema.description}</Text> : null}
        <GdsValidationSummary />
        {schema.fields.map((field) => {
          if (field.hidden || field.type === 'hidden') return null;
          const issue = form.snapshot.issues.find((item) => item.field === field.name && item.severity === 'blocking');
          if (field.type === 'unsupported' && !renderers[field.name] && !renderers[field.type]) {
            return <StateBlock key={field.name} variant="error" title={`Unsupported field: ${field.label}`} description={field.unsupportedReason ?? 'Provide a renderer override for this field.'} compact />;
          }
          const context = {
            field,
            value: form.snapshot.fields[field.name]?.value,
            setValue: (next: unknown) => form.setFieldValue(field.name, next),
            describedBy: `${field.name}-description ${field.name}-error`,
            invalid: Boolean(issue),
          };
          const renderer = renderers[field.name] ?? renderers[field.type] ?? renderDefaultField;
          return (
            <FormField
              key={field.name}
              label={`${field.label}${field.required ? ' (required)' : ''}`}
              description={field.description ? <Text id={`${field.name}-description`} size="xs" c="dimmed">{field.description}</Text> : undefined}
            >
              {renderer(context)}
              <span id={`${field.name}-error`}>
                <ValidatedFieldMessage field={field.name} />
              </span>
            </FormField>
          );
        })}
        <Button type="button" onClick={() => { void form.submit(); }} loading={form.snapshot.submitState === 'validating' || form.snapshot.submitState === 'submitting' || form.snapshot.submitState === 'optimistic'}>
          {submitLabel}
        </Button>
      </Stack>
    </GdsFormProvider>
  );
}

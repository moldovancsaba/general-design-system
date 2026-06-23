import { CreatorThemeDiagnostics } from '@doneisbetter/gds';

export const WithIssues = () => (
  <CreatorThemeDiagnostics
    issues={[
      {
        code: 'blocked-selector',
        severity: 'error',
        message: 'The selector "body" escapes the scoped theme boundary and is not allowed.',
        selector: 'body',
      },
      {
        code: 'unsupported-property',
        severity: 'warning',
        message: 'The property "position: fixed" may break layout containment.',
        selector: '.landing-hero',
        property: 'position',
      },
    ]}
  />
);

export const WarningOnly = () => (
  <CreatorThemeDiagnostics
    issues={[
      {
        code: 'contrast-hint',
        severity: 'warning',
        message: 'Text color may not meet AA contrast against the chosen background.',
        selector: '.cta',
        property: 'color',
      },
    ]}
  />
);

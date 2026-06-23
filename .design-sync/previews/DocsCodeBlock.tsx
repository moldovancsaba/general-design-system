import { DocsCodeBlock } from '@doneisbetter/gds';

export const Default = () => (
  <DocsCodeBlock
    title="Install"
    language="bash"
    withCopy
    code={`npm install @doneisbetter/gds\nnpm run build`}
  />
);

export const TypeScript = () => (
  <DocsCodeBlock
    title="GdsProvider.tsx"
    language="tsx"
    withCopy
    code={`import { GdsProvider } from '@doneisbetter/gds';\n\nexport function App() {\n  return (\n    <GdsProvider locale="en">\n      <Routes />\n    </GdsProvider>\n  );\n}`}
  />
);

export const NoCopy = () => (
  <DocsCodeBlock
    language="json"
    code={`{\n  "cssEntry": ".ds-resolved-styles.css",\n  "provider": { "component": "GdsProvider" }\n}`}
  />
);

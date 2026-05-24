import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@gds/theme': resolve(__dirname, 'packages/gds-theme/src/index.ts'),
      '@gds/core': resolve(__dirname, 'packages/gds-core/src/index.ts'),
      '@gds/admin': resolve(__dirname, 'packages/gds-admin/src/index.ts'),
      react: resolve(__dirname, 'node_modules/react'),
      'react-dom': resolve(__dirname, 'node_modules/react-dom'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    css: false,
    include: ['packages/**/*.test.ts', 'packages/**/*.test.tsx'],
    coverage: {
      reporter: ['text'],
    },
  },
});

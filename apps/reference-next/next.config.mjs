import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@sovereignsquad/gds-theme', '@sovereignsquad/gds-core', '@sovereignsquad/gds-admin'],
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@sovereignsquad/gds-theme/server': resolve(__dirname, '../../packages/gds-theme/src/server.ts'),
      '@sovereignsquad/gds-theme/client': resolve(__dirname, '../../packages/gds-theme/src/client.ts'),
      '@sovereignsquad/gds-core/server': resolve(__dirname, '../../packages/gds-core/src/server.ts'),
      '@sovereignsquad/gds-core/client': resolve(__dirname, '../../packages/gds-core/src/client.ts'),
      '@sovereignsquad/gds-admin/server': resolve(__dirname, '../../packages/gds-admin/src/server.ts'),
      '@sovereignsquad/gds-admin/client': resolve(__dirname, '../../packages/gds-admin/src/client.ts'),
    };
    return config;
  },
};

export default nextConfig;

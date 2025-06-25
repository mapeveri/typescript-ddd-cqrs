import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: './test/acceptance/setup.ts',
    globalSetup: './test/acceptance/setupDatabaseTest.ts',
    include: ['test/acceptance/**/*.test.ts'],
    alias: {
      '@src': '/src',
      '@test': '/test',
    },
    sequence: {
      shuffle: false,
      concurrent: false,
    },
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage/acceptance',
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});

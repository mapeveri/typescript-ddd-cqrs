import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: './test/setup.ts',
    include: ['test/unit/**/*.test.ts', 'test/acceptance/**/*.test.ts'],
    alias: {
      '@src': '/src',
      '@test': '/test',
    },
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
    },
  },
});

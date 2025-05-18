/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  base: './',
  build: { outDir: 'dist' },
  plugins: [tailwindcss()],
  test: {
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        'html',
        'node_modules',
        '*/app/state',
        '*/shared/ui-config',
        'eslint.config.mjs',
        'commitlint.config.js',
        'postcss.config.mjs',
        'tailwind.config.ts',
        '*/vite-env.d.ts',
        '*/main.ts',
        '**/*/constants.ts',
        '**/*/types.ts',
        '**/*/index.ts',
        '**/*/layout.ts',
        '**/*/styles.ts',
        '**/*/logo.ts',
      ],
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
    },
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});

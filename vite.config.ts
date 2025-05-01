/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: { outDir: 'dist' },
  plugins: [tailwindcss()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['json', 'html'],
      reportsDirectory: './coverage',
    },
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});

/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: { outDir: 'dist' },
  test: {
    // setupFiles: './src/sum.test.ts'
  },
});

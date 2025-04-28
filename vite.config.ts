/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: { outDir: 'dist' },
  plugins: [tailwindcss()],
  test: {
    // setupFiles: './src/sum.test.ts'
  },
});

import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/app'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true, // pour éviter d'importer describe/it à chaque fois
    include: ['src/test/unit/**/*.spec.ts'],
  }
});

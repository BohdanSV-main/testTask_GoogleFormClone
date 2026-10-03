import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // App infrastructure names follow the approved architecture, not domain slices.
    files: ['**/app/providers/**', '**/app/store/**'],
    rules: { 'fsd/segments-by-purpose': 'off' },
  },
  {
    ignores: [
      '**/*.test.*',
      '**/shared/api/generated/**',
      '**/shared/lib/testing/**',
      '**/main.tsx',
    ],
  },
  {
    // Thin pages are an explicit project requirement; a single consumer is intentional.
    files: ['**'],
    rules: { 'fsd/insignificant-slice': 'off' },
  },
]);

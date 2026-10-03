import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
  globalIgnores(['dist', 'src/shared/api/generated']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ['src/pages/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['useState', 'useReducer', 'useEffect', 'useLayoutEffect'],
              message: 'Pages compose UI. State and effects belong to features/widgets.',
            },
            { name: 'react-redux', message: 'Pages must not access application state.' },
          ],
          patterns: [
            {
              group: ['**/api/**', '**/model/**'],
              message: 'Pages must not contain data access or business logic.',
            },
          ],
        },
      ],
    },
  },
  prettier,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      curly: ['error', 'all'],
    },
  },
]);

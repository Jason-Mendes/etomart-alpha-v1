import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import tailwindcssPlugin from 'eslint-plugin-tailwindcss';
import globals from 'globals';

export default [
  {
    ignores: ['**/build/**', '**/dist/**', '**/node_modules/**', '**/*.config.js'],
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  eslint.configs.recommended,
  {
    files: ['*.js', '*.mjs'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
      tailwindcss: tailwindcssPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['off', { 
        "vars": "all",
        "args": "after-used",
        "ignoreRestSiblings": false
      }],
      'prettier/prettier': 'off',
      'import/order': 'off',
      'jsx-a11y/anchor-is-valid': ['error', {
        'components': ['Link'],
        'specialLink': ['hrefLeft', 'hrefRight'],
        'aspects': ['invalidHref', 'preferButton']
      }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Disable Tailwind CSS linting rules
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/no-contradicting-classname': 'off',
      'tailwindcss/migration-from-tailwind-2': 'off'
      //  // Re-enable the Tailwind CSS linting rules
      // 'tailwindcss/classnames-order': 'warn',
      // 'tailwindcss/no-custom-classname': 'warn',
      // 'tailwindcss/no-contradicting-classname': 'error'
      //  'tailwindcss/migration-from-tailwind-2': 'warn'
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      tailwindcss: {
        config: 'tailwind.config.js',
        cssFiles: [
          'src/**/*.css',
          'src/**/*.scss',
          'src/**/*.sass',
          'src/**/*.less',
          'src/**/*.styl',
        ],
      },
    },
  },
  {
    files: [
      '**/*.test.js',
      '**/*.test.jsx',
      '**/*.test.ts',
      '**/*.test.tsx',
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
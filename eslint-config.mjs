import js from '@eslint/js'
import tseslint from 'typescript-eslint'

const typescriptFiles = ['**/*.ts']

export default [
  {
    ignores: [
      'compiled/',
      'coverage/',
      'lib/',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: typescriptFiles,
  })),
  {
    files: ['src/**/*.ts'],
    rules: {
      '@typescript-eslint/no-require-imports': 'error',
    },
  },
  {
    files: typescriptFiles,
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'separate-type-imports' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
      'no-console': 'off',
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'never'],
    },
  },
]

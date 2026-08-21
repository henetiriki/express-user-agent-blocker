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
    files: typescriptFiles,
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
      'no-console': 'off',
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'never'],
    },
  },
]

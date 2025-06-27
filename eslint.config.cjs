const { defineConfig } = require('eslint/config')

const tsParser = require('@typescript-eslint/parser')
const typescriptEslint = require('@typescript-eslint/eslint-plugin')
const js = require('@eslint/js')

const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = defineConfig([
  { ignores: ['src/pgn.js', 'src/pgn.d.ts'] },
  {
    languageOptions: {
      parser: tsParser,
    },

    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    extends: compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ),

    rules: {
      'no-constant-condition': [
        'error',
        {
          checkLoops: false,
        },
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['default'],
          format: ['strictCamelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: ['variable'],
          format: ['strictCamelCase', 'UPPER_CASE'],
        },
        {
          selector: ['objectLiteralProperty'],
          format: ['strictCamelCase', 'UPPER_CASE'],
        },
        {
          selector: ['typeLike'],
          format: ['PascalCase'],
        },
      ],

      'multiline-comment-style': ['error', 'starred-block'],
    },
  },
])

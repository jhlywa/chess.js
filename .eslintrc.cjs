module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],

  rules: {
    // allow while(true) loops
    'no-constant-condition': ['error', { checkLoops: false }],
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
    'multiline-comment-style': ['error', 'starred-block']
  },
}

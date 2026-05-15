module.exports = {
  root: true,
  extends: ['@fingerprintjs/eslint-config-dx-team', 'plugin:svelte/recommended'],
  ignorePatterns: ['*.cjs'],
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
}

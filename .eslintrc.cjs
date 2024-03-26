module.exports = {
  root: true,
  extends: ['@fingerprintjs/eslint-config-dx-team'],
  plugins: ['svelte3'],
  ignorePatterns: ['*.cjs'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
  settings: {
    'svelte3/typescript': () => require('typescript'),
  },
};

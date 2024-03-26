import config from '@fingerprintjs/prettier-config-dx-team'

export default {
  ...config,
  svelteSortOrder: 'options-scripts-markup-styles',
  plugins: ['prettier-plugin-svelte'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
}

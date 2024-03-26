import config from '@fingerprintjs/prettier-config-dx-team';

export default {
  ...config,
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  svelteSortOrder: 'options-scripts-markup-styles',
};

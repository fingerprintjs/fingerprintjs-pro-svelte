import typescript from 'rollup-plugin-typescript2';
import jsonPlugin from '@rollup/plugin-json';
import external from 'rollup-plugin-peer-deps-external';
import dtsPlugin from 'rollup-plugin-dts';
import licensePlugin from 'rollup-plugin-license';
import svelte from 'rollup-plugin-svelte';
import autoPreprocess from 'svelte-preprocess';
import resolvePlugin from '@rollup/plugin-node-resolve';
import { join } from 'path';

const production = !process.env.ROLLUP_WATCH;

const sveltePlugin = svelte({
  preprocess: autoPreprocess(),
  compilerOptions: {
    dev: !production,
    preserveComments: true,
  },
});

const { dependencies = {}, main, module, types } = require('./package.json');

const inputFile = 'src/index.ts';

const commonBanner = licensePlugin({
  banner: {
    content: {
      file: join(__dirname, 'resources', 'license_banner.txt'),
    },
  },
});

const commonInput = {
  input: inputFile,
  plugins: [
    resolvePlugin({
      extensions: ['.js', '.ts', '.svelte'],
    }),
    jsonPlugin(),
    typescript(),
    sveltePlugin,
    external(),
    commonBanner,
  ],
};

const commonOutput = {
  exports: 'named',
};

export default [
  {
    ...commonInput,
    external: Object.keys(dependencies),
    output: [
      // CJS for usage with `require()`
      {
        ...commonOutput,
        file: main,
        format: 'cjs',
      },

      // ESM for usage with `import`
      {
        ...commonOutput,
        file: module,
        format: 'es',
      },
    ],
  },

  // TypeScript definition
  {
    ...commonInput,
    input: 'src/index.types.ts',
    plugins: [typescript(), dtsPlugin(), commonBanner],
    output: {
      file: types,
      format: 'es',
    },
  },
];

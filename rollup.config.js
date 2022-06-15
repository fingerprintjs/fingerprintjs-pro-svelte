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
  },
});

const { dependencies = {} } = require('./package.json');

const inputFile = 'src/index.ts';
const outputDirectory = 'dist';
const artifactName = 'index-ts';

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

// https://github.com/ezolenko/rollup-plugin-typescript2/issues/283 for trying to fix import not working without .ts in svelte file
export default [
  {
    ...commonInput,
    external: Object.keys(dependencies),
    output: [
      // CJS for usage with `require()`
      {
        ...commonOutput,
        file: `${outputDirectory}/${artifactName}.cjs.js`,
        format: 'cjs',
      },

      // ESM for usage with `import`
      {
        ...commonOutput,
        file: `${outputDirectory}/${artifactName}.esm.js`,
        format: 'es',
      },
    ],
  },

  // TypeScript definition
  {
    ...commonInput,
    plugins: [typescript(), dtsPlugin(), sveltePlugin, commonBanner],
    output: {
      file: `${outputDirectory}/${artifactName}.d.ts`,
      format: 'es',
    },
  },
];

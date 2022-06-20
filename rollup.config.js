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

const { dependencies = {}, main, module, types, name: pkgName, svelte: svelteEntry } = require('./package.json');
const name = pkgName
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

console.log({ name });

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
      // UMD
      {
        ...commonOutput,
        file: main,
        format: 'umd',
        name,
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

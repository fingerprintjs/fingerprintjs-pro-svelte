/**
 * Svelte 5 test configuration.
 *
 * This workspace package has svelte@5 + @sveltejs/vite-plugin-svelte@4 as devDependencies,
 * while the root workspace uses svelte@4 + @sveltejs/vite-plugin-svelte@3.
 *
 * We re-run the same parent test files (__tests__/*.test.ts) here. Those files import from
 * '../src/lib' — because vitest resolves relative imports from each test file's actual
 * location (not the config file's), those imports correctly resolve to the SDK source at
 * the repo root.
 */
import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import type { Plugin } from 'vite'
import path from 'path'

// Force svelte and @testing-library/svelte to resolve from this package (Svelte 5)
// instead of the workspace root (Svelte 4). Without this, workspace hoisting defeats the test.
function resolveFromSvelte5Package(): Plugin {
  const anchor = path.join(__dirname, 'package.json')

  return {
    name: 'resolve-svelte5-test-deps',
    enforce: 'pre',
    async resolveId(source, _importer, options) {
      if (
        source === 'svelte' ||
        source.startsWith('svelte/') ||
        source === '@testing-library/svelte' ||
        source.startsWith('@testing-library/svelte/')
      ) {
        return this.resolve(source, anchor, { ...options, skipSelf: true })
      }
      return undefined
    },
  }
}

export default defineConfig({
  plugins: [resolveFromSvelte5Package(), svelte({ hot: false })],
  resolve: {
    conditions: ['browser'],
  },
  test: {
    environment: 'jsdom',
    include: [path.resolve(__dirname, '../**/*.test.{ts,tsx}')],
    globals: false,
    passWithNoTests: false,
    setupFiles: [path.resolve(__dirname, '../setup.ts')],
    name: 'svelte5',
  },
})

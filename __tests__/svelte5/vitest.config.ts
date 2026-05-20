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
import path from 'path'

export default defineConfig({
  plugins: [svelte({ hot: false })],
  resolve: {
    // Resolve plain `svelte` imports to the browser runtime under jsdom
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

import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte({ hot: false })],
  test: {
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/lib/options.dist.ts'],
      provider: 'istanbul',
      reporter: [['text', { file: 'coverage.txt' }], ['json'], ['json-summary'], ['lcov']],
      reportsDirectory: './coverage',
    },
    environment: 'jsdom',
    include: ['__tests__/**/*.test.{ts,tsx}'],
    globals: false,
    passWithNoTests: false,
    setupFiles: ['./__tests__/setup.ts'],
  },
})

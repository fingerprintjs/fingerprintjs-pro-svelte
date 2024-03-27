/**
 * @type {import('ts-jest/dist/types').InitialOptionsTsJest}
 * */
export default {
  testEnvironment: 'jsdom',
  testRegex: '/__tests__/.+test.tsx?$',
  transform: {
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        preprocess: true,
      },
    ],
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  coveragePathIgnorePatterns: ['<rootDir>/src/lib/options.dist.ts'],
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  extensionsToTreatAsEsm: ['.svelte', '.ts'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  collectCoverageFrom: ['./src/**/**.{ts,tsx}'],
  coverageReporters: ['lcov', 'json-summary', ['text', { file: 'coverage.txt', path: './' }]],
}

const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: "." })

const customJestConfig = {
  testEnvironment: 'jsdom',
  clearMocks: true,
  moduleDirectories: ['node_modules', 'components'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.jest.json'
    }
  }
}

module.exports = createJestConfig(customJestConfig)
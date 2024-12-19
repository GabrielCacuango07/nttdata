module.exports = {
    preset: 'jest-preset-angular',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
      '^.+\\.(ts|js|html)$': 'jest-preset-angular',
    },
    testMatch: ['**/+(*.)+(spec).+(ts|js)?(x)'],
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageReporters: ['html', 'text'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts', '!src/main.ts'],
  };
  
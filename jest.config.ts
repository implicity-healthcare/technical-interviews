export default {
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "mocks",
],
  coverageProvider: 'v8',
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
        'jest-preset-angular',
        {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    ],
},

  clearMocks: true,
preset: 'jest-preset-angular',
setupFilesAfterEnv: [
        '<rootDir>/jest.setup.ts'
    ],
testEnvironment: "jsdom",
    testMatch: [
        "**/?(*.)+(spec).[tj]s?(x)"
    ],
    watchPathIgnorePatterns: [
        'dist',
        'node_modules',
        '.angular',
    ],
};

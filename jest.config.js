module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      // required due to custom location of tsconfig.json configuration file
      // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/tsconfig
      { diagnostics: false },
    ],
  },
  collectCoverage: true,
  collectCoverageFrom: ['**/src/*.{ts,tsx}'],
  coverageDirectory: './coverage/',
};

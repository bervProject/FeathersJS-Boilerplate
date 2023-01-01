module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  collectCoverage: true,
  collectCoverageFrom: ['**/src/*.{ts,tsx}'],
  coverageDirectory: './coverage/',
  moduleNameMapper: {
    axios: 'axios/dist/node/axios.cjs'
  },
}

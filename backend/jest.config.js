const { resolve } = require('path')
const root = resolve(__dirname)
module.exports = {
  rootDir: root,
  displayName: 'functional-tests',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest'
}

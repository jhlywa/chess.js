/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended/all'],
  testRegex: '/__tests__/.*(\\.|/)(test|spec)\\.[jt]sx?$',
}

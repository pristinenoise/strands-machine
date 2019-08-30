module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: [
    "<rootDir>/tests/parser/parserMatchers.ts"
  ],

  moduleNameMapper: {
    '^@App/(.*)$': '<rootDir>/src/$1',
    '^@Tests/(.*)$': '<rootDir>/tests/$1'
  }
};

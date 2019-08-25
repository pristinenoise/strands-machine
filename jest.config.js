module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  moduleNameMapper: {
    '^@App/(.*)$': '<rootDir>/src/$1',
    '^@Tests/(.*)$': '<rootDir>/tests/$1'
  }
};

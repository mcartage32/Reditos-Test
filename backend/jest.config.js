module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true, // Para incluir la cobertura de pruebas
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};

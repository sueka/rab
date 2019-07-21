module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
  setupFiles: [
    '<rootDir>/src/setupTests.ts',
  ],
  testRegex: 'src/.*\\b(?:test|spec)\\.tsx?$',
  transform: {
    '\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts{x,}',
    '!<rootDir>/src/components/**/messages.ts',
    '!<rootDir>/src/{components,containers}/**/{*.,}stories.ts{x,}',
  ],
}

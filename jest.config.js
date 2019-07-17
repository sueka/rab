module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  setupFiles: [
    '<rootDir>/src/setupTests.ts',
  ],
  testRegex: 'src/.*\\b(?:test|spec)\\.tsx?$',
  transform: {
    '\\.tsx?$': 'ts-jest',
  },
}

module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      isolatedModules: true,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '~/(.*)': '<rootDir>/src/$1',

    // cf. http://react-dnd.github.io/react-dnd/docs/testing#setup
    '^dnd-core$': 'dnd-core/dist/cjs',
    '^react-dnd$': 'react-dnd/dist/cjs',
    '^react-dnd-html5-backend$': 'react-dnd-html5-backend/dist/cjs',
    '^react-dnd-touch-backend$': 'react-dnd-touch-backend/dist/cjs',
    '^react-dnd-test-backend$': 'react-dnd-test-backend/dist/cjs',
    '^react-dnd-test-utils$': 'react-dnd-test-utils/dist/cjs',
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
  ],
}

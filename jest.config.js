module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'wasm'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '^~/(.*)': '<rootDir>/src/$1',

    // cf. http://react-dnd.github.io/react-dnd/docs/testing#setup
    '^dnd-core$': 'dnd-core/dist/cjs',
    '^react-dnd$': 'react-dnd/dist/cjs',
    '^react-dnd-html5-backend$': 'react-dnd-html5-backend/dist/cjs',
    '^react-dnd-touch-backend$': 'react-dnd-touch-backend/dist/cjs',
    '^react-dnd-test-backend$': 'react-dnd-test-backend/dist/cjs',
    '^react-dnd-test-utils$': 'react-dnd-test-utils/dist/cjs',

    // wasm-pack
    '^(.*)/(.*)\\.wasm$': '$1/../__mocks__/$2_mock.ts',
  },
  modulePathIgnorePatterns: [
    '^<rootDir>/src/.*\\.css\\.d\\.ts$',
    '^<rootDir>/src/.*\\.wasm\\.d\\.ts$',
  ],
  watchPathIgnorePatterns: [
    '^<rootDir>/src/.*\\.css\\.d\\.ts$',
    '^<rootDir>/src/.*\\.wasm\\.d\\.ts$',
  ],
  transformIgnorePatterns: [
    '<roodDir>/node_modules/bcp-47',
  ],
  setupFiles: [
    '<rootDir>/src/setupTests.ts',
  ],
  testRegex: 'src/.*\\b(?:test|spec)\\.tsx?$',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts{,x}',
    '!<rootDir>/src/components/**/messages.ts',
    '!<rootDir>/src/components/**/messages.ts',
  ],
  testEnvironment: 'jsdom',
}

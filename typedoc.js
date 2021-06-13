module.exports = {
  entryPoints: [
    'src',
  ],
  out: 'doc',
  listInvalidSymbolLinks: true,
  excludeExternals: true,
  exclude: [
    '**/{*.,}{test,spec}.ts{x,}',
    '**/__mocks__/**/*',
    'src/components/**/messages.ts',
  ],
}

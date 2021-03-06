module.exports = {
  out: 'doc',
  ignoreCompilerErrors: true,
  listInvalidSymbolLinks: true,
  excludeExternals: true,
  exclude: [
    '**/{*.,}{test,spec}.ts{x,}',
    'src/components/**/messages.ts',
  ],
}

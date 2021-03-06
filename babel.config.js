module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV === 'development')

  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-syntax-dynamic-import',
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      'babel-plugin-parameter-decorator',
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true,
        },
      ],
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      'react-intl-auto',
    ],
    env: {
      production: {
        plugins: [
          'babel-plugin-unassert',
        ],
      },
      development: {
        plugins: [
          'react-hot-loader/babel',
        ],
      },
    },
  }
}

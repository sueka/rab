import { Configuration } from 'webpack'

// NOTE: ! を使い、 baseConfig が所望の構造でなければ実行時 TypeError が発生するようにする。
module.exports = (baseConfig: Configuration) => {
  baseConfig.module!.rules.push({
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
        }
      },
      'postcss-loader',
    ],
  }, {
    test: /\.tsx?$/,
    loader: 'awesome-typescript-loader',
  })

  baseConfig.resolve!.extensions!.push('.ts', '.tsx')

  return baseConfig
}

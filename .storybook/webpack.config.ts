import { Configuration } from 'webpack'
import * as path from 'path'

// NOTE: ! を使い、 baseConfig が所望の構造でなければ実行時 TypeError が発生するようにする。
module.exports = (baseConfig: Configuration) => {
  baseConfig.resolve!.extensions!.push('.ts', '.tsx')
  baseConfig.resolve!.modules!.push(path.resolve(__dirname, '../src'))
  baseConfig.resolve!.alias!['~'] = path.resolve(__dirname, '../src')

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
    loader: 'babel-loader',
  })

  return baseConfig
}

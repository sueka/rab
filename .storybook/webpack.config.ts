import { Configuration } from 'webpack'

// NOTE: ! を使い、 defaultConfig が所望の構造でなければ実行時 TypeError が発生するようにしている。
module.exports = (_baseConfig: unknown, _env: unknown, defaultConfig: Configuration) => {
  defaultConfig.module!.rules.push({
    test: /\.tsx?$/,
    loader: 'awesome-typescript-loader',
  })

  defaultConfig.resolve!.extensions!.push('.ts', '.tsx')

  return defaultConfig
}

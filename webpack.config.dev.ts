import * as path from 'path'
import { HotModuleReplacementPlugin } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import 'webpack-dev-server'
import { GenerateSW } from 'workbox-webpack-plugin'

import config from './webpack.config'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'production' | 'development' | 'test'
    }
  }
}

// same as in src/asserters/commonAsserters
function shouldBePresent<T>(it: T | null | undefined): asserts it is T {
  if (it == null) {
    throw new Error('It should be present.')
  }
}

const env = process.env.NODE_ENV

if (env === 'test') {
  throw new Error //
}

const host = '0.0.0.0'
const port = 1234

shouldBePresent(config.resolve)
shouldBePresent(config.plugins)

config.plugins.push(new BundleAnalyzerPlugin({
  analyzerPort: 10122,
  openAnalyzer: false,
}))

config.devServer = {
  static: {
    directory: path.resolve(__dirname, 'dist'),
  },
  host,
  allowedHosts: 'all',
  port,
  historyApiFallback: true,
}

if (process.env.NODE_ENV === 'development') {
  // Enable HMR
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-dom': '@hot-loader/react-dom',
  }

  if (typeof config.entry !== 'string') {
    throw new Error('Not implemented')
  }

  config.entry = [
    `webpack-dev-server/client?https://${ host }:${ port }`,
    'webpack/hot/only-dev-server',
    config.entry,
  ]

  config.plugins.push(
    new HotModuleReplacementPlugin()
  )

  config.plugins = config.plugins.filter(plugin => !(plugin instanceof GenerateSW))

  config.devServer.hot = 'only'

  config.performance = {
    ...config.performance,
    hints: false,
  }
}

export default config

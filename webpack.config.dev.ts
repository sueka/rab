import * as path from 'path'
import { HotModuleReplacementPlugin } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import config from './webpack.config'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'production' | 'development' | 'test'
    }
  }
}

if (process.env.NODE_ENV === 'test') {
  throw new Error //
}

config.mode = process.env.NODE_ENV ?? config.mode

const host = '0.0.0.0'
const port = 1234

config.plugins.push(new BundleAnalyzerPlugin({
  analyzerPort: 10122,
  openAnalyzer: false,
}))

config.devServer = {
  contentBase: path.join(__dirname, 'dist'),
  https: true,
  host,
  disableHostCheck: true,
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

  config.plugins.push(new HotModuleReplacementPlugin())

  config.devServer.hotOnly = true
}

export default config

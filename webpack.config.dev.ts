import * as path from 'path'
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

config.resolve.alias = {
  ...config.resolve.alias,
  'react-dom': '@hot-loader/react-dom',
}

if (typeof config.entry !== 'string') {
  throw new Error('Not implemented')
}

const host = '0.0.0.0'
const port = 1234

config.entry = [
  `webpack-dev-server/client?http://${ host }:${ port }`,
  'webpack/hot/only-dev-server',
  config.entry,
]

config.plugins.push(new BundleAnalyzerPlugin({
  analyzerPort: 10122,
  openAnalyzer: false,
}))

config.devServer = {
  contentBase: path.join(__dirname, 'dist'),
  host,
  disableHostCheck: true,
  port,
  historyApiFallback: true,
}

export default config

import WasmPackPlugin from '@wasm-tool/wasm-pack-plugin'
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

const env = process.env.NODE_ENV

if (env === 'test') {
  throw new Error //
}

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

  config.plugins.push(
    new HotModuleReplacementPlugin(),
    new WasmPackPlugin({
      crateDirectory: path.join(__dirname, 'src/crate'),
      outDir: path.join(__dirname, 'src/crate/pkg'),
      outName: 'index',
      forceMode: env,
    })
  )

  config.devServer.hotOnly = true
}

export default config

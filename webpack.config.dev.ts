import * as path from 'path'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
// import 'webpack-dev-server'

import config from './webpack.config'

config.resolve.alias = {
  ...config.resolve.alias,
  'react-dom': '@hot-loader/react-dom',
}

config.plugins.push(new BundleAnalyzerPlugin({
  analyzerPort: 10122,
  openAnalyzer: false,
}))

config.devServer = {
  contentBase: path.join(__dirname, 'dist'),
  host: '0.0.0.0',
  disableHostCheck: true,
  port: 1234,
  historyApiFallback: true,
}

export default config

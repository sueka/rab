import * as path from 'path'
import { Configuration } from 'webpack'
import 'webpack-dev-server'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import prodConfig from './webpack.config'

const config: Configuration = {
  ...prodConfig,
  mode: 'development',
  plugins: [
    ...prodConfig.plugins!,
    new BundleAnalyzerPlugin({
      analyzerPort: 10122,
      openAnalyzer: false,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 1234,
    historyApiFallback: true,
  },
}

export default config

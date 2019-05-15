import { Configuration } from 'webpack'
import * as path from 'path'
import 'webpack-dev-server'

import prodConfig from './webpack.config'

const config: Configuration = {
  ...prodConfig,
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 1234,
    historyApiFallback: true,
  },
}

export default config

import * as path from 'path'
import 'webpack-dev-server'

import prodConfig from './webpack.config'

export default {
  ...prodConfig,
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 1234,
    historyApiFallback: true,
  },
}

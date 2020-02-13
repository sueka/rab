import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import DotEnvPlugin from 'dotenv-webpack'
import * as path from 'path'

const config: Configuration = {
  mode: 'production',
  bail: true,
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/scripts/[name].[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          envName: 'production',
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: '404.html',
    }),
    new DotEnvPlugin({
      path: path.resolve(__dirname, '../.env'),
      safe: true,
      systemvars: true,
    }),
  ],
}

export default config
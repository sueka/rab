import 'webpack-dev-server'

import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import DotEnvPlugin from 'dotenv-webpack'

import { strictEqual } from 'assert'
import * as path from 'path'

const config = (env = { prod: false }): Configuration => {
  strictEqual(typeof env.prod, 'boolean', '--env.prod must be a flag.')

  return {
    mode: env.prod ? 'production' : 'development',
    bail: true,
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'assets/scripts/[name].[chunkhash:8].js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
            'postcss-loader',
          ],
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
      }),
      new DotEnvPlugin({
        path: path.resolve(__dirname, '.env'),
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 1234,
      historyApiFallback: true,
    },
    devtool: 'source-map',
  }
}

export default config

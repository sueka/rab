import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import DotEnvPlugin from 'dotenv-webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import * as path from 'path'

const config: Configuration = {
  mode: 'production',
  bail: true,
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src'),
    ],
    alias: {
      'src': path.resolve(__dirname, 'src'),
    },
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
        options: {
          envName: 'production',
        },
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
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 1048576,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new DotEnvPlugin({
      path: path.resolve(__dirname, '.env'),
      safe: true,
    }),
    new CopyWebpackPlugin(
      [
        { from: '.', to: '' },
      ],
      {
        context: path.resolve(__dirname, 'public'),
      }
    ),
  ],
  devtool: 'source-map',
}

export default config

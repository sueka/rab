import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import DotEnvPlugin from 'dotenv-webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'production' | 'development' | 'test'
    }
  }
}

const env = process.env.NODE_ENV != null ? process.env.NODE_ENV : 'production'

if (env === 'test') {
  throw new Error //
}

const config: Configuration = {
  mode: env as Configuration['mode'],
  bail: true,
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
    mainFields: ['browser', 'main'],
  },
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
          envName: env,
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
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
        ],
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      maxSize: 1048576,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      base: `${ process.env.BASE_NAME }/`,
      inject: 'head',
    }),
    new DotEnvPlugin({
      path: path.resolve(__dirname, '.env'),
      allowEmptyValues: true,
      safe: true,
      systemvars: true,
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

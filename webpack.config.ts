import CopyWebpackPlugin from 'copy-webpack-plugin'
import * as dotenv from 'dotenv'
import DotEnvPlugin from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import { Configuration, ProvidePlugin } from 'webpack'

dotenv.config()

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'production' | 'development' | 'test'
    }
  }
}

const env = process.env.NODE_ENV ?? 'production'

if (env === 'test') {
  throw new Error //
}

const config: Configuration = {
  mode: env,
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
    fallback: {
      assert: require.resolve('assert'),
    },
    mainFields: ['browser', 'module', 'main'],
  },
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/scripts/[name].[fullhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /node_modules\/react-intl\//,
        loader: 'babel-loader',
        options: {
          envName: env,
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          envName: env,
        },
      },
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
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
                mode(resourcePath: string) {
                  const relativeResourcePath = path.relative(__dirname, resourcePath)

                  if (
                    relativeResourcePath === 'src/global.css' ||
                    relativeResourcePath === 'src/transition.css'
                  ) {
                    return 'global'
                  }

                  return 'local'
                },
                localIdentName: '[path][name]__[local]--[contenthash:base64:5]',
              },
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({}),
    ],
    splitChunks: {
      chunks: 'all',
      maxSize: 249856,
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '.',
          to: '',
          context: path.resolve(__dirname, 'public'),
        },
        {
          from: 'highlight.js/styles/*.css',
          to: 'assets/stylesheets',
          context: path.resolve(__dirname, 'node_modules'),
        },
      ],
    }),
    new ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  devtool: 'source-map',
}

export default config

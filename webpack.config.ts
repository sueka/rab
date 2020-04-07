import { ConfigurationFactory, Configuration } from 'webpack'
import 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import DotEnvPlugin from 'dotenv-webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

const createConfig: ConfigurationFactory = (_env, { mode = 'production' }) => {
  const config: Configuration = {
    mode,
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
            envName: mode,
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
        base: `${ process.env.BASE_URL }/`,
        inject: 'head',
      }),
      new DotEnvPlugin({
        path: path.resolve(__dirname, '.env'),
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

  if (mode === 'development') {
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
  }

  return config
}

export default createConfig

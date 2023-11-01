import * as dotenv from 'dotenv'
import DotEnvPlugin from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import { Configuration } from 'webpack'

dotenv.config()

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
      template: path.resolve(__dirname, 'src/404.html'),
      filename: '404.html',
      base: `${ process.env.BASE_NAME }/`,
      inject: 'head',
    }),
    new DotEnvPlugin({
      path: path.resolve(__dirname, '../.env'),
      allowEmptyValues: true,
      safe: true,
      systemvars: true,
    }),
  ],
}

export default config

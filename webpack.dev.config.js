const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const baseConfig = require('./webpack.config.js')();

const PORT = 9000;

module.exports = {
  ...baseConfig,
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    ...baseConfig.output,
    sourceMapFilename: '[name].[contenthash:8].map',
    chunkFilename: '[id].[contenthash:8].js',
  },
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        diagnosticOptions: {
          syntactic: true,
        },
        mode: 'write-references'
      },
      issue: {
        exclude: [
          {
            file: 'node_modules/**/*.tsx'
          },
          {
            file: 'node_modules/**/*.ts'
          }
        ],
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'head',
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
      },
      env: {
        Prod: false,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/audio',
          globOptions: {
            ignore: ['.DS_Store'],
          },
        },
        {
          from: 'public/dictionary',
          globOptions: {
            ignore: ['.DS_Store'],
          },
        },
      ],
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: PORT,
    compress: true,
    historyApiFallback: true,
    server: {
      type: 'https',
      options: {
        key: fs.readFileSync(path.join(__dirname, 'localhost-key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'localhost.pem')),
      },
    },
    devMiddleware: {
      publicPath: '/',
    },
    client: {
      logging: 'info',
    }
  },
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 1000,
    ignored: /node_modules/
  },
};

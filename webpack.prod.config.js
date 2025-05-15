const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const HtmlWebpackSkipAssetsPlugin = require('html-webpack-skip-assets-plugin').HtmlWebpackSkipAssetsPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const baseConfig = require("./webpack.config.js")(true);

const config = {
  ...baseConfig,
  mode: "production",
  target: ["browserslist"],
  devtool: false,
  output: {
    ...baseConfig.output,
    filename: "[name].[chunkhash:8].js",
  },
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    ...baseConfig.optimization,
    concatenateModules: true,
    minimize: true,
    minimizer: [
      (compiler) => {
        const TerserPlugin = require("terser-webpack-plugin");

        new TerserPlugin({
          parallel: true,
          extractComments: false,
          terserOptions: {
            output: {
              comments: false,
            },
            mangle: true,
            compress: {
              keep_fargs: false,
              hoist_funs: true,
            },
          },
        }).apply(compiler);
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        diagnosticOptions: {
          syntactic: true,
        },
        mode: "write-references",
      },
      issue: {
        exclude: [
          {
            file: "node_modules/**/*.tsx",
          },
          {
            file: "node_modules/**/*.ts",
          },
        ],
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: "head",
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
      },
      env: {
        Prod: true,
      },
    }),
    //new HtmlWebpackSkipAssetsPlugin({
    //    excludeAssets: [/tone.*/i]
    //}),
    new PreloadWebpackPlugin({
      rel: "preload",
      /* as(entry) {
          if (/\.woff2$/.test(entry)) return 'font';
          if (/\.css$/.test(entry)) return 'style';
          if (/worker/.test(entry)) return 'worker';
          if (/\.png$|.svg$/.test(entry)) return 'image';
          return 'script';
      },
      fileBlacklist: [
          /\.ttf/,
          /\.woff$/,
          /serviceworker/,
          /\.webmanifest/
      ], */
      include: /* 'asyncChunks' */ "initial",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public/robots.txt",
          globOptions: {
            ignore: [".DS_Store"],
          },
        },
        {
          from: "public/sitemap.xml",
          globOptions: {
            ignore: [".DS_Store"],
          },
        },
        {
          from: "public/img/Sign.svg",
          globOptions: {
            ignore: [".DS_Store"],
          },
        },
        {
          from: "public/audio",
          globOptions: {
            ignore: [".DS_Store"],
          },
        },
        {
          from: "public/dictionary",
          globOptions: {
            ignore: [".DS_Store"],
          },
        },
      ],
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};

module.exports = config;

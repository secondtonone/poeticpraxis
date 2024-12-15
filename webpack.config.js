const path = require('path');

module.exports = (isEnvProduction = false) =>  ({
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[contenthash:8].js',
    globalObject: 'globalThis',
  },
  stats: 'errors-warnings',
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('swc-loader'),
            options: {
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
              jsc: {
                parser: {
                  syntax: 'ecmascript',
                  jsx: true,
                  dynamicImport: true,
                  functionBind: true,
                  exportDefaultFrom: true,
                  exportNamespaceFrom: true,
                  topLevelAwait: true,
                  importMeta: true
                }
              },
              env: {
                targets: isEnvProduction 
                  ? [
                    ">0.2%",
                    "not dead",
                    "not op_mini all"
                  ] 
                  : [
                    "last 1 chrome version",
                    "last 1 firefox version",
                    "last 1 safari version"
                  ]
              }
            }
          }
        ]
        // loader: require.resolve('babel-loader'),
        /* options: {
          customize: require.resolve(
            'babel-preset-react-app/webpack-overrides'
          ),
          presets: [
            [
              require.resolve('babel-preset-react-app'),
              {
                runtime: 'automatic',
              },
            ],
          ], */
        /*
          // @remove-on-eject-begin
          babelrc: false,
          configFile: false,
          // Make sure we have a unique cache identifier, erring on the
          // side of caution.
          // We remove this when the user ejects because the default
          // is sane and uses Babel options. Instead of options, we use
          // the react-scripts and babel-preset-react-app versions.
          cacheIdentifier: getCacheIdentifier(
            isEnvProduction
              ? 'production'
              : isEnvDevelopment && 'development',
            [
              'babel-plugin-named-asset-import',
              'babel-preset-react-app',
              'react-dev-utils',
              'react-scripts',
            ]
          ),
          // @remove-on-eject-end
          plugins: [
            isEnvDevelopment &&
              shouldUseReactRefresh &&
              require.resolve('react-refresh/babel'),
          ].filter(Boolean), */
        /* cacheDirectory: true,
          cacheCompression: false,
          compact: isEnvProduction,
        }, */
      },
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('swc-loader'),
            options: {
              sync: true,
              jsc: {
                transform: {
                  react: {
                    runtime: 'automatic',
                  },
                },
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                  dynamicImport: true,
                  functionBind: true,
                  exportDefaultFrom: true,
                  exportNamespaceFrom: true,
                  topLevelAwait: true,
                  importMeta: true
                }
              },
              env: {
                targets: isEnvProduction 
                  ? [
                    ">0.2%",
                    "not dead",
                    "not op_mini all"
                  ] 
                  : [
                    "last 1 chrome version",
                    "last 1 firefox version",
                    "last 1 safari version"
                  ]
              }
            }
          }
          /* {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          }, */
        ],
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 5000,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|mp3|ogg|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.webmanifest$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
          'webpack-webmanifest-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      '@components': path.join(__dirname, 'src/components'),
      '@containers': path.join(__dirname, 'src/containers'),
      '@utils': path.join(__dirname, 'src/utils'),
      '@styles': path.join(__dirname, 'src/styles'),
      '@store': path.join(__dirname, 'src/store'),
      '@modules': path.join(__dirname, 'src/modules'),
      '@hooks': path.join(__dirname, 'src/hooks'),
      '@typings': path.join(__dirname, 'src/typings'),
      '@contexts': path.join(__dirname, 'src/contexts'),
      '@constants': path.join(__dirname, 'src/constants'),
      '@routes': path.join(__dirname, 'src/routes'),
      '@translations': path.join(__dirname, 'src/translations'),
      '@icons': path.join(__dirname, 'src/components/IconSVG'),
      '@public': path.join(__dirname, 'public'),
    },
  },
  optimization: {
    moduleIds: 'named',
    runtimeChunk: 'single',
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      maxSize: 400000,
    },
    emitOnErrors: false,
  },
});

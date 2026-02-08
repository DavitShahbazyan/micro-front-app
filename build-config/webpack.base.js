const path = require('path');
const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Base webpack configuration for MicroFrontend apps
 * @param {Object} options - Configuration options
 * @param {string} options.entry - Entry point file
 * @param {number} options.port - Dev server port
 * @param {string} options.name - Module Federation name
 * @param {Object} options.moduleFederation - Module Federation configuration
 * @param {Object} options.moduleFederation.exposes - Components to expose
 * @param {Object} options.moduleFederation.remotes - Remote modules to consume
 * @param {string} options.htmlTemplate - HTML template path
 * @param {Object} env - Webpack environment
 * @param {Object} argv - Webpack arguments
 */
module.exports = (options = {}) => {
  return (env, argv) => {
    const isProduction = argv.mode === 'production';
    
    const {
      entry = './src/index.jsx',
      port = 3000,
      name,
      moduleFederation = {},
      htmlTemplate = './public/index.html',
    } = options;

    const {
      exposes = {},
      remotes = {},
    } = moduleFederation;

    // Shared dependencies configuration
    const sharedDependencies = {
      react: {
        singleton: true,
        requiredVersion: '^18.2.0',
        eager: false,
      },
      'react-dom': {
        singleton: true,
        requiredVersion: '^18.2.0',
        eager: false,
      },
    };

    // Build plugins array
    const plugins = [];
    
    // Add HtmlWebpackPlugin only if template is provided
    if (htmlTemplate) {
      plugins.push(new HtmlWebpackPlugin({
        template: htmlTemplate,
      }));
    }
    
    plugins.push(new webpack.HotModuleReplacementPlugin());

    // Add ModuleFederationPlugin if name is provided
    if (name) {
      const mfConfig = {
        name,
        shared: sharedDependencies,
      };

      // Add exposes if provided
      if (Object.keys(exposes).length > 0) {
        mfConfig.exposes = exposes;
        mfConfig.filename = 'remoteEntry.js';
      }

      // Add remotes if provided
      if (Object.keys(remotes).length > 0) {
        mfConfig.remotes = remotes;
      }

      plugins.unshift(new ModuleFederationPlugin(mfConfig));
    }

    return {
      mode: isProduction ? 'production' : 'development',
      entry,
      optimization: {
        runtimeChunk: false,
      },
      devtool: isProduction ? 'source-map' : 'eval-source-map',
      devServer: {
        port,
        historyApiFallback: true,
        hot: true,
        allowedHosts: 'all',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      },
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
                  '@babel/preset-typescript'
                ],
              },
            },
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react'
                ],
              },
            },
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      plugins,
    };
  };
};


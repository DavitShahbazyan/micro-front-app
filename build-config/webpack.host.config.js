const path = require('path');
const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  // Get remote URL from environment or use localhost
  const REMOTE_URL = process.env.REMOTE_URL || 'http://localhost:3001';
  
  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.jsx',
    optimization: {
      runtimeChunk: false,
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    devServer: {
      port: 3000,
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
    plugins: [
      new ModuleFederationPlugin({
        name: 'host',
        remotes: {
          remote: `remote@${REMOTE_URL}/remoteEntry.js`,
        },
        shared: {
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
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  };
};


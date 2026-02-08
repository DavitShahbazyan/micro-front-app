const createWebpackConfig = require('../../build-config/webpack.base');

module.exports = createWebpackConfig({
  entry: './src/index.jsx',
  port: 3001,
  name: 'remote',
  moduleFederation: {
    exposes: {
      './Button': './src/components/Button.jsx',
      './Card': './src/components/Card.jsx',
    },
  },
  htmlTemplate: './public/index.html',
});


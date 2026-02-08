const createWebpackConfig = require('../build-config/webpack.base');

module.exports = createWebpackConfig({
  entry: './index.ts',
  port: 3002,
  name: 'shared',
  moduleFederation: {
    exposes: {
      './Button': './components/Button/index.ts',
      './Card': './components/Card/index.ts',
      './index': './index.ts',
    },
  },
  htmlTemplate: null, // Shared doesn't need HTML
});


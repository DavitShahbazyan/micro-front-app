const createWebpackConfig = require('../../build-config/webpack.base');

// Get shared URL from environment or use localhost
const SHARED_URL = process.env.SHARED_URL || 'http://localhost:3002';

module.exports = createWebpackConfig({
  entry: './src/index.jsx',
  port: 3001,
  name: 'remote',
  moduleFederation: {
    exposes: {
      './Button': './src/components/Button.jsx',
      './Card': './src/components/Card.jsx',
    },
    remotes: {
      shared: `shared@${SHARED_URL}/remoteEntry.js`,
    },
  },
  htmlTemplate: './public/index.html',
});


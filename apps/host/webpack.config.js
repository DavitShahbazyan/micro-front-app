const createWebpackConfig = require('../../build-config/webpack.base');

// Get remote URLs from environment or use localhost
const REMOTE_URL = process.env.REMOTE_URL || 'http://localhost:3001';
const SHARED_URL = process.env.SHARED_URL || 'http://localhost:3002';

module.exports = createWebpackConfig({
  entry: './src/index.jsx',
  port: 3000,
  name: 'host',
  moduleFederation: {
    remotes: {
      remote: `remote@${REMOTE_URL}/remoteEntry.js`,
      shared: `shared@${SHARED_URL}/remoteEntry.js`,
    },
  },
  htmlTemplate: './public/index.html',
});

